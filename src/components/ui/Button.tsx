import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

const VARIANT_CLASSES: Record<
  NonNullable<ButtonProps["variant"]>,
  string
> = {
  primary: "bg-accent text-panel hover:bg-accent-bright",
  secondary: "border border-line hover:border-accent text-muted hover:text-accent",
  ghost: "text-muted hover:text-accent",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <a
      className={`font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
