import Link from "next/link";

interface BlogItemProps {
  title: string;
  formattedDate: string;
  readingTimeInSeconds: number;
  link: string;
}

export function BlogItem({
  title,
  readingTimeInSeconds,
  formattedDate,
  link,
}: BlogItemProps) {
  return (
    <Link
      href={link}
      className="block w-full rounded mb-6 -ml-4 p-4 hover:bg-zinc-700/30 bg-clip-padding backdrop-filter backdrop-blur-lg border border-gray-100/0 hover:border-gray-100/10 transition-all"
    >
      <h3 className="text-white text-xl font-bold leading-6">{title}</h3>
      <div className="pt-4 flex items-center gap-4">
        <span className="text-sm text-zinc-500 font-semibold">
          {Math.round(readingTimeInSeconds)} minutos
        </span>
        <span className="text-white">|</span>
        <span className="text-sm text-zinc-500 font-semibold">
          {formattedDate}
        </span>
      </div>
    </Link>
  );
}
