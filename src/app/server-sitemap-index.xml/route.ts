import { getAllPosts } from "@/lib/blog";
import { getServerSideSitemap } from "next-sitemap";

export async function GET(request: Request) {
  const allPosts = getAllPosts();

  return getServerSideSitemap(
    allPosts.map(post => ({
      loc: `https://www.cristiano.dev/blog/${post.slug}`,
      lastmod: post.date,
    })),
  );
}
