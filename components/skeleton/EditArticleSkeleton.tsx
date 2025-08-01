'use client';

export default function EditArticleSkeleton() {
  return (
    <main className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white animate-pulse">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div className="h-8 w-1/2 bg-gray-300 dark:bg-zinc-700 rounded" />
        <div className="h-6 w-20 bg-gray-300 dark:bg-zinc-700 rounded" />
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="h-4 w-32 bg-gray-300 dark:bg-zinc-700 rounded mb-2" />
            <div className="h-10 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
          </div>
        ))}

        {/* Button */}
        <div className="flex justify-end">
          <div className="h-10 w-28 bg-blue-300 dark:bg-blue-700 rounded" />
        </div>
      </div>
    </main>
  );
}
