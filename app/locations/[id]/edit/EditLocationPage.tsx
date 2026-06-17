import LocationForm from '@/components/LocationForm/LocationForm';
import type { Location } from '@/lib/api/types/locationTypes';
import css from './EditLocationPage.module.css';

interface EditLocationPageProps {
  location: Location;
}

export default function EditLocationPage({ location }: EditLocationPageProps) {
  const longitude = location.coordinates.lng;
  const coordinates =
    longitude === undefined
      ? undefined
      : {
          lat: location.coordinates.lat,
          lng: longitude,
        };

  return (
    <section className={css.section}>
      <div className="container">
        <h1 className={css.title}>Редагування місця</h1>
        <div className={css.formSlot}>
          <LocationForm
            mode="edit"
            locationId={location._id}
            initialValues={{
              image: location.image,
              name: location.name,
              locationType: location.locationType,
              region: location.region,
              description: location.description,
              coordinates,
            }}
          />
        </div>
      </div>
    </section>
  );
}
