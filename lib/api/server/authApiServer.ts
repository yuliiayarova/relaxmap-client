import { cookies } from 'next/headers';
import { nextServer } from '../api';

export interface SessionResponse {
  headers: {
    'set-cookie'?: string[];
  };
  status: number;
}

export async function refreshSessionServer(): Promise<SessionResponse> {
  const cookieStore = await cookies();
  const res = await nextServer.post('/auth/refresh', null, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}
