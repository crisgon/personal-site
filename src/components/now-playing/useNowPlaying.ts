import { useEffect, useState } from "react";

interface Track {
  name: string;
  artist: string;
}

export function useNowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_LAST_API_KEY;
  const baseApiUrl = process.env.NEXT_PUBLIC_LAST_API_URL;

  function getRecentTracksURL(user: string, limit = 1) {
    return (
      baseApiUrl +
      `?method=user.getrecenttracks&user=${user}&api_key=${apiKey}` +
      `&format=json&limit=${limit}`
    );
  }
  async function getData() {
    const res = await fetch(getRecentTracksURL("cris-gonn", 1));
    const json = await res.json();

    const currentTrack = json.recenttracks?.track.find(
      (t: { "@attr": { nowplaying: boolean } }) => t["@attr"]?.nowplaying,
    );

    if (currentTrack) {
      setTrack({
        name: currentTrack.name,
        artist: currentTrack.artist["#text"],
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    track,
  };
}
