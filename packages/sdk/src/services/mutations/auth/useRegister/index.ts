import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '@providers/ApiProvider';
import { setToken, setRefreshToken } from '@sdk/client';
import { meKey } from '@services/queries/auth/useMe';
import { registerRequest } from './request';
import type { UseRegisterInput } from './types';

export function useRegister() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UseRegisterInput) => registerRequest(client, input),
    onSuccess: (data) => {
      // Save both access and refresh tokens
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      
      // Update cache
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.setQueryData(meKey(), data.user);
    },
  });
}

export * from './types';
export * from './key';

