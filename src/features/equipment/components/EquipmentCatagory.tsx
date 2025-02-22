import { getCatagories } from '../query';
import { EquipmentCategoryList } from './EquipmentCatagoryList';

export const EquipmentCatagory = async () => {
  const catagories = await getCatagories();
  //const catagories: ({
  //     specifications: {
  //         name: string;
  //         dataType: string;
  //         unit: string | null;
  //         required: boolean;
  //         id: string;
  //         categoryId: string;
  //     }[];
  // } & {
  //     name: string;
  //     id: string;
  // })[]
  return (
    <>
      <EquipmentCategoryList categories={catagories} />
    </>
  );
};
