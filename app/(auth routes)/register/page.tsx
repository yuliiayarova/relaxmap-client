import RegisterForm from './RegisterForm';
import css from './RegisterPage.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | RelaxMap',
  description:
    'Create your RelaxMap account to discover recreational locations, save your favorite places, and share reviews with the community.',
};

export default function RegisterPage() {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Реєстрація</h1>
      <RegisterForm />
    </div>
  );
}
