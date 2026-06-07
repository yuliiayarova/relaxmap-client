import Button from '@/shared/ui/Button/Button';
import Icon from '@/shared/ui/Icon/Icon';
import clsx from 'clsx';
import css from './Header.module.css';

export default function Header() {
  return (
    <div className={clsx('container', css.header)}>
      <Button href="/auth/register" text="Registration" />
      <Button href="/" text="Back">
        <Icon name="arrow_back" />
      </Button>
    </div>
  );
}
