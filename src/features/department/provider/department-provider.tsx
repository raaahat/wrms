'use client';
import { DeptWithDesig } from '@/features/employee/register/type';
import { useModal } from '@/hooks/use-modal-store';
import { RoleName } from '@prisma/client';
import { useEffect } from 'react';

export const DepartmentProvider = ({
  deptWithDesig,
  roles,
}: {
  deptWithDesig: DeptWithDesig;
  roles: { id: string; name: RoleName }[];
}) => {
  const { setDeptWithDesig, setRoles } = useModal();
  useEffect(() => {
    setDeptWithDesig(deptWithDesig);
  }, [deptWithDesig, setDeptWithDesig]);
  useEffect(() => {
    setRoles(roles);
  }, [roles, setRoles]);

  return null;
};
