'use client';

import Button from '@/shared/ui/Button/Button';
import ModalBackdrop from '@/components/ModalBackdrop/ModalBackdrop';
import css from './AuthPromptModal.module.css';

interface AuthPromptModalProps {
  onClose: () => void;
}

export default function AuthPromptModal({ onClose }: AuthPromptModalProps) {
  return (
    <ModalBackdrop isOpen onClose={onClose}>
      <div className={css.content}>
        <h2 className={css.title}>Помилка під час додавання відгуку</h2>

        <p className={css.description}>
          Щоб залишити відгук вам треба увійти, якщо ще немає облікового запису зареєструйтесь
        </p>

        <div className={css.actions}>
          <Button
            href="/login"
            text="Увійти"
            className={css.loginBtn}
            onClick={onClose}
          />
          <Button
            href="/register"
            text="Зареєструватися"
            className={css.registerBtn}
            onClick={onClose}
          />
        </div>
      </div>
    </ModalBackdrop>
  );
}
