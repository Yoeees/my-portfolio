import { ExternalLink } from "lucide-react";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { CERTIFICATES } from "../../data";

export default function Certificates() {
  return (
    <Section id="certificates" title="CERTIFICATES">
      {CERTIFICATES.length === 0 ? (
        <div className="border border-dashed border-line rounded p-8 text-center">
          <p className="font-mono text-xs text-soft">
            no certificates logged yet — add entries to the CERTIFICATES
            array in data.ts to populate this section.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {CERTIFICATES.map((cert, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="bg-panel border border-line rounded-lg px-5 py-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-ink font-medium leading-snug">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted">{cert.issuer}</p>
                <span className="font-mono text-[10px] text-soft">
                  {cert.date || "—"}
                </span>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto flex items-center gap-1 text-sm text-accent hover:underline"
                  >
                    view credential <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
