import { Button } from '@/components/ui/button';
import { currentProfile } from '@/database/current-profile';
import UserAvatar from '@/features/employee/components/UserAvatar';
import { NavSection } from '@/features/work-request/components/NavSection';
import { columnWR } from '@/features/work-request/components/tables/column';
import { dummyWRData } from '@/features/work-request/components/tables/dummy-data';
import { WRDataTable } from '@/features/work-request/components/tables/table';
import { TypeTabs } from '@/features/work-request/components/type-tabs';
import { useWRModal } from '@/features/work-request/hooks/modal-store';
import { getAllWr } from '@/features/work-request/query';
import { WRdataType } from '@/features/work-request/type';
import { redirect } from 'next/navigation';

const WRpage = async () => {
  // const user = await currentProfile();
  // if (!user) return redirect('/register');
  // const { onOpen } = useWRModal();
  const allWr = await getAllWr();
  return (
    <div className="m-6">
      <NavSection />
      {/* <Button onClick={() => onOpen('createWR')}>Create WR</Button> */}
      <WRDataTable columns={columnWR} data={allWr} />
    </div>
  );
};

export default WRpage;
