import { WrType } from '@prisma/client';
import { create } from 'zustand';

type TimelineModalProps = {
  isOpen: boolean;
  wrType: WrType;
  timelineId?: string;
  openModalWith: (wrType: WrType, timelineId: string) => void;
  setOpen: (value: boolean) => void;
};
export const useTimelineModalStore = create<TimelineModalProps>((set) => ({
  isOpen: false,
  wrType: 'ELECTRICAL',
  timelineId: undefined,
  openModalWith: (wrType, timelineId) =>
    set({ isOpen: true, wrType, timelineId }),

  setOpen: (value) => set({ isOpen: value }),
}));
