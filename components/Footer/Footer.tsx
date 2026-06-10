'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/shared/ui/Icon/Icon';
import css from './Footer.module.css';
import clsx from 'clsx';

export default function Footer() {
  const pathname = usePathname();

  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return (
      <footer className={css.footerAuth}>
        <div className={`container ${css.footerContainerAuth}`}>
          <p className={clsx(css.copyright, css.authCopyright)}>
            © 2025 Relax Map
          </p>
        </div>
      </footer>
    );
  }
  return (
    <footer className={css.footer}>
      <div className={`container ${css.footerContainer}`}>
        <div className={css.top}>
          <div className={css.mainRow}>
            <div className={css.logo}>
              <Icon name="map_search" size={24} className={css.logoIcon} />
              <span>Relax Map</span>
            </div>

            <ul className={css.socials}>
              <li>
                <a
                  href="https://www.facebook.com/"
                  aria-label="Facebook"
                  className={css.socialLink}
                >
                  <Icon name="Facebook" className={css.socialIcon} />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/"
                  aria-label="Instagram"
                  className={css.socialLink}
                >
                  <Icon name="Instagram" className={css.socialIcon} />
                </a>
              </li>

              <li>
                <a
                  href="https://x.com/"
                  aria-label="X"
                  className={css.socialLink}
                >
                  <Icon name="X" className={css.socialIcon} />
                </a>
              </li>

              <li>
                <a
                  href="https://www.youtube.com/"
                  aria-label="YouTube"
                  className={css.socialLink}
                >
                  <Icon name="Youtube" className={css.socialIcon} />
                </a>
              </li>
            </ul>
          </div>
          <nav className={css.nav}>
            <Link href="/">Головна</Link>
            <Link href="/locations">Місця відпочинку</Link>
          </nav>
        </div>

        <p className={css.copyright}>
          © 2025 Природні Мандри. Усі права захищені.
        </p>
      </div>
    </footer>
  );
}
