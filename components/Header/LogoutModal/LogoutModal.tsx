import css from './LogoutModal.module.css';

interface LogoutModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ onCancel, onConfirm }: LogoutModalProps) {
  return (
    <div className={css.backdrop} role="presentation" onClick={onCancel}>
      <div
        className={css.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="logout-title" className={css.title}>
          Вийти з акаунта?
        </h2>
        <p className={css.text}>Підтвердіть вихід із системи.</p>
        <div className={css.actions}>
          <button type="button" className={css.cancelBtn} onClick={onCancel}>
            Скасувати
          </button>
          <button type="button" className={css.confirmBtn} onClick={onConfirm}>
            Вийти
          </button>
        </div>
      </div>
    </div>
  );
}
