import type { ReactNode } from "react";
import { useReveal } from "../../lib/useReveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(8px)",
        transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
