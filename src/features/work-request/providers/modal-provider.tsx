'use client';

import { useEffect, useState } from 'react';
import { CreateWRModal } from '../components/CreateWRModal';

export const WRModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateWRModal />
    </>
  );
};
