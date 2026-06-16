import Icon from '@/shared/ui/Icon/Icon';
import clsx from 'clsx';
import css from './AdvantagesBlock.module.css';

export default function AdvantagesBlock() {
  return (
    <section className={css['advantages-block']}>
      <div>
        <h2 className={css['advantag-title']}>Ключові переваги</h2>
        <ul className={css['advantag-list']}>
          <li className={css['advantag-item']}>
            <div className={css['advantag-icon-box']}>
              <Icon
                name="select_check_box"
                className={css['advantag-icon-img']}
              />
            </div>
            <h3 className={css['advantag-name']}>Реальні відгуки</h3>
            <p className={css['advantag-description']}>
              Користувачі діляться чесними враженнями, щоб ви робили правильний
              вибір.
            </p>
          </li>
          <li className={css['advantag-item']}>
            <div className={css['advantag-icon-box']}>
              <Icon name="filter_alt" className={css['advantag-icon-img']} />
            </div>
            <h3 className={css['advantag-name']}>Зручні фільтри</h3>
            <p className={css['advantag-description']}>
              Шукайте за типом локації, регіоном, наявністю зручностей та іншими
              критеріями.
            </p>
          </li>
          <li className={clsx(css['advantag-item'], css['last-item'])}>
            <div className={css['advantag-icon-box']}>
              <Icon name="communication" className={css['advantag-icon-img']} />
            </div>
            <h3 className={css['advantag-name']}>Спільнота мандрівників</h3>
            <p className={css['advantag-description']}>
              Додавайте власні улюблені місця та діліться своїми неймовірними
              знахідками.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
