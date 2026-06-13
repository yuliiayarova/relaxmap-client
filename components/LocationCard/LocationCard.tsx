'use client';
import Button from '@/shared/ui/Button/Button';
import Icon from '@/shared/ui/Icon/Icon';
import clsx from 'clsx';
import css from './LocationCard.module.css';
import Image from 'next/image';
import { AddRate } from '@/shared/ui/AddStarsRate/AddRate';
import { User } from '@/lib/api/types/authTypes';
import { useAuthStore } from '@/lib/store/authStore';
// import { useRouter } from 'next/navigation';

interface LocationCardProps {
  pathPhotoLocatin: string;
  nameTypeLocation: string;
  rate: number;
  nameLocation: string;
  locationId: string;
  ownerId?: string;
  userId?: string;
}

export default function LocationCard({
  pathPhotoLocatin,
  nameTypeLocation,
  rate,
  nameLocation,
  ownerId,
  locationId,
  userId,
}: LocationCardProps) {
  const isAuthorized = useAuthStore((state) => state.isAuthenticated);
  console.log('🚀 ~ LocationCard ~ isAuthorized:', isAuthorized);
  console.log('🚀 ~ LocationCard ~ ownerId:', ownerId);
  console.log('🚀 ~ LocationCard ~ userId:', userId);
  // const router = useRouter();
  /*const handleEditClick = () => {
    router.push(`/locations/${locationId}/edit`);
  };/**/
  /*const handleViewLocationClick = () => {
    router.push(`/locations/${locationId}`);
  }; /**/
  return (
    <div className={clsx(css['location-card'])}>
      <div className={css['article-box-img']}>
        <Image
          src={pathPhotoLocatin}
          alt={`Photo of ${nameLocation}`}
          width={335}
          height={335}
          className={css['article-location-img']}
        />
      </div>
      <div className={css['article-box-info']}>
        <p className={css['name-type-location']}>{nameTypeLocation}</p>
        <div className={css['rate-stars']}>
          <AddRate rate={rate} />
        </div>
        <h3 className={css['name-location']}>{nameLocation}</h3>
        <div className={css['button-box-location']}>
          <Button
            className={css['btn-view-location']}
            text="Переглянути локацію"
            href={`/locations/${locationId}`}
            // onClick={handleViewLocationClick}
          />
          {isAuthorized && userId === ownerId && userId && ownerId && (
            <Button
              className={css['btn-edit-location']}
              // onClick={handleEditClick}
              href={`/locations/${locationId}/edit`}
            >
              <Icon name="edit" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
