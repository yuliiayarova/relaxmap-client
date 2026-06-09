'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/Button/Button';

export default function AuthNav() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      <Button onClick={() => router.push('/register')} text="Реєстрація" />
      <Button onClick={() => router.push('/login')} text="Вхід" />
    </>
  );
}
