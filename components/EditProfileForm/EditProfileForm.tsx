'use client';

import { useState, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Image from 'next/image';

import Button from '@/shared/ui/Button/Button';
import {
  updateUserProfile,
  deleteUserAvatar,
} from '../../lib/api/client/usersApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from './EditProfileForm.module.css';

interface EditProfileFormProps {
  initialName: string;
  initialAvatarUrl: string;
  userId: string;
  onClose: () => void;
}

export default function EditProfileForm({
  initialName,
  initialAvatarUrl,
  userId,
  onClose,
}: EditProfileFormProps) {
  const queryClient = useQueryClient();

  const setUser = useAuthStore((state) => state.setUser);
  const [name, setName] = useState(initialName);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(initialAvatarUrl);

  const updateProfileMutation = useMutation({
    mutationFn: (formData: FormData) => updateUserProfile(formData),
    onSuccess: (responseData:any) => {
      toast.success('Профіль успішно оновлено!');
      if (responseData?.data) {
        setUser(responseData.data);
      }
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      queryClient.invalidateQueries({ queryKey: ['user-profile', userId] });
      onClose();
    },
    onError: () => {
      toast.error('Помилка при оновленні профілю.');
    },
  });

  const deleteAvatarMutation = useMutation({
    mutationFn: () => deleteUserAvatar(),
    onSuccess: (responseData) => {
      toast.success('Аватар скинуто до дефолтного!');

      const defaultUrl =
        responseData?.data?.avatarUrl ||
        'https://ac.goit.global/fullstack/react/default-avatar.jpg';
      setAvatarPreview(defaultUrl);
      setAvatarFile(null);

      if (responseData?.data) {
        setUser(responseData.data);
      }

      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      queryClient.invalidateQueries({ queryKey: ['user-profile', userId] });
    },
    onError: () => {
      toast.error('Помилка при видаленні аватара.');
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Файл занадто великий! Максимальний розмір — 5 МБ.');
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Ім'я не може бути порожнім");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    updateProfileMutation.mutate(formData);
  };

  const isDefaultAvatar =
    avatarPreview.includes('default-avatar.jpg') ||
    avatarPreview.includes('6881563901add19ee16fcffa.webp');

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h2 className={css.title}>Редагувати профіль</h2>

      {/* Блок Аватара */}
      <label className={css.label}>Аватар</label>
      <div className={css.avatarSection}>
        <div className={css.divAvatarRow}>
          <div className={css.avatarWrapper}>
            <Image
              src={avatarPreview}
              alt={name}
              width={117}
              height={117}
              className={css.avatar}
            />
          </div>
        </div>

        {/* Кнопка завантаження винесена окремо */}
        <label className={css.uploadLabel}>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className={css.fileInput}
          />
          <span>Завантажити фото</span>
        </label>

        {/* Кнопка видалення винесена окремо та прихована за ТЗ */}
        {!isDefaultAvatar && (
          <Button
            type="button"
            onClick={() => deleteAvatarMutation.mutate()}
            className={`${(css.deleteAvatarBtn, css.visuallyHidden)}`}
            disabled={deleteAvatarMutation.isPending}
          >
            Видалити фото
          </Button>
        )}
      </div>

      {/* Блок імені */}
      <div className={css.inputGroup}>
        <label htmlFor="profileName" className={css.label}>
          Ім&apos;я
        </label>
        <input
          id="profileName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={css.input}
          maxLength={32}
          placeholder="Введіть нове ім'я"
        />
      </div>

      <div className={css.actions}>
        <Button
          type="button"
          text="Відмінити"
          onClick={onClose}
          className={css.cancelBtn}
        />
        <Button
          type="submit"
          text={updateProfileMutation.isPending ? 'Збереження...' : 'Зберегти'}
          disabled={updateProfileMutation.isPending}
          className={css.submitBtn}
        />
      </div>
    </form>
  );
}
