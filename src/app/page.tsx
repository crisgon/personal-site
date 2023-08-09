import { Profiler } from "@/components/profiler";
import { Metadata } from "next";

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
    themeColor: "black",
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

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center sm:items-start">
      <Profiler />
    </main>
  );
}
