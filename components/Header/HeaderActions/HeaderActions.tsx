import Button from '@/shared/ui/Button/Button';
import Icon from '@/shared/ui/Icon/Icon';
import UserMenu from '../UserMenu/UserMenu';
import css from './HeaderActions.module.css';

interface HeaderActionsProps {
  isLoggedIn: boolean;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onLogoutClick: () => void;
}

export default function HeaderActions({
  isLoggedIn,
  isMenuOpen,
  onToggleMenu,
  onLogoutClick,
}: HeaderActionsProps) {
  return (
    <>
      <div className={css.desktopActions}>
        {isLoggedIn ? (
          <>
            <Button href="/locations/add" className={css.btnAdd}>
              Поділитись локацією
            </Button>
            <UserMenu onLogoutClick={onLogoutClick} />
          </>
        ) : (
          <>
            <Button href="/login" className={css.loginBtn}>
              Вхід
            </Button>
            <Button href="/register" className={css.signupBtn}>
              Реєстрація
            </Button>
          </>
        )}
      </div>

      <div className={css.mobileActions}>
        {isLoggedIn ? (
          <Button href="/locations/add" className={css.addBtn}>
            Опублікувати статтю
          </Button>
        ) : (
          <>
            <Button href="/login" className={css.loginBtn}>
              Вхід
            </Button>
            <Button href="/register" className={css.signupBtn}>
              Реєстрація
            </Button>
          </>
        )}

        <Button
          type="button"
          className={css.menuBtn}
          onClick={onToggleMenu}
          aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <Icon size={14} name="close" />
          ) : (
            <Icon size={14} name="menu" />
          )}
        </Button>
      </div>
    </>
  );
}
