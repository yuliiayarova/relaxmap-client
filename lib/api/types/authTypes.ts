export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  articlesAmount: number;
}
export interface AuthResponse {
  status: number;
  message: string;
  data: User;
}
