import type { Metadata } from 'next';
import css from './page.module.css';
import FilterPanel from '@/components/FilterPanel/FilterPanel';
import LocationsGrid from '@/components/LocationsGrid/LocationsGrid';

export const metadata: Metadata = {
  title: 'All Locations | RelaxMap',
  description:
    'Browse recreational locations, discover new places, and find your next destination with RelaxMap.',
  openGraph: {
    title: 'All Locations | RelaxMap',
    description:
      'Browse recreational locations, discover new places, and find your next destination with RelaxMap.',
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/locations`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: 'RelaxMap Locations',
      },
    ],
  },
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
