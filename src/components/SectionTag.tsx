import type { ReactNode } from "react";

interface SectionTagProps {
  children: ReactNode;
}

export default function SectionTag({ children }: SectionTagProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="font-mono text-xs tracking-[0.2em] text-amber-800 border-l-2 border-amber-800 pl-2 py-0.5">
        {children}
      </span>
      <span className="h-px flex-1 border-t border-dashed border-stone-300" />
    </div>
  );
}
