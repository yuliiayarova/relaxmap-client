'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import HeaderActions from './HeaderActions/HeaderActions';
import HeaderNav from './HeaderNav/HeaderNav';
import Logo from './Logo/Logo';
import LogoutModal from './LogoutModal/LogoutModal';
import MobileMenu from './MobileMenu/MobileMenu';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isAuthPage =
    pathname === '/auth/login' || pathname === '/auth/register';
  const isLoggedIn = true;

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

  return (
    <>
      <header className={clsx('container', css.header)}>
        <Logo onClick={closeMenu} />

        {!isAuthPage && (
          <>
            <HeaderNav isLoggedIn={isLoggedIn} className={css.desktopNav} />
            <HeaderActions
              isLoggedIn={isLoggedIn}
              isMenuOpen={isMenuOpen}
              onToggleMenu={() => setIsMenuOpen((value) => !value)}
              onLogoutClick={openLogoutModal}
            />
            <MobileMenu
              isOpen={isMenuOpen}
              isLoggedIn={isLoggedIn}
              onClose={closeMenu}
              onLogoutClick={openLogoutModal}
            />
          </>
        )}
      </header>

      {isLogoutModalOpen && (
        <LogoutModal onCancel={closeLogoutModal} onConfirm={closeLogoutModal} />
      )}
    </>
  );
}
