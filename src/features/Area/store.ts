import { create } from 'zustand';

type AddingProps = {
  parentId: string;
  setParentId: (value: string) => void;
  newChild: string;
  setNewChild: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  deletingId: string;
  setDeletingId: (value: string) => void;
  expand: boolean;
  toggleExpand: () => void;
};
export const useAdding = create<AddingProps>((set) => ({
  parentId: '',
  newChild: '',
  isLoading: false,
  deletingId: '',
  expand: false,
  setParentId: (data) => set({ parentId: data }),
  setNewChild: (data) => set({ newChild: data }),
  setIsLoading: (data) => set({ isLoading: data }),
  setDeletingId: (data) => set({ deletingId: data }),
  toggleExpand: () => set((state) => ({ expand: !state.expand })),
}));
