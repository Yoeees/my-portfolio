import type { HTMLAttributes, ReactNode } from "react";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  static?: boolean;
}

export default function Tag({ children, className = "", static: isStatic, ...rest }: TagProps) {
  return (
    <span
      className={`font-mono border-2 rounded px-1.5 py-0.5 ${
        isStatic
          ? ""
          : "transition-brutal cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm hover:border-accent hover:bg-accent-soft hover:text-accent"
      } ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
