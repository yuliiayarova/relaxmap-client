import Icon from '@/shared/ui/Icon/Icon';
import css from './UserMenu.module.css';

interface UserMenuProps {
  onLogoutClick: () => void;
}

export default function UserMenu({ onLogoutClick }: UserMenuProps) {
  return (
    <div className={css.userBox}>
      <span className={css.userAvatar} aria-hidden="true">
        І
      </span>
      <span className={css.userName}>Ім&apos;я</span>
      <span className={css.divider}></span>
      <button
        type="button"
        className={css.logBtn}
        onClick={onLogoutClick}
        aria-label="Вийти з акаунта"
      >
        <Icon size={24} name="logout" className={css.logBtnSvg}></Icon>
      </button>
    </div>
  );
}
