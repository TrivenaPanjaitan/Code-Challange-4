/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import {
  getArticles,
  getArticleById,
  deleteArticle,
  updateArticle,
  createArticle,
} from '@/lib/article';
import { ArticleState } from '@/types/article';

export const useArticleStore = create<ArticleState>((set) => ({
  articles: [],
  article: null,
  totalPages: 1,
  loading: false,
  error: false,

  // Modal States
  showSuccessModal: false,
  successMessage: '',
  setShowSuccessModal: (show, message = '') =>
    set({ showSuccessModal: show, successMessage: message }),

  showErrorModal: false,
  errorMessage: '',
  setShowErrorModal: (show, message = '') =>
    set({ showErrorModal: show, errorMessage: message }),

  // Article Setters
  setArticles: (articlesOrUpdater) =>
    set((state) => ({
      articles:
        typeof articlesOrUpdater === 'function'
          ? articlesOrUpdater(state.articles)
          : articlesOrUpdater,
    })),
  setArticle: (article) => set({ article }),

  // === API Actions ===

  fetchArticles: async (params) => {
    set({ loading: true });
    try {
      const res = await getArticles(params);
      set((state) => ({
        articles:
          params.page && params.page > 1
            ? [...state.articles, ...res.data]
            : res.data,
        totalPages: res.meta.pagination.pageCount,
        error: false,
      }));
    } catch (error) {
      set({ error: true });
      set({ showErrorModal: true, errorMessage: 'Failed to fetch articles.' });
    } finally {
      set({ loading: false });
    }
  },

  fetchArticleById: async (documentId) => {
    set({ loading: true });
    try {
      const res = await getArticleById(documentId);
      set({ article: res.data, error: false });
    } catch (error) {
      set({ error: true });
      set({ showErrorModal: true, errorMessage: 'Failed to fetch article.' });
    } finally {
      set({ loading: false });
    }
  },

  createArticle: async (data) => {
    set({ loading: true });
    try {
      await createArticle(data);
      set({
        showSuccessModal: true,
        successMessage: 'Article created successfully!',
        error: false,
      });
    } catch (error) {
      set({ error: true });
      set({ showErrorModal: true, errorMessage: 'Failed to create article.' });
    } finally {
      set({ loading: false });
    }
  },

  updateArticleById: async (documentId, data) => {
    set({ loading: true });
    try {
      const res = await updateArticle(documentId, data);
      set({
        article: res.data.data,
        showSuccessModal: true,
        successMessage: 'Article updated successfully!',
        error: false,
      });
    } catch (error) {
      set({ error: true });
      set({ showErrorModal: true, errorMessage: 'Failed to update article.' });
    } finally {
      set({ loading: false });
    }
  },

  deleteArticleById: async (documentId) => {
    set({ loading: true });
    try {
      await deleteArticle(documentId);
      set({
        article: null,
        showSuccessModal: true,
        successMessage: 'Article deleted successfully!',
        error: false,
      });
    } catch (error) {
      set({ error: true });
      set({ showErrorModal: true, errorMessage: 'Failed to delete article.' });
    } finally {
      set({ loading: false });
    }
  },
}));
