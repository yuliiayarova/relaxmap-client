'use client';
import LocationGallery from '@/components/LocationGallery/LocationGallery';
import LocationInfoBlock from '@/components/LocationInfoBlock/LocationInfoBlock';
import LocationDescription from '@/components/LocationDescription/LocationDescription';
import { useLocation } from '@/shared/hooks/useLocation';
import { useLocationType } from '@/shared/hooks/useLocationType';
import { useRegion } from '@/shared/hooks/useRegion';
import { useGetUser } from '@/shared/hooks/useGetUser';
import { useMemo } from 'react';
import ReviewsSection from '@/components/ReviewsSection/ReviewsSection';
import css from './LocationDetailsPage.module.css';

interface LocationDetailsPageClientProps {
  locationId: string;
}

export default function LocationDetailsPageClient({
  locationId,
}: LocationDetailsPageClientProps) {
  const { data: location, isLoading } = useLocation(locationId);
  const { data: categoriesData } = useLocationType();
  const { data: regionData } = useRegion();
  const { data: user } = useGetUser(location?.ownerId);

  const locationTypeMap = useMemo(() => {
    return (
      categoriesData?.data.reduce<Record<string, string>>(
        (acc, { slug, type }) => ({ ...acc, [slug]: type }),
        {},
      ) ?? {}
    );
  }, [categoriesData]);

  const regionMap = useMemo(() => {
    return (
      regionData?.data.reduce<Record<string, string>>(
        (acc, { slug, region }) => ({ ...acc, [slug]: region }),
        {},
      ) ?? {}
    );
  }, [regionData]);

  if (isLoading || !location || !user) return <div>Loading...</div>;

  const {
    image: pathImage,
    name: locationName,
    locationType,
    region,
    rate,
    description,
    ownerId,
  } = location;

  const ownerName = user.data.name;

  return (
    <main className={css['location-page-main']}>
      <section className={css['location-page-box']}>
        <div className="container">
          <div className={css['location-header-box']}>
            <LocationGallery
              locationName={locationName}
              pathImage={pathImage}
            />
            <LocationInfoBlock
              rate={rate}
              locationName={locationName}
              region={regionMap[region]}
              type={locationTypeMap[locationType]}
              ownerName={ownerName}
              ownerId={ownerId}
            />
          </div>
          <LocationDescription description={description} />
        </div>
      </section>
      <div className={css['location-page-feedbacks']}>
        <ReviewsSection locationId={locationId} />
      </div>
    </main>
  );
}
