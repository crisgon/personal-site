import { Article } from "@/components/article/article";
import { convertMarkdownToHtml, getPostBySlug } from "@/lib/blog";

interface BlogPostProps {
  params: { slug: string };
}

export default async function BlogPost({ params }: BlogPostProps) {
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
    />
  );
}
