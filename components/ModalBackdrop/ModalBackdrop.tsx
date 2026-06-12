'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/shared/ui/Icon/Icon';
import type { ModalBackdropProps } from './types';
import css from './ModalBackdrop.module.css';

export default function ModalBackdrop({ isOpen, onClose, children }: ModalBackdropProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div className={css.backdrop} onClick={onClose} role="presentation">
      <div
        className={css.modal}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Закрити"
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
