import Section from "../ui/Section";
import Tag from "../ui/Tag";
import Reveal from "../ui/Reveal";
import { PROJECTS } from "../../data";
import { ACCENT } from "../../lib/accents";

export default function Projects() {
  return (
    <Section id="projects" title="PROJECTS">
      <div className="grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="h-full">
            <article
              className={`bg-panel border border-line rounded-lg p-6 h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ${ACCENT[p.accent].hoverBorder}`}
            >
              <p
                className={`font-mono text-xs uppercase tracking-wide ${ACCENT[p.accent].text} mb-3`}
              >
                {p.tag}
              </p>
              <p className="font-mono text-xs text-soft mb-1">{p.period}</p>
              <h3 className="font-display font-semibold text-ink leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {p.body}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Tag
                    key={t}
                    className="text-[10px] border-line text-muted"
                  >
                    {t}
                  </Tag>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
