import Section from "../ui/Section";
import Tag from "../ui/Tag";
import Reveal from "../ui/Reveal";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "../../data";

export default function Projects() {
  return (
    <Section id="projects" title="SYSTEM_DEPLOYS">
      <div className="space-y-4">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <article className="border-2 border-line bg-panel p-5 shadow-brutal">
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-soft">
                <span>{String(i + 1).padStart(2, "0")}</span>
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
              {p.url && (
                <div className="mt-3 flex gap-3 font-mono text-[10px] text-accent">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 cursor-pointer hover:underline"
                  >
                    View_Thesis <ExternalLink size={10} />
                  </a>
                </div>
              )}
            </article>
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
