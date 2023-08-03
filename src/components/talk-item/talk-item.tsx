interface TalkItemProps {
  title: string;
  date: string;
  event: string;
  link: string | null;
  slides: string | null;
}

interface LinkProps {
  link: string;
  title: string;
}

function Link({ link, title }: LinkProps) {
  return (
    <a
      href={link}
      target="_blank"
      className="flex items-center justify-center bg-zinc-700/50 bg-clip-padding backdrop-filter backdrop-blur-lg  rounded p-2 text-sm cursor-pointer hover:bg-gradient-to-r from-orange-600 to-pink-600 transition-all"
    >
      {title}
    </a>
  );
}
export function TalkItem({ date, link, event, title, slides }: TalkItemProps) {
  return (
    <div>
      <span className="text-zinc-500  py-2">
        {event},{" "}
        {new Intl.DateTimeFormat("pt-BR", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }).format(new Date(date))}
      </span>
      <h3 className="py-2 text-lg font-semibold">{title}</h3>

      <div className="flex gap-4">
        {link && <Link title="Ver mais sobre" link={link} />}

        {slides && <Link title="Slides" link={slides} />}
      </div>
    </div>
  );
}
