import { create } from 'zustand';

type DateStoreProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date | undefined) => void;
};
const today = new Date();
const isoString = today.toISOString();
const datePart = isoString.split('T')[0]; // Split at 'T' and take the first part
const dateOnly = new Date(datePart);

export const useEngergyMeterStore = create<DateStoreProps>((set) => ({
  selectedDate: dateOnly,
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
