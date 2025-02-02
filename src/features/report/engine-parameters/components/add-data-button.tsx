'use client';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { createEntry } from '../actions';

export const AddDataButton = () => {
  const currentDate = new Date();
  const normalizedDate = new Date(
    Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate()
    )
  );

  async function handleCreateEntry() {
    const { success, message } = await createEntry(normalizedDate);
    console.log({ success, message });
  }

  return (
    <Button onClick={handleCreateEntry}>
      Add data for date: {format(currentDate, 'dd-MMM-yy')}
    </Button>
  );
};
