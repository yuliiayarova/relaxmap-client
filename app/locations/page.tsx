import type { Metadata } from 'next';
import css from './page.module.css';
import FilterPanel from '@/components/FilterPanel/FilterPanel';
import LocationsGrid from '@/components/LocationsGrid/LocationsGrid';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
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
          url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/hero-desktop.png`,
          width: 1200,
          height: 630,
          alt: 'RelaxMap Locations',
        },
      ],
    },
  };
}

export default function LocationsPage() {
  return (
    <main className={css.main}>
      <section className={css.section}>
        <div className="container">
          <h1 className={css.title}>Усі місця відпочинку</h1>
          <Suspense fallback={null}>
            <FilterPanel />
          </Suspense>
          <Suspense fallback={null}>
            <LocationsGrid />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
