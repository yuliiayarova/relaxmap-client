import clsx from 'clsx';
import Link from 'next/link';
import css from './HeaderNav.module.css';

interface HeaderNavProps {
  isLoggedIn: boolean;
  className?: string;
  onNavigate?: () => void;
}

export default function HeaderNav({
  isLoggedIn,
  className,
  onNavigate,
}: HeaderNavProps) {
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
      {isLoggedIn && (
        <Link href="/pro" onClick={onNavigate}>
          Мій Профіль
        </Link>
      )}
    </nav>
  );
}
