import type { Location } from '@/lib/api/types/locationTypes';

export type LocationFormMode = 'create' | 'edit';

export interface LocationFormValues {
  image: string;
  name: string;
  locationType: string;
  region: string;
  description: string;
}

export interface LocationFormProps {
  mode?: LocationFormMode;
  locationId?: string;
  initialValues?: Partial<LocationFormValues>;
  onSuccess?: (location: Location) => void;
}
