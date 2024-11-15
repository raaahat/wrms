import { create } from 'zustand';

type CreateWRProps = {
  areaId?: string;
  creatorId?: string;
  setAreaId: (value: string) => void;
  setCreatorId: (value: string) => void;
};
export const useCreateWRstore = create<CreateWRProps>((set) => ({
  areaId: undefined,
  creatorId: undefined,
  setAreaId: (data) => set({ areaId: data }),
  setCreatorId: (data) => set({ creatorId: data }),
}));
