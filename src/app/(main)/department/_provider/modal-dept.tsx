'use client';

import { useEffect, useState } from 'react';
import { AddDepartmentModal } from '../_components/modal/add-department';
import { DeleteDepartmentModal } from '../_components/modal/delete-department';

export const DeptModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AddDepartmentModal />
      <DeleteDepartmentModal />
    </>
  );
};
