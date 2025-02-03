import { Input } from '@/components/ui/input';
import { EngineDataType } from '../query';
import { useRef, useState, useEffect } from 'react';
import { updateEngineData } from '../actions';
import { useQueryClient } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EngineStatus } from '@prisma/client';

export const EngineDataForm = ({
  engineData,
  engineNumber,
  date,
}: {
  engineData: EngineDataType;
  engineNumber: number;
  date: string;
}) => {
  const [formData, setFormData] = useState(engineData);
  const [editedField, setEditedField] = useState<keyof EngineDataType | null>(
    null
  ); // Track the edited field
  const queryClient = useQueryClient();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync formData with engineData prop
  useEffect(() => {
    setFormData(engineData);
  }, [engineData]);

  // Trigger handleUpdate when formData.status changes
  useEffect(() => {
    if (editedField === 'status') {
      handleUpdate('status');
    }
  }, [formData.status]); // Run this effect when formData.status changes

  // Helper function to convert Decimal to string
  const decimalToString = (value: any): string => {
    if (value && typeof value === 'object' && 'toString' in value) {
      return value.toString(); // Convert Decimal to string
    }
    return value !== null ? String(value) : '';
  };

  const handleInputChange = (key: keyof EngineDataType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value === '' ? null : Number(value),
    }));
    setEditedField(key); // Track the edited field
  };

  const handleStatusChange = (value: EngineStatus) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
    setEditedField('status');
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission

      // Send updated data to the server
      if (editedField) {
        handleUpdate(editedField);
      }

      // Move focus to the next input
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleUpdate = async (field: keyof EngineDataType) => {
    const { success, message } = await updateEngineData(date, engineNumber, {
      [field]: formData[field],
    });
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['engine-data', date] });
      queryClient.invalidateQueries({
        queryKey: ['engine-data', date.slice(0, 7)],
      });
    }
    // Reset the edited field
    setEditedField(null);
  };

  const serializedData = [
    {
      label: 'Load Setpoint',
      key: 'loadSetpoint',
      value: formData.loadSetpoint,
      unit: 'MW',
    },
    {
      label: 'Fuel Rack Control',
      key: 'fuelRackControl',
      value: formData.fuelRackControl,
      unit: '%',
    },
    {
      label: 'FO Flow Rate',
      key: 'foFlowRate',
      value: formData.foFlowRate,
      unit: 'Kg/Hr',
    },
    {
      label: 'TC Speed A',
      key: 'tcSpeedA',
      value: formData.tcSpeedA,
      unit: 'rpm',
    },
    {
      label: 'TC Speed B',
      key: 'tcSpeedB',
      value: formData.tcSpeedB,
      unit: 'rpm',
    },
    {
      label: 'Exh Gas Temp TC A Inlet',
      key: 'exhGasTempTCAInlet',
      value: formData.exhGasTempTCAInlet,
      unit: '°C',
    },
    {
      label: 'Exh Gas Temp TC B Inlet',
      key: 'exhGasTempTCBInlet',
      value: formData.exhGasTempTCBInlet,
      unit: '°C',
    },
    {
      label: 'Avg Exhaust Temp',
      key: 'avgExhaustTemp',
      value: formData.avgExhaustTemp,
      unit: '°C',
    },
    {
      label: 'Crankcase Press',
      key: 'crankcasePress',
      value: formData.crankcasePress,
      unit: 'mbar',
    },
    {
      label: 'Max Main Bearing Temp',
      key: 'maxMainBearingTemp',
      value: formData.maxMainBearingTemp,
      unit: '°C',
    },
    {
      label: 'Max Big End Bearing Temp',
      key: 'maxBigEndBearingTemp',
      value: formData.maxBigEndBearingTemp,
      unit: '°C',
    },
    {
      label: 'Max Liner Temp',
      key: 'maxLinerTemp',
      value: formData.maxLinerTemp,
      unit: '°C',
    },
    {
      label: 'Max Alternator Bearing Temp',
      key: 'maxAlternatorBearingTemp',
      value: formData.maxAlternatorBearingTemp,
      unit: '°C',
    },
    {
      label: 'Max Winding Temp',
      key: 'maxWindingTemp',
      value: formData.maxWindingTemp,
      unit: '°C',
    },
    {
      label: 'Torsional Vib',
      key: 'torsionalVib',
      value: formData.torsionalVib,
      unit: 'mdeg',
    },
    {
      label: 'Clean Leak Pump Runs',
      key: 'cleanLeakPumpRuns',
      value: formData.cleanLeakPumpRuns,
      unit: 'No.',
    },
    {
      label: 'Fuel Consumption',
      key: 'fuelConsumption',
      value: formData.fuelConsumption,
      unit: 'g/KWh',
    },
    {
      label: 'Heat Rate',
      key: 'heatRate',
      value: formData.heatRate,
      unit: 'KJ/KWh',
    },
  ];

  return (
    <form className='space-y-2 min-w-[400px]'>
      {/* Status Field */}
      <div className='grid grid-cols-[auto_min-content_min-content] items-center gap-2'>
        <span className='text-left truncate'>Status</span>
        <Select
          value={formData.status}
          onValueChange={(value: EngineStatus) => handleStatusChange(value)}
        >
          <SelectTrigger className='w-24'>
            <SelectValue placeholder='Status' />
          </SelectTrigger>
          <SelectContent>
            {Object.values(EngineStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className='flex justify-start truncate w-16'></span>
      </div>

      {/* Other Fields */}
      {serializedData.map((item, index) => (
        <div
          key={index}
          className='grid grid-cols-[auto_min-content_min-content] items-center gap-2'
        >
          <span className='text-left truncate'>{item.label}</span>
          <Input
            ref={(el) => {
              inputRefs.current[index] = el; // Assign the ref without returning
            }}
            className='h-6 w-24 font-geistMono'
            type='number'
            value={decimalToString(item.value)}
            onChange={(e) =>
              handleInputChange(
                item.key as keyof EngineDataType,
                e.target.value
              )
            }
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
          <span className='flex justify-start truncate w-16'>
            {item.unit && `${item.unit}`}
          </span>
        </div>
      ))}
    </form>
  );
};
