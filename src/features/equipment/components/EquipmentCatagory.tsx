import { getCatagories } from '../query';

import { EquipmentCatagoryList } from './EquipmentCatagoryList';

export const EquipmentCatagory = async () => {
  const catagories = await getCatagories();
  return (
    <>
      <EquipmentCatagoryList catagories={catagories} />
    </>
  );
};
