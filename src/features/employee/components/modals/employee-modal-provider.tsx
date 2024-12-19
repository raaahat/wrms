'use client';

import { useEffect, useState } from 'react';
import { UpdateEmployeetModal } from './update-employee-modal';
import { ConfirmGrantModal } from './confirm-grant';

export const EmployeeModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <UpdateEmployeetModal />
      <ConfirmGrantModal />
    </>
  );
};
