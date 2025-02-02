import { AddDataButton } from '@/features/report/engine-parameters/components/add-data-button';
import EngineDataTable from '@/features/report/engine-parameters/components/EngineDataTable';
import ViewEngineParameters from '@/features/report/engine-parameters/components/ViewEngineParameters';
import { getAvailableMonths } from '@/features/report/engine-parameters/query';
import { db } from '@/lib/prisma';

const EngineParameters = async () => {
  const availableMonths = await getAvailableMonths();

  const engineData = await db.engineData.findMany({
    include: {
      engine: {
        select: {
          number: true,
        },
      },
    },
  });
  return (
    <div>
      <ViewEngineParameters />
    </div>
  );
};

export default EngineParameters;
