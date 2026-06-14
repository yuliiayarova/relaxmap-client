'use client';

import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/Button/Button';
import ModalBackdrop from '@/components/ModalBackdrop/ModalBackdrop';
import css from './AuthPromptModal.module.css';

interface AuthPromptModalProps {
  onClose: () => void;
}

export default function AuthPromptModal({ onClose }: AuthPromptModalProps) {
  const router = useRouter();

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <ModalBackdrop isOpen onClose={onClose} modalClassName={css.authModal}>
      <div className={css.content}>
        <h2 className={css.title}>Помилка під час додавання відгуку</h2>

        <p className={css.description}>
          Щоб залишити відгук вам треба увійти, якщо ще немає облікового запису
          зареєструйтесь.
        </p>

        <div className={css.actions}>
          <Button
            type="button"
            text="Увійти"
            className={css.loginBtn}
            onClick={() => handleNavigate('/login')}
          />
          <Button
            type="button"
            text="Зареєструватися"
            className={css.registerBtn}
            onClick={() => handleNavigate('/register')}
          />
        </div>
      </div>
    </ModalBackdrop>
  );
}
