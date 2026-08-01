import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

const VARIANT_CLASSES: Record<
  NonNullable<ButtonProps["variant"]>,
  string
> = {
  primary: "bg-accent text-white border-2 border-line shadow-brutal-sm hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-accent-bright",
  secondary: "border-2 border-line bg-panel text-muted hover:border-accent hover:text-accent hover:shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5",
  ghost: "text-muted hover:text-accent hover:bg-accent-soft",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <a
      className={`font-mono text-xs uppercase tracking-wide px-4 py-2.5 transition-brutal ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
