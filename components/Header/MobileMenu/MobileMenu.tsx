import clsx from 'clsx';
import Button from '@/shared/ui/Button/Button';
import HeaderNav from '../HeaderNav/HeaderNav';
import UserMenu from '../UserMenu/UserMenu';
import css from './MobileMenu.module.css';

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
      <div className={css.content}>
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
                href="/login"
                className={css.loginBtn}
                onClick={onClose}
              >
                Вхід
              </Button>
              <Button
                href="/register"
                className={css.signupBtn}
                onClick={onClose}
              >
                Реєстрація
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
