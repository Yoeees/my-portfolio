import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { COURSES, type Course } from "../../data";

function CourseCard({
  course,
  onImageClick,
}: {
  course: Course;
  onImageClick: (img: string) => void;
}) {
  return (
    <button
      onClick={() => course.image && onImageClick(course.image)}
      className="text-left w-full border border-line rounded-lg bg-panel p-5 hover:-translate-y-1 hover:shadow-lg hover:border-accent/40 transition-all duration-200"
    >
      <h3 className="text-ink font-medium leading-snug">{course.title}</h3>
      <p className="mt-1 text-sm text-muted">{course.issuer}</p>
      <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-soft">
        <span>{course.date || "—"}</span>
        {course.url && (
          <span className="flex items-center gap-1 text-accent">
            view <ExternalLink size={10} />
          </span>
        )}
        {course.image && (
          <span className="flex items-center gap-1 text-accent">
            view statement
          </span>
        )}
      </div>
    </button>
  );
}

export default function Courses() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Section id="courses" title="COURSES">
      {COURSES.length === 0 ? (
        <div className="border border-dashed border-line rounded p-8 text-center">
          <p className="font-mono text-xs text-soft">
            no courses logged yet — add entries to the COURSES array in data.ts.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((course, i) => (
            <Reveal key={i} delay={i * 80}>
              <CourseCard
                course={course}
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
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Section>
  );
}
