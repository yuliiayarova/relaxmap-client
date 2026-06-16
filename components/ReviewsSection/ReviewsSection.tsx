'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/navigation';

import { getFeedbacksByLocationId } from '@/lib/api/client/feedbacksApi';
import css from './ReviewsSection.module.css';
import Icon from '@/shared/ui/Icon/Icon';
import { useAuthStore } from '@/lib/store/authStore';

interface BackendReview {
  _id: string;
  userName: string;
  rate: number;
  description: string;
  createdAt: string;
}

interface ReviewsSectionProps {
  locationId: string;
  // isAuthorized: boolean;
}

export default function ReviewsSection({ locationId }: ReviewsSectionProps) {
  const router = useRouter();

  const isAuthorized = useAuthStore((state) => state.isAuthenticated);
  const {
    data: feedbacksData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['location-feedbacks', locationId],
    queryFn: () =>
      getFeedbacksByLocationId(locationId, { perPage: 10, page: 1 }),
  });

  const reviewsList = (feedbacksData?.data as BackendReview[]) || [];

  const handleLeaveReview = () => {
    if (isAuthorized) {
      router.push(`/locations/${locationId}/review`);
    } else {
      router.push(`/locations/${locationId}/auth-prompt`);
    }
  };

  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i) {
        stars.push(
          <Icon key={i} name="star_filled" className={css.iconStar} />,
        );
      } else if (rate > i - 1 && rate < i) {
        stars.push(<Icon key={i} name="star_half" className={css.iconStar} />);
      } else {
        stars.push(<Icon key={i} name="star_rate" className={css.iconStar} />);
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <section className={css.feedbacks}>
        <div className={css.wrapper}>
          <div className={css.headerBlock}>
            <h2 className={css.sectionTitle}>Відгуки</h2>
            <button
              type="button"
              onClick={handleLeaveReview}
              className={css.btnAction}
            >
              Залишити відгук
            </button>
          </div>
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
        <div className={css.wrapper}>
          <div className={css.headerBlock}>
            <h2 className={css.sectionTitle}>Відгуки</h2>
            <button
              type="button"
              onClick={handleLeaveReview}
              className={css.btnAction}
            >
              Залишити відгук
            </button>
          </div>
          <div style={{ color: 'red' }}>
            Помилка завантаження:{' '}
            {(error as Error)?.message || 'Щось пішло не так'}
          </div>
        </div>
      </section>
    );
  }

  const showNavigation = reviewsList.length > 2;

  return (
    <section className={css.locationFeedbacks}>
      <div className={clsx('container', css.wrapper)}>
        <div className={css.headerBlock}>
          <h2 className={css.sectionTitle}>Відгуки</h2>
          <button
            type="button"
            onClick={handleLeaveReview}
            className={css.btnAction}
          >
            Залишити відгук
          </button>
        </div>

        {reviewsList.length === 0 ? (
          <p className={css.emptyText}>
            Для цього місця ще немає відгуків. Будьте першим, хто поділиться
            враженнями!
          </p>
        ) : (
          <div className={css.sliderContainer}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              navigation={
                showNavigation
                  ? {
                      prevEl: `.${css.btnPrev}`,
                      nextEl: `.${css.btnNext}`,
                    }
                  : false
              }
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

            {showNavigation && (
              <div className={css.navigation}>
                <button
                  type="button"
                  className={css.btnPrev}
                  aria-label="Назад"
                >
                  <Icon name="arrow_back" className={css.iconArrow} />
                </button>
                <button
                  type="button"
                  className={css.btnNext}
                  aria-label="Вперед"
                >
                  <Icon name="arrow_forward" className={css.iconArrow} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
