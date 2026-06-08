import Link from 'next/link';
import Icon from '@/shared/ui/Icon/Icon';
import css from './Logo.module.css';

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link href="/" className={css.brand} aria-label="Relax Map home" onClick={onClick}>
      <Icon size={20} name="map_search" className={css.brandIcon}></Icon>
      <span className={css.brandText}>Relax Map</span>
    </Link>
  );
}
