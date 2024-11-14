'use client';

import { Button } from '@/components/ui/button';
import CreateWorkRequestForm from '@/features/work-request/components/CreateWRForm';
import { useWRModal } from '@/features/work-request/hooks/modal-store';

const WRpage = () => {
  const { onOpen } = useWRModal();
  return (
    <div>
      <Button onClick={() => onOpen('createWR')}>Create WR</Button>
      <CreateWorkRequestForm />
    </div>
  );
};

export default WRpage;
