import { User } from './authTypes';

export type ShortedUser = Omit<User, '_id' | 'email'>;

export interface CurrentUserResponse {
  status: number;
  message: string;
  data: ShortedUser;
}
