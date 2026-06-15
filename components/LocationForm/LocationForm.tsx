'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useField,
  type FormikHelpers,
} from 'formik';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import clsx from 'clsx';

import {
  getCategoriesTypes,
  getRegionsCategories,
} from '@/lib/api/client/categoriesApi';
import { createLocation, updateLocation } from '@/lib/api/client/locationsApi';
import Icon from '@/shared/ui/Icon/Icon';
import type { Location } from '@/lib/api/types/locationTypes';
import type { LocationFormProps, LocationFormValues } from './types';
import css from './LocationForm.module.css';

const emptyValues: LocationFormValues = {
  image: '',
  name: '',
  locationType: '',
  region: '',
  description: '',
};

const validationSchema = Yup.object({
  image: Yup.string().required('Додайте фото локації'),
  name: Yup.string()
    .trim()
    .min(3, 'Назва має містити щонайменше 3 символи')
    .max(96, 'Назва має містити не більше 96 символів')
    .required('Введіть назву місця'),
  locationType: Yup.string().required('Оберіть тип місця'),
  region: Yup.string().required('Оберіть регіон'),
  description: Yup.string()
    .trim()
    .min(20, 'Опис має містити щонайменше 20 символів')
    .max(6000, 'Опис має містити не більше 6000 символів')
    .required('Додайте детальний опис'),
});

type ErrorResponse = {
  error?: string;
  message?: string;
  response?: {
    message?: string;
  };
};

type SelectOption = {
  value: string;
  label: string;
};

type LocationResponse = Location | { data: Location };

type LocationSelectProps = {
  id: string;
  name: keyof LocationFormValues;
  placeholder: string;
  options: SelectOption[];
  disabled?: boolean;
  hasError?: boolean;
};

function getErrorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'response' in error) {
    const responseError = error as {
      response?: {
        data?: ErrorResponse;
      };
      message?: string;
    };

    return (
      responseError.response?.data?.response?.message ??
      responseError.response?.data?.message ??
      responseError.response?.data?.error ??
      responseError.message
    );
  }

  return error instanceof Error ? error.message : undefined;
}

function getErrorStatus(error: unknown) {
  if (error && typeof error === 'object' && 'response' in error) {
    const responseError = error as {
      response?: {
        status?: number;
      };
    };

    return responseError.response?.status;
  }

  return undefined;
}

function normalizeLocationResponse(response: LocationResponse): Location {
  if ('data' in response) {
    return response.data;
  }

  return response;
}

function createLocationFormData(
  values: LocationFormValues,
  imageFile: File | null,
) {
  const formData = new FormData();

  formData.append('name', values.name.trim());
  formData.append('locationType', values.locationType);
  formData.append('region', values.region);
  formData.append('description', values.description.trim());
  formData.append('coordinates[lat]', '0');
  formData.append('coordinates[lon]', '0');

  if (imageFile) {
    formData.append('image', imageFile);
  }

  return formData;
}

