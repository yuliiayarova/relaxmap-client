import HeroSearchForm from './HeroSearchForm';
import css from './HeroBlock.module.css';

export default function HeroBlock() {
  return (
    <section className={css.hero}>
      <div className={css.content}>
        <h1 className={css.title}>
          Відкрий для себе Україну. Знайди ідеальне місце для відпочинку
        </h1>
        <p className={css.text}>
          Тисячі перевірених локацій з реальними фото та відгуками від
          мандрівників.
        </p>
        <HeroSearchForm />
      </div>
    </section>
  );
}
