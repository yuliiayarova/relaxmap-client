import type { Metadata } from 'next';
import Footer from '@/components/Footer/Footer';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Усі місця відпочинку | Relax Map',
  description: 'Каталог місць для відпочинку в Україні.',
};

export default function LocationsPage() {
  return (
    <>
      <main className={css.main}>
        <section className={css.section}>
          <div className="container">
            <h1 className={css.title}>Усі місця відпочинку</h1>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
