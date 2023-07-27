import fs from "fs";
import { join } from "path";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = join(process.cwd(), "posts");

interface Post {
  slug: string;
  date: string;
  formattedDate: string;
  content: string;
  readingTime: number;
  title: string;
}

interface ShortPost {
  slug: string;
  date: string;
  formattedDate: string;
  readingTime: number;
  title: string;
}

export function getPostBySlug(slug: string): Post | null {
  if (!slug) return null;

  const normalizedSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${normalizedSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const formattedDate = format(new Date(data.date), "dd MMM yyyy", {
    locale: ptBR,
  });

  return {
    slug: normalizedSlug,
    date: data.date.toString(),
    formattedDate,
    content,
    readingTime: readingTime(content).minutes,
    title: data.title,
  };
  
}

export function getAllPosts() {
  const slugs: string[] = fs.readdirSync(postsDirectory);

  const posts: ShortPost[] = slugs.reduce((allPosts, slug) => {
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
      },
    ];
  }, [] as ShortPost[]).sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1);

  return posts;
}
