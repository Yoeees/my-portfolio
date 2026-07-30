import { GraduationCap } from "lucide-react";
import SectionTag from "./SectionTag";
import { EDUCATION, LANGUAGES } from "../data";

export default function About() {
  return (
    <section id="about" className="py-16 scroll-mt-20">
      <SectionTag>ABOUT</SectionTag>
      <div className="grid sm:grid-cols-3 gap-8">
        <p className="sm:col-span-2 text-stone-600 leading-relaxed">
          I'm a Cum Laude Computer Science graduate currently upskilling in
          data engineering while I look for my first full-time role. My
          thesis compared deep reinforcement learning algorithms for
          anomaly detection, and my OJT with DOST-Caraga put me on two
          applied AI projects — from computer vision to no-code model
          training.
        </p>
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-stone-400 mb-2 flex items-center gap-1.5">
              <GraduationCap size={13} /> Education
            </p>
            <p className="text-sm text-stone-900 font-medium">
              {EDUCATION.degree}, {EDUCATION.honor}
            </p>
            <p className="text-sm text-stone-500">
              {EDUCATION.school} · {EDUCATION.year}
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-stone-400 mb-2">
              Languages
            </p>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => (
                <span
                  key={lang}
                  className="text-xs border border-stone-300 rounded px-2 py-1 text-stone-700"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
