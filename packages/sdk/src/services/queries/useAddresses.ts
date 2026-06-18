import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import { ADDRESS_ROUTES } from '../constants';
import type { Address } from '../../entities';

export function useAddresses() {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const response = await client.get<Address[]>(ADDRESS_ROUTES.list);
      return response.data;
    },
  });
}
