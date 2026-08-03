import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import Section from "../ui/Section";
import Tag from "../ui/Tag";
import Reveal from "../ui/Reveal";
import { WORK_EXPERIENCE, type WorkExperience as WorkExperienceItem } from "../../data";

function WorkExperienceCard({
  job,
  index,
  onImageClick,
}: {
  job: WorkExperienceItem;
  index: number;
  onImageClick: (img: string) => void;
}) {
  return (
    <article className="w-full border-2 border-line bg-panel p-5 shadow-brutal">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-soft">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="text-accent">{job.tag}</span>
        <span>{job.period}</span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
        {job.title}
      </h3>
      <p className="mt-1 text-sm text-muted">
        {job.company}{job.role && <span> · {job.role}</span>}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{job.body}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.tags.map((t) => (
          <Tag key={t} static className="text-[10px]">
            {t}
          </Tag>
        ))}
      </div>
      {(job.url || job.image) && (
        <div className="mt-3 flex gap-3 font-mono text-[10px] text-accent">
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 cursor-pointer hover:underline"
            >
              Open_Link <ExternalLink size={10} />
            </a>
          )}
          {job.image && (
            <button
              type="button"
              onClick={() => onImageClick(job.image!)}
              className="flex items-center gap-1 cursor-pointer hover:underline"
            >
              View_Certificate →
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default function WorkExperience() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage]);

  return (
    <Section id="experience" title="WORK_EXPERIENCE">
      {WORK_EXPERIENCE.length === 0 ? (
        <div className="border-2 border-dashed border-line bg-panel p-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-soft">
            no experience logged yet
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {WORK_EXPERIENCE.map((job, i) => (
            <Reveal key={i} delay={i * 80}>
              <WorkExperienceCard
                job={job}
                index={i}
                onImageClick={(img) => setSelectedImage(img)}
              />
            </Reveal>
          ))}
        </div>
      )}

      {WORK_EXPERIENCE.length > 0 && (
        <div className="mt-6">
          <a
            href="/experience"
            className="inline-flex items-center gap-2 border-2 border-line bg-panel px-4 py-2 font-mono text-xs text-muted transition-brutal cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm hover:border-accent hover:text-accent"
          >
            View_All_Experience →
          </a>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="w-full max-w-4xl border-2 border-line bg-panel shadow-brutal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-line px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                STATEMENT_VIEWER.exe
              </span>
              <button
                type="button"
                className="cursor-pointer font-mono text-xs text-muted hover:text-accent transition-colors"
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
              >
                [ESC] close
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedImage}
                alt="Statement of accomplishment"
                className="w-full object-contain border-2 border-line bg-panel-muted"
              />
            </div>
            <div className="border-t-2 border-line px-4 py-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-soft">
                // view_file --type=statement
              </p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
