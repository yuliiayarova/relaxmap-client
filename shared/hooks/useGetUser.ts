import { getUserById } from '@/lib/api/client/usersApi';
import { AuthResponse } from '@/lib/api/types/authTypes';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = (id: string | undefined) => {
  return useQuery<AuthResponse>({
    queryKey: ['user-name', id],
    queryFn: () => getUserById(id!),
    enabled: !!id,
  });
};
