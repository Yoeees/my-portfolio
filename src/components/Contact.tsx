import { Mail } from "lucide-react";
import SectionTag from "./SectionTag";

// GitHub and LinkedIn were removed from lucide-react in v1.0 (brand icons
// were dropped entirely) — using small inline SVGs instead.
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.28 5.7.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56A10.5 10.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <footer id="contact" className="py-16 border-t border-stone-300 scroll-mt-20">
      <SectionTag>CONTACT</SectionTag>
      <p className="text-stone-600 ">
        Open to data engineering roles and collaborations. Reach out below.
      </p>
      <dl className="mt-5 font-mono text-xs divide-y divide-stone-200 border-t border-b border-stone-200 max-w-md">
        <div className="flex items-center gap-3 py-2.5">
          <dt className="w-6 text-stone-400"><Mail size={14} /></dt>
          <dd>
            <a href="mailto:johnwencesponferradadumangcas@gmail.com" className="hover:text-amber-800 transition-colors">
              johnwencesponferradadumangcas@gmail.com
            </a>
          </dd>
        </div>
        <div className="flex items-center gap-3 py-2.5">
          <dt className="w-6 text-stone-400"><GithubIcon size={14} /></dt>
          <dd>
            <a href="https://github.com/Yoeees" target="_blank" rel="noopener noreferrer" className="hover:text-amber-800 transition-colors">
            github.com/Yoeees
            </a>
          </dd>
        </div>
        <div className="flex items-center gap-3 py-2.5">
          <dt className="w-6 text-stone-400"><LinkedinIcon size={14} /></dt>
          <dd>
            <a href="https://linkedin.com/in/johnwences" target="_blank" rel="noopener noreferrer" className="hover:text-amber-800 transition-colors">
              linkedin.com/in/johnwences-dumangcas-5242983b4
            </a>
          </dd>
        </div>
      </dl>
      <p className="mt-10 font-mono text-[10px] text-stone-400">
        end of report.
      </p>
    </footer>
  );
}