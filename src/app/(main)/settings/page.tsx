import { AreaNavigator } from '@/features/Area/components/AreaNavigator';
import { getAreas } from '@/features/Area/query';

const Settings = async () => {
  const areas = await getAreas();

  return (
    <>
      <AreaNavigator areas={areas} />
      {JSON.stringify(areas)}
    </>
  );
};

export default Settings;
