import { BlogItem } from "./blog-item";

interface Post {
  slug: string;
  title: string;
  formattedDate: string;
  readingTime: number;
}

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="mt-8">
      {posts.map(post => (
        <BlogItem
          key={post.slug}
          title={post.title}
          readingTimeInSeconds={post.readingTime}
          formattedDate={post.formattedDate}
          link={`blog/${post.slug}`}
        />
      ))}
    </div>
  );
}
