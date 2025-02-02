'use client';

import { parameterLabels } from '../constants';
import { EngineTableDataType } from '../query';
import { ReactNode } from 'react';

const EngineDataTable = ({
  engineDataByDate,
}: {
  engineDataByDate: EngineTableDataType;
}) => {
  if (!engineDataByDate) return <p>No data available.</p>;

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border-collapse border border-gray-300'>
        <thead>
          <tr>
            <th className='border p-2 text-left'>Parameter</th>
            {(engineDataByDate?.headers ?? []).map((header) => (
              <th key={header} className='border p-2 text-center'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(engineDataByDate?.rows ?? []).map((row) => (
            <tr key={row.name} className='border-b'>
              <td className='border '>
                {parameterLabels[row.name] || row.name}
              </td>
              {row.values.map((value, idx) => (
                <td key={`${row.name}-${idx}`} className='border  text-center'>
                  {formatValue(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Utility function to safely format values
const formatValue = (value: unknown): ReactNode => {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value); // Ensure it's a string
  }
  if (typeof value === 'boolean') {
    return value ? 'True' : 'False'; // Handle boolean values
  }
  return value !== null && value !== undefined ? String(value) : '—'; // Ensure string output
};

export default EngineDataTable;
