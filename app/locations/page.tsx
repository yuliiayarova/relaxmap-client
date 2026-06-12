import type { Metadata } from 'next';
import css from './page.module.css';
import FilterPanel from '@/components/FilterPanel/FilterPanel';
import LocationsGrid from '@/components/LocationsGrid/LocationsGrid';

export const metadata: Metadata = {
  title: 'Усі місця відпочинку | Relax Map',
  description: 'Каталог місць для відпочинку в Україні.',
};

export default function LocationsPage() {
  return (
    <main className={css.main}>
      <section className={css.section}>
        <div className="container">
          <h1 className={css.title}>Усі місця відпочинку</h1>
          <FilterPanel />
          <LocationsGrid />
        </div>
      </section>
    </main>
  );
}
