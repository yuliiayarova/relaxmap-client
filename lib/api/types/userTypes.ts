import { User } from './authTypes';

export type ShortedUser = Omit<User, '_id' | 'email'>;
export type CurrentUser = Omit<User, 'email'>;

export type AuthUser = User | CurrentUser;

export interface CurrentUserResponse {
  status: number;
  message: string;
  data: CurrentUser;
}
export interface UserLocationsResponse {
  status: number;
  message: string;
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  locations: (Location & { 
  _id: string;
  image: string;
  locationType: string;
  rate: number;
  name: string;
})[];

}
