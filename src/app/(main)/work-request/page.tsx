import { NavSection } from '@/features/work-request/components/NavSection';
import { columnWR } from '@/features/work-request/components/tables/column';

import { WRDataTable } from '@/features/work-request/components/tables/table';

import { getAllWr } from '@/features/work-request/query';

const WRpage = async () => {
  // const user = await currentProfile();
  // if (!user) return redirect('/register');
  // const { onOpen } = useWRModal();
  const allWr = await getAllWr();
  return (
    <div className="m-6">
      <NavSection />
      <WRDataTable columns={columnWR} data={allWr} />
    </div>
  );
};

export default WRpage;
