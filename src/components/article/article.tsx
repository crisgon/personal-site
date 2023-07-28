interface ArticleProps {
  title: string;
  formatedDate: string;
  content: string;
}

export function Article({ title, formatedDate, content }: ArticleProps) {
  return (
    <article className="article my-8">
      <header className="mb-6">
        <h1 className="text-5xl text-white text-center py-4">{title}</h1>
        <span className="block text-center font-bold primary-gradient-text">{formatedDate}</span>
      </header>

      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
