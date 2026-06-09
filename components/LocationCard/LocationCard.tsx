// 'use client';
import Button from '@/shared/ui/Button/Button';
import Icon from '@/shared/ui/Icon/Icon';
import clsx from 'clsx';
import css from './LocationCard.module.css';
import Image from 'next/image';
import { AddRate } from '@/shared/ui/AddStarsRate/AddRate';
import { User } from '@/lib/api/types/authTypes';
// import { useRouter } from 'next/navigation';

interface LocationCardProps {
  pathPhotoLocatin: string;
  nameTypeLocation: string;
  rate: number;
  nameLocation: string;
  locationId: string;
  user?: User;
}

export default function LocationCard({
  pathPhotoLocatin = '/images/location-sone-beach.jpg',
  nameTypeLocation = 'Море',
  rate = 3.5,
  nameLocation = "Сонячна Рів'єра",
  locationId = '0123',
  user,
}: LocationCardProps) {
  /*const router = useRouter();
  const handleEditClick = () => {
    router.push(`/locations/${locationId}/edit`);
  };/**/
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
          />
          {user && (
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
