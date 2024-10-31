import { useModal } from '@/hooks/use-modal-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UpdateEmployeeForm } from '../update-employee';

export const UpdateEmployeetModal = () => {
  const { deptWithDesig, data, isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'updateEmployee';
  const employeeId = data.userInfo?.employeeId;

  if (!deptWithDesig || !employeeId || !data.userInfo)
    return (
      <h1> please provide department information and employee information</h1>
    );
  const { name, department, designation, phone } = data.userInfo;
  const defaultValues = {
    name,
    department,
    designation,
    phone,
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden pt-10">
        <UpdateEmployeeForm
          onClose={onClose}
          employeeId={employeeId}
          deptWithDesig={deptWithDesig}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
};
