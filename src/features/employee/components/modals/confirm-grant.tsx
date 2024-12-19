import { grantAccess } from '@/actions/employee';
import { SubmitButton } from '@/components/submit-button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAsyncAction } from '@/hooks/use-async-action';
import { useModal } from '@/hooks/use-modal-store';

export const ConfirmGrantModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const { isSubmitting, performAction } = useAsyncAction('grantAccess');
  if (!data.userInfo) return null;
  const employeeId = data.userInfo.employeeId;
  const open = isOpen && type === 'grantAccess';
  async function handleSubmit() {
    const success = await performAction(() => grantAccess(employeeId));
    if (success) {
      onClose();
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {data.userInfo.name} can interact with this system
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <SubmitButton
            buttonText='Grant Access'
            onClick={handleSubmit}
            disabled={isSubmitting}
            isPending={isSubmitting}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
