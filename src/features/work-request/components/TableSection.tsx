'use client';
import { useQuery } from '@tanstack/react-query';
import { getAllWr } from '../query';
import { columnWR } from './tables/column';
import { WRDataTable, WrSkeleton } from './tables/table';
import { Alert } from '@/components/ui/alert';

import { useFilterStore } from '../wr-filter-store';
import { NavSection } from './NavSection';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { differenceInDays } from 'date-fns';
import { toast } from 'sonner';

export const TableSection = ({}: {}) => {
  const { dateRange, setDateRange } = useFilterStore();
  const { data, isLoading } = useQuery({
    queryKey: ['workRequests', dateRange],
    queryFn: () => getAllWr(dateRange),
  });
  if (isLoading) return <WrSkeleton />;
  if (!data) return <Alert className="my-6">No data to show</Alert>;
  return (
    <div className="space-y-4">
      <NavSection />
      {isLoading ? (
        'Loading ... '
      ) : (
        <div className="flex">
          <WRDataTable columns={columnWR} data={data} />
        </div>
      )}
    </div>
  );
};
