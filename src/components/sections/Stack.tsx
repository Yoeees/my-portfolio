import { Check } from "lucide-react";
import Section from "../ui/Section";
import { STACK } from "../../data";

export default function Stack() {
  return (
    <Section id="stack" title="STACK">
      <div className="grid sm:grid-cols-3 gap-x-6 gap-y-5">
        {STACK.map((group) => (
          <div key={group.group}>
            <p className="font-mono text-[11px] uppercase tracking-wide text-stone-400 mb-3">
              {group.group}
            </p>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-stone-800">
                  <span className="flex items-center justify-center w-4 h-4 border border-stone-400 rounded-sm shrink-0">
                    <Check size={11} className="text-terminal" />
                  </span>
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
