import { create } from 'zustand';
import { Category } from '@/types/article';
import { getCategories } from '@/lib/category';

type CategoryState = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
  loading: boolean,
  error: boolean,
};

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  loading: false,
  error: false,
  fetchCategories: async () => {
    try {
      set({ loading: true })
      const res = await getCategories();
      set({ categories: res.data });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
}));
