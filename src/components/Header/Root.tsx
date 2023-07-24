import { ReactNode } from "react";

interface RootHeaderProps {
  children: ReactNode;
}

export function RootHeader({ children }: RootHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 ">
      {children}
    </header>
  );
}
