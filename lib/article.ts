import api from './api';
import { ArticlesResponse, ArticlesParams } from '@/types/article';

export const getArticles = async ({
  page,
  pageSize,
  populateAll = false,
  populateCommentsUser = false,
  populateUser = false,
  populateCategory = false,
  title,
  categoryName,
}: ArticlesParams): Promise<ArticlesResponse> => {
  const params: Record<string, unknown> = {
    ...(page && { 'pagination[page]': page }),
    ...(pageSize && { 'pagination[pageSize]': pageSize }),
    ...(populateAll && { populate: '*' }),
    ...(populateCommentsUser && { 'populate[comments][populate][user]': '*' }),
    ...(populateUser && { 'populate[user]': '*' }),
    ...(populateCategory && { 'populate[category]': '*' }),
    ...(title && { 'filters[title][$eqi]': title }),
    ...(categoryName && { 'filters[category][name][$eqi]': categoryName }),
  };

  const res = await api.get<ArticlesResponse>('/articles', { params });

  return res.data;
};

export const getArticleById = async (documentId: string) => {
  const res = await api.get(`/articles/${documentId}`, {
    params: {
      populate: {
        category: true,
        comments: {
          populate: 'user',
        },
      },
    },
  });
  
  return res.data;
};

export const deleteArticle = async (documentId: string) => {
  return api.delete(`/articles/${documentId}`);
};

export const createArticle = async (data: {
  title: string;
  description: string;
  cover_image_url: string;
  category: number;
}) => {
  const res = await api.post('/articles', {
    data,
  });
  return res.data;
};

export const updateArticle = async (
  documentId: string,
  data: {
    title: string;
    description: string;
    cover_image_url: string;
    category: number;
  }
) => {
  const res = await api.put(`/articles/${documentId}`, {
    data,
  });
  return res.data;
};
