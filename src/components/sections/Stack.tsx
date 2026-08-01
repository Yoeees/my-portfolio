import Section from "../ui/Section";
import { STACK } from "../../data";

export default function Stack() {
  return (
    <Section id="stack" title="TECH_STACK_GRID">
      <div className="grid gap-4 sm:grid-cols-2">
        {STACK.map((group) => (
          <div
            key={group.group}
            className="border-2 border-line bg-panel p-5 shadow-brutal-sm"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
              [{group.group}]
            </p>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border-2 border-line bg-panel-muted px-3 py-1 font-mono text-xs text-muted transition-brutal hover:border-accent hover:bg-accent-soft hover:text-accent hover:shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
