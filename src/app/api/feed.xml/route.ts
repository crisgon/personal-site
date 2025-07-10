import { getAllPosts } from "@/lib/blog";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: "Cristiano Gonçalves - Blog - Frontend",
    description: "I do stuff.",
    feed_url: "https://cristiano.dev/feed.xml",
    site_url: "https://cristiano.dev",
    copyright: `Copyright ${new Date().getFullYear()}, Cristiano Goncalves`,
    language: "pt-BR",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const posts = getAllPosts();

  posts.forEach(p => {
    feed.item({
      title: p.title,
      description: p.resume ?? p.content.slice(0, 100) + "...",
      url: `https://www.cristiano.dev/blog/${p.slug}`,
      author: "Cristiano Gonçalves",
      date: p.date,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
