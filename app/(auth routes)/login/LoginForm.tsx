'use client';

import { useRouter } from 'next/navigation';
import css from './LoginForm.module.css';
import { useId } from 'react';
import { AxiosError } from 'axios';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useAuthStore } from '@/lib/store/authStoreYulia';
import Button from '@/shared/ui/Button/Button';
import { login } from '@/lib/api/client/authApiClient';

import { LoginData } from '@/lib/api/types/authTypes';
import toast from 'react-hot-toast';

const initialValues: LoginData = {
  email: '',
  password: '',
};

type ErrorResponse = {
  error?: string;
  message?: string;
  response?: {
    message?: string;
  };
};

export const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .lowercase()
    .email('Invalid email format')
    .max(64, 'Email must be at most 64 characters')
    .required('Email is required'),

  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters')
    .required('Password is required'),
});

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const id = useId();

  const handleSubmit = async (
    values: LoginData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const response = await login(values);

      setUser(response.data);

      router.replace('/users/profile');
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      toast.error(
        axiosError.response?.data?.response?.message ??
          axiosError.response?.data?.message ??
          axiosError.response?.data?.error ??
          axiosError.message ??
          'Oops... some error',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.fieldset}>
            <label className={css.visuallyHidden} htmlFor={`${id}-email`}>
              Email
            </label>
            <Field
              id={`${id}-email`}
              type="email"
              name="email"
              placeholder="Email"
              className={`${css.input} ${
                errors.email && touched.email ? css.inputError : ''
              }`}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <Field
            id={`${id}-password`}
            type="password"
            name="password"
            placeholder="Password"
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />

          <div className={css.actions}>
            <div className={css.loadingWrapper}>
              <Button
                className={css.submitButton}
                type="submit"
                text={isSubmitting ? 'Signing In...' : 'Sign In'}
                disabled={isSubmitting}
              />
              {isSubmitting && <p>Loading...</p>}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
