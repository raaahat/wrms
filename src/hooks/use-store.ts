import { create } from 'zustand';

export type PageInfo = {
  isLoading: boolean;
  pageTitle: string;
  setPageTitle: (title: string) => void;
};

export const usePageInfo = create<PageInfo>((set) => ({
  pageTitle: '',
  isLoading: true,
  setPageTitle: (title) => {
    set({
      pageTitle: title,
      isLoading: false,
    });
  },
}));
