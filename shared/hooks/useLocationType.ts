import { getCategoriesTypes } from '@/lib/api/client/categoriesApi';
import { GetCategoriesTypesResponse } from '@/lib/api/types/categoriesTypes';
import { useQuery } from '@tanstack/react-query';

export const useLocationType = () => {
  return useQuery<GetCategoriesTypesResponse>({
    queryKey: ['location-type'],
    queryFn: getCategoriesTypes,
  });
};
