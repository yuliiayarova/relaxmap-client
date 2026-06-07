import { nextServer } from '../api';
import { AuthResponse, LoginData, RegisterData } from '../types/authTypes';

export async function refreshSessionClient() {
  const res = await nextServer.post('/auth/refresh');
  return res;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const res = await nextServer.post<AuthResponse>('/auth/register', data);
  return res.data;
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const res = await nextServer.post<AuthResponse>('/auth/login', data);
  return res.data;
}

export async function logout() {
  await nextServer.post('/auth/logout');
}
