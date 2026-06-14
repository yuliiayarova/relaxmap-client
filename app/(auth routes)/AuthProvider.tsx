'use client';

import { useAuthStore } from '../../lib/store/authStore';
import { useEffect } from 'react';

import { usePathname } from 'next/navigation';
import { refreshSessionClient } from '@/lib/api/client/authApiClient';
import { getCurrentUser } from '@/lib/api/client/usersApi';
import FullPageLoader from '@/components/FullPageLoader/FullPageLoader';

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

    const checkAuth = async () => {
      try {
        await refreshSessionClient();

        const response = await getCurrentUser();

        setUser(response.data);
      } catch (error) {
        clearAuth();
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [pathname, setUser, clearAuth, setAuthChecked]);

  if (!isAuthChecked) {
    return <FullPageLoader />;
  }

  return children;
}
