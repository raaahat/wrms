'use client';

import AddCategoryModal from './AddCategoryModal';
import AddEquipmentTypeModal from './AddEquipmentTypeModal';

const EquipmentModalProvider = () => {
  return (
    <>
      <AddEquipmentTypeModal />
      <AddCategoryModal />
    </>
  );
};

export default EquipmentModalProvider;
