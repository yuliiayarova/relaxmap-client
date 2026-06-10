'use client';

import Button from '@/shared/ui/Button/Button'; 
import css from './ProfilePlaceholder.module.css';

interface ProfilePlaceholderProps {
  isOwnProfile: boolean;
}

export default function ProfilePlaceholder({ isOwnProfile }: ProfilePlaceholderProps) {
  return (
    <div className={css.placeholderCard}>
      <p className={css.text}>
        {isOwnProfile
          ? 'Ви ще нічого не публікували, поділіться своєю першою локацією!'
          : 'Цей користувач ще не ділився локаціями'}
      </p>

      {isOwnProfile ? (
        <Button 
          href="/locations/add" 
          text="Поділитись локацією" 
          className={css.btnLocation} 
        />
      ) : (
        <Button 
          href="/" 
          text="Назад до локацій" 
          className={css.btnLocation} 
        />
      )}
    </div>
  );
}
