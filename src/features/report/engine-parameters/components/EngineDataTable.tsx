'use client';

import { useQuery } from '@tanstack/react-query';
import { getEngineDataForDate } from '../query';

// Mapping of parameter keys to user-friendly labels
const parameterLabels: Record<string, string> = {
  loadSetpoint: 'Load Set Point',
  fuelRackControl: 'Fuel Rack Control',
  foFlowRate: 'Fuel Oil Flow Rate',
  tcSpeedA: 'Turbocharger Speed A',
  tcSpeedB: 'Turbocharger Speed B',
  exhGasTempTCAInlet: 'Exh. Gas Temp TCA Inlet',
  exhGasTempTCBInlet: 'Exh. Gas Temp TCB Inlet',
  avgExhaustTemp: 'Average Exhaust Temp',
  crankcasePress: 'Crankcase Pressure',
  maxMainBearingTemp: 'Max Main Bearing Temp',
  maxBigEndBearingTemp: 'Max Big End Bearing Temp',
  maxLinerTemp: 'Max Liner Temp',
  maxAlternatorBearingTemp: 'Max Alternator Bearing Temp',
  maxWindingTemp: 'Max Winding Temp',
  torsionalVib: 'Torsional Vibration',
  cleanLeakPumpRuns: 'Clean Leak Pump Runs',
  fuelConsumption: 'Fuel Consumption',
  heatRate: 'Heat Rate',
};

const EngineDataTable = ({ date }: { date: string }) => {
  const engineDataQuery = useQuery({
    queryKey: ['engine-data', date],
    queryFn: () => getEngineDataForDate(date),
  });

  if (!engineDataQuery.data) return <p>Loading...</p>;

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border-collapse border border-gray-300'>
        <thead>
          <tr>
            <th className='border p-2 text-left'>Parameter</th>
            {engineDataQuery.data.headers.map((header) => (
              <th key={header} className='border p-2 text-center'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {engineDataQuery.data.rows.map((row) => (
            <tr key={row.name} className='border-b'>
              <td className='border p-2'>
                {parameterLabels[row.name] || row.name} {/* Display label */}
              </td>
              {row.values.map((value, idx) => (
                <td key={idx} className='border p-2 text-center'>
                  {typeof value === 'object'
                    ? value instanceof Date
                      ? value.toLocaleDateString()
                      : JSON.stringify(value)
                    : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EngineDataTable;
