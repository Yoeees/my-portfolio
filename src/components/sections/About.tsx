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
            Hi there! I&rsquo;m Johnwences, and I like building things that
            work well and make sense. I&rsquo;m an aspiring data engineer with
            a strong foundation in machine learning, backend systems, and the
            kind of tooling that turns messy data into something you can
            actually trust. I care about clean code, consistent design, and
            getting the details right &mdash; not just making it work, but
            making it work well.
          </p>
          <p className="text-muted leading-relaxed">
            I&rsquo;ve built a wide range of things: a custom programming
            language with a C compiler and browser-based IDE, a full-stack
            lab reservation system with Flask and React, a reinforcement
            learning framework for IoT anomaly detection (my thesis), and
            even a 2D adventure game in GameMaker. Each project taught me
            something different, and I like that variety &mdash; it keeps me
            sharp and curious.
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
                <Tag key={lang} className="!rounded-none text-xs text-muted">
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
