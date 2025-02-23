import { create } from 'zustand';

export type ModalType = 'addEquipmentType' | 'addCategory';

export type ModalStore = {
  type: ModalType | null;
  isOpen: boolean;
  categoryId?: string;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
  setCategoryId: (categoryId: string) => void;
};

export const useEquipmentModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
  setCategoryId: (categoryId) => set({ categoryId }),
}));
