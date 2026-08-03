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
  const isClickable = job.image !== undefined || job.url !== undefined;

  const content = (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-soft">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="text-accent">{job.tag}</span>
        <span>{job.period}</span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
        {job.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{job.company}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{job.body}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.tags.map((t) => (
          <Tag key={t} static className="text-[10px]">
            {t}
          </Tag>
        ))}
      </div>
      <div className="mt-3 flex gap-3 font-mono text-[10px] text-accent">
        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 cursor-pointer hover:underline"
          >
            Open_Link <ExternalLink size={10} />
          </a>
        )}
        {job.image && <span>View_File</span>}
      </div>
    </>
  );

  const className =
    "w-full border-2 border-line bg-panel p-5 text-left shadow-brutal";

  if (!isClickable) {
    return <article className={className}>{content}</article>;
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (job.image) onImageClick(job.image);
        else if (job.url) window.open(job.url, "_blank", "noreferrer");
      }}
      className={`${className} cursor-pointer`}
    >
      {content}
    </button>
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
