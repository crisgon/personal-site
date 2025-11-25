import { TalkItem } from "@/components/talk-item/talk-item";
import { talks } from "@/data/talks";
import { Metadata } from "next";
import type { Viewport } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const description =
    "Gosto de compartilhar minhas experiências e aprendizados, pois acredito no poder da colaboração e no crescimento coletivo.";
  const title = "Cristiano Gonçalves | Talks";
  const url = "https://www.cristiano.dev/talks";
  const thumb = "/thumb.png";

  return {
    title,
    openGraph: {
      url,
      images: [thumb],
      title,
      description,
    },
    category: "technology",
    twitter: {
      site: url,
      images: [thumb],
      title,
      description,
      card: "summary_large_image",
      creator: "Cristiano Gonçalves",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "black",
};

export default function Talks() {
  const sortedTalks = talks.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  );
  return (
    <main className="mb-10">
      <header className={`${roboto.className} pt-6 `}>
        <h2
          className={
            "text-transparent bg-clip-text text-5xl primary-gradient-text font-normal"
          }
        >
          Compartilhar para aprender!
        </h2>
        <p className="leading-6 text-zinc-500 pt-4 max-w-xl">
          Gosto de compartilhar minhas experiências e aprendizados, pois
          acredito no poder da colaboração e no crescimento coletivo.
        </p>
      </header>

      <section className="mt-8 flex flex-col gap-10">
        {sortedTalks.map((talk, index) => (
          <TalkItem
            key={index}
            date={talk.date}
            event={talk.event}
            link={talk.link}
            slides={talk.slides}
            title={talk.title}
          />
        ))}
      </section>
    </main>
  );
}
