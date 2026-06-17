import type { Location } from '@/lib/api/types/locationTypes';
import type { LocationCoordinates } from '@/components/LocationPickerMap/LocationPickerMap';

export type LocationFormMode = 'create' | 'edit';

export interface LocationFormValues {
  image: string;
  name: string;
  locationType: string;
  region: string;
  description: string;
  coordinates: LocationCoordinates | null;
}

export interface LocationFormProps {
  mode?: LocationFormMode;
  locationId?: string;
  initialValues?: Partial<LocationFormValues>;
  onSuccess?: (location: Location) => void;
}
