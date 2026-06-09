import Link from 'next/link';
import Icon from '@/shared/ui/Icon/Icon';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.top}>
          <div className={styles.mainRow}>
            <div className={styles.logo}>
              <Icon name="map_search" size={24} className={styles.logoIcon} />
              <span>Relax Map</span>
            </div>

            <ul className={styles.socials}>
              <li>
                <a
                  href="https://www.facebook.com/"
                  aria-label="Facebook"
                  className={styles.socialLink}
                >
                  <Icon name="Facebook" className={styles.socialIcon} />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/"
                  aria-label="Instagram"
                  className={styles.socialLink}
                >
                  <Icon name="Instagram" className={styles.socialIcon} />
                </a>
              </li>

              <li>
                <a
                  href="https://x.com/"
                  aria-label="X"
                  className={styles.socialLink}
                >
                  <Icon name="X" className={styles.socialIcon} />
                </a>
              </li>

              <li>
                <a
                  href="https://www.youtube.com/"
                  aria-label="YouTube"
                  className={styles.socialLink}
                >
                  <Icon name="Youtube" className={styles.socialIcon} />
                </a>
              </li>
            </ul>
          </div>
          <nav className={styles.nav}>
            <Link href="/">Головна</Link>
            <Link href="/locations">Місця відпочинку</Link>
          </nav>
        </div>

        <p className={styles.copyright}>
          © 2025 Природні Мандри. Усі права захищені.
        </p>
      </div>
    </footer>
  );
}
