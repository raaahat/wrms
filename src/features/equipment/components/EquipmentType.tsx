import { getCategoriesWithType } from '../query';

import ViewEquipmentType from './ViewEquipmentType';

export const EquipmentType = async () => {
  const categories = await getCategoriesWithType();

  return <ViewEquipmentType categories={categories} />;
};
