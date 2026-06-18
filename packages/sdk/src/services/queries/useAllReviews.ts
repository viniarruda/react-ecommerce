import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import { ReviewStatus, type Review } from '../../entities';

export function useAllReviews(status?: ReviewStatus) {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['reviews', 'all', status],
    queryFn: async () => {
      const params = status ? `?status=${status}` : '';
      const response = await client.get<Review[]>(`/api/reviews${params}`);
      return response.data;
    },
  });
}
