'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useArticleStore } from '@/store/articleStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useEffect, useState } from 'react';
import SuccessModal from '@/components/modals/SuccessModal';
import ErrorModal from '@/components/modals/ErrorModal';

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(5, 'Description is required'),
  cover_image_url: z.string().url('Invalid URL'),
  category: z.string().min(1, 'Category is required'),
});

type FormInputs = z.infer<typeof schema>;

export default function CreateArticlePage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const { createArticle } = useArticleStore();
  const { categories, fetchCategories } = useCategoryStore();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await createArticle({
        title: data.title,
        description: data.description,
        cover_image_url: data.cover_image_url,
        category: Number(data.category),
      });
      setShowSuccess(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setShowError(true)
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 text-gray-800 dark:text-white flex items-center justify-center">
      <div className="w-full max-w-xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold  mb-6 text-center">Create New Article</h1>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              {...register('title')}
              className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={5}
              className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Cover Image URL</label>
            <input
              {...register('cover_image_url')}
              className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
            />
            {errors.cover_image_url && <p className="text-red-500 text-sm">{errors.cover_image_url.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <select
              {...register('category')}
              className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Create Article
          </button>
        </form>
      </div>

      <SuccessModal
        message="Article created successfully!"
        show={showSuccess}
        setShow={setShowSuccess}
        onClose={() => router.push("/")}
      />
      
      <ErrorModal
        message="Failed to created article. Please try again."
        show={showError}
        setShow={setShowError}
        onClose={() => router.push("/")}
      />
    </main>
  );
}
