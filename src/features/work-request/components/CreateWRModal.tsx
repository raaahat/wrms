import React from 'react';
import { useWRModal } from '../hooks/modal-store';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import CreateWorkRequestForm from './CreateWRForm';
import { ScrollArea } from '@/components/ui/scroll-area';

export const CreateWRModal = () => {
  const { isOpen, type, onClose } = useWRModal();
  const isModalOpen = isOpen && type === 'createWR';
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='  md:w-[80vw] md:max-w-[80vw] lg:max-w-5xl overflow-visible pointer-events-auto'>
        <DialogHeader className=' text-2xl mx-6'>
          Create Work Request
        </DialogHeader>
        <ScrollArea className=' max-h-[85vh]'>
          <CreateWorkRequestForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
