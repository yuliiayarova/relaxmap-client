'use client';

import { useParams, useRouter } from 'next/navigation';
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
  const router = useRouter();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ['user-profile', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

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

  const currentUserId = currentUserData?.data?._id;
  const profileOwnerId = user?._id;

  const isOwnProfile = Boolean(
    currentUserId && profileOwnerId && currentUserId === profileOwnerId,
  );

  return (
    <main className={clsx('container', css.pageWrapper)}>
      <ProfileInfo
        name={user.name}
        avatarUrl={user.avatarUrl}
        articlesAmount={user.articlesAmount || 0}
        isOwnProfile={isOwnProfile}
        onEditClick={() => router.push(`/profile/${userId}/edit`)}
      />

      <div className={css.locationsSection}>
        <h2 className={css.sectionTitle}>Локації</h2>

        {user.articlesAmount > 0 ? (
          <UserLocationsGrid userId={userId} />
        ) : (
          <ProfilePlaceholder isOwnProfile={isOwnProfile} />
        )}
      </div>
    </main>
  );
}
