import { getSingleTimeline } from '@/features/timeline/query';
import { useQuery } from '@tanstack/react-query';

export const useSingleTimeline = (timelineId?: string) => {
  const { data: timeline, isLoading } = useQuery({
    queryKey: ['timeline', timelineId],
    queryFn: () => getSingleTimeline(timelineId as string),
    enabled: !!timelineId,
  });
  return { timeline, isLoading };
};
