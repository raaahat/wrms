import { AddDataButton } from '@/features/report/engine-parameters/components/add-data-button';
import EngineDataTable from '@/features/report/engine-parameters/components/EngineDataTable';
import { db } from '@/lib/prisma';

const EngineParameters = async () => {
  const engineData = await db.engineData.findMany({
    include: {
      engine: {
        select: {
          number: true,
        },
      },
    },
  });
  const currentDate = new Date().toISOString().split('T')[0];
  return (
    <div>
      EngineParameters <br />
      <AddDataButton />
      <br />
      <div className='p-4'>
        <h1 className='text-xl font-bold mb-4'>
          Engine Data for {currentDate}
        </h1>
        <EngineDataTable date={currentDate} />
      </div>
    </div>
  );
};

export default EngineParameters;
