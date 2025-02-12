import { useQueryClient } from '@tanstack/react-query';
export function invalidateQuery(queryKey: unknown[]) {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey });
}
