'use client';

import { useAuthStore } from '../../lib/store/authStore';
import { useEffect } from 'react';

import { usePathname } from 'next/navigation';
import { refreshSessionClient } from '@/lib/api/client/authApiClient';
import { getCurrentUser } from '@/lib/api/client/usersApi';

type Props = { children: React.ReactNode };

const authPages = ['/login', '/register'];

export default function AuthProvider({ children }: Props) {
  const pathname = usePathname();

  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);

  useEffect(() => {
    const isAuthPage = authPages.includes(pathname);

    if (isAuthPage) {
      setAuthChecked(true);
      return;
    }

    setAuthChecked(false);

    const checkAuth = async () => {
      try {
        console.log('Checking auth');

        await refreshSessionClient();

        const response = await getCurrentUser();
        console.log('Current user', response.data);

        console.log('Current user', response.data);

        setUser(response.data);
      } catch {
        clearAuth();
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [pathname, setUser, clearAuth, setAuthChecked]);

  if (!isAuthChecked) {
    return <p>Loading...</p>;
  }

  return children;
}
