import { LastAnimeWatched } from "@/components/last-anime-watched/last-anime-watched";
import { LastArticle } from "@/components/last-article";
import { LastMusicPlayed } from "@/components/last-music-played/last-music-played";
import { LastMusicPlayedSkeleton } from "@/components/last-music-played/skeleton";
import { Profiler } from "@/components/profiler";
import { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { Suspense } from "react";
import type { Viewport } from "next";
import { LastAnimeWatchedSkeleton } from "@/components/last-anime-watched/skeleton";
import { LastArticleSkeleton } from "@/components/last-article/skeleton";

export async function generateMetadata(): Promise<Metadata> {
  const description =
    "Sou baiano com orgulho, amante de tecnologias, animes/mangás, viagens e músicas. Gosto muito da parte criativa e visual das coisas, motivo pelo qual escolhi ser Desenvolvedor FrontEnd e ocasionalmente me aventurar no mundo do Design.";
  const title = "Cristiano Gonçalves";
  const url = "https://www.cristiano.dev";
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

const roboto = Roboto_Condensed({ weight: "400", subsets: ["latin"] });

export default async function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center sm:items-start">
      <div className={`${roboto.className} flex flex-col gap-4`}>
        <Profiler />

        <Suspense fallback={<LastArticleSkeleton />}>
          <LastArticle />
        </Suspense>

        <Suspense fallback={<LastMusicPlayedSkeleton />}>
          <LastMusicPlayed />
        </Suspense>

        <Suspense fallback={<LastAnimeWatchedSkeleton />}>
          <LastAnimeWatched />
        </Suspense>
      </div>
    </main>
  );
}
