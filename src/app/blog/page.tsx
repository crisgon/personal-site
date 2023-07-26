import { Roboto } from "next/font/google";
import { BlogList } from "../../components/blog/blog-list";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function Blog() {
  return (
    <main className="flex flex-1 flex-col">
      <header className={`${roboto.className} pt-6`}>
        <h2
          className={
            "text-transparent bg-clip-text text-5xl font-normal primary-gradient-text"
          }
        >
          Compartilhar para aprender!
        </h2>
        <p className="leading-6 text-zinc-500 pt-4 max-w-xl">
          Aqui você encontra todos os{" "}
          <strong className="text-white">30 artigos</strong> que escrevi
          enquanto aprendia sobre desenvolvimento web, engenharia de software,
          carreira e liderança.
        </p>
      </header>

      <BlogList
        posts={[
          {
            id: "1",
            title: "Meus erros e aprendizados em 1 ano como Tech Lead",
            date: new Date(),
            readingTimeInSeconds: 60,
            link: "/titulo_1",
          },
          {
            id: "2",
            title: "Entendendo Variáveis CSS",
            date: new Date(),
            readingTimeInSeconds: 120,
            link: "/titulo_2",
          },
          {
            id: "1",
            title: "Meus erros e aprendizados em 1 ano como Tech Lead",
            date: new Date(),
            readingTimeInSeconds: 60,
            link: "/titulo_1",
          },
          {
            id: "2",
            title: "Entendendo Variáveis CSS",
            date: new Date(),
            readingTimeInSeconds: 120,
            link: "/titulo_2",
          },
          {
            id: "1",
            title: "Meus erros e aprendizados em 1 ano como Tech Lead",
            date: new Date(),
            readingTimeInSeconds: 60,
            link: "/titulo_1",
          },
          {
            id: "2",
            title: "Entendendo Variáveis CSS",
            date: new Date(),
            readingTimeInSeconds: 120,
            link: "/titulo_2",
          },
          {
            id: "1",
            title: "Meus erros e aprendizados em 1 ano como Tech Lead",
            date: new Date(),
            readingTimeInSeconds: 60,
            link: "/titulo_1",
          },
          {
            id: "2",
            title: "Entendendo Variáveis CSS",
            date: new Date(),
            readingTimeInSeconds: 120,
            link: "/titulo_2",
          },
        ]}
      />
    </main>
  );
}
