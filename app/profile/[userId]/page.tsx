'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react'; 

import { getUserById, getCurrentUser } from '@/lib/api/client/usersApi';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import ProfilePlaceholder from '@/components/ProfilePlaceholder/ProfilePlaceholder';
import UserLocationsGrid from '@/components/UserLocationsGrid/UserLocationsGrid';
import ModalBackdrop from '@/components/ModalBackdrop/ModalBackdrop';
import EditProfileForm from '@/components/EditProfileForm/EditProfileForm';
import css from './page.module.css'; 
import clsx from 'clsx';

export default function ProfilePage() {
  const params = useParams();
  const userId = params?.userId as string;

  // Локальный стейт для открытия и закрытия модалки
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ['user-profile', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  // 2. Запрос данных текущего залогиненного пользователя
  const { data: currentUserData } = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    retry: false,
  });

  if (isProfileLoading) {
    return (
      <div className={clsx( css.pageWrapper)}>
        <div>
          Завантаження профілю...
        </div>
      </div>
    );
  }

  if (isProfileError || !profileData?.data) {
    return (
      <div className={clsx( css.pageWrapper)}>
        <div >
          Користувача не знайдено або сталася помилка
        </div>
      </div>
    );
  }

  const user = profileData.data;

  // Чистая проверка профиля по ID
  const currentUserId = (currentUserData?.data as { _id?: string })?._id;
  const profileOwnerId = user?._id;
  const isOwnProfile = Boolean(currentUserId && profileOwnerId && currentUserId === profileOwnerId);

  return (
    <main className={clsx('container', css.pageWrapper)}>
      <ProfileInfo
        name={user.name}
        avatarUrl={user.avatarUrl}
        articlesAmount={user.articlesAmount || 0}
        isOwnProfile={isOwnProfile}
        onEditClick={() => setIsEditModalOpen(true)} // По клику просто открываем стейт!
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

      {/* КЛАССИЧЕСКАЯ МОДАЛКА ЧЕРЕЗ СТЕЙТ */}
      {isEditModalOpen && (
        <ModalBackdrop isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <div>
            <EditProfileForm
              initialName={user.name}
              initialAvatarUrl={user.avatarUrl}
              userId={userId}
              onClose={() => setIsEditModalOpen(false)} // Закрываем форму
            />
          </div>
        </ModalBackdrop>
      )}
    </main>
  );
}
