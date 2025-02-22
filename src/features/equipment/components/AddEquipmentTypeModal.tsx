'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useEquipmentModal } from '../store';

const AddEquipmentTypeModal = () => {
  const { isOpen, onClose, type } = useEquipmentModal();
  const isModalOpen = isOpen && type === 'addEquipmentType';
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>Add Equipment type</DialogContent>
    </Dialog>
  );
};

export default AddEquipmentTypeModal;
