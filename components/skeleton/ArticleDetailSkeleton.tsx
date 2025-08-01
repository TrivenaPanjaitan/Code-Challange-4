'use client';

export default function ArticleDetailSkeleton() {
  return (
    <main className="min-h-screen p-6 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white animate-pulse">
      <div className="mb-6 flex justify-between items-center">
        <div className="h-6 w-32 bg-gray-300 dark:bg-zinc-700 rounded" />
        <div className="space-x-2 flex">
          <div className="h-8 w-16 bg-yellow-300 dark:bg-yellow-600 rounded" />
          <div className="h-8 w-16 bg-red-400 dark:bg-red-600 rounded" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Title & Metadata */}
        <div>
          <div className="h-8 w-3/4 bg-gray-300 dark:bg-zinc-700 rounded mb-2" />
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-zinc-700 rounded" />
        </div>

        {/* Image Placeholder */}
        <div className="h-[400px] w-full bg-gray-200 dark:bg-zinc-800 rounded shadow-md" />

        {/* Grid Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="h-4 w-full bg-gray-300 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-full bg-gray-300 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-zinc-700 rounded" />
          </div>

          {/* Comments */}
          <aside>
            <div className="h-6 w-24 bg-gray-300 dark:bg-zinc-700 rounded mb-4" />
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2 border-b pb-4">
                  <div className="h-4 w-full bg-gray-300 dark:bg-zinc-700 rounded" />
                  <div className="h-3 w-1/2 bg-gray-300 dark:bg-zinc-700 rounded" />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
