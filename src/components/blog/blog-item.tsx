import Link from "next/link";

interface BlogItemProps {
  title: string;
  date: Date;
  readingTimeInSeconds: number;
  link: string;
}

export function BlogItem({
  title,
  readingTimeInSeconds,
  date,
  link,
}: BlogItemProps) {
  return (
    <Link
      href={link}
      className="block w-full rounded mb-6 p-4 hover:bg-zinc-700/30 bg-clip-padding backdrop-filter backdrop-blur-lg border border-gray-100/0 hover:border-gray-100/10 transition-all"
    >
      <h3 className="text-xl font-bold leading-6">{title}</h3>
      <div className="pt-4 flex items-center gap-4">
        <span className="text-sm text-zinc-500 font-semibold">
          {Math.round(readingTimeInSeconds / 60)} minutos
        </span>
        |
        <span className="text-sm text-zinc-500 font-semibold">
          {new Intl.DateTimeFormat("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(date)}
        </span>
      </div>
    </Link>
  );
}