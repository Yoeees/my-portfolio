import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`w-full max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 ${className}`}
    >
      {children}
    </div>
  );
}
