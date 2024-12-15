import { ScrollArea } from '@/components/ui/scroll-area';
import { useWRModal } from '../hooks/modal-store';

import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
} from '@/components/ui/responsive-modal';
import { EmployeeComboBox } from './EmployeeComboBox';
import { useQuery } from '@tanstack/react-query';
import { employeeListByDept } from '@/features/employee/query';
import { useMemo, useState } from 'react';
import { SubmitButton } from '@/components/submit-button';
import {
  assignMaintEngineer,
  assignMaintEngrDirectly,
} from '@/features/timeline/actions';
import { toast } from 'sonner';

export const AssignMaintEngrModal = () => {
  const { isOpen, type, onClose, data } = useWRModal();
  const [maintEngrId, setMaintEngrId] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { wrId, wrType } = data;
  let dept = undefined;
  if (wrType) {
    dept = wrType === 'MECHANICAL' ? 'MM' : 'EM';
  }
  const maintEngrsQuery = useQuery({
    queryKey: ['employee-list', dept],
    queryFn: () => employeeListByDept(dept),
    enabled: !!dept,
  });
  const selectedMaintEngr = useMemo(
    () => maintEngrsQuery.data?.find((person) => person.id === maintEngrId),
    [maintEngrsQuery, maintEngrId]
  );
  if (!wrId) return null;
  const isModalOpen = isOpen && type === 'assignMaintEngr';
  async function handleSubmit() {
    if (!wrId || !maintEngrId) return;
    setIsSubmitting(true);
    const { success, message } = await assignMaintEngrDirectly(
      wrId,
      maintEngrId
    );
    if (success) {
      toast.success(message);
      onClose();
    } else {
      toast.error(message);
    }
    setIsSubmitting(false);
  }
  return (
    <ResponsiveModal open={isModalOpen} onOpenChange={onClose}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader className=' text-2xl mx-6'>
          Assign Maintenance Engineer
        </ResponsiveModalHeader>
        <ScrollArea className=' max-h-[85vh] space-y-6'>
          <div className=' space-y-6'>
            <EmployeeComboBox
              title='Select Maintenance Engineer...'
              isLoading={maintEngrsQuery.isLoading}
              allEmployeeList={maintEngrsQuery.data}
              selectedEmployee={selectedMaintEngr}
              onSelection={(id) => setMaintEngrId(id)}
              employeeId={maintEngrId}
            />
          </div>
        </ScrollArea>
        <ResponsiveModalFooter>
          <SubmitButton
            disabled={isSubmitting}
            onClick={handleSubmit}
            isPending={isSubmitting}
            buttonText='Assign'
          />
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
