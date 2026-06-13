'use client';
import styles from './FullPageLoader.module.css';

export default function FullPageLoader() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.loaderContainer}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.logoSvg}
        >
          <g className={styles.mapIcon}>
            <path d="M3 6v13l5-2.5V3.5L3 6z" />
            <path d="M8 3.5l6 3v9.5l-6-3" />
            <path d="M14 6.5l5-2.5v7" />
          </g>

          <g className={styles.lensIcon}>
            <circle cx="16" cy="16" r="2.5" fill="#FAF3EC" stroke="none" />
            <circle cx="16" cy="16" r="2.5" />
            <path d="M18 18l2 2" />
          </g>
        </svg>
      </div>
    </div>
  );
}
