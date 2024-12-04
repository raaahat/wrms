import { create } from 'zustand';

export type ModalType = 'createWR';

export type ModalData = {};
export type ModalStore = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  timelineId: string | undefined;
  isIsolationMolalOpen: boolean;
  openIsolationModal: (timelineId: string) => void;
  closeIsolationModal: () => void;
};

export const useWRModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
  isIsolationMolalOpen: false,
  timelineId: undefined,
  closeIsolationModal: () => set({ isIsolationMolalOpen: false }),
  openIsolationModal: (value) =>
    set({ isIsolationMolalOpen: true, timelineId: value }),
}));
