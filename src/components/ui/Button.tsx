import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

const VARIANT_CLASSES: Record<
  NonNullable<ButtonProps["variant"]>,
  string
> = {
  primary: "bg-signal text-stone-50 hover:bg-signal-strong",
  secondary: "border border-stone-300 hover:border-signal/50",
  ghost: "text-stone-500 hover:text-signal",
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
