"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface NavItemProps {
  children: ReactNode;
  name: string;
}
export function NavItem({ children, name }: NavItemProps) {
  const pathname = usePathname();
  return (
    <li className={"hover:primary-gradient-text"}>
      {children}
      {pathname.includes(name) && (
        <span className="block border-b-2 border-zinc-500" />
      )}
    </li>
  );
}
