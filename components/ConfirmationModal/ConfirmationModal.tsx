'use client';

import { useState } from 'react';
import ModalBackdrop from '@/components/ModalBackdrop/ModalBackdrop';
import Button from '@/shared/ui/Button/Button';
import type { ConfirmationModalProps } from './types';
import css from './ConfirmationModal.module.css';

export default function ConfirmationModal({
  isOpen,
  title,
  description,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalBackdrop isOpen={isOpen} onClose={onCancel} modalClassName={css.modal}>
      <div className={css.content}>
        <h2 className={css.title}>{title}</h2>
        {description && <p className={css.description}>{description}</p>}
        <div className={css.actions}>
          <Button
            type="button"
            text={cancelButtonText}
            className={css.cancelBtn}
            onClick={onCancel}
            disabled={isLoading}
          />
          <Button
            type="button"
            text={isLoading ? 'Завантаження...' : confirmButtonText}
            className={css.confirmBtn}
            onClick={handleConfirm}
            disabled={isLoading}
          />
        </div>
      </div>
    </ModalBackdrop>
  );
}
