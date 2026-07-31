import type { ReactNode } from "react";

interface ScanFrameProps {
  children: ReactNode;
  className?: string;
}

export default function ScanFrame({ children, className = "" }: ScanFrameProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-terminal" />
      <span className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-terminal" />
      <span className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-terminal" />
      <span className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-terminal" />
      {children}
    </div>
  );
}
