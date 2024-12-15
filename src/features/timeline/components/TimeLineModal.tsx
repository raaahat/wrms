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

import { employeeListByDept } from '@/features/employee/query';

import { Button } from '@/components/ui/button';
import { assignMaintEngineer } from '../actions';
import { toast } from 'sonner';
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from '@/components/ui/responsive-modal';
import { EmployeeComboBox } from '@/features/work-request/components/EmployeeComboBox';
import { SubmitButton } from '@/components/submit-button';

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
  function handleSelection(id: string) {
    setMaintEmployeeId(id);
  }
  const selectedEmployee = maintEmployee?.find(
    (item) => item.id === maintEmployeeId
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    toast.loading('Assigning an engineer...', { id: 'assign' });
    if (!timelineId || !maintEmployeeId) {
      toast.error('Select an engineer...', { id: 'assign' });
      return;
    }
    const { success, message } = await assignMaintEngineer(
      timelineId,
      maintEmployeeId
    );
    if (!success) {
      toast.error(message, { id: 'assign' });
      setIsSubmitting(false);
      return;
    }
    toast.success(message, { id: 'assign' });
    setOpen(false);
    setIsSubmitting(false);
  }
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setOpen}>
      <ResponsiveModalContent side={'top'}>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            Choose an {wrType} engineer for this work
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <form onSubmit={handleSubmit}>
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : (
            <EmployeeComboBox
              allEmployeeList={maintEmployee}
              isLoading={isLoading}
              onSelection={handleSelection}
              selectedEmployee={selectedEmployee}
              employeeId={maintEmployeeId}
            />
          )}
          <ResponsiveModalFooter className='mt-5'>
            <SubmitButton
              buttonText='Assign'
              type='submit'
              disabled={!maintEmployeeId || isSubmitting}
              isPending={isSubmitting}
            />
          </ResponsiveModalFooter>
        </form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
