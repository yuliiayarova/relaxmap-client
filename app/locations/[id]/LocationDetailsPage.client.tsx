'use client';
import LocationGallery from '@/components/LocationGallery/LocationGallery';
import LocationInfoBlock from '@/components/LocationInfoBlock/LocationInfoBlock';
import LocationDescription from '@/components/LocationDescription/LocationDescription';
import css from './LocationDetailsPage.module.css';

interface LocationDetailsPageClientProps {
  locationId: string;
}

export default function LocationDetailsPageClient({
  locationId,
}: LocationDetailsPageClientProps) {
  const pathImage = '/images/location-sone-beach.jpg';
  const rate = 3.8;
  const locationName = 'Бакотська затока';
  const region = 'Хмельниччина';
  const type = 'Пляж';
  const ownerId = '0123456456';
  const description =
    '"Бакотська затока — це справжня перлина Поділля, яку часто називають "українською Атлантидою"';

  return (
    <main className={css['location-page-main']}>
      <div className="container">
        <section className={css['location-page-box']}>
          <div className={css['location-header-box']}>
            <LocationGallery
              locationName={locationName}
              pathImage={pathImage}
            />
            <LocationInfoBlock
              rate={rate}
              locationName={locationName}
              region={region}
              type={type}
              ownerName={ownerId}
              ownerId={ownerId}
            />
          </div>
          <LocationDescription description={description} />
        </section>
        <section className={css['location-page-feedbacks']}>
          <div className="container">
            <p>Place for feadbacks</p>
          </div>
        </section>
      </div>
    </main>
  );
}
