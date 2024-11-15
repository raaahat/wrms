import { create } from 'zustand';

type CreateWRProps = {
  areaId?: string;
  setAreaId: (value: string) => void;
};
export const useCreateWRstore = create<CreateWRProps>((set) => ({
  areaId: undefined,
  setAreaId: (data) => set({ areaId: data }),
}));
