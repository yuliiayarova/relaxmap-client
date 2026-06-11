'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { getUserById, getCurrentUser } from '@/lib/api/client/usersApi';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import ProfilePlaceholder from '@/components/ProfilePlaceholder/ProfilePlaceholder';
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

  const isOwnProfile =
    (currentUserData?.data as { _id?: string })?._id === user._id;

  return (
    <main className={clsx('container', css.pageWrapper)}>
      <ProfileInfo
        name={user.name}
        avatarUrl={user.avatarUrl}
        articlesAmount={user.articlesAmount || 0}
      />

      <div className={css.locationsSection}>
        <h2 className={css.sectionTitle}>Локації</h2>

        {/*  Pендер плейсхолдер порожнього стану */}
        <ProfilePlaceholder isOwnProfile={isOwnProfile} />
      </div>
    </main>
  );
}
