'use client';

import { getAllLocations } from '@/lib/api/client/locationsApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import LocationCard from '../LocationCard/LocationCard';
import css from './LocationsGrid.module.css';
import Button from '@/shared/ui/Button/Button';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FullPageLoader from '../FullPageLoader/FullPageLoader';

export default function LocationsGrid() {
  const [perPage, setPerPage] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = {
    search: searchParams.get('search') || undefined,
    region: searchParams.get('region') || undefined,
    locationType: searchParams.get('locationType') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
  };

  /* Зміна кількості карток під різні розміри */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      if (window.innerWidth < 1440) {
        setPerPage(6);
      } else {
        setPerPage(9);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Запит через useInfiniteQuery */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [
        'locations',
        perPage,
        filters.search,
        filters.region,
        filters.locationType,
        filters.sortBy,
      ],
      queryFn: ({ pageParam = 1 }) =>
        getAllLocations({ ...filters, page: pageParam, perPage: perPage || 9 }),
      initialPageParam: 1,
      enabled: perPage !== null,
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage;
        return page < totalPages ? page + 1 : undefined;
      },
    });

  /* Скролл */
  useEffect(() => {
    if (!isFetchingNextPage && data && data.pages.length > 1) {
      window.scrollBy({
        top: 500,
        behavior: 'smooth',
      });
    }
  }, [isFetchingNextPage, data?.pages.length, data]);

  if (isLoading) return <FullPageLoader />;

  return (
    <>
      {data?.pages[0]?.locations.length === 0 && (
        <div className={css.emptyMessageDiv}>
          <p> Схоже, тут поки нічого немає. Спробуйте знайти щось інше!</p>
          <Button
            text="Скинути фільтри"
            onClick={() => router.push('/locations')}
            className={css.resetButton}
          />
        </div>
      )}
      <div className={css.grid}>
        {data &&
          data.pages.map((page) =>
            page.locations.map((location) => (
              <LocationCard
                key={location._id}
                pathPhotoLocatin={location.image}
                nameTypeLocation={location.locationType}
                rate={location.rate}
                nameLocation={location.name}
                locationId={location._id}
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
