import { EnergyMeterReading } from '@prisma/client';
import { create } from 'zustand';

type DateStoreProps = {
  selectedDate: Date;
  upsertModalOpen: boolean;
  hour: number;
  currentData: EnergyMeterReading | null;
  openUpsertModal: (
    hour: number,
    currentData: EnergyMeterReading | null
  ) => void;
  closeUpsertModal: () => void;
  setSelectedDate: (date: Date | undefined) => void;
};
const today = new Date();
const isoString = today.toISOString();
const datePart = isoString.split('T')[0]; // Split at 'T' and take the first part
const dateOnly = new Date(datePart);

export const useEngergyMeterStore = create<DateStoreProps>((set) => ({
  selectedDate: dateOnly,
  upsertModalOpen: false,
  hour: 0,
  currentData: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  openUpsertModal: (hour, currentData) =>
    set({
      upsertModalOpen: true,
      hour,
      currentData,
    }),
  closeUpsertModal() {
    set({ upsertModalOpen: false });
  },
}));
