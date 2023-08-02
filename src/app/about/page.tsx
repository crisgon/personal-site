import { CareerItem } from "@/components/career-item/career-item";
import { career } from "@/data/about";
import { Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function About() {
  return (
    <main className="mb-10">
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

      <section className="flex flex-col lg:flex-row gap-6">
        <div className="w-full max-w-sm h-60 lg:h-80 flex justify-center items-center rounded overflow-hidden m-auto mt-8">
          <Image
            src="/cristiano.jpg"
            alt="Foto do Cristiano, autor do site"
            width={350}
            height={252}
            className="w-full"
          />
        </div>

        <div className="flex-1">
          <div>
            <h2 className="text-white py-4 mt-4 text-2xl font-normal">Bio</h2>
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
        </div>
      </section>

      <section>
        <p className="leading-8 mt-4">
          Sou bacharel em Sistemas de Informação pela Universidade do Estado da
          Bahia e tenho me dedicado a aprimorar minhas habilidades como
          desenvolvedor de software, além de estudar sobre liderança e gestão.
          Também gosto de compartilhar minhas experiências e aprendizados no
          mundo, pois acredito no poder da colaboração e no crescimento
          coletivo.
        </p>

        <h2 className="text-white py-4 mt-4 text-2xl font-normal">Carreira</h2>

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

        <h2 className="text-white py-4 mt-4 text-2xl font-normal">Formação</h2>

        <CareerItem
          company="UNEB"
          date="2012 -  2018"
          imgUrl="/uneb.png"
          link="https://portal.uneb.br/campus-alagoinhas/"
          title="Bacharel em  Sistemas de Informação"
        />
      </section>
    </main>
  );
}
