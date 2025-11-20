import { BlogItem } from "./blog-item";
import { BackToTop } from "../back-to-top/back-to-top";

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
      <BackToTop />
    </div>
  );
}
