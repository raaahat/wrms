import { create } from 'zustand';

type AddingProps = {
  parentId: string;
  setParentId: (value: string) => void;
  newChild: string;
  setNewChild: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};
export const useAdding = create<AddingProps>((set) => ({
  parentId: '',
  newChild: '',
  isLoading: false,
  setParentId: (data) => set({ parentId: data }),
  setNewChild: (data) => set({ newChild: data }),
  setIsLoading: (data) => set({ isLoading: data }),
}));
