import { getCurrentDay, getCurrentMonth } from '@/lib/utils';
import { create } from 'zustand';

type DateStoreProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
};

export const useDateStore = create<DateStoreProps>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
