import { useState } from "react";
import { ArrowLeft, ExternalLink, Moon, Sun, ChevronDown } from "lucide-react";
import { ThemeProvider } from "../lib/theme";
import { useTheme } from "../lib/theme-context";
import { PROJECTS } from "../data";
import Tag from "../components/ui/Tag";

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="border-2 border-line bg-panel p-5 shadow-brutal">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-soft">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="text-accent">{project.tag}</span>
        <span>{project.period}</span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.body}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag} className="text-[10px]" >
            {tag}
          </Tag>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 font-mono text-[10px] text-accent">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 cursor-pointer hover:underline"
          >
            View_Thesis <ExternalLink size={10} />
          </a>
        )}
        {project.fullDesc && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 cursor-pointer hover:underline"
          >
            View_full_desc <ChevronDown size={10} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      {project.fullDesc && expanded && (
        <div className="mt-4 border-t-2 border-line pt-4 space-y-3 text-sm leading-relaxed text-muted">
          {project.fullDesc.map((line, i) => {
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

function ProjectsPageContent() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-paper text-ink font-body page-enter">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 sm:px-8 lg:flex-row lg:gap-16 lg:px-12 xl:px-16">
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:max-w-xl lg:flex-col lg:justify-between py-8 lg:py-24">
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> BACK
            </a>
            <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              ALL_SYSTEMS
            </h1>
            <p className="mt-4 font-display text-lg font-semibold text-muted">
              Complete Project Archive
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              Every system I've built — from thesis research to production deployments.
              Each project represents a unique challenge in data engineering, machine learning, or full-stack development.
            </p>
          </div>

          <div className="mt-12 hidden lg:block">
            <button
              type="button"
              onClick={toggle}
              className="cursor-pointer mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              {theme === "dark" ? "LIGHT_MODE" : "DARK_MODE"}
            </button>
            <p className="font-mono text-xs uppercase tracking-widest text-soft">
              TOTAL: {PROJECTS.length} system{PROJECTS.length === 1 ? "" : "s"}
            </p>
          </div>
        </header>

        <main className="w-full pb-16 lg:w-[58%] lg:py-24">
          <div className="space-y-4">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <ThemeProvider>
      <ProjectsPageContent />
    </ThemeProvider>
  );
}
