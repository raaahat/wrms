import { getCurrentDay, getCurrentMonth } from '@/lib/utils';
import { create } from 'zustand';

type EngineParametersStoreProps = {
  selectedMonth: string;
  isOpen: boolean;
  selectedDate: string;
  onOpen: (date: string) => void;
  onClose: () => void;
  setSelectedMonth: (month: string) => void;
};

export const useEngineParametersStore = create<EngineParametersStoreProps>(
  (set) => ({
    selectedDate: getCurrentDay(),
    onOpen: (date) => set({ selectedDate: date, isOpen: true }),
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    selectedMonth: getCurrentMonth(),
    setSelectedMonth: (month) => set({ selectedMonth: month }),
  })
);
