import LocationDetailsPageAll from '@/components/LocationDetailsPageAll/LocationDetailsPageAll';
import css from './page.module.css';

export default function LocationDetailsPage() {
  return (
    <main className={css['location-page-main']}>
      <div className="container">
        <LocationDetailsPageAll />
      </div>
    </main>
  );
}
