import { DateRangePicker } from '@/components/ui/date-range-picker';
import { TypeTabs } from './type-tabs';
import { useFilterStore } from '../wr-filter-store';
import { differenceInDays } from 'date-fns';
import { toast } from 'sonner';

export const FilterSection = () => {
  const { dateRange, setDateRange } = useFilterStore();
  return (
    <div className=" flex flex-col gap-4">
      <div className=" shrink-0">
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range;
            if (!from || !to) return;
            if (differenceInDays(to, from) > 90) {
              toast.error(
                'The selected date is too big, max range is 90 days!'
              );
              return;
            }
            setDateRange({ from, to });
          }}
        />
      </div>
      <TypeTabs />
    </div>
  );
};
