/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useArticleStore } from '@/store/articleStore';
import ArticleDetailSkeleton from '@/components/skeleton/ArticleDetailSkeleton';
import SuccessModal from '@/components/modals/SuccessModal';
import ErrorModal from '@/components/modals/ErrorModal';

export default function ArticleDetailPage() {
  const { documentId } = useParams();
  const router = useRouter();
  const {loading, error, article, fetchArticleById, deleteArticleById } = useArticleStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showErrorDetail, setShowErrorDetail] = useState(error);

  useEffect(() => {
    if (documentId && typeof documentId === 'string') {
      fetchArticleById(documentId);
    }
  }, [documentId, fetchArticleById]);

  const handleDelete = async () => {
    const confirmed = confirm('Yakin ingin menghapus artikel ini?');
    if (!confirmed || typeof documentId !== 'string') return;

    try {
      await deleteArticleById(documentId);
      setShowSuccess(true);
      router.push('/');
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white">
      {(loading || !article)  ? (
         <ArticleDetailSkeleton />
      ) : (
      <>
        <div className="mb-6 flex justify-between items-center">
            <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
            </Link>
            <div className="space-x-2">
            <Link
                href={`/edit/${article.documentId}`}
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded"
            >
                Edit
            </Link>
            <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
            >
                Delete
            </button>
            </div>
        </div>
            
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Title + Metadata */}
            <div>
            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {article.createdAt &&
                new Date(article.createdAt).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                })}
                {' · '}
                {article.category?.name || 'Uncategorized'}
            </p>
            </div>

            {/* Image */}
            {article.cover_image_url && (
            <div>
                <img
                src={article.cover_image_url}
                alt={article.title || ''}
                className="rounded shadow-md w-full h-[400px] object-cover"
                />
            </div>
            )}

            {/* Grid Layout for Description and Comments */}
            <div className="grid md:grid-cols-3 gap-8">
            {/* Description */}
            <div className="md:col-span-2">
                <p className="text-lg leading-relaxed">{article.description}</p>
            </div>

            {/* Comments */}
            <aside>
                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                {article.comments && article.comments.length > 0 ? (
                <ul className="space-y-4">
                    {article.comments.map((comment) => (
                    <li key={comment.id} className="border-b pb-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                        {comment.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                        By {comment.user?.username || 'Anonymous'} on{' '}
                        {new Date(comment.createdAt ?? '').toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}
                        </p>
                    </li>
                    ))}
                </ul>
                ) : (
                <p className="text-sm text-gray-500">No comments yet.</p>
                )}
            </aside>
            </div>
        </div>
      </>
      )}
      <SuccessModal
        message="Article deleted successfully!"
        show={showSuccess}
        setShow={setShowSuccess}
        onClose={() => router.push("/")}
      />

      <ErrorModal
        message="Failed to deleted article. Please try again."
        show={showError}
        setShow={setShowError}
        onClose={() => router.push("/")}
      />

      <ErrorModal
        message="Failed to display the article. Please try again."
        show={showErrorDetail}
        setShow={setShowErrorDetail}
      />
    </main>
  );
}
