import SectionTag from "./SectionTag";
import { PROJECTS, ACCENT } from "../data";

export default function Projects() {
  return (
    <section id="projects" className="py-16 scroll-mt-20">
      <SectionTag>PROJECTS</SectionTag>
      <div className="grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className={`border border-stone-200 rounded p-5 bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ${ACCENT[p.accent].hoverBorder}`}
          >
            <div className={`flex items-center justify-between font-mono text-[10px] uppercase tracking-wide ${ACCENT[p.accent].text} mb-3`}>
              <span>{p.tag}</span>
            </div>
            <p className="font-mono text-[10px] text-stone-400 mb-1">{p.period}</p>
            <h3 className="font-display font-bold text-stone-900 leading-snug">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              {p.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className={`font-mono text-[10px] ${ACCENT[p.accent].text} border ${ACCENT[p.accent].border} rounded px-1.5 py-0.5`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}