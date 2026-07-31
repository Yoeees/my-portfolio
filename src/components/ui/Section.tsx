import type { ReactNode } from "react";
import SectionTag from "./SectionTag";
import Reveal from "./Reveal";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-16 scroll-mt-20 ${className}`}>
      <Reveal>
        <SectionTag>{title}</SectionTag>
      </Reveal>
      {children}
    </section>
  );
}
