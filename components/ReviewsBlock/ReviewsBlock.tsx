'use client';

import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import css from './ReviewsBlock.module.css';

const mockReviews = [
  {
    id: 1,
    name: 'Олена Коваль',
    location: 'Бакота',
    text: 'Неймовірні краєвиди та спокійна атмосфера — це одне з моїх найулюбленіших місць в Україні.',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Ігор Петров',
    location: 'Карпати',
    text: '“Чудове місце для відпочинку на природі: чисте повітря, мальовничі пагорби та спокійна річка.”',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Ігор Шевченко',
    location: 'Місце',
    text: 'Тут відчуваєш гармонію та справжню силу української природи — варто приїхати хоча б раз у житті.',
    rating: 4.5,
  },
  {
    id: 4,
    name: 'Олена Коваль (Дубль)',
    location: 'Бакота',
    text: 'Неймовірні краєвиди та спокійна атмосфера — це одне з моїх найулюбленіших місць в Україні.',
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Ігор Петров (Дубль)',
    location: 'Карпати',
    text: '“Чудове місце для відпочинку на природі: чисте повітря, мальовничі пагорби та спокійна річка.”',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Ігор Шевченко (Дубль)',
    location: 'Місце',
    text: 'Тут відчуваєш гармонію та справжню силу української природи — варто приїхати хоча б раз у житті.',
    rating: 4.5,
  },
];

export default function Feedbacks() {
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
            {mockReviews.map((review) => (
              <SwiperSlide key={review.id} className={css.slide}>
                <div className={css.card}>
                  <div className={css.rating}>
                    <svg className={css.iconStar}>
                      <use href="/icons/sprite.svg#icon-star_filled" />
                    </svg>
                    <svg className={css.iconStar}>
                      <use href="/icons/sprite.svg#icon-star_filled" />
                    </svg>
                    <svg className={css.iconStar}>
                      <use href="/icons/sprite.svg#icon-star_filled" />
                    </svg>
                    <svg className={css.iconStar}>
                      <use href="/icons/sprite.svg#icon-star_filled" />
                    </svg>
                    <svg className={css.iconStar}>
                      <use href="/icons/sprite.svg#icon-star_half" />
                    </svg>
                  </div>

                  <p className={css.text}>{review.text}</p>

                  <div className={css.authorBlock}>
                    <h3 className={css.name}>{review.name}</h3>
                    <span className={css.location}>{review.location}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={css.navigation}>
            <button type="button" className={css.btnPrev} aria-label="Назад">
              <svg className={css.iconArrow}>
                <use href="/icons/sprite.svg#icon-arrow_back" />
              </svg>
            </button>
            <button type="button" className={css.btnNext} aria-label="Вперед">
              <svg className={css.iconArrow}>
                <use href="/icons/sprite.svg#icon-arrow_forward" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
