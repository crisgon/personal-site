import type { Metadata } from "next";
import { CareerItem } from "@/components/career-item/career-item";
import { career } from "@/data/about";
import { Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const description =
    "Desenvolvedor Frontend, baiano com orgulho, amante de tecnologia, música, viagens e otaku nas horas vagas.";
  const title = "Cristiano Gonçalves | Sobre";
  const url = "https://www.cristiano.dev/about";
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

export default function About() {
  return (
    <main className="mb-10 ">
      <header className={`${roboto.className} pt-6 `}>
        <h2
          className={
            "text-transparent bg-clip-text text-5xl text-white font-normal"
          }
        >
          <span className=" primary-gradient-text">Eu sou o </span>
          Cristiano Gonçalves
          <span className=" primary-gradient-text">, prazer!</span>
        </h2>
        <p className="leading-6 text-zinc-500 pt-4 max-w-xl">
          Desenvolvedor Frontend, baiano com orgulho, amante de tecnologia,
          música, viagens e otaku nas horas vagas.
        </p>
      </header>

      <section className="flex flex-col lg:flex-row-reverse gap-6">
        <div>
          <Image
            src="/cristiano.jpg"
            alt="Foto do Cristiano, autor do site"
            width={350}
            height={252}
            className="rounded-lg mb-4 mt-8 object-cover max-h-96 min-h-96 bg-top bg-[#1d1d20]"
          />
          <a
            href="https://docs.google.com/document/d/1USHzCGO5R0VN6gcJDwJBtP1bitgmOO9xoHMzDynNwlo/edit?usp=sharing"
            target="_blank"
            className="text-white flex items-center justify-center bg-zinc-700/50 bg-clip-padding backdrop-filter backdrop-blur-lg  rounded p-3 border border-white/0 hover:cursor-pointer  hover:border-white/50 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="mr-4"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <line x1="10" x2="8" y1="9" y2="9" />
            </svg>
            Download Resumo
          </a>
        </div>

        <div className="flex-1 text-white ">
          <div>
            <h2 className="py-4 mt-4 text-2xl font-normal">Bio</h2>
            <p className="leading-8">
              Como você já deve ter notado, me chamo Cristiano Gonçalves!
              Desenvolvedor frontend nascido em Alagoinhas-BA.
            </p>

            <p className="leading-8 mt-4">
              Sou baiano com orgulho, amante de tecnologias, animes/mangás,
              viagens e músicas. Gosto muito da parte criativa e visual das
              coisas, motivo pelo qual escolhi ser Desenvolvedor FrontEnd e
              ocasionalmente me aventurar no mundo do Design.
            </p>
          </div>

          <p className="leading-8 mt-4">
            Sou bacharel em Sistemas de Informação pela Universidade do Estado
            da Bahia e tenho me dedicado a aprimorar minhas habilidades como
            desenvolvedor de software, além de estudar sobre liderança e gestão.
            Também gosto de compartilhar minhas experiências e aprendizados,
            pois acredito no poder da colaboração e no crescimento coletivo.
          </p>

          <h2 className="py-4 mt-4 text-2xl font-normal">Carreira</h2>

          {career.map((c, index) => (
            <CareerItem
              key={c.title + index}
              company={c.company}
              date={c.date}
              imgUrl={c.imgUrl}
              link={c.link}
              title={c.title}
            />
          ))}

          <h2 className="text-white py-4 mt-4 text-2xl font-normal">
            Formação
          </h2>

          <CareerItem
            company="UNEB"
            date="2012 -  2018"
            imgUrl="/uneb.png"
            link="https://portal.uneb.br/campus-alagoinhas/"
            title="Bacharel em  Sistemas de Informação"
          />
        </div>
      </section>
    </main>
  );
}
