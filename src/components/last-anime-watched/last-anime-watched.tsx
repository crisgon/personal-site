import { FaDisplay } from "react-icons/fa6";
import { Anime } from "./types";
import { getDiffDate } from "@/lib/date";
import { REVALIDATE_CONFIG } from "@/config/revalidate";
import { LastAnimeInfo } from "./last-anime-info";

const USERNAME = "crisgonn";

const jikanApi = process.env.NEXT_PUBLIC_JIKAN_API_URL;

function getLastUpdatesURL(user: string) {
  return `${jikanApi}/users/${USERNAME}/userupdates`;
}

async function getData(): Promise<Anime | null> {
  try {
    const lastUpdateRes = await fetch(getLastUpdatesURL(USERNAME), {
      next: {
        revalidate: REVALIDATE_CONFIG.ANIME,
      },
    });
    const lastUpdateJson = await lastUpdateRes.json();

    const lastUpdate = lastUpdateJson.data.anime[0];

    const animeInfoRes = await fetch(
      `${jikanApi}/anime/${lastUpdate.entry.mal_id}`,
    );
    const animeJson = await animeInfoRes.json();
    const anime = animeJson.data;

    return {
      synopsis: anime.synopsis,
      title: anime.title,
      japaneseTitle: anime.title_japanese,
      imageUrl: anime.images.webp.image_url,
      date: lastUpdate.date,
      episodes_seen: lastUpdate.episodes_seen,
      episodes_total: lastUpdate.episodes_total,
      score: anime.score,
    };
  } catch {
    return null;
  }
}

export async function LastAnimeWatched() {
  const lastAnime = await getData();

  if (!lastAnime) return <div className="h-10  mt-5" />;

  return (
    <div className="flex flex-col gap-4 mt-5 text-white">
      <p className="flex gap-4 items-center">
        <FaDisplay /> Ultimo anime visto
      </p>
      <div className="flex gap-2 items-center bg-neutral-900 rounded-lg overflow-hidden w-full md:w-fit pr-10 relative">
        <div className="relative">
          <img width={100} height={141.33} src={lastAnime.imageUrl} />
        </div>
        <div className="flex flex-col gap-2">
          <p title="Último anime visto">
            <strong>{lastAnime.title}</strong>
          </p>

          <p>{lastAnime.japaneseTitle}</p>

          <div className="flex gap-2 items-center justify-between">
            <span className="text-md">
              Episódio {lastAnime.episodes_seen} de {lastAnime.episodes_total}
            </span>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <span
              className="text-xs"
              title={new Date(lastAnime.date).toString()}
              suppressHydrationWarning
            >
              {getDiffDate(lastAnime.date)}
            </span>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <LastAnimeInfo
            synopsis={lastAnime.synopsis}
            name={lastAnime.title}
            japaneseName={lastAnime.japaneseTitle}
            imageUrl={lastAnime.imageUrl}
            score={lastAnime.score}
          />
        </div>
      </div>
    </div>
  );
}
