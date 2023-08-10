import { Comments } from "../comments/comments";

interface ArticleProps {
  title: string;
  formatedDate: string;
  content: string;
  slug: string;
}

export function Article({ title, formatedDate, content, slug }: ArticleProps) {
  return (
    <article className="article my-8 mb-10">
      <header className="mb-6">
        <h1 className="text-5xl text-white text-center py-4">{title}</h1>
        <span className="block text-center font-bold primary-gradient-text">
          {formatedDate}
        </span>
      </header>

      <div dangerouslySetInnerHTML={{ __html: content }} />

      <Comments slug={slug} />
    </article>
  );
}
