export const revalidate = REVALIDATE_CONFIG.ARTICLE;

import { REVALIDATE_CONFIG } from "@/config/revalidate";

import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { getLastPost } from "@/lib/blog";

export function LastArticle() {
  const lastPostData = getLastPost();

  if (!lastPostData) return <div className="h-10 mt-5" />;

  return (
    <Link
      href={`/blog/${lastPostData.slug}`}
      className="flex items-center gap-2 bg-neutral-900 py-1 px-4 rounded-lg w-fit text-sm hover:bg-neutral-800 transition-colors duration-200"
    >
      <span className="text-pink-600">Novo artigo:</span>
      <span className="text-white">{lastPostData.title}</span>
      <FaArrowRight className="text-white" />
    </Link>
  );
}
