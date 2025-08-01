
export type Category = {
  id: number;
  documentId: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: string | null;
};

export type CommentUser = {
  id: number;
  documentId: string;
  username?: string;
  email?: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: string | null;
}

export type Comment = {
  id: number;
  documentId: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: string | null;
  user?: CommentUser;
}

export type Article = {
  id: number;
  documentId: string;
  title?: string;
  description?: string;
  cover_image_url?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: string | null;
  category?: Category | null;
  comments?: Comment[] | null;
};

export type ArticlesParams = {
  page?: number;
  pageSize?: number;
  populateAll?: boolean;
  populateCommentsUser?: boolean;
  populateUser?: boolean;
  populateCategory?: boolean;
  title?: string;
  categoryName?: string;
}

export type ArticlesResponse = {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type ArticleState = {
  articles: Article[];
  setArticles: (articles: Article[] | ((prev: Article[]) => Article[])) => void
  article: Article | null;
  setArticle: (article: Article) => void;
  totalPages: number;
  loading: boolean,
  error: boolean,
  errorMessage: string,
  showErrorModal: boolean,
  setShowErrorModal: (show: boolean, message: string) => void;
  successMessage: string;
  showSuccessModal: boolean,
  setShowSuccessModal: (show: boolean, message: string) => void;
  fetchArticles: (articlesParams: ArticlesParams) => Promise<void>;
  fetchArticleById: (documentId: string) => Promise<void>;
  createArticle: (data: ArticlePayload) => Promise<void>;
  deleteArticleById: (documentId: string) => Promise<void>;
  updateArticleById: (documentId: string, data: ArticlePayload) => Promise<void>;
};

export type FormData = {
  title: string;
  description: string;
  cover_image_url?: string | FileList;
  category: string;
};

export type ArticlePayload = {
  title: string;
  description: string;
  cover_image_url: string;
  category: number;
}

