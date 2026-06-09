import { User } from './authTypes';

export type ShortedUser = Omit<User, '_id' | 'email'>;

export type AuthUser = User | ShortedUser;

export interface CurrentUserResponse {
  status: number;
  message: string;
  data: ShortedUser;
}
export interface UserLocationsResponse {
  status: number;
  message: string;
  page: number;
  limit: number;
  totalItems: number;
  totalPgaes: number;
  locations: Location[];
}
