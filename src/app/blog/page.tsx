import { Roboto } from "next/font/google";
import { BlogList } from "../../components/blog/blog-list";
import { generateRssFeed, getAllPosts } from "@/lib/blog";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default async function Blog() {
  const allPosts = getAllPosts();
  await generateRssFeed(allPosts);

  return (
    <main className="flex flex-1 flex-col mb-10">
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
          <strong className="text-white">{allPosts.length} artigos</strong> que
          escrevi enquanto aprendia sobre desenvolvimento web, engenharia de
          software, carreira e liderança.
        </p>
      </header>

      <BlogList posts={allPosts} />
    </main>
  );
}
