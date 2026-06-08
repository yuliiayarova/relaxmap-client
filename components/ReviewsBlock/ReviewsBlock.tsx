'use client';

import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/navigation';

import { getFeedbacks } from '@/lib/api/client/feedbacksApi';
import css from './ReviewsBlock.module.css';
import Icon from '@/shared/ui/Icon/Icon';

interface BackendReview {
  _id: string;
  userName: string;
  rate: number;
  description: string;
  createdAt: string;
}

export default function Feedbacks() {
  const {
    data: reviewsList = [],
    isLoading,
    isError,
    error,
  } = useQuery<BackendReview[]>({
    queryKey: ['feedbacks', { perPage: 6, combined: true }],
    queryFn: async () => {
      const [page1, page2] = await Promise.all([
        getFeedbacks({ perPage: 6, page: 1 }),
        getFeedbacks({ perPage: 6, page: 2 }),
      ]);

      const list1 = (page1?.data as BackendReview[]) || [];
      const list2 = (page2?.data as BackendReview[]) || [];

      return [...list1, ...list2];
    },
  });

  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i) {
        stars.push(
          <svg key={i} className={css.iconStar}>
            <use href="/icons/sprite.svg#icon-star_filled" />
          </svg>,
        );
      } else if (rate > i - 1 && rate < i) {
        stars.push(
          <svg key={i} className={css.iconStar}>
            <use href="/icons/sprite.svg#icon-star_half" />
          </svg>,
        );
      } else {
        stars.push(
          <svg key={i} className={css.iconStar}>
            <use href="/icons/sprite.svg#icon-star_rate" />
          </svg>,
        );
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <section className={css.feedbacks}>
        <div className={clsx('container', css.wrapper)}>
          <h2 className={css.sectionTitle}>Останні відгуки</h2>
          <div style={{ color: 'var(--color-coral-darkest)' }}>
            Завантаження відгуків...
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={css.feedbacks}>
        <div className={clsx('container', css.wrapper)}>
          <h2 className={css.sectionTitle}>Останні відгуки</h2>
          <div style={{ color: 'red' }}>
            Помилка завантаження:{' '}
            {(error as Error)?.message || 'Щось пішло не так'}
          </div>
        </div>
      </section>
    );
  }

  if (reviewsList.length === 0) {
    return null;
  }

  return (
    <section className={css.feedbacks}>
      <div className={clsx('container', css.wrapper)}>
        <h2 className={css.sectionTitle}>Останні відгуки</h2>

        <div className={css.sliderContainer}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            navigation={{
              prevEl: `.${css.btnPrev}`,
              nextEl: `.${css.btnNext}`,
            }}
            observer={true}
            observeParents={true}
            breakpoints={{
              320: {
                spaceBetween: 24,
                slidesPerView: 1,
              },
              768: {
                spaceBetween: 24,
                slidesPerView: 2,
              },
              1440: {
                spaceBetween: 48,
                slidesPerView: 3,
              },
            }}
            className={css.swiper}
          >
            {reviewsList.map((review) => (
              <SwiperSlide key={review._id} className={css.slide}>
                <div className={css.card}>
                  <div className={css.rating}>{renderStars(review.rate)}</div>

                  <p className={css.text}>{review.description}</p>

                  <div className={css.authorBlock}>
                    <h3 className={css.name}>{review.userName}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={css.navigation}>
            <button type="button" className={css.btnPrev} aria-label="Назад">
              <Icon name="arrow_back" className={css.iconArrow} />
            </button>
            <button type="button" className={css.btnNext} aria-label="Вперед">
              <Icon name="arrow_forward" className={css.iconArrow} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
