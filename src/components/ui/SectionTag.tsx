import type { ReactNode } from "react";

interface SectionTagProps {
  children: ReactNode;
}

export default function SectionTag({ children }: SectionTagProps) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
        // {children}
      </span>
      <span className="h-px flex-1 border-t border-dashed border-line" />
    </div>
  );
}
