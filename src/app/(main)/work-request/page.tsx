import { TableSection } from '@/features/work-request/components/TableSection';

const WRpage = async () => {
  // const user = await currentProfile();
  // if (!user) return redirect('/register');
  // const { onOpen } = useWRModal();

  return (
    <div className='mx-5'>
      <TableSection />
    </div>
  );
};

export default WRpage;
