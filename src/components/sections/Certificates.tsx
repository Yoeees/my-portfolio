import { useState, useEffect } from "react";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { CERTIFICATES, type Certificate } from "../../data";

function CertificateCard({
  cert,
  index,
  onImageClick,
}: {
  cert: Certificate;
  index: number;
  onImageClick: (img: string) => void;
}) {
  return (
    <button
      onClick={() => cert.image && onImageClick(cert.image)}
      className="w-full cursor-pointer border-2 border-line bg-panel px-5 py-4 text-left transition-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal hover:border-accent"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-soft">
            CRT-{String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-ink font-medium leading-snug">{cert.title}</h3>
        </div>
        <span className="font-mono text-[15px] text-soft">
          {cert.issuer}
          {cert.date && <span> · {cert.date}</span>}
        </span>
      </div>
      <div className="mt-2 flex gap-3 font-mono text-[10px] text-accent">
        {cert.image && <span>View_File →</span>}
      </div>
    </button>
  );
}

export default function Certificates() {
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
    <Section id="certificates" title="VERIFIED_CERTS">
      {CERTIFICATES.length === 0 ? (
        <div className="border-2 border-dashed border-line bg-panel p-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-soft">
            no certificates logged yet
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {CERTIFICATES.map((cert, i) => (
            <Reveal key={i} delay={i * 80}>
              <CertificateCard
                cert={cert}
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
                alt="Professional certificate"
                className="w-full max-h-[70vh] object-contain border-2 border-line bg-panel-muted"
              />
            </div>
            <div className="border-t-2 border-line px-4 py-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-soft">
                // view_file --type=certificate
              </p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
