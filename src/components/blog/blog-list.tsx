import { BlogItem } from "./blog-item";

interface Post {
  id: string;
  title: string;
  date: Date;
  readingTimeInSeconds: number;
  link: string;
}

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="mt-8">
      {posts.map(post => (
        <BlogItem
          key={post.id}
          title={post.title}
          readingTimeInSeconds={post.readingTimeInSeconds}
          date={post.date}
          link={post.link}
        />
      ))}
    </div>
  );
}
