'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEngineParametersStore } from '../engine-par-store';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getEngineDataForDate } from '../query';
import { EngineDataForm } from './EngineDataForm';

const EditEngineDataModal = () => {
  const { isOpen, onClose, selectedDate } = useEngineParametersStore();
  const [selectedEngine, setSelectedEngine] = useState(1);
  const engineData = useQuery({
    queryKey: ['engine-data', selectedDate],
    queryFn: () => getEngineDataForDate(selectedDate),
  });
  const engineDataForEngine = engineData.data?.[selectedEngine];

  if (!engineDataForEngine) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='pointer-events-auto max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Edit data for {selectedDate}</DialogTitle>
        </DialogHeader>
        <div className='flex w-full h-full gap-4'>
          <div className='basis-[30%] flex-grow space-y-2'>
            {[1, 2, 3, 4, 5, 6].map((engine) => (
              <Button
                key={engine}
                onClick={() => setSelectedEngine(engine)}
                className={cn(
                  'w-full',
                  engine === selectedEngine &&
                    'bg-muted-foreground hover:bg-muted-foreground'
                )}
                variant={'outline'}
                size={'sm'}
              >
                Engine {engine}
              </Button>
            ))}
          </div>
          <div className='basis-[70%] flex-grow'>
            engine number: {selectedEngine}
            <div>
              <EngineDataForm
                engineData={engineDataForEngine}
                engineNumber={selectedEngine}
                date={selectedDate}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditEngineDataModal;
