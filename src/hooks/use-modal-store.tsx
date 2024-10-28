import { create } from 'zustand';

export type ModalType =
  | 'createDepartment'
  | 'invite'
  | 'deleteDepartment'
  | 'addDesignation'
  | 'deleteDesignation';

export type ModalData = {
  designationId?: string;
  departmentInfo?: {
    id?: string;
    name: string;
  };
};
export type ModalStore = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
