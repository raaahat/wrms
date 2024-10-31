'use client';
import { DeptWithDesig } from '@/features/register/type';
import { useModal } from '@/hooks/use-modal-store';
import { useEffect } from 'react';

export const DepartmentProvider = ({
  deptWithDesig,
}: {
  deptWithDesig: DeptWithDesig;
}) => {
  const { setDeptWithDesig } = useModal();
  useEffect(() => {
    setDeptWithDesig(deptWithDesig);
  }, [deptWithDesig, setDeptWithDesig]);

  return null;
};
