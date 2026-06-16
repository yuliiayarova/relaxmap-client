import css from './CreateLocationPage.module.css';
import LocationForm from '@/components/LocationForm/LocationForm';

export default function CreateLocationPage() {
  return (
    <section className={css.section}>
      <div className="container">
        <h1 className={css.title}>Додавання нового місця</h1>
        <div className={css.formSlot}>
          <LocationForm />
        </div>
      </div>
    </section>
  );
}
