import { getLocationById } from '@/lib/api/client/locationsApi';
import { Location } from '@/lib/api/types/locationTypes';
import { useQuery } from '@tanstack/react-query';

export const useLocation = (locationId: string) => {
  return useQuery<Location>({
    queryKey: ['location', locationId],
    queryFn: () => getLocationById(locationId),
    // enabled: !!locationId,
  });
};
