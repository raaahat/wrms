import { create } from 'zustand';

export type ModalType = 'addEquipmentType' | 'addCategory';

export type ModalData = {};
export type ModalStore = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;

  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useEquipmentModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
