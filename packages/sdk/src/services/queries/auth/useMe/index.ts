import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '@providers/ApiProvider';
import { meKey } from './key';
import { fetchMe } from './request';
import { getStoredToken } from '../../../../client';

export function useMe() {
  const { client } = useApiClient();
  const hasToken = !!getStoredToken();

  return useQuery({
    queryKey: meKey(),
    queryFn: () => fetchMe(client),
    retry: false,
    enabled: hasToken, // Only fetch if user has a token
  });
}

export * from './types';
export * from './key';

