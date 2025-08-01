export default function ArticleCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden shadow border dark:border-zinc-700 animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-zinc-700" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-300 dark:bg-zinc-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-full" />
        <div className="flex justify-between">
          <div className="h-3 w-1/4 bg-gray-200 dark:bg-zinc-600 rounded" />
          <div className="h-3 w-1/4 bg-gray-200 dark:bg-zinc-600 rounded" />
        </div>
      </div>
    </div>
  );
}
