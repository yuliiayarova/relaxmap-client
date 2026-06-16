import { Metadata } from 'next';
import LoginForm from './LoginForm';
import css from './LoginPage.module.css';

export const metadata: Metadata = {
  title: 'Login | RelaxMap',
  description:
    'Sign in to your RelaxMap account to save favorite places, manage your profile, and share reviews.',
};

export default function LoginPage() {
  return (
    <div>
      <h1 className={css.title}>Вхід</h1>
      <LoginForm />
    </div>
  );
}
