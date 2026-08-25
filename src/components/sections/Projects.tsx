import { useState } from "react";
import Section from "../ui/Section";
import Tag from "../ui/Tag";
import Reveal from "../ui/Reveal";
import { ExternalLink, ChevronDown } from "lucide-react";
import { PROJECTS } from "../../data";

function ProjectCard({ p, index }: { p: (typeof PROJECTS)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="border-2 border-line bg-panel p-5 shadow-brutal">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-soft">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="text-accent">{p.tag}</span>
        <span>{p.period}</span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
        {p.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <Tag key={t} className="text-[10px]" >
            {t}
          </Tag>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 font-mono text-[10px] text-accent">
        {(p.links ?? []).map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 cursor-pointer hover:underline"
          >
            {link.label} <ExternalLink size={10} />
          </a>
        ))}
        {p.fullDesc && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 cursor-pointer hover:underline"
          >
            View_full_desc <ChevronDown size={10} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      {p.fullDesc && expanded && (
        <div className="mt-4 border-t-2 border-line pt-4 space-y-3 text-sm leading-relaxed text-muted">
          {p.fullDesc.map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h4 key={i} className="font-display text-base font-semibold text-ink pt-2">
                  {line.replace("## ", "")}
                </h4>
              );
            }
            return <p key={i}>{line}</p>;
          })}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="SYSTEM_DEPLOYS">
      <div className="space-y-4">
        {PROJECTS.slice(0, 4).map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <ProjectCard p={p} index={i} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6">
        <a
          href="/projects"
          className="inline-flex items-center gap-2 border-2 border-line bg-panel px-4 py-2 font-mono text-xs text-muted transition-brutal cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm hover:border-accent hover:text-accent"
        >
          View_All_Systems →
        </a>
      </div>
    </Section>
  );
}
