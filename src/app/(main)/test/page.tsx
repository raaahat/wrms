import { TableSection } from '@/features/work-request/components/TableSection';
import { INITIAL_DATERANGE } from '@/features/work-request/constants';

import { getAllWr } from '@/features/work-request/query';

const WRpage = async () => {
  // const user = await currentProfile();
  // if (!user) return redirect('/register');
  // const { onOpen } = useWRModal();

  return (
    <div className="m-6 flex flex-col gap-3 p-4">
      {/* <div className=" flex-1 overflow-auto">
        <TableSection />
      </div> */}
      <div className=" w-[1500px] h-60 bg-red-300"></div>
      <div className=" w-60 h-60 bg-red-300"></div>
      <div className=" w-60 h-60 bg-red-300"></div>
      <div className=" w-60 h-60 bg-red-300"></div>
      <div className=" w-60 h-60 bg-red-300"></div>
    </div>
  );
};

export default WRpage;
