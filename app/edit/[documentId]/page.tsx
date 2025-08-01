'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';

import { useArticleStore } from '@/store/articleStore';
import { useCategoryStore } from '@/store/categoryStore';
import { ArticlePayload } from '@/types/article';
import EditArticleSkeleton from '@/components/skeleton/EditArticleSkeleton';
import SuccessModal from '@/components/modals/SuccessModal';
import ErrorModal from '@/components/modals/ErrorModal';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  cover_image_url: z.string().url('Must be a valid image URL'),
  category: z.number(),
});

type FormInputs = z.infer<typeof schema>;

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const documentId = Array.isArray(params?.documentId)
    ? params.documentId[0]
    : params?.documentId;

  const { loading, article, fetchArticleById, updateArticleById } = useArticleStore();
  const { loading: loadCategories, categories, fetchCategories } = useCategoryStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (documentId && typeof documentId === 'string') {
      fetchArticleById(documentId);
      fetchCategories();
    }
  }, [documentId, fetchArticleById, fetchCategories]);

  useEffect(() => {
    if (article) {
      reset({
        title: article.title ?? '',
        description: article.description ?? '',
        cover_image_url: article.cover_image_url ?? '',
        category: article.category?.id ?? 0,
      });
    }
  }, [article, reset]);

  if (!documentId) return;
  const onSubmit = async (values: ArticlePayload) => {
    try {
      await updateArticleById(documentId, values);
      setShowSuccess(true);
      router.push(`/detail/${documentId}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch(error) {
      setShowError(true)
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white">
      {(loading || loadCategories || !article) ? (
        <EditArticleSkeleton />
      ) : (
      <>
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Edit Article</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              {...register('title')}
              className="w-full px-4 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Cover Image URL</label>
            <input
              {...register('cover_image_url')}
              className="w-full px-4 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
            />
            {errors.cover_image_url && (
              <p className="text-red-500 text-sm mt-1">{errors.cover_image_url.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              {...register('category')}
              className="w-full px-4 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.documentId} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </>
      )}
      <SuccessModal
        message="Article edited successfully!"
        show={showSuccess}
        setShow={setShowSuccess}
        onClose={() => router.push(`/detail/${documentId}`)}
      />
            
      <ErrorModal
        message="Failed to edited article. Please try again."
        show={showError}
        setShow={setShowError}
        onClose={() => router.push(`/detail/${documentId}`)}
      />
    </main>
  );
}
