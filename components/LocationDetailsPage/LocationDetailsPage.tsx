import clsx from 'clsx';
import Button from '@/shared/ui/Button/Button';
import { AddRate } from '@/shared/ui/AddStarsRate/AddRate';
import css from './LocationDetailsPage.module.css';
import Image from 'next/image';

export default function LocationDetailsPage() {
  return (
    <>
      <Image
        src={'/images/location-sone-beach.jpg'}
        alt={'location symme beach'}
        width={335}
        height={223}
        className={css['location-img']}
      />
      <div className={css['location-rate-box']}>
        <div className={css['location-page-rate-stars']}>
          <AddRate rate={4.5} />
        </div>
        {/* <span className={css['location-split-dot']}>&middot;</span> */}
        <span className={css['dot-separator']}></span>
        <p className={css['location-text-rate']}>{4.5}</p>
      </div>
      <h1 className={css['location-name']}>{'Бакотська затока'}</h1>
      <dl className={css['location-details']}>
        <dt className={css['location-params-key']}>Регіон:</dt>
        <dd className={css['location-params-value']}>{'Хмельниччина'}</dd>
        <dt className={css['location-params-key']}>Тип локації:</dt>
        <dd className={css['location-params-value']}>{'Пляж'}</dd>
        <dt className={css['location-params-key']}>Автор статті:</dt>
        <dd className={css['location-params-value']}>
          <a
            className={css['link-autor-story']}
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Анастасія Олійник'}
          </a>
        </dd>
      </dl>
      <p className={css['location-story']}>
        {
          '"Бакотська затока — це справжня перлина Поділля, яку часто називають "українською Атлантидою". Розташована на річці Дністер, вона вражає своїми масштабами та неймовірними панорамними краєвидами, що відкриваються з високих скелястих берегів. Це місце з унікальною енергетикою, де поєднуються тиша, велич природи та багата історія затопленого села Бакота. Тут можна насолодитися неспішними прогулянками вздовж берега, влаштувати пікнік з видом на затоку або вирушити на водну прогулянку на човні чи каяку. Завдяки унікальному мікроклімату, схожому на ялтинський, це місце ідеально підходить для відпочинку з наметами. Поруч знаходиться скельний монастир, що додає цій локації історичної та духовної цінності. Бакота — це ідеальний вибір для тих, хто шукає спокою, єднання з природою та незабутніх вражень."'
        }
      </p>
      <section className={css['location-page-feedbacks']}>
        <div className={css['location-feedbacks-header']}>
          <h2 className={css['location-namesection-feedbacks']}>Відгуки</h2>
          <Button
            text="Залишити відгук"
            className={css['location-button-addfeedback']}
          />
        </div>
        <div>Swiper</div>
      </section>
    </>
  );
}
