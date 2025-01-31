'use client';

import { useEffect, useState } from 'react';
import { CreateWRModal } from '../components/CreateWRModal';
import { ConfirmIsolationModal } from '../components/ConfirmIsolationModal';
import { AssignMaintEngrModal } from '../components/AssignMaintEngr';
import { ViewDetailsModal } from '../components/ViewDetailsModal';

export const WRModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateWRModal />
      <ConfirmIsolationModal />
      <AssignMaintEngrModal />
      <ViewDetailsModal />
    </>
  );
};
