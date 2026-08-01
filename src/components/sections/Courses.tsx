import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { COURSES, type Course } from "../../data";

function CourseCard({
  course,
  index,
  onImageClick,
}: {
  course: Course;
  index: number;
  onImageClick: (img: string) => void;
}) {
  return (
    <button
      onClick={() => course.image && onImageClick(course.image)}
      className="group w-full border-2 border-line bg-panel px-5 py-4 text-left transition-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal hover:border-accent"
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-soft">
          CRS-{String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-ink font-medium leading-snug group-hover:text-accent">
          {course.title}
        </h3>
        <p className="text-sm text-muted">{course.issuer}</p>
        <span className="font-mono text-[10px] text-soft">
          {course.date || "—"}
        </span>
      </div>
      <div className="mt-2 flex gap-3 font-mono text-[10px] text-accent">
        {course.url && (
          <span className="flex items-center gap-1">
            Open_Link <ExternalLink size={10} />
          </span>
        )}
        {course.image && <span>View_File</span>}
      </div>
    </button>
  );
}

export default function Courses() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Section id="courses" title="COMPLETED_COURSES">
      {COURSES.length === 0 ? (
        <div className="border-2 border-dashed border-line bg-panel p-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-soft">
            no courses logged yet
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {COURSES.map((course, i) => (
            <Reveal key={i} delay={i * 80}>
              <CourseCard
                course={course}
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
          <button
            type="button"
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <img
            src={selectedImage}
            alt="Statement of accomplishment"
            className="max-w-full max-h-[90vh] object-contain border-2 border-line bg-panel shadow-brutal-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Section>
  );
}
