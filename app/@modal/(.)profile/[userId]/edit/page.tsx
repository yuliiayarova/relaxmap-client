'use client';

import { useRouter } from 'next/navigation';
import ModalBackdrop from '@/components/ModalBackdrop/ModalBackdrop'; // Проверь, такой ли путь к бекдропу тимлида

export default function EditProfileModalPage() {
  const router = useRouter();

  return (
    <ModalBackdrop isOpen onClose={() => router.back()}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', color: 'black' }}>
        <h2>Тестова модалка редагування профілю</h2>
        <p>Якщо ти це бачиш, роутинг налаштований ідеально!</p>
      </div>
    </ModalBackdrop>
  );
}