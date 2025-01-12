import { WrType } from '@prisma/client';
import { create } from 'zustand';
import { WRdataType } from '../type';
import { GetAllWRType } from '../query';

export type ModalType = 'createWR' | 'assignMaintEngr' | 'viewWr';

export type ModalData = {
  wrId?: string;
  wrType?: WrType;
  wrInfo?: GetAllWRType;
};
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
