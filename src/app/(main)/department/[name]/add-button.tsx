'use client';

import { Button } from '@/components/ui/button';
import { ModalData, useModal } from '@/hooks/use-modal-store';

export const AddDesignationButton = ({
  deptName,
  className,
}: {
  deptName: string;
  className?: string;
}) => {
  const { onOpen } = useModal();
  const data: ModalData = { departmentInfo: { name: deptName } };
  return (
    <Button
      className={className}
      onClick={() => onOpen('addDesignation', data)}
    >
      Add Designation
    </Button>
  );
};
