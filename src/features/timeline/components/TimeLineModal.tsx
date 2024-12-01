'use client';
import React, { useState } from 'react';
import { useTimelineModalStore } from '../timeline-modal-store';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';

import { Loader2 } from 'lucide-react';
import { Command } from '@/components/ui/command';
import { employeeListByDept } from '@/features/employee/query';
import { EmployeeComboBox } from '@/features/work-request/components/EmployeePickerComboBox';
import { Button } from '@/components/ui/button';

export const TimeLineModal = () => {
  const { isOpen, setOpen, wrType, timelineId } = useTimelineModalStore();
  const deptShortName =
    wrType === 'MECHANICAL' ? 'MM' : wrType === 'ELECTRICAL' ? 'EM' : undefined;

  const { data: maintEmployee, isLoading } = useQuery({
    queryKey: ['employee', deptShortName],
    queryFn: () => employeeListByDept(deptShortName),
  });
  const [maintEmployeeId, setMaintEmployeeId] = useState<string | undefined>(
    undefined
  );
  const [popOpen, setPopOpen] = useState(false);
  function handleSelection(id: string) {
    setMaintEmployeeId(id);
    setPopOpen(false);
  }
  const selectedEmployee = maintEmployee?.find(
    (item) => item.id === maintEmployeeId
  );
  console.log(!!maintEmployeeId);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose an {wrType} engineer for this work</DialogTitle>
        </DialogHeader>
        <form>
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : (
            <EmployeeComboBox
              open={popOpen}
              setOpen={setPopOpen}
              allEmployeeList={maintEmployee}
              isLoading={isLoading}
              onSelection={handleSelection}
              selectedEmployee={selectedEmployee}
              employeeId={maintEmployeeId}
            />
          )}
          <DialogFooter className='mt-5'>
            <Button disabled={!maintEmployeeId}> Assign </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
