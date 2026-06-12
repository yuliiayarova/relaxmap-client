import { forwardBackend, nextServer } from '../api';
import { AuthResponse } from '../types/authTypes';
import { PageQuery } from '../types/feedbackTypes';
import { CurrentUserResponse, UserLocationsResponse } from '../types/userTypes';

export async function getUserById(userId: string): Promise<AuthResponse> {
  const res = await forwardBackend.get<AuthResponse>(`/users/${userId}`);
  return res.data;
}

export async function getUserLocations(
  userId: string,
  query: PageQuery,
): Promise<UserLocationsResponse> {
  const cleanedQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([, value]) => value !== undefined && value !== null && value !== '', // Перевіряю щоб не записувало пусті параметри
    ),
  );
  const res = await forwardBackend.get<UserLocationsResponse>(
    `/users/${userId}/locations`,
    {
      params: cleanedQuery,
    },
  );
  return res.data;
}

export async function getCurrentUser() {
  const res = await nextServer.get<CurrentUserResponse>('/profile');
  return res.data;
}
