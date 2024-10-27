'use client';

import { useModal } from '@/hooks/use-modal-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { addDepartment } from '@/actions/department';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const AddDepartmentModal = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'createDepartment';
  async function handleSubmit() {
    const { success, message } = await addDepartment(name);
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
      <DialogContent className="overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add department
          </DialogTitle>
        </DialogHeader>
        <div className=" p-6">
          <Label className="uppercase text-xs font-bold">Name</Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" border-0 bg-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
