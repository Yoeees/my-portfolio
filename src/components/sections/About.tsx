import { GraduationCap } from "lucide-react";
import Section from "../ui/Section";
import Tag from "../ui/Tag";
import { EDUCATION, LANGUAGES } from "../../data";

export default function About() {
  return (
    <Section id="about" title="SYSTEM_USER">
      <div className="space-y-4">
        <div className="border-2 border-line bg-panel p-5 shadow-brutal-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
            personal_profile
          </p>
          <p className="text-muted leading-relaxed">
            I'm a Cum Laude Computer Science graduate currently upskilling in
            data engineering while I look for my first full-time role. My
            thesis compared deep reinforcement learning algorithms for anomaly
            detection, and my OJT with DOST-Caraga put me on two applied AI
            projects — from computer vision to no-code model training.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border-2 border-line bg-panel p-5 shadow-brutal-sm">
            <p className="font-mono text-xs uppercase tracking-wide text-accent mb-2 flex items-center gap-1.5">
              <GraduationCap size={13} /> env_education
            </p>
            <p className="text-sm text-ink font-medium">
              {EDUCATION.degree}, {EDUCATION.honor}
            </p>
            <p className="text-sm text-muted">
              {EDUCATION.school} · {EDUCATION.year}
            </p>
          </div>
          <div className="border-2 border-line bg-panel p-5 shadow-brutal-sm">
            <p className="font-mono text-xs uppercase tracking-wide text-accent mb-3">
              env_languages
            </p>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => (
                <Tag key={lang} className="text-xs text-muted">
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
