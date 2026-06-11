import css from './CreateLocationPage.module.css';

export default function CreateLocationPage() {
  return (
    <section className={css.section}>
      <div className="container">
        <h1 className={css.title}>Додавання нового місця</h1>
        <div className={css.formSlot} />
      </div>
    </section>
  );
}
