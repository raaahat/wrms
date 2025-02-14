import { MeterReadingTable } from '@/features/energy-meter-reading/components/MeterReadingTable';
import DatePicker from '@/features/energy-meter-reading/components/SingleDatePicker';
import { UpsertMeterDataModal } from '@/features/energy-meter-reading/components/UpsertMeterDataModal';
import {
  fetchEnergyMeterReadings,
  getDateRangeOfEnergyMeter,
} from '@/features/energy-meter-reading/query';
import { formatDateToISO, isValidDate } from '@/lib/utils';

const EnergyMeterReading = async ({
  searchParams,
}: {
  searchParams: { date?: string };
}) => {
  let selectedDate: string;
  const dateRange = await getDateRangeOfEnergyMeter();
  if (searchParams.date && isValidDate(searchParams.date)) {
    selectedDate = searchParams.date;
  } else {
    selectedDate = formatDateToISO(dateRange.latestDate || new Date());
  }
  const initialData = await fetchEnergyMeterReadings(selectedDate);
  return (
    <div className='ml-4'>
      <div className='w-52'>
        <DatePicker
          selectedDate={selectedDate}
          start={dateRange.earliestDate}
          end={dateRange.latestDate}
        />
      </div>
      <div>
        <MeterReadingTable
          initialDate={selectedDate}
          initialData={initialData}
        />
        <UpsertMeterDataModal />
      </div>
    </div>
  );
};

export default EnergyMeterReading;
