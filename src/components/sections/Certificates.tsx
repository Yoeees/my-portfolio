import { ExternalLink } from "lucide-react";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { CERTIFICATES } from "../../data";

export default function Certificates() {
  return (
    <Section id="certificates" title="VERIFIED_CERTS">
      {CERTIFICATES.length === 0 ? (
        <div className="border-2 border-dashed border-line bg-panel p-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-soft">
            no certificates logged yet
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {CERTIFICATES.map((cert, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group border-2 border-line bg-panel px-5 py-4 transition-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal hover:border-accent">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-soft">
                    CRT-{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-ink font-medium leading-snug group-hover:text-accent">
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
                      className="ml-auto flex items-center gap-1 font-mono text-xs text-accent hover:underline"
                    >
                      View_File <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
