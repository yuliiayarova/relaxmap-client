'use client';

import Image from 'next/image';
import Button from '@/shared/ui/Button/Button';
import css from './ProfileInfo.module.css';

interface ProfileInfoProps {
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  isOwnProfile: boolean;
  onEditClick?: () => void;
}

export default function ProfileInfo({ name, avatarUrl, articlesAmount, isOwnProfile, onEditClick }: ProfileInfoProps) {
  return (
    <div className={css.profileCard}>
      <div className={css.profileInfo}>
        <div className={css.avatarWrapper}>
        <Image
          src={avatarUrl}
          alt={name}
          width={145}
          height={145}
          className={css.avatar}
          priority
        />
      </div>
      
      <div className={css.infoWrapper}>
        <h1 className={css.name}>{name}</h1>
        <p className={css.countLabel}>
          Статей: <span className={css.countNumber}>{articlesAmount}</span>
        </p>
      </div>
      </div>
      

      {isOwnProfile && (
        <Button
          text="Редагувати профіль"
          onClick={onEditClick}
          className={css.editButton}
        />
      )}
    </div>
  );
}
