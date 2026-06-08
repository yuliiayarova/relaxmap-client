import clsx from 'clsx';
import HeaderNav from '../HeaderNav/HeaderNav';
import UserMenu from '../UserMenu/UserMenu';
import css from './MobileMenu.module.css';
import Button from '@/shared/ui/Button/Button';

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
  onLogoutClick: () => void;
}

export default function MobileMenu({
  isOpen,
  isLoggedIn,
  onClose,
  onLogoutClick,
}: MobileMenuProps) {
  return (
    <div className={clsx(css.menu, isOpen && css.isOpen)} aria-hidden={!isOpen}>
      <HeaderNav
        isLoggedIn={isLoggedIn}
        className={css.nav}
        onNavigate={onClose}
      />

      <div className={css.bottom}>
        {isLoggedIn ? (
          <>
            <Button
              href="/locations/add"
              className={css.addBtn}
              onClick={onClose}
            >
              Опублікувати статтю
            </Button>
            <UserMenu onLogoutClick={onLogoutClick} />
          </>
        ) : (
          <div className={css.authActions}>
            <Button
              href="/auth/login"
              className={css.loginBtn}
              onClick={onClose}
            >
              Вхід
            </Button>
            <Button
              href="/auth/register"
              className={css.signupBtn}
              onClick={onClose}
            >
              Реєстрація
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
