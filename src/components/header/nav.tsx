import { ReactNode } from "react";

interface NavProps {
  children: ReactNode;
}
export function Nav({ children }: NavProps) {
  return <ul className={"flex gap-6"}>{children}</ul>;
}
