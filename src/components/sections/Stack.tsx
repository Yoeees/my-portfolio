import { Check } from "lucide-react";
import Section from "../ui/Section";
import { STACK } from "../../data";

export default function Stack() {
  return (
    <Section id="stack" title="STACK">
      <div className="grid sm:grid-cols-3 gap-x-6 gap-y-5">
        {STACK.map((group) => (
          <div key={group.group}>
            <p className="font-mono text-xs uppercase tracking-wide text-accent mb-3">
              {group.group}
            </p>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1 text-sm text-ink"
                >
                  <Check size={12} className="text-accent shrink-0" />
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
