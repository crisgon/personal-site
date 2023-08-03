import Image from "next/image";

interface CareerItemProps {
  imgUrl: string;
  title: string;
  link: string;
  date: string;
  company: string;
}

export function CareerItem({
  date,
  imgUrl,
  link,
  title,
  company,
}: CareerItemProps) {
  return (
    <div className="flex gap-2 mb-4">
      <div className="w-8 h-8 rounded overflow-hidden">
        <Image src={imgUrl} alt={title} width={100} height={100} />
      </div>

      <div>
        <h4 className="text-white font-bold">{title}</h4>
        <p className="flex gap-2">
          <a
            href={link}
            target="_blank"
            className="primary-gradient-text border-b border-orange-600/0 hover:border-orange-600 transition-all"
          >
            {company}
          </a>
          <span className="text-zinc-500">●</span>
          <span className="text-zinc-200 font-medium">{date}</span>
        </p>
      </div>
    </div>
  );
}
