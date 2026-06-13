import RegisterForm from './RegisterForm';
import css from './RegisterPage.module.css';

export default function RegisterPage() {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Реєстрація</h1>
      <RegisterForm />
    </div>
  );
}
