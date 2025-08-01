'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ArticleCard from '@/components/ArticleCard';
import ArticleCardSkeleton from '@/components/skeleton/ArticleCardSkeleton';
import LogoutButton from '@/components/LogoutButton';
import { deleteArticle } from '@/lib/article';
import { useArticleStore } from '@/store/articleStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useRouter } from 'next/navigation';
import SuccessModal from '@/components/modals/SuccessModal';
import ErrorModal from '@/components/modals/ErrorModal';

// 🔍 Filter Schema
const filterSchema = z.object({
  title: z.string().max(100, 'Judul terlalu panjang').optional(),
  category: z.string().optional(),
});

type FilterFormInputs = z.infer<typeof filterSchema>;

export default function HomePage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const {
    loading,
    articles,
    setArticles,
    totalPages,
    fetchArticles,
  } = useArticleStore();
  const { loading: loadCategories, categories, fetchCategories } = useCategoryStore();
  const [page, setPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [documentIdDelete, setDocumentIdDelete] = useState('');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterFormInputs>({
    resolver: zodResolver(filterSchema),
  });


  const handleDelete = async (documentId: string) => {
    const confirmed = confirm('Yakin ingin menghapus artikel ini?');
    if (!confirmed) return;

    try {
      await deleteArticle(documentId);
      setDocumentIdDelete(documentId);
      setShowSuccess(true);
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setShowError(true);
    }
  };

  const onCloseDelete = () => {
    setArticles((prev) => prev.filter((item) => item.documentId !== documentIdDelete))
  }

  const onSubmit = (data: FilterFormInputs) => {
    setArticles([]);
    setPage(1);
    setSearchTitle(data.title || '');
    setSearchCategory(data.category || '');
  };
  
  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMoreRef, page, totalPages, loading]);

  // Fetch Articles when page, title, or category changes
  useEffect(() => {
    const fetchData = async () => {
      await fetchArticles({
        page,
        pageSize: 6,
        populateCategory: !searchTitle && !searchCategory,
        title: searchTitle,
        categoryName: searchCategory,
      });
    };

    fetchData();
  }, [page, searchTitle, searchCategory, fetchArticles]);

  useEffect(() => {
    fetchArticles({});
    fetchCategories();
  }, [fetchArticles, fetchCategories]);

  return (
    <main className="min-h-screen p-6 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Explore Travel Articles</h1>
        <div className="flex gap-2">
          <Link
            href="/create"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            + Create
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* 🔍 Filter Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-4 mb-6">
        <input
          {...register('title')}
          disabled={loading}
          placeholder="Search by title..."
          className={`flex-1 px-4 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}

        {loadCategories ? (
          <SelectCategorySkeleton />
        ) : (
          <select
            {...register('category')}
            className="px-4 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name.toString()}>
                {cat.name}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Search
        </button>
      </form>
      <SuccessModal
        message="Article deleted successfully!"
        show={showSuccess}
        setShow={setShowSuccess}
        onClose={onCloseDelete}
      />
      <ErrorModal
        message="Failed to deleted article. Please try again."
        show={showError}
        setShow={setShowError}
      />
      {/* 📄 Article List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && articles.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))
          : articles.map((item) => (
              <div key={item.id} className="relative">
                <Link href={`/detail/${item.documentId}`} className="block hover:opacity-90 transition">
                  <ArticleCard
                    title={item.title}
                    description={item.description}
                    image={item.cover_image_url}
                    postedDate={
                      item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '-'
                    }
                    category={item.category?.name || ' '}
                  />
                </Link>

                <div className="absolute top-2 right-2 flex space-x-2">
                  <Link
                    href={`/edit/${item.documentId}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 text-xs rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.documentId)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>

      {/* 🌀 Load More */}
      <div ref={loadMoreRef} className="h-10 mt-8 flex justify-center items-center">
        {loading && <p>Loading more articles...</p>}
      </div>
    </main>
  );
}

function SelectCategorySkeleton() {
  return (
    <div className="px-4 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 animate-pulse">
      <div className="h-5 w-32 bg-gray-300 dark:bg-zinc-600 rounded" />
    </div>
  );
}
