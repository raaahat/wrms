'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useEngineParametersStore } from '../engine-par-store';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getEngineDataForDate } from '../query';
import { format } from 'date-fns';

const EditEngineDataModal = () => {
  const { isOpen, onClose, selectedDate } = useEngineParametersStore();
  const [selectedEngine, setSelectedEngine] = useState(1);
  const engineData = useQuery({
    queryKey: ['engine-data', selectedDate],
    queryFn: () => getEngineDataForDate(selectedDate),
  });
  const engineDataForEngine = engineData.data?.[selectedEngine];
  if (!engineDataForEngine) return null;
  const displayFields = Object.entries(engineDataForEngine).filter(
    ([key]) => !['id', 'engineId', 'engine'].includes(key)
  );
  console.log('engine Data', engineData.data);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <h1>Edit data for {selectedDate}</h1>
        <div className='flex w-full h-full'>
          <div className='basis-[40%] flex-grow'>
            {[1, 2, 3, 4, 5, 6].map((engine) => (
              <Button
                key={engine}
                onClick={() => setSelectedEngine(engine)}
                className={cn(
                  'w-full',
                  engine === selectedEngine &&
                    'bg-muted-foreground  hover:bg-muted-foreground'
                )}
                variant={'outline'}
              >
                Engine {engine}
              </Button>
            ))}
          </div>
          <div className='basis-[60%] flex-grow'>
            engine number: {selectedEngine}
            <div className=''>
              {displayFields.map(([key, value]) => (
                <div key={key} className='flex justify-between border-b'>
                  <span className='font-medium capitalize'>
                    {formatLabel(key)}
                  </span>
                  <span>{formatValue(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

// Format values properly
const formatValue = (value: unknown) => {
  if (value === null || value === undefined) return '—';
  if (value instanceof Date) return format(value, 'dd MMM yyyy');
  if (typeof value === 'string' && value.includes('T'))
    return format(new Date(value), 'dd MMM yyyy');
  if (typeof value === 'object') return JSON.stringify(value); // Convert objects to strings
  return String(value);
};
export default EditEngineDataModal;
