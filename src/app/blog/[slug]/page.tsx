import type { Metadata } from "next";
import type { Viewport } from "next";

import { Article } from "@/components/article/article";
import {
  convertMarkdownToHtml,
  getPostBySlug,
  replaceCharForAScapeCode,
} from "@/lib/blog";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  props: BlogPostProps,
): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  const normalizedPostTitle = replaceCharForAScapeCode(
    post?.title ?? null,
    "&",
    "%26",
  );

  const featuredImage = `https://www.cristiano.dev/api/og?title=${normalizedPostTitle}&date=${post?.formattedDate}`;
  const description = post?.resume ?? "";
  const url = `https://www.cristiano.dev/blog/${params.slug}`;
  const title = `${post?.title} | Cristiano Gonçalves`;
  const author = "Cristiano Gonçalves";

  return {
    title,
    description,
    openGraph: {
      url,
      images: featuredImage,
      title,
      description,
      type: "article",
      authors: author,
    },
    category: "technology",
    twitter: {
      site: url,
      images: featuredImage,
      title,
      description,
      card: "summary_large_image",
      creator: author,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "black",
};

export default async function BlogPost(props: BlogPostProps) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return <p>Error</p>;
  }
  const content = await convertMarkdownToHtml(post.content);

  return (
    <Article
      title={post.title}
      formatedDate={post.formattedDate}
      content={`${content}`}
      slug={params.slug}
    />
  );
}
