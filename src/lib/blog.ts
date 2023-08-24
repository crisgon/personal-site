import fs from "fs";
import { join } from "path";
import RSS from "rss";
import { formatDate } from "./date";
import matter from "gray-matter";
import readingTime from "reading-time";
import showdown from "showdown";
import showdownHighlight from "showdown-highlight";

const postsDirectory = join(process.cwd(), "posts/published");

interface Post {
  slug: string;
  date: string;
  formattedDate: string;
  content: string;
  readingTime: number;
  title: string;
  featuredImage: string | null;
  resume: string | null;
}

export function getPostBySlug(slug: string): Post | null {
  if (!slug) return null;

  const normalizedSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${normalizedSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const formattedDate = formatDate(new Date(data.date), "short");

  return {
    slug: normalizedSlug,
    date: data.date.toString(),
    formattedDate,
    content,
    readingTime: readingTime(content).minutes,
    title: data.title,
    featuredImage: data.featuredImage ?? null,
    resume: data.resume ?? null,
  };
}

export function getAllPosts() {
  const slugs: string[] = fs.readdirSync(postsDirectory);

  const posts: Post[] = slugs
    .reduce((allPosts, slug) => {
      const post = getPostBySlug(slug);
      if (!post) return allPosts;

      return [
        ...allPosts,
        {
          title: post?.title,
          date: post?.date,
          formattedDate: post?.formattedDate,
          readingTime: post?.readingTime,
          slug: post?.slug,
          featuredImage: null,
          resume: null,
          content: post?.content,
        },
      ];
    }, [] as Post[])
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return posts;
}

export async function convertMarkdownToHtml(markdown: string) {
  const converter = new showdown.Converter({
    extensions: [
      showdownHighlight({
        pre: true,
        auto_detection: true,
      }),
    ],
  });

  const result = converter.makeHtml(markdown);

  return result.toString();
}

export function replaceCharForAScapeCode(
  text: string | null,
  char: string,
  scapeCode: string,
) {
  if (!text) return text;

  return text.replaceAll(char, scapeCode);
}

export async function generateRssFeed(allPosts: Post[]) {
  const site_url = process.env.SITE_URL;

  if (!site_url) return;

  const feedOptions = {
    title: "Blog| RSS Feed",
    description:
      "Aqui você encontra todos os artigos que escrevi enquanto aprendia sobre desenvolvimento web, engenharia de software, carreira e liderança.",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    pubDate: new Date(),
  };

  const feed = new RSS(feedOptions);

  allPosts.map(post => {
    feed.item({
      title: post.title,
      description: post.content.slice(0, 500),
      url: `${site_url}/blog/${post.slug}`,
      date: post.date,
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
