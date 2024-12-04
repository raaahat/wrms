import { useWRModal } from '../hooks/modal-store';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useQuery } from '@tanstack/react-query';
import {
  employeeListByDept,
  getEmployeeByRole,
} from '@/features/employee/query';
import { useState } from 'react';
import { EmployeeComboBox } from './EmployeeComboBox';
import { Label } from '@/components/ui/label';
import { Button, ButtonProps } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { cn, wait } from '@/lib/utils';
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
} from '@/components/ui/responsive-modal';

export const ConfirmIsolationModal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isIsolationMolalOpen, closeIsolationModal } = useWRModal();
  const { data: shiftIncharges, isLoading: isLoadingSI } = useQuery({
    queryKey: ['shiftIncharge'],
    queryFn: () => getEmployeeByRole('ShiftIncharge'),
  });
  const { data: oPEngrs, isLoading: isLoadingOP } = useQuery({
    queryKey: ['op'],
    queryFn: () => employeeListByDept('OP'),
  });
  const [shiftInchargeId, setShiftInchargeId] = useState<string | undefined>(
    undefined
  );
  const selectedSI = shiftIncharges?.find(
    (person) => person.id === shiftInchargeId
  );

  function onSelectSI(id: string) {
    setShiftInchargeId(id);
  }
  const [opEngrId, setOpEngrId] = useState<string | undefined>(undefined);
  const selectedOPEngr = oPEngrs?.find((person) => person.id === opEngrId);

  function onSelectOPEngr(id: string) {
    setOpEngrId(id);
  }
  async function onSubmit() {
    setIsSubmitting(true);
    await wait(4);
    setIsSubmitting(false);
  }
  return (
    <ResponsiveModal
      open={isIsolationMolalOpen}
      onOpenChange={closeIsolationModal}
    >
      <ResponsiveModalContent>
        <ResponsiveModalHeader className=' text-2xl mx-6'>
          Confirm Isolation
        </ResponsiveModalHeader>
        <ScrollArea className=' max-h-[85vh] space-y-6'>
          <div className=' space-y-6'>
            <div className='flex items-center '>
              <Label className='min-w-[140px] pr-4'>Shift Incharge:</Label>
              <EmployeeComboBox
                title='Select Shift Incharge...'
                isLoading={isLoadingSI}
                allEmployeeList={shiftIncharges}
                selectedEmployee={selectedSI}
                onSelection={onSelectSI}
                employeeId={shiftInchargeId}
              />
            </div>
            <div className='flex items-center '>
              <Label className='min-w-[140px] pr-4'>Field OP Engineer:</Label>

              <EmployeeComboBox
                title='Select Operation Field Engineer...'
                isLoading={isLoadingOP}
                allEmployeeList={oPEngrs}
                selectedEmployee={selectedOPEngr}
                onSelection={onSelectOPEngr}
                employeeId={opEngrId}
              />
            </div>
          </div>
        </ScrollArea>
        <ResponsiveModalFooter>
          {shiftInchargeId && opEngrId && (
            <Button
              disabled={isSubmitting}
              onClick={onSubmit}
              className='relative flex items-center justify-center transition-all duration-300 min-w-[140px]'
            >
              <LoaderCircle
                className={cn(
                  'w-full transition-all -ms-1 me-2 animate-spin',
                  !isSubmitting && 'hidden w-0'
                )}
                size={16}
                strokeWidth={2}
                aria-hidden='true'
              />
              Assign Engineer
            </Button>
          )}
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
