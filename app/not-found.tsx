import Button from '@/shared/ui/Button/Button';
import clsx from 'clsx';
import css from './page.module.css';

export default function NotFound() {
  return (
    <main>
      <div className={clsx('container', css.notFound)}>
        <h1>404 - Page not found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Button href="/" text="Back Home" />
      </div>
    </main>
  );
}
