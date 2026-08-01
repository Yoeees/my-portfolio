import { useMemo, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { NAV_LINKS } from "../data";
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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/80 border-b border-line">
      <div className="flex items-center justify-between py-5">
        <a href="#home" className="font-display font-bold text-sm tracking-tight">
          johnwences<span className="text-accent">.</span>dev
        </a>

        <nav className="hidden sm:flex items-center gap-6 font-mono text-xs text-muted">
          {NAV_LINKS.map((link) => {
            const isActive = link.href.slice(1) === activeSection;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-accent ${
                  isActive ? "text-ink" : ""
                }`}
              >
                <span className="text-accent">#</span> {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="text-muted hover:text-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="sm:hidden text-muted hover:text-accent transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="sm:hidden pb-4 border-b border-line font-mono text-xs text-muted">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const isActive = link.href.slice(1) === activeSection;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 transition-colors hover:text-accent ${
                      isActive ? "text-ink" : ""
                    }`}
                  >
                    <span className="text-accent">#</span> {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
