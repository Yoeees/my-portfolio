export default function Header() {
  return (
    <header className="flex items-center justify-between py-6 border-b border-stone-300">
      <span className="font-display font-bold text-sm tracking-wide">
        SCHWARZEL
      </span>
      <nav className="hidden sm:flex items-center gap-5 font-mono text-[11px] uppercase tracking-wide text-stone-500">
        <a href="#about" className="hover:text-amber-800 transition-colors">About</a>
        <a href="#stack" className="hover:text-amber-800 transition-colors">Stack</a>
        <a href="#projects" className="hover:text-amber-800 transition-colors">Projects</a>
        <a href="#certificates" className="hover:text-amber-800 transition-colors">Certificates</a>
        <a href="#contact" className="hover:text-amber-800 transition-colors">Contact</a>
      </nav>
    </header>
  );
}
