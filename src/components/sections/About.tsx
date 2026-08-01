import { GraduationCap } from "lucide-react";
import Section from "../ui/Section";
import Tag from "../ui/Tag";
import { EDUCATION, LANGUAGES } from "../../data";

export default function About() {
  return (
    <Section id="about" title="ABOUT">
      <div className="grid sm:grid-cols-3 gap-8">
        <p className="sm:col-span-2 text-muted leading-relaxed max-w-prose">
          I'm a Cum Laude Computer Science graduate currently upskilling in
          data engineering while I look for my first full-time role. My
          thesis compared deep reinforcement learning algorithms for
          anomaly detection, and my OJT with DOST-Caraga put me on two
          applied AI projects — from computer vision to no-code model
          training.
        </p>
        <div className="bg-panel border border-line rounded-lg p-5 space-y-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-accent mb-2 flex items-center gap-1.5">
              <GraduationCap size={13} /> Education
            </p>
            <p className="text-sm text-ink font-medium">
              {EDUCATION.degree}, {EDUCATION.honor}
            </p>
            <p className="text-sm text-muted">
              {EDUCATION.school} · {EDUCATION.year}
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-accent mb-2">
              Languages
            </p>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => (
                <Tag key={lang} className="text-xs border-line text-muted">
                  {lang}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
