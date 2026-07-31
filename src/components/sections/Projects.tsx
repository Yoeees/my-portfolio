import Section from "../ui/Section";
import Tag from "../ui/Tag";
import { PROJECTS } from "../../data";
import { ACCENT } from "../../lib/accents";

export default function Projects() {
  return (
    <Section id="projects" title="PROJECTS">
      <div className="grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            className={`border border-stone-200 rounded p-5 bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ${ACCENT[p.accent].hoverBorder}`}
          >
            <p
              className={`font-mono text-[10px] uppercase tracking-wide ${ACCENT[p.accent].text} mb-3`}
            >
              {p.tag}
            </p>
            <p className="font-mono text-[10px] text-stone-400 mb-1">
              {p.period}
            </p>
            <h3 className="font-display font-bold text-ink leading-snug">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              {p.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <Tag
                  key={t}
                  className={`text-[10px] ${ACCENT[p.accent].text} ${ACCENT[p.accent].border}`}
                >
                  {t}
                </Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
