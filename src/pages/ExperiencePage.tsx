import { ArrowLeft, Moon, Sun } from "lucide-react";
import { ThemeProvider } from "../lib/theme";
import { useTheme } from "../lib/theme-context";
import { WORK_EXPERIENCE } from "../data";
import Tag from "../components/ui/Tag";

function ExperiencePageContent() {
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
              ALL_EXPERIENCE
            </h1>
            <p className="mt-4 font-display text-lg font-semibold text-muted">
              Complete Work Experience
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              Every role I've held — from internships to professional positions.
              Each experience shaped my approach to data engineering and software development.
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
              TOTAL: {WORK_EXPERIENCE.length} role{WORK_EXPERIENCE.length === 1 ? "" : "s"}
            </p>
          </div>
        </header>

        <main className="w-full pb-16 lg:w-[58%] lg:py-24">
          <div className="space-y-4">
            {WORK_EXPERIENCE.map((job, i) => (
              <article
                key={job.title}
                className="border-2 border-line bg-panel p-5 shadow-brutal"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-soft">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-accent">{job.tag}</span>
                  <span>{job.period}</span>
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
                  {job.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {job.company}{job.role && <span> · {job.role}</span>}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{job.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <Tag key={tag} static className="text-[10px]">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <ThemeProvider>
      <ExperiencePageContent />
    </ThemeProvider>
  );
}
