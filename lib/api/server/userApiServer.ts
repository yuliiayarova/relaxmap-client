import { cookies } from 'next/headers';
import { nextServer } from '../api';
import { CurrentUserResponse } from '../types/userTypes';

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const cookieStore = await cookies();
  const res = await nextServer.get<CurrentUserResponse>('/profile', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}
