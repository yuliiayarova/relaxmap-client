import { getRegionsCategories } from '@/lib/api/client/categoriesApi';
import { GetRegionsResponse } from '@/lib/api/types/categoriesTypes';
import { useQuery } from '@tanstack/react-query';

export const useRegion = () => {
  return useQuery<GetRegionsResponse>({
    queryKey: ['region'],
    queryFn: getRegionsCategories,
  });
};
