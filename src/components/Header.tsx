import { useMemo, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { NAV_LINKS, STATUS_LINE } from "../data";
import { useActiveSection } from "../lib/useActiveSection";
import { useTheme } from "../lib/theme-context";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const sectionIds = useMemo(
    () => NAV_LINKS.map((link) => link.href.slice(1)),
    []
  );
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:max-w-xl lg:flex-col lg:justify-between py-8 lg:py-24">
      <div>
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              ./johnwences
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Johnwences Fabe P. Dumangcas
            </h1>
            <p className="mt-4 font-display text-lg font-semibold text-muted">
              Aspiring Data Engineer
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              BS Computer Science graduate building toward data platforms,
              pipelines, and machine learning systems that make messy data
              easier to trust.
            </p>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={toggle}
              className="cursor-pointer text-muted transition-colors hover:text-accent"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              className="cursor-pointer text-muted transition-colors hover:text-accent"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <nav className={`${open ? "block" : "hidden"} mt-10 lg:block`}>
          <ul className="space-y-3 font-mono text-xs uppercase tracking-widest text-soft">
            {NAV_LINKS.map((link, index) => {
              const isActive = link.href.slice(1) === activeSection;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center gap-3 cursor-pointer transition-colors hover:text-accent ${
                      isActive ? "text-accent" : ""
                    }`}
                  >
                    <span className="text-soft">{String(index + 1).padStart(2, "0")}</span>
                    <span
                      className={`h-px transition-all ${
                        isActive
                          ? "w-12 bg-accent"
                          : "w-0 bg-line group-hover:w-12 group-hover:bg-accent"
                      }`}
                    />
                    <span>/{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
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
          STATUS: <span className="text-accent">{STATUS_LINE}</span>
        </p>
      </div>
    </header>
  );
}
