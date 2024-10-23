'use client';

import { useModal } from '@/hooks/use-modal-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { addDepartment } from '@/actions/department';

export const TestModal = () => {
  const [name, setName] = useState('');
  const { data, isOpen, onClose, onOpen, type } = useModal();
  const isModalOpen = isOpen && type === 'invite';
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
            <Button
              onClick={async () => {
                const dept = await addDepartment(name);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
