"use client";
import React, { useEffect, useRef } from "react";

export function Comments({ slug }: { slug: string }) {
  const commentBox = useRef<any>(null);

  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.setAttribute("data-theme", "noborder_dark");
    scriptElement.setAttribute("src", "https://giscus.app/client.js");
    scriptElement.setAttribute("crossorigin", "anonymous");
    scriptElement.setAttribute("data-repo", "crisgon/personal-site");
    scriptElement.setAttribute("data-repo-id", "R_kgDOKAIEcg");
    scriptElement.setAttribute("data-mapping", "pathname");
    scriptElement.setAttribute("data-category", "General");
    scriptElement.setAttribute("data-category-id", "DIC_kwDOKAIEcs4CYgDG");
    scriptElement.setAttribute("data-strict", "pathname");
    scriptElement.setAttribute("data-reactions-enabled", "1");
    scriptElement.setAttribute("data-emit-metadata", "0");
    scriptElement.setAttribute("data-input-position", "bottom");
    scriptElement.setAttribute("data-lang", "pt");
    scriptElement.setAttribute("data-loading", "lazy");

    commentBox.current?.replaceChildren(scriptElement);
  }, [slug]);

  return <div className="mt-10" ref={commentBox} />;
}
