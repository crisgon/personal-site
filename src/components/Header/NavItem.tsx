import { ReactNode } from "react";

interface NavItemProps {
  children: ReactNode;
}
export function NavItem({ children }: NavItemProps) {
  return <li className="hover:primary-gradient-text">{children}</li>;
}
