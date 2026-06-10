import LoginForm from './LoginForm';
import css from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div>
      <h1 className={css.title}>Вхід</h1>
      <LoginForm />
    </div>
  );
}