function LocationSelect({
  id,
  name,
  placeholder,
  options,
  disabled,
  hasError,
}: LocationSelectProps) {
  const [field, , helpers] = useField<string>(name);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === field.value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = async (value: string) => {
    await helpers.setValue(value);
    helpers.setTouched(true);
    setIsOpen(false);
  };

  return (
    <div
      className={clsx(css.selectWrap, isOpen && css.selectWrapOpen)}
      ref={selectRef}
    >
      <button
        id={id}
        type="button"
        className={clsx(
          css.control,
          css.selectButton,
          isOpen && css.selectButtonOpen,
          !selectedOption && css.placeholderText,
          hasError && css.controlError,
          hasError && css.placeholderError,
        )}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onBlur={() => helpers.setTouched(true)}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span className={css.selectValue}>
          {selectedOption?.label ?? placeholder}
        </span>
        <Icon
          name="keyboard_arrow_down"
          className={clsx(
            css.selectIcon,
            isOpen && css.selectIconOpen,
            hasError && css.selectIconError,
          )}
        />
      </button>

      {isOpen && (
        <ul className={css.selectMenu} role="listbox" aria-labelledby={id}>
          {options.map((option) => (
            <li
              key={option.value}
              className={clsx(
                css.selectOption,
                option.value === field.value && css.selectedOption,
              )}
              role="option"
              aria-selected={option.value === field.value}
              onMouseDown={(event) => {
                event.preventDefault();
                handleSelect(option.value);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function LocationForm({
  mode = 'create',
  locationId,
  initialValues,
  onSuccess,
}: LocationFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = useId();
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const isEditMode = mode === 'edit';

  const formInitialValues = useMemo<LocationFormValues>(
    () => ({
      ...emptyValues,
      ...initialValues,
    }),
    [initialValues],
  );
  const preview = selectedPreview ?? formInitialValues.image;

  const { data: regions, isLoading: isRegionsLoading } = useQuery({
    queryKey: ['regions'],
    queryFn: getRegionsCategories,
  });

  const { data: types, isLoading: isTypesLoading } = useQuery({
    queryKey: ['locationTypes'],
    queryFn: getCategoriesTypes,
  });
  const typeOptions = useMemo(
    () =>
      types?.data.map((type) => ({
        value: type.slug,
        label: type.type,
      })) ?? [],
    [types],
  );
  const regionOptions = useMemo(
    () =>
      regions?.data.map((region) => ({
        value: region.slug,
        label: region.region,
      })) ?? [],
    [regions],
  );

  useEffect(() => {
    return () => {
      if (selectedPreview) {
        URL.revokeObjectURL(selectedPreview);
      }
    };
  }, [selectedPreview]);

  const handleSubmit = async (
    values: LocationFormValues,
    { setSubmitting }: FormikHelpers<LocationFormValues>,
  ) => {
    try {
      let locationResponse: LocationResponse;
      if (isEditMode) {
        if (!locationId) {
          throw new Error('Не знайдено id локації для редагування');
        }

        const formData = createLocationFormData(values, selectedFile);

        locationResponse = await updateLocation(locationId, formData);
        toast.success('Зміни збережено');
      } else {
        const formData = createLocationFormData(values, selectedFile);

        locationResponse = await createLocation(formData);
        toast.success('Локацію опубліковано');
      }

      const location = normalizeLocationResponse(locationResponse);
      await queryClient.invalidateQueries({ queryKey: ['locations'] });
      await queryClient.invalidateQueries({ queryKey: ['user-locations'] });
      onSuccess?.(location);
      router.push(`/locations/${location._id}`);
    } catch (error) {
      const errorStatus = getErrorStatus(error);
      let errorMessage =
        getErrorMessage(error) ?? 'Не вдалося зберегти локацію';

      if (isEditMode && errorStatus === 401) {
        errorMessage = 'Увійдіть в акаунт, щоб редагувати локацію';
      }

      if (isEditMode && errorStatus === 404) {
        errorMessage = 'Ви можете редагувати тільки власні локації';
      }

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        values,
        isSubmitting,
        isValid,
        dirty,
        resetForm,
        handleChange,
        setFieldTouched,
        setFieldValue,
      }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <label className={css.label} htmlFor={`${id}-image`}>
              Обкладинка
            </label>

            <div className={css.preview}>
              {preview ? (
                <Image
                  className={css.previewImage}
                  src={preview}
                  alt="Прев'ю обкладинки локації"
                  fill
                  unoptimized
                />
              ) : (
                <Image
                  className={css.placeholderImage}
                  src="/images/location-placeholder.webp"
                  alt=""
                  fill
                  aria-hidden="true"
                />
              )}
            </div>

            <label className={css.uploadButton} htmlFor={`${id}-image`}>
              Завантажити фото
            </label>
            <input
              key={fileInputKey}
              id={`${id}-image`}
              className={css.fileInput}
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];

                if (!file) {
                  return;
                }

                const nextPreview = URL.createObjectURL(file);
                setSelectedFile(file);
                setSelectedPreview((currentPreview) => {
                  if (currentPreview) {
                    URL.revokeObjectURL(currentPreview);
                  }

                  return nextPreview;
                });
                setFieldValue('image', file.name);
                setFieldTouched('image', true, false);
              }}
            />
            <ErrorMessage name="image" component="p" className={css.error} />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor={`${id}-name`}>
              Назва місця
            </label>
            <Field
              id={`${id}-name`}
              name="name"
              type="text"
              placeholder="Введіть назву місця"
              className={clsx(
                css.control,
                errors.name && touched.name && css.controlError,
                errors.name && touched.name && css.placeholderError,
              )}
            />
            <ErrorMessage name="name" component="p" className={css.error} />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor={`${id}-type`}>
              Тип місця
            </label>
            <LocationSelect
              id={`${id}-type`}
              name="locationType"
              placeholder={
                isTypesLoading ? 'Завантаження...' : 'Оберіть тип місця'
              }
              options={typeOptions}
              disabled={isTypesLoading}
              hasError={Boolean(errors.locationType && touched.locationType)}
            />
            <ErrorMessage
              name="locationType"
              component="p"
              className={css.error}
            />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor={`${id}-region`}>
              Регіон
            </label>
            <LocationSelect
              id={`${id}-region`}
              name="region"
              placeholder={
                isRegionsLoading ? 'Завантаження...' : 'Оберіть регіон'
              }
              options={regionOptions}
              disabled={isRegionsLoading}
              hasError={Boolean(errors.region && touched.region)}
            />
            <ErrorMessage name="region" component="p" className={css.error} />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor={`${id}-description`}>
              {isEditMode ? 'Текст історії' : 'Детальний опис'}
            </label>
            <Field
              as="textarea"
              id={`${id}-description`}
              name="description"
              placeholder="Детальний опис локації"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setFieldTouched('description', true, false);
                handleChange(event);
              }}
              className={clsx(
                css.control,
                css.textarea,
                errors.description && touched.description && css.controlError,
                errors.description &&
                  touched.description &&
                  values.description.trim() &&
                  css.controlTextDefault,
                errors.description &&
                  touched.description &&
                  css.placeholderError,
              )}
            />
            <ErrorMessage
              name="description"
              component="p"
              className={css.error}
            />
          </div>

          <div className={css.actions}>
            <button
              className={css.submitButton}
              type="submit"
              disabled={isSubmitting || !dirty || !isValid}
            >
              {isSubmitting
                ? 'Збереження...'
                : isEditMode
                  ? 'Зберегти зміни'
                  : 'Опублікувати'}
            </button>

            <button
              className={css.cancelButton}
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                resetForm();
                setSelectedPreview(null);
                setSelectedFile(null);
                setFileInputKey((currentKey) => currentKey + 1);
              }}
            >
              {isEditMode ? 'Відмінити зміни' : 'Відмінити'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
