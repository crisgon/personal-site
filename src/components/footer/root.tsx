import { ReactNode } from "react";

interface RootProps {
  children: ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <footer className="flex justify-center items-center py-6 px-4 md:py-8 md:px-6">
      {children}
    </footer>
  );
}
