'use client';

import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Rating } from 'react-simple-star-rating';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import type { AddReviewFormProps, AddReviewValues } from './types';
import css from './AddReviewForm.module.css';

const initialValues: AddReviewValues = {
  rating: 0,
  comment: '',
};

const validationSchema = Yup.object({
  rating: Yup.number().min(0.5, 'Оберіть рейтинг').required('Оберіть рейтинг'),
  comment: Yup.string().trim().required('Введіть текст відгуку'),
});

export default function AddReviewForm({ locationId }: AddReviewFormProps) {
  const router = useRouter();

  const handleSubmit = async (
    values: AddReviewValues,
    { setSubmitting }: FormikHelpers<AddReviewValues>,
  ) => {
    try {
      const response = await fetch(`/api/feedbacks/${locationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || 'Не вдалося відправити відгук',
        );
      }

      toast.success('Відгук відправлено на модерацію');
      router.back();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Не вдалося відправити відгук',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={css.form}>
          <h2 className={css.title}>Залишити відгук</h2>
          <div className={css.field}>
            <label htmlFor="comment" className={css.label}>
              Ваш відгук
            </label>

            <Field
              as="textarea"
              id="comment"
              name="comment"
              className={css.textarea}
              placeholder="Напишіть ваш відгук"
            />

            <ErrorMessage name="comment" component="p" className={css.error} />
          </div>
          <div className={css.ratingField}>
            <div className={css.ratingWrap}>
              <Rating
                size={23}
                allowFraction
                initialValue={values.rating}
                SVGstyle={{ display: 'inline-block' }}
                fillColor="var(--color-neutral-darkest)"
                emptyColor="transparent"
                SVGstrokeColor="var(--color-neutral-darkest)"
                SVGstorkeWidth={2}
                className={css.stars}
                onClick={(rate) => setFieldValue('rating', rate)}
              />
            </div>

            <ErrorMessage name="rating" component="p" className={css.error} />
          </div>
          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Відмінити
            </button>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Надсилання...' : 'Надіслати'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
