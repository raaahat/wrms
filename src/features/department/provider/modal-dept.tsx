'use client';

import { useEffect, useState } from 'react';
import { AddDepartmentModal } from '../components/modal/add-department';
import { DeleteDepartmentModal } from '../components/modal/delete-department';
import { AddDesignationtModal } from '../components/modal/add-designation';
import { DeleteDesignationModal } from '../components/modal/delete-desination';

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
      <AddDesignationtModal />
      <DeleteDesignationModal />
    </>
  );
};
