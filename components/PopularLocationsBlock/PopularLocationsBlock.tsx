'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import clsx from 'clsx';
import 'swiper/css';
import LocationCard from '@/components/LocationCard/LocationCard';
import Button from '@/shared/ui/Button/Button';
import Icon from '@/shared/ui/Icon/Icon';
import { getAllLocations } from '@/lib/api/client/locationsApi';
import { getCategoriesTypes } from '@/lib/api/client/categoriesApi';
import css from './PopularLocationsBlock.module.css';

export default function PopularLocationsBlock() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['popular-locations'],
    queryFn: () =>
      getAllLocations({ sortBy: 'rate', sortOrder: 'desc', perPage: 6 }),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['location-types'],
    queryFn: getCategoriesTypes,
  });

  const locationTypeMap: Record<string, string> =
    categoriesData?.data.reduce(
      (acc, { slug, type }) => ({ ...acc, [slug]: type }),
      {},
    ) ?? {};

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.header}>
          <h2 className={css.title}>Популярні локації</h2>
          <Button href="/locations" text="Всі локації" className={css.allLocationsBtn} />
        </div>

        {isLoading && <p className={css.statusText}>Завантаження...</p>}
        {isError && (
          <p className={css.statusText}>Не вдалося завантажити локації.</p>
        )}

        {data && (
          <>
            <Swiper
              slidesPerView={1}
              spaceBetween={16}
              onSwiper={(s) => {
                setSwiper(s);
                setIsBeginning(s.isBeginning);
                setIsEnd(s.isEnd);
              }}
              onSlideChange={(s) => {
                setIsBeginning(s.isBeginning);
                setIsEnd(s.isEnd);
              }}
              onBreakpoint={(s) => {
                setIsBeginning(s.isBeginning);
                setIsEnd(s.isEnd);
              }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 24 },
                1440: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className={css.slider}
            >
              {data.locations.map((location) => (
                <SwiperSlide key={location._id}>
                  <LocationCard
                    pathPhotoLocatin={location.image}
                    nameTypeLocation={
                      locationTypeMap[location.locationType] ??
                      location.locationType
                    }
                    rate={location.rate}
                    nameLocation={location.name}
                    locationId={location._id}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={css.navigation}>
              <button
                className={clsx(css.btnPrev, {
                  'swiper-button-disabled': isBeginning,
                })}
                onClick={() => swiper?.slidePrev()}
                aria-label="Попередній слайд"
              >
                <Icon name="arrow_back" />
              </button>
              <button
                className={clsx(css.btnNext, {
                  'swiper-button-disabled': isEnd,
                })}
                onClick={() => swiper?.slideNext()}
                aria-label="Наступний слайд"
              >
                <Icon name="arrow_forward" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
