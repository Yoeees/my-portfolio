import { Mail } from "lucide-react";
import Section from "../ui/Section";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.28 5.7.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56A10.5 10.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const contactLinks = [
  {
    label: "johnwencesponferradadumangcas@gmail.com",
    href: "mailto:johnwencesponferradadumangcas@gmail.com",
    icon: <Mail size={16} />,
  },
  {
    label: "github.com/Yoeees",
    href: "https://github.com/Yoeees",
    external: true,
    icon: <GithubIcon size={16} />,
  },
  {
    label: "linkedin.com/in/johnwences-dumangcas-5242983b4",
    href: "https://linkedin.com/in/johnwences-dumangcas-5242983b4",
    external: true,
    icon: <LinkedinIcon size={16} />,
  },
];

export default function Contact() {
  return (
    <Section id="contact" title="CONNECT">
      <div className="border-2 border-line bg-panel p-6 shadow-brutal">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          // Let&rsquo;s build something useful.
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Open to data engineering roles and collaborations. Reach out below.
        </p>
        <div className="mt-6 space-y-2">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex items-center gap-3 border-2 border-line bg-panel p-3 font-mono text-xs text-muted transition-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm hover:border-accent hover:bg-accent-soft hover:text-accent"
            >
              {link.icon}
              <span className="break-all">{link.label}</span>
            </a>
          ))}
        </div>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-soft">
          end of report
        </p>
      </div>
    </Section>
  );
}
