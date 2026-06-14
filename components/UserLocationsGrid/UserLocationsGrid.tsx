'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserLocations } from '@/lib/api/client/usersApi';
import { UserLocationsResponse } from '@/lib/api/types/userTypes';
import LocationCard from '../LocationCard/LocationCard';
import Button from '@/shared/ui/Button/Button';
import { useLocationType } from '@/shared/hooks/useLocationType';
import { useMemo } from 'react';
import clsx from 'clsx';
import css from './UserLocationsGrid.module.css';

interface UserLocationsGridProps {
  userId: string;
}

export default function UserLocationsGrid({ userId }: UserLocationsGridProps) {
  const perPage = 6;

  const { data: categoriesData } = useLocationType();

  const locationTypeMap = useMemo(() => {
    return (
      categoriesData?.data.reduce<Record<string, string>>(
        (acc, { slug, type }) => ({ ...acc, [slug]: type }),
        {},
      ) ?? {}
    );
  }, [categoriesData]);

  // Передаємо UserLocationsResponse як дженерик, щоб React Query знав типи сторінок
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<UserLocationsResponse>({
      queryKey: ['user-locations', userId, perPage],
      queryFn: ({ pageParam = 1 }) =>
        getUserLocations(userId, { page: pageParam as number, perPage }),
      initialPageParam: 1,
      enabled: !!userId,
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage;
        return page < totalPages ? page + 1 : undefined;
      },
    });

  if (isLoading) return <div>Завантаження локацій...</div>;

  return (
    <>
      <div className={clsx(css.wrapper, css.container)}>
        {data &&
          data.pages.map((page: UserLocationsResponse) =>
            page.locations.map((location) => (
              <LocationCard
                key={location._id}
                pathPhotoLocatin={location.image}
                nameTypeLocation={locationTypeMap[location.locationType]}
                rate={location.rate}
                nameLocation={location.name}
                locationId={location._id}
                ownerId={location.ownerId}
                userId={userId}
              />
            )),
          )}
      </div>

      {hasNextPage && (
        <Button
          text={isFetchingNextPage ? 'Завантаження' : 'Показати ще'}
          className={css.loadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        />
      )}
    </>
  );
}
