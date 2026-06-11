'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import HeaderActions from './HeaderActions/HeaderActions';
import HeaderNav from './HeaderNav/HeaderNav';
import Logo from './Logo/Logo';
import LogoutModal from './LogoutModal/LogoutModal';
import MobileMenu from './MobileMenu/MobileMenu';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const user = useAuthStore((state) => state.user);

  const logoutUser = useAuthStore((state) => state.logoutUser);

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const shouldShowNavigation = !isAuthPage && isAuthChecked;

  // useEffect(() => {
  //   void checkAuth();
  // }, [checkAuth, pathname]);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    closeMenu();
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const confirmLogout = async () => {
    await logoutUser();
    closeLogoutModal();
    router.push('/');
  };

  return (
    <>
      <header className={clsx('container', css.header)}>
        <Logo onClick={closeMenu} />

        {shouldShowNavigation && (
          <>
            <HeaderNav
              user={user}
              isLoggedIn={isAuthenticated}
              className={css.desktopNav}
            />
            <HeaderActions
              isLoggedIn={isAuthenticated}
              isMenuOpen={isMenuOpen}
              onToggleMenu={() => setIsMenuOpen((value) => !value)}
              onLogoutClick={openLogoutModal}
            />
            <MobileMenu
              isOpen={isMenuOpen}
              isLoggedIn={isAuthenticated}
              onClose={closeMenu}
              onLogoutClick={openLogoutModal}
            />
          </>
        )}
      </header>

      {isLogoutModalOpen && (
        <LogoutModal
          isLoading={isAuthLoading}
          onCancel={closeLogoutModal}
          onConfirm={confirmLogout}
        />
      )}
    </>
  );
}
