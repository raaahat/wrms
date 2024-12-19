'use client';

import { useModal } from '@/hooks/use-modal-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteDepartment } from '@/actions/department';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const DeleteDepartmentModal = () => {
  const router = useRouter();
  const { data, isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'deleteDepartment';
  async function handleSubmit() {
    const { success, message } = await deleteDepartment(
      data.departmentInfo?.id
    );
    if (success)
      toast({
        variant: 'default',
        title: message,
      });
    else
      toast({
        variant: 'destructive',
        title: message,
      });
    onClose();
    router.refresh();
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Delete Department?
          </DialogTitle>
          <DialogDescription className=' mx-auto'>
            Are you sure you want to delete {data.departmentInfo?.name}{' '}
            Department?
          </DialogDescription>
        </DialogHeader>
        <div className=' p-6'>
          <div className='flex items-center mt-2 gap-x-2 justify-center'>
            <Button variant='destructive' onClick={handleSubmit}>
              Delete
            </Button>
            <Button onClick={onClose}> Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
