import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import { ADDRESS_ROUTES } from '../constants';
import type { Address, AddAddressInput } from '../../entities';

export function useCreateAddress() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: AddAddressInput) => {
      const response = await client.post<Address>(ADDRESS_ROUTES.create, input);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}
