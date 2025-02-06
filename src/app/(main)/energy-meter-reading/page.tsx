import { MeterReadingTable } from '@/features/energy-meter-reading/components/MeterReadingTable';
import DatePicker from '@/features/energy-meter-reading/components/SingleDatePicker';
import { getDateRangeOfEnergyMeter } from '@/features/energy-meter-reading/query';

const EnergyMeterReading = async () => {
  const dateRange = await getDateRangeOfEnergyMeter();
  return (
    <div>
      EnergyMeterReading
      <br />
      <div className='w-52'>
        <DatePicker start={dateRange.earliestDate} end={dateRange.latestDate} />
      </div>
      <div>
        <MeterReadingTable />
      </div>
    </div>
  );
};

export default EnergyMeterReading;
