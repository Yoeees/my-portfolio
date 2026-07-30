import { useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import SectionTag from "./SectionTag";
import StampBadge from "./StampBadge";
import CertificateModal from "./CertificateModal";
import { CERTIFICATES, type Certificate } from "../data";

function CertificateCard({
  cert,
  onClick,
}: {
  cert: Certificate;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left relative flex flex-col border border-stone-200 rounded-lg bg-white w-full hover:-translate-y-1 hover:shadow-lg hover:border-amber-800/40 transition-all duration-200"
    >
      {/* Landscape preview frame — object-contain guarantees the whole
          certificate is visible regardless of its actual aspect ratio,
          instead of guessing a crop box and cutting off edges */}
      <div className="aspect-[4/3] bg-stone-50 border-b border-stone-200 rounded-t-lg overflow-hidden">
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-contain p-2"
          />
        ) : cert.pdf ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-stone-300">
            <FileText size={28} />
            <span className="font-mono text-[9px] uppercase tracking-wide">PDF on file</span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <StampBadge label="VERIFIED" />
          </div>
        )}
      </div>
      {cert.image && (
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-700 border-2 border-white shadow flex items-center justify-center text-white text-[10px] font-bold">
          ✓
        </span>
      )}

      <div className="p-4">
        <h3 className="text-stone-900 font-medium leading-snug">
          {cert.title}
        </h3>
        <p className="mt-1 text-sm text-stone-500">{cert.issuer}</p>
        <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-stone-400">
          <span>{cert.date || "—"}</span>
          {cert.url && (
            <span className="flex items-center gap-1 text-amber-800">
              view <ExternalLink size={10} />
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default function Certificates() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-16 scroll-mt-20">
      <SectionTag>CERTIFICATES</SectionTag>

      {CERTIFICATES.length === 0 ? (
        <div className="border border-dashed border-stone-300 rounded p-8 text-center">
          <p className="font-mono text-xs text-stone-400">
            no certificates logged yet — add entries to the CERTIFICATES
            array in data.ts to populate this section.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATES.map((cert, i) => (
            <CertificateCard
              key={i}
              cert={cert}
              onClick={() => setSelected(cert)}
            />
          ))}
        </div>
      )}

      {selected && (
        <CertificateModal cert={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}