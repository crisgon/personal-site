"use client";

import { Bars } from "./bars/bars";
import { useNowPlaying } from "./useNowPlaying";

export function NowPlaying() {
  const { track } = useNowPlaying();

  if (!track) return <div className="h-10" />;

  return (
    <div className="flex gap-2 items-center h-10 mt-5" title="Escutando agora">
      <Bars />

      <p>
        Escutando <strong>{track.name}</strong> de {track.artist}
      </p>
    </div>
  );
}
