import { REVALIDATE_CONFIG } from "@/config/revalidate";

import { FiExternalLink } from "react-icons/fi";
import { FaMusic } from "react-icons/fa6";
import { Track } from "./types";
import { getDiffDate } from "@/lib/date";

const TRACK_NAME_SIZE = 40;
const LAST_USER = "cris-gonn";

const apiKey = process.env.NEXT_PUBLIC_LAST_API_KEY;
const baseApiUrl = process.env.NEXT_PUBLIC_LAST_API_URL;

function getRecentTracksURL(user: string, limit = 1) {
  return (
    baseApiUrl +
    `?method=user.getrecenttracks&user=${user}&api_key=${apiKey}` +
    `&format=json&limit=${limit}`
  );
}

async function getData(): Promise<Track | null> {
  try {
    const res = await fetch(getRecentTracksURL(LAST_USER, 1), {
      next: {
        revalidate: REVALIDATE_CONFIG.MUSIC,
      },
    });
    const json = await res.json();

    const lastTrack = json.recenttracks?.track[0];
    const isNowPlaying = lastTrack["@attr"]?.nowplaying;

    let trackDate = new Date().toString();

    if (lastTrack.date) {
      const newDate = new Date(lastTrack.date["#text"]);
      newDate.setHours(newDate.getHours() - 3);
      trackDate = newDate.toString();
    }

    return {
      name:
        lastTrack.name.length > TRACK_NAME_SIZE
          ? `${lastTrack.name.slice(0, TRACK_NAME_SIZE)}...`
          : lastTrack.name,
      artist: lastTrack.artist["#text"],
      image: lastTrack.image[1]["#text"],
      album: lastTrack.album["#text"],
      date: trackDate,
      isNowPlaying: isNowPlaying,
      url: lastTrack.url ?? null,
    };
  } catch {
    return null;
  }
}

export async function LastMusicPlayed() {
  const lastTrack = await getData();

  if (!lastTrack) return <div className="h-10  mt-5" />;

  return (
    <div className="flex flex-col gap-4 mt-5 text-white">
      <p className="flex gap-4 items-center" suppressHydrationWarning>
        <FaMusic /> Ultima música tocada
      </p>
      <div className="flex gap-2 items-center bg-neutral-900 rounded-lg overflow-hidden  w-full md:w-fit pr-10 relative">
        <div className="relative">
          <img src={lastTrack.image} />
        </div>
        <div className="flex flex-col">
          <div title={`${lastTrack.name} • ${lastTrack.album}`}>
            <p className="font-bold w-full max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis">
              {lastTrack.name} • {lastTrack.album}
            </p>
          </div>

          <div className="flex gap-2 items-end justify-between">
            <p>{lastTrack.artist}</p>
            {lastTrack.isNowPlaying ? (
              <span className="text-[10px]">agora mesmo</span>
            ) : (
              <span
                className="text-[10px]"
                title={lastTrack.date.toString()}
                suppressHydrationWarning
              >
                {getDiffDate(lastTrack.date)}
              </span>
            )}
          </div>
        </div>
        {lastTrack.url ? (
          <a
            href={lastTrack.url}
            target="_blank"
            className="absolute right-2 top-2 cursor-pointer text-xl"
          >
            <FiExternalLink />
          </a>
        ) : null}
      </div>
    </div>
  );
}
