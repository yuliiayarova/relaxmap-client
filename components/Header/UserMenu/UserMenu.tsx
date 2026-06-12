import Icon from '@/shared/ui/Icon/Icon';
import css from './UserMenu.module.css';
import Image from 'next/image';
import { AuthUser } from '@/lib/api/types/userTypes';

interface UserMenuProps {
  user?: AuthUser | null;
  onLogoutClick: () => void;
}

export default function UserMenu({ user, onLogoutClick }: UserMenuProps) {
  return (
    <div className={css.userBox}>
      <span className={css.userAvatar}>
        {user?.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt={user.name || 'User avatar'}
            width={32}
            height={32}
            className={css.avatarImg}
          />
        ) : (
          user?.name?.[0] || 'U'
        )}
      </span>
      <span className={css.userName}>{user?.name}</span>
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
