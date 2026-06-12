import clsx from 'clsx';
import Link from 'next/link';
import css from './HeaderNav.module.css';

import { AuthUser } from '@/lib/api/types/userTypes';

interface HeaderNavProps {
  user?: AuthUser | null;
  isLoggedIn: boolean;
  className?: string;
  onNavigate?: () => void;
}

export default function HeaderNav({
  user,
  isLoggedIn,
  className,
  onNavigate,
}: HeaderNavProps) {
  const userId = user?._id;
  return (
    <nav
      className={clsx(css.navMenu, className)}
      aria-label="Основна навігація"
    >
      <Link href="/" onClick={onNavigate}>
        Головна
      </Link>

      <Link href="/locations" onClick={onNavigate}>
        Місця відпочинку
      </Link>
      {isLoggedIn &&  (
        <Link href={`/profile/${userId}`} onClick={onNavigate}>
          Мій Профіль
        </Link>
      )}
    </nav>
  );
}
