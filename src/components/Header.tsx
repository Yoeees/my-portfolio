import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between py-6 border-b border-stone-300">
      <span className="font-display font-bold text-sm tracking-wide">
        SCHWARZEL.DEV
      </span>

      <nav className="hidden sm:flex items-center gap-5 font-mono text-[11px] uppercase tracking-wide text-stone-500">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-signal transition-colors"
          >
            {link.label}
          </a>
        ))}
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

      {open && (
        <nav className="sm:hidden absolute top-full left-0 right-0 bg-paper border-b border-stone-300 font-mono text-[11px] uppercase tracking-wide text-stone-500">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-1 hover:text-signal transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
