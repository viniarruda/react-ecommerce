import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import type { Cart } from '../../entities';

/**
 * Hook to get the current user's cart.
 * Only fetches when the user has an access token (authenticated).
 */
export function useCart() {
  const { client } = useApiClient();

  // Avoid firing the authenticated /api/cart request for guest users
  const hasToken = typeof window !== 'undefined'
    ? !!localStorage.getItem('accessToken')
    : false;

  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await client.get<Cart>('/api/cart');
      return response.data;
    },
    enabled: hasToken,
  });
}

