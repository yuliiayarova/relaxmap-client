import axios, { AxiosInstance } from 'axios';

const nextServerURL = process.env.NEXT_PUBLIC_FRONTEND_URL + '/api';
const backendURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const nextServer = axios.create({
  baseURL: nextServerURL,
  withCredentials: true,
});

export const forwardBackend = axios.create({
  baseURL: backendURL,
});

const attachRefreshInterceptor = (instance: AxiosInstance) => {
  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) prom.reject(error);
      else prom.resolve(token);
    });
    failedQueue = [];
  };

  instance.interceptors.request.use(
    (config) => {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (typeof window === 'undefined') {
        return Promise.reject(error);
      }

      if (originalRequest.url?.includes('/auth/refresh')) {
        localStorage.removeItem('accessToken');
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await axios.post(
            `${nextServerURL}/auth/refresh`,
            {},
            { withCredentials: true },
          );

          const { accessToken } = response.data;

          if (!accessToken) {
            throw new Error('Missing access token in refresh response');
          }

          localStorage.setItem('accessToken', accessToken);

          instance.defaults.headers.common['Authorization'] =
            `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          processQueue(null, accessToken);
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);

          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');

            if (window.location.pathname === '/locations/add') {
              window.location.href = '/login';
            }
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};

attachRefreshInterceptor(nextServer);
attachRefreshInterceptor(forwardBackend);
