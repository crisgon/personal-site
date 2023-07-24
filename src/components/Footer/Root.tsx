import { ReactNode } from "react";

interface RootProps {
  children: ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <footer className="flex justify-center items-center">{children}</footer>
  );
}
