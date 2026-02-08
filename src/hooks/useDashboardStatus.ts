import { useQuery } from '@tanstack/react-query';
import { getDashboardStatus } from '../api/scrollverse-client';

export const useDashboardStatus = () => {
  return useQuery({
    queryKey: ['dashboardStatus'],
    queryFn: getDashboardStatus,
    refetchInterval: 5000, // Real-time every 5 seconds
    staleTime: 2000,
  });
};
