import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_FRONTEND_URL + '/api';

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export const forwardBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
});
