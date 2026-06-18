import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import type { User } from '../../entities';

export function useAllUsers() {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['users', 'all'],
    queryFn: async () => {
      const response = await client.get<User[]>('/api/users');
      return response.data;
    },
  });
}
