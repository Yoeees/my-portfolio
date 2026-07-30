import { useEffect } from "react";
import { X, ExternalLink, FileText } from "lucide-react";
import type { Certificate } from "../data";

interface CertificateModalProps {
  cert: Certificate;
  onClose: () => void;
}

export default function CertificateModal({ cert, onClose }: CertificateModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <span className="font-mono text-xs uppercase tracking-wide text-emerald-700">
            verified credential
          </span>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-900 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {cert.image && (
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full object-contain bg-stone-50 border-b border-stone-200"
          />
        )}

        {!cert.image && cert.pdf && (
          <div className="flex items-center justify-center gap-2 py-10 bg-stone-50 border-b border-stone-200 text-stone-400">
            <FileText size={20} />
            <span className="font-mono text-xs">PDF document — no preview image yet</span>
          </div>
        )}

        <div className="p-5">
          <h3 className="font-display font-bold text-lg text-stone-900">
            {cert.title}
          </h3>
          <p className="mt-1 text-sm text-stone-500">{cert.issuer}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-stone-400">
            <span>{cert.date || "—"}</span>
            {cert.pdf && (
              <a
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-800 hover:underline"
              >
                view PDF <ExternalLink size={11} />
              </a>
            )}
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-800 hover:underline"
              >
                view credential <ExternalLink size={11} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}