'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ModalBackdrop from '@/components/ModalBackdrop/ModalBackdrop';
import EditProfileForm from '@/components/EditProfileForm/EditProfileForm';
import { getCurrentUser } from '@/lib/api/client/usersApi';

export default function EditProfileModalPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.userId as string;

  const { data: currentUserData, isLoading } = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    retry: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <ModalBackdrop isOpen onClose={handleClose}>
        <div style={{ padding: '20px', color: 'var(--color-coral-darkest)' }}>
          Завантаження даних форми...
        </div>
      </ModalBackdrop>
    );
  }

  const user = currentUserData?.data;

  if (!user) return null;

  return (
    <ModalBackdrop isOpen onClose={handleClose}>
      <div
        style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '16px',
        }}
      >
        <EditProfileForm
          initialName={user.name}
          initialAvatarUrl={user.avatarUrl}
          userId={userId}
          onClose={handleClose}
        />
      </div>
    </ModalBackdrop>
  );
}
