import { Roboto } from "next/font/google";
import Link from "next/link";
import { ReactNode } from "react";

const robotoWeight400 = Roboto({ weight: "400", subsets: ["latin"] });

interface NavProps {
  children: ReactNode;
}
export function Nav({ children }: NavProps) {
  return (
    <ul className={`${robotoWeight400.className} flex gap-6`}>{children}</ul>
  );
}
