'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Button from '@/shared/ui/Button/Button';
import css from './AuthNav.module.css';
import clsx from 'clsx';

export default function AuthNav() {
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className={css.wrapper}>
      <Button
        className={clsx(css.authBtn, pathname === '/register' && css.active)}
        onClick={() => router.push('/register')}
        text="Реєстрація"
      />
      <Button
        className={clsx(css.authBtn, pathname === '/login' && css.active)}
        onClick={() => router.push('/login')}
        text="Вхід"
      />
    </div>
  );
}
