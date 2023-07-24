import { ReactNode } from "react";

interface SocialLinksProps {
  children: ReactNode;
}

export function SocialLinks({ children }: SocialLinksProps) {
  return <ul className="flex gap-12">{children}</ul>;
}
