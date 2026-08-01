import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data";
import { useActiveSection } from "../lib/useActiveSection";

export default function Header() {
  const [open, setOpen] = useState(false);

  const sectionIds = useMemo(
    () => NAV_LINKS.map((link) => link.href.slice(1)),
    []
  );
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/80 border-b border-stone-300">
      <div className="flex items-center justify-between py-6">
        <span className="font-display font-bold text-sm tracking-wide">
          SCHWARZEL.DEV
        </span>

        <nav className="hidden sm:flex items-center gap-5 font-mono text-[11px] uppercase tracking-wide text-stone-400">
          {NAV_LINKS.map((link) => {
            const isActive = link.href.slice(1) === activeSection;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative transition-colors hover:text-signal ${
                  isActive ? "text-ink" : ""
                }`}
              >
                {isActive && (
                  <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-signal" />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          className="sm:hidden text-stone-500 hover:text-signal transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="sm:hidden pb-4 border-b border-stone-300 font-mono text-[11px] uppercase tracking-wide text-stone-500">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const isActive = link.href.slice(1) === activeSection;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 px-1 transition-colors hover:text-signal ${
                      isActive ? "text-ink" : ""
                    }`}
                  >
                    {link.label}
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
