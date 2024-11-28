import { DateRangePicker } from '@/components/ui/date-range-picker';
import { TypeTabs } from './type-tabs';
import { useFilterStore } from '../wr-filter-store';

export const FilterSection = () => {
  const { dateRange, setDateRange } = useFilterStore();
  const now = new Date();
  return (
    <div className=" flex flex-col gap-4">
      <div className=" shrink-0">
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to || now}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range;
            if (!from || !to) return;
            setDateRange({ from, to });
          }}
        />
      </div>
      <TypeTabs />
    </div>
  );
};
