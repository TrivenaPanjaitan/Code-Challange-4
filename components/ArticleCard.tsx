/* eslint-disable @next/next/no-img-element */
type Props = {
  title?: string;
  description?: string;
  image?: string;
  postedDate?: string | Date;
  category?: string;
};

export default function ArticleCard({
  title,
  description,
  image,
  postedDate,
  category,
}: Readonly<Props>) {
  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition border dark:border-zinc-700">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        <div className="flex justify-between text-xs text-gray-400 mt-3">
          <span>{postedDate?.toString()}</span>
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
}
