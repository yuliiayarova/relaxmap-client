'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { getUserById, getCurrentUser } from '@/lib/api/client/usersApi';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import ProfilePlaceholder from '@/components/ProfilePlaceholder/ProfilePlaceholder';
import UserLocationsGrid from '@/components/UserLocationsGrid/UserLocationsGrid';
import css from './page.module.css';

export default function ProfilePage() {
  const params = useParams();
  const userId = params?.userId as string;

  // 1. Запит даних публічного профілю користувача
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ['user-profile', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  // 2. Запит даних поточного залогіненого користувача (для перевірки прав)
  const { data: currentUserData } = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    retry: false,
  });

  if (isProfileLoading) {
    return (
      <div className={clsx('container', css.pageWrapper)}>
        <div style={{ color: 'var(--color-coral-darkest)' }}>
          Завантаження профілю...
        </div>
      </div>
    );
  }

  if (isProfileError || !profileData?.data) {
    return (
      <div className={clsx('container', css.pageWrapper)}>
        <div style={{ color: 'red' }}>
          Користувача не знайдено або сталася помилка
        </div>
      </div>
    );
  }

  const user = profileData.data;

  // Безопасная проверка: мой ли это профиль
  const isAuthenticated = Boolean(currentUserData?.data);
  const currentAvatar = currentUserData?.data?.avatarUrl;
  const profileAvatar = user?.avatarUrl;
  const currentName = currentUserData?.data?.name;
  const profileName = user?.name;

  // Ссылки на дефолтные аватарки, чтобы защитить пользователей от случайной подмены прав
  const defaultAvatar1 = 'https://goit.global';
  const defaultAvatar2 = 'https://goit.study';

  const isDefaultAvatar = currentAvatar === defaultAvatar1 || currentAvatar === defaultAvatar2;

  const isOwnProfile = Boolean(
    isAuthenticated &&
    currentAvatar === profileAvatar &&
    // Если аватарка дефолтная — строго проверяем совпадение имени, иначе верим ссылке
    (isDefaultAvatar ? currentName === profileName : true)
  );

  return (
    <main className={clsx('container', css.pageWrapper)}>
      <ProfileInfo
        name={user.name}
        avatarUrl={user.avatarUrl}
        articlesAmount={user.articlesAmount || 0}
      />

     <div className={css.locationsSection}>
        <h2 className={css.sectionTitle}>Локації</h2>

        {/* Если локаций больше 0 — рендерим сетку, если 0 — плейсхолдер */}
        {user.articlesAmount > 0 ? (
          <UserLocationsGrid userId={userId} />
        ) : (
          <ProfilePlaceholder isOwnProfile={isOwnProfile} />
        )}
      </div>
    </main>
  );
}
