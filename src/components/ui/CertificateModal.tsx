import { useEffect, useRef } from "react";
import { X, ExternalLink, FileText } from "lucide-react";
import type { Certificate } from "../../data";

interface CertificateModalProps {
  cert: Certificate;
  onClose: () => void;
}

export default function CertificateModal({ cert, onClose }: CertificateModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener("keydown", onTab);
    return () => dialog.removeEventListener("keydown", onTab);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={cert.title}
        className="bg-panel rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <span className="font-mono text-xs uppercase tracking-wide text-accent">
            verified credential
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            className="text-soft hover:text-ink transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {cert.image && (
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full object-contain bg-panel-muted border-b border-line"
          />
        )}

        {!cert.image && cert.pdf && (
          <div className="flex items-center justify-center gap-2 py-10 bg-panel-muted border-b border-line text-soft">
            <FileText size={20} />
            <span className="font-mono text-xs">PDF document — no preview image yet</span>
          </div>
        )}

        <div className="p-5">
          <h3 className="font-display font-bold text-lg text-ink">
            {cert.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-soft">
            <span>{cert.date || "—"}</span>
            {cert.pdf && (
              <a
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent hover:underline"
              >
                view PDF <ExternalLink size={11} />
              </a>
            )}
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent hover:underline"
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
