'use client';

import { useRouter } from 'next/navigation';
import css from './RegisterForm.module.css';
import { useId } from 'react';
import { AxiosError } from 'axios';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useAuthStore } from '@/lib/store/authStore';
import Button from '@/shared/ui/Button/Button';
import { register } from '@/lib/api/client/authApiClient';
import { RegisterData } from '@/lib/api/types/authTypes';
import toast from 'react-hot-toast';

const initialValues: RegisterData = {
  name: '',
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

export const registerSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(32, "Ім'я не може містити більше ніж 32 символи")
    .required("Ім'я є обов'язковим"),

  email: Yup.string()
    .trim()
    .lowercase()
    .email('Некоректний формат електронної пошти')
    .max(64, 'Електронна пошта не може містити більше ніж 64 символи')
    .required('Електронна пошта є обовʼязковою'),

  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .max(128, 'Пароль не може містити більше ніж 128 символів')
    .required('Пароль є обов’язковим')
    .matches(/^[^\s]+$/, 'Пароль не повинен містити пробілів'),
});

export default function RegisterForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const id = useId();

  const handleSubmit = async (values: RegisterData) => {
    try {
      const response = await register(values);

      setUser(response.data);

      router.replace(`/profile/${response.data._id}`);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      toast.error(
        axiosError.response?.data?.response?.message ??
          axiosError.response?.data?.message ??
          axiosError.response?.data?.error ??
          axiosError.message ??
          'Упс... щось пішло не так',
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.fieldset}>
            <label className={css.label} htmlFor={`${id}-name`}>
              Імʼя*
            </label>
            <Field
              id={`${id}-name`}
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Ваше імʼя"
              className={`${css.input} ${
                errors.name && touched.name ? css.inputError : ''
              }`}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>

          <div className={css.fieldset}>
            <label className={css.label} htmlFor={`${id}-email`}>
              Пошта*
            </label>
            <Field
              id={`${id}-email`}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="hello@relaxmap.ua"
              className={`${css.input} ${
                errors.email && touched.email ? css.inputError : ''
              }`}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <div className={css.fieldset}>
            <label className={css.label} htmlFor={`${id}-password`}>
              Пароль*
            </label>
            <Field
              id={`${id}-password`}
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="********"
              className={`${css.input} ${
                errors.password && touched.password ? css.inputError : ''
              }`}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </div>

          <Button
            className={css.submitButton}
            type="submit"
            text={isSubmitting ? 'Реєстрація..' : 'Зареєструватись'}
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}
