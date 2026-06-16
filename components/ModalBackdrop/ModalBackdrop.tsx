'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/shared/ui/Icon/Icon';
import type { ModalBackdropProps } from './types';
import css from './ModalBackdrop.module.css';
import clsx from 'clsx';

export default function ModalBackdrop({ isOpen, onClose, children,modalClassName, }: ModalBackdropProps) {
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
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
        className={clsx(css.modal, modalClassName)}
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
