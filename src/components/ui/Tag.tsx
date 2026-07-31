import type { HTMLAttributes, ReactNode } from "react";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export default function Tag({ children, className = "", ...rest }: TagProps) {
  return (
    <span
      className={`font-mono border rounded px-1.5 py-0.5 ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
