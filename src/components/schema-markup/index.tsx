import { getAllPosts } from "@/lib/blog";
import Script from "next/script";

export function SchemaMarkup() {
  const articles = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Cristiano Gonçalves",
    url: "https://www.cristiano.dev/blog",
    description: `Aqui você encontra todos os ${articles.length} artigos que escrevi enquanto aprendia sobre desenvolvimento web, engenharia de software, carreira e liderança.`,
    publisher: {
      "@type": "Organization",
      name: "Cristiano Gonçalves",
      logo: {
        "@type": "ImageObject",
        url: "https://www.cristiano.dev/_next/image?url=%2Fcristiano.jpg&w=256&q=75",
        width: 80,
        height: 106,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.cristiano.dev",
    },
    author: {
      "@type": "Person",
      name: "Cristiano Gonçalves",
      url: "https://www.cristiano.dev/about",
    },
    blogPost: [
      ...articles.map(article => ({
        "@type": "BlogPosting",
        headline: article.title,
        image: article.featuredImage,
        editor: "Cristiano Gonçalves",
        genre: "Frontend Development",
        keywords: "frontend javascript typescript react css carreira",
        wordCount: article.content.split(" ").length,
        publisher: {
          "@type": "Organization",
          name: "Cristiano Gonçalves",
        },
        url: `https://www.cristiano.dev/blog/${article.slug}`,
        datePublished: article.date,
        dateModified: article.date,
        author: {
          "@type": "Person",
          name: "Cristiano Gonçalves",
        },
        description: article.resume,
        articleBody: article.content,
      })),
    ],
  };
  return (
    <Script type="application/ld+json" async>
      {JSON.stringify(blogSchema)}
    </Script>
  );
}
