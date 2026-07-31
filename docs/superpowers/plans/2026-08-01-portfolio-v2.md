# my-portfolio-v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure and polish the Schwarzel.dev single-page portfolio in `Desktop/my-portfolio-v2` — token-driven design system, reusable UI primitives, motion, and cleaner architecture — with content identical to the original.

**Architecture:** Move section components into `src/components/sections/`, reusable primitives into `src/components/ui/`, and hooks + the accent color map into `src/lib/`. `data.ts` stays the single content source. Tailwind v4 `@theme` tokens replace ad-hoc colors/fonts.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4 (`@tailwindcss/vite`), lucide-react. No new dependencies.

## Global Constraints

- **No new dependencies.** Do not install anything.
- **Content unchanged.** Copy, names, links, certificate data, images — identical to the source. Only styling, markup structure, and file organization change.
- **Tailwind v4 tokens.** Brand colors come from `@theme` in `src/index.css`. Use `text-paper`, `bg-paper`, `text-ink`, `text-terminal`, `text-terminal-bright`, `text-signal`, `text-signal-strong`, `text-warning` utilities. Neutral grays (stone-*) stay as Tailwind defaults.
- **Type-only imports** use `import type` (`verbatimModuleSyntax` is on).
- **No unused locals/params** (`noUnusedLocals`, `noUnusedParameters` are on).
- **Run commands from `C:\Users\Johnw\OneDrive\Desktop\my-portfolio-v2`.** After every task: `npm run lint` and `npm run build` must pass.
- Do not touch `node_modules/`, `dist/`, `.git/`, or the spec file.
- Commit after each task with the given message.

---

### Task 1: Design tokens in index.css

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: nothing.
- Produces: Tailwind theme tokens `paper`, `ink`, `terminal`, `terminal-bright`, `signal`, `signal-strong`, `warning` (colors) and `display`, `body`, `mono` (fonts), replacing the manual `.font-*` classes.

- [ ] **Step 1: Replace the contents of `src/index.css`**

Current file:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500&family=IBM+Plex+Mono:wght@400;500&display=swap');

@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

.font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui; }
.font-body { font-family: 'Source Serif 4', ui-serif, Georgia, serif; }
.font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
@keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
.cursor-blink { animation: blink 1s step-end infinite; }
```

Replace with:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500&family=IBM+Plex+Mono:wght@400;500&display=swap');

@import "tailwindcss";

@theme {
  --color-paper: #f5f5f4;
  --color-ink: #1c1917;
  --color-terminal: #15803d;
  --color-terminal-bright: #16a34a;
  --color-signal: #92400e;
  --color-signal-strong: #78350f;
  --color-warning: #b91c1c;

  --font-display: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Source Serif 4', ui-serif, Georgia, serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

html {
  scroll-behavior: smooth;
}

@keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
.cursor-blink { animation: blink 1s step-end infinite; }
```

The `font-display`, `font-body`, `font-mono` utilities now come from the theme. Existing class usage still works.

- [ ] **Step 2: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: builds successfully. (Class names still compile — utilities are generated from the theme.)

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add tailwind theme tokens for colors and fonts"
```

---

### Task 2: lib/ layer — accents map and hooks

**Files:**
- Create: `src/lib/accents.ts`
- Create: `src/lib/useReducedMotion.ts`
- Create: `src/lib/useReveal.ts`

**Interfaces:**
- Consumes: `Project` type from `src/data.ts` (`accent: "emerald" | "red"`).
- Produces:
  - `export const ACCENT: Record<Project["accent"], { text: string; border: string; hoverBorder: string }>`
  - `export function useReducedMotion(): boolean`
  - `export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold?: number): { ref: React.RefObject<T | null>; visible: boolean }`

These are not imported by any component yet — that happens in later tasks. Exported symbols are fine with `noUnusedLocals`.

- [ ] **Step 1: Create `src/lib/accents.ts`**

```ts
import type { Project } from "../data";

export const ACCENT: Record<
  Project["accent"],
  { text: string; border: string; hoverBorder: string }
> = {
  emerald: {
    text: "text-terminal",
    border: "border-terminal/30",
    hoverBorder: "hover:border-terminal/60",
  },
  red: {
    text: "text-warning",
    border: "border-warning/30",
    hoverBorder: "hover:border-warning/60",
  },
};
```

- [ ] **Step 2: Create `src/lib/useReducedMotion.ts`**

```ts
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
```

- [ ] **Step 3: Create `src/lib/useReveal.ts`**

```ts
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, threshold]);

  return { ref, visible };
}
```

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 5: Commit**

```bash
git add src/lib/accents.ts src/lib/useReducedMotion.ts src/lib/useReveal.ts
git commit -m "feat: add accent map and motion hooks to lib layer"
```

---

### Task 3: ui/ primitives — Container, SectionTag, Section, Button, Tag, Reveal

**Files:**
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/SectionTag.tsx`
- Create: `src/components/ui/Section.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Tag.tsx`
- Create: `src/components/ui/Reveal.tsx`

**Interfaces:**
- Consumes: `useReveal` from `src/lib/useReveal`.
- Produces:
  - `Container({ children, className? }: { children: ReactNode; className?: string })`
  - `SectionTag({ children }: { children: ReactNode })`
  - `Section({ id, title, children, className? }: { id: string; title: string; children: ReactNode; className?: string })`
  - `Button({ children, variant?, className?, ...rest })` — anchor element; `variant?: "primary" | "secondary" | "ghost"`
  - `Tag({ children, className?, ...rest })` — span element
  - `Reveal({ children, delay?, className? }: { children: ReactNode; delay?: number; className?: string })`

The old `src/components/SectionTag.tsx` is NOT deleted yet — old sections still import it until Tasks 5–9 replace them.

- [ ] **Step 1: Create `src/components/ui/Container.tsx`**

```tsx
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`w-full max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/SectionTag.tsx`**

```tsx
import type { ReactNode } from "react";

interface SectionTagProps {
  children: ReactNode;
}

export default function SectionTag({ children }: SectionTagProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="font-mono text-xs tracking-[0.2em] text-signal border-l-2 border-signal pl-2 py-0.5">
        {children}
      </span>
      <span className="h-px flex-1 border-t border-dashed border-stone-300" />
    </div>
  );
}
```

Note: `text-amber-800` → `text-signal`, `border-amber-800` → `border-signal`.

- [ ] **Step 3: Create `src/components/ui/Reveal.tsx`**

```tsx
import type { ReactNode } from "react";
import { useReveal } from "../../lib/useReveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(8px)",
        transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
```

When reduced motion is preferred, `useReveal` sets `visible` immediately, so nothing animates.

- [ ] **Step 4: Create `src/components/ui/Section.tsx`**

```tsx
import type { ReactNode } from "react";
import SectionTag from "./SectionTag";
import Reveal from "./Reveal";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-16 scroll-mt-20 ${className}`}>
      <Reveal>
        <SectionTag>{title}</SectionTag>
      </Reveal>
      {children}
    </section>
  );
}
```

- [ ] **Step 5: Create `src/components/ui/Button.tsx`**

```tsx
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

const VARIANT_CLASSES: Record<
  NonNullable<ButtonProps["variant"]>,
  string
> = {
  primary: "bg-signal text-stone-50 hover:bg-signal-strong",
  secondary: "border border-stone-300 hover:border-signal/50",
  ghost: "text-stone-500 hover:text-signal",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <a
      className={`font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 6: Create `src/components/ui/Tag.tsx`**

```tsx
import type { HTMLAttributes, ReactNode } from "react";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export default function Tag({ children, className = "", ...rest }: TagProps) {
  return (
    <span
      className={`font-mono border rounded px-1.5 py-0.5 ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
```

Note: no base font-size — callers pass `text-[10px]` (projects) or `text-xs` (languages) via `className`.

- [ ] **Step 7: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add ui primitives container, section, button, tag, reveal"
```

---

### Task 4: Move ScanFrame, StampBadge, CertificateModal to ui/

**Files:**
- Create: `src/components/ui/ScanFrame.tsx`
- Create: `src/components/ui/StampBadge.tsx`
- Create: `src/components/ui/CertificateModal.tsx`

**Interfaces:**
- Consumes: `Certificate` type from `src/data.ts`.
- Produces: `ScanFrame({ children, className? })`, `StampBadge({ label })`, `CertificateModal({ cert, onClose })` — same APIs as the originals at `src/components/`. Old files stay until Tasks 5–9.

- [ ] **Step 1: Create `src/components/ui/ScanFrame.tsx`** — copy `src/components/ScanFrame.tsx`, changing each `border-emerald-700` to `border-terminal`:

```tsx
import type { ReactNode } from "react";

interface ScanFrameProps {
  children: ReactNode;
  className?: string;
}

export default function ScanFrame({ children, className = "" }: ScanFrameProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-terminal" />
      <span className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-terminal" />
      <span className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-terminal" />
      <span className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-terminal" />
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/StampBadge.tsx`** — copy `src/components/StampBadge.tsx`, changing `border-emerald-700` → `border-terminal` and `text-emerald-700` → `text-terminal`:

```tsx
interface StampBadgeProps {
  label: string;
}

export default function StampBadge({ label }: StampBadgeProps) {
  return (
    <span className="inline-flex items-center justify-center -rotate-6 border-2 border-dashed border-terminal text-terminal rounded-full w-16 h-16 shrink-0 text-center">
      <span className="font-mono text-[9px] font-semibold tracking-wide leading-tight">
        {label}
      </span>
    </span>
  );
}
```

- [ ] **Step 3: Create `src/components/ui/CertificateModal.tsx`** — copy `src/components/CertificateModal.tsx` exactly, changing only the type import path to `"../../data"`, and swapping `text-emerald-700` → `text-terminal`, `text-amber-800` → `text-signal`:

```tsx
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={cert.title}
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <span className="font-mono text-xs uppercase tracking-wide text-terminal">
            verified credential
          </span>
          <button
            ref={closeRef}
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
                className="flex items-center gap-1 text-signal hover:underline"
              >
                view PDF <ExternalLink size={11} />
              </a>
            )}
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-signal hover:underline"
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
```

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/ScanFrame.tsx src/components/ui/StampBadge.tsx src/components/ui/CertificateModal.tsx
git commit -m "refactor: move scan frame, stamp badge, and certificate modal to ui layer"
```

---

### Task 5: Hero → sections/ with terminal window

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Delete: `src/components/Hero.tsx`
- Modify: `src/Portfolio.tsx`

**Interfaces:**
- Consumes: `Button` from `../ui/Button`, `ScanFrame` from `../ui/ScanFrame`, avatar asset `../../assets/DUMANGCAS.png`.
- Produces: default export `Hero()` — replaces `float-left` layout with a flex row and wraps the prompt + heading in a terminal window with a title bar.

- [ ] **Step 1: Create `src/components/sections/Hero.tsx`**

```tsx
import Button from "../ui/Button";
import ScanFrame from "../ui/ScanFrame";
import avatarImg from "../../assets/DUMANGCAS.png";

export default function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-10">
        <ScanFrame className="shrink-0 self-start">
          <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full border border-stone-300 bg-white overflow-hidden">
            <img
              src={avatarImg}
              alt="Schwarzel"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink text-paper font-mono text-[9px] px-2 py-0.5 rounded">
            SAMPLE_01 · MATCH 99.2%
          </span>
        </ScanFrame>

        <div className="flex-1 w-full">
          <div className="rounded-lg overflow-hidden border border-stone-300 bg-white shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stone-200 bg-stone-50">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-wide text-stone-400">
                schwarzel.dev — shell
              </span>
            </div>
            <div className="p-5 sm:p-7">
              <p className="font-mono text-sm text-terminal mb-3 inline-flex items-center gap-1">
                <span className="text-terminal-bright">$</span>
                whoami
                <span className="cursor-blink inline-block w-[7px] h-[16px] bg-terminal align-middle" />
              </p>
              <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight">
                Johnwences Fabe P. Dumangcas
              </h1>
              <p className="font-body mt-4 text-lg sm:text-xl text-stone-600">
                Aspiring data engineer — BS Computer Science graduate from Caraga
                State University. I'm drawn to sorting signal from noise, whether
                that means building pipelines, training models, or just making
                sense of messy data.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="#certificates">View Certificates</Button>
        <Button href="#projects" variant="secondary">
          View Projects
        </Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `src/Portfolio.tsx` to import from the new path**

Change the import:
```tsx
import Hero from "./components/Hero";
```
to:
```tsx
import Hero from "./components/sections/Hero";
```

- [ ] **Step 3: Delete the old `src/components/Hero.tsx`**

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint`
Expected: no errors (old Hero gone, no dangling imports).

Run: `npm run build`
Expected: builds successfully.

Run: `npm run dev` and check at 360px / 768px / 1440px — avatar sits in a flex row beside the terminal window, no float overflow.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx src/Portfolio.tsx
git commit -m "feat: rebuild hero as terminal window with flex layout"
```

---

### Task 6: About and Stack → sections/

**Files:**
- Create: `src/components/sections/About.tsx`
- Create: `src/components/sections/Stack.tsx`
- Delete: `src/components/About.tsx`
- Delete: `src/components/Stack.tsx`
- Modify: `src/Portfolio.tsx`

**Interfaces:**
- Consumes: `Section` from `../ui/Section`, `Tag` from `../ui/Tag`, `EDUCATION`, `LANGUAGES`, `STACK` from `../../data`.
- Produces: default exports `About()` and `Stack()` using the `Section` primitive.

- [ ] **Step 1: Create `src/components/sections/About.tsx`**

```tsx
import { GraduationCap } from "lucide-react";
import Section from "../ui/Section";
import Tag from "../ui/Tag";
import { EDUCATION, LANGUAGES } from "../../data";

export default function About() {
  return (
    <Section id="about" title="ABOUT">
      <div className="grid sm:grid-cols-3 gap-8">
        <p className="sm:col-span-2 text-stone-600 leading-relaxed">
          I'm a Cum Laude Computer Science graduate currently upskilling in
          data engineering while I look for my first full-time role. My
          thesis compared deep reinforcement learning algorithms for
          anomaly detection, and my OJT with DOST-Caraga put me on two
          applied AI projects — from computer vision to no-code model
          training.
        </p>
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-stone-400 mb-2 flex items-center gap-1.5">
              <GraduationCap size={13} /> Education
            </p>
            <p className="text-sm text-ink font-medium">
              {EDUCATION.degree}, {EDUCATION.honor}
            </p>
            <p className="text-sm text-stone-500">
              {EDUCATION.school} · {EDUCATION.year}
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-stone-400 mb-2">
              Languages
            </p>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => (
                <Tag key={lang} className="text-xs border-stone-300 text-stone-700">
                  {lang}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Stack.tsx`**

```tsx
import { Check } from "lucide-react";
import Section from "../ui/Section";
import { STACK } from "../../data";

export default function Stack() {
  return (
    <Section id="stack" title="STACK">
      <div className="grid sm:grid-cols-3 gap-x-6 gap-y-5">
        {STACK.map((group) => (
          <div key={group.group}>
            <p className="font-mono text-[11px] uppercase tracking-wide text-stone-400 mb-3">
              {group.group}
            </p>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-stone-800">
                  <span className="flex items-center justify-center w-4 h-4 border border-stone-400 rounded-sm shrink-0">
                    <Check size={11} className="text-terminal" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Update `src/Portfolio.tsx` imports**

```tsx
import About from "./components/About";
import Stack from "./components/Stack";
```
to:
```tsx
import About from "./components/sections/About";
import Stack from "./components/sections/Stack";
```

- [ ] **Step 4: Delete `src/components/About.tsx` and `src/components/Stack.tsx`**

- [ ] **Step 5: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/About.tsx src/components/sections/Stack.tsx src/Portfolio.tsx
git commit -m "refactor: move about and stack to sections with section primitive"
```

---

### Task 7: Projects → sections/, accents from lib

**Files:**
- Create: `src/components/sections/Projects.tsx`
- Delete: `src/components/Projects.tsx`
- Modify: `src/Portfolio.tsx`
- Modify: `src/data.ts` (remove `ACCENT` export)

**Interfaces:**
- Consumes: `Section` from `../ui/Section`, `Tag` from `../ui/Tag`, `PROJECTS` from `../../data`, `ACCENT` from `../../lib/accents`.
- Produces: default export `Projects()` using `Section`, `Tag`, and the moved `ACCENT` map. `data.ts` no longer exports `ACCENT`.

- [ ] **Step 1: Create `src/components/sections/Projects.tsx`**

```tsx
import Section from "../ui/Section";
import Tag from "../ui/Tag";
import { PROJECTS } from "../../data";
import { ACCENT } from "../../lib/accents";

export default function Projects() {
  return (
    <Section id="projects" title="PROJECTS">
      <div className="grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            className={`border border-stone-200 rounded p-5 bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ${ACCENT[p.accent].hoverBorder}`}
          >
            <p
              className={`font-mono text-[10px] uppercase tracking-wide ${ACCENT[p.accent].text} mb-3`}
            >
              {p.tag}
            </p>
            <p className="font-mono text-[10px] text-stone-400 mb-1">
              {p.period}
            </p>
            <h3 className="font-display font-bold text-ink leading-snug">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              {p.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <Tag
                  key={t}
                  className={`text-[10px] ${ACCENT[p.accent].text} ${ACCENT[p.accent].border}`}
                >
                  {t}
                </Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Remove `ACCENT` from `src/data.ts`**

Delete this block (lines 86–89) from `src/data.ts`:
```ts
export const ACCENT: Record<Project["accent"], { text: string; border: string; hoverBorder: string }> = {
  emerald: { text: "text-emerald-700", border: "border-emerald-700/30", hoverBorder: "hover:border-emerald-600/60" },
  red: { text: "text-red-700", border: "border-red-700/30", hoverBorder: "hover:border-red-600/60" },
};
```

Keep the `Project` interface — it is still used by `PROJECTS` and by `lib/accents.ts`.

- [ ] **Step 3: Update `src/Portfolio.tsx` import**

```tsx
import Projects from "./components/Projects";
```
to:
```tsx
import Projects from "./components/sections/Projects";
```

- [ ] **Step 4: Delete `src/components/Projects.tsx`**

- [ ] **Step 5: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Projects.tsx src/data.ts src/Portfolio.tsx
git commit -m "refactor: move projects to sections and relocate accent map to lib"
```

---

### Task 8: Certificates → sections/ with reveal

**Files:**
- Create: `src/components/sections/Certificates.tsx`
- Delete: `src/components/Certificates.tsx`
- Modify: `src/Portfolio.tsx`

**Interfaces:**
- Consumes: `Section` from `../ui/Section`, `Reveal` from `../ui/Reveal`, `StampBadge` and `CertificateModal` from `../ui/`, `CERTIFICATES` and `type Certificate` from `../../data`.
- Produces: default export `Certificates()` with staggered `Reveal` on each card.

- [ ] **Step 1: Create `src/components/sections/Certificates.tsx`**

```tsx
import { useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import Section from "../ui/Section";
import StampBadge from "../ui/StampBadge";
import CertificateModal from "../ui/CertificateModal";
import Reveal from "../ui/Reveal";
import { CERTIFICATES, type Certificate } from "../../data";

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
      className="text-left relative flex flex-col border border-stone-200 rounded-lg bg-white w-full h-full hover:-translate-y-1 hover:shadow-lg hover:border-signal/40 transition-all duration-200"
    >
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
            <span className="font-mono text-[9px] uppercase tracking-wide">
              PDF on file
            </span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <StampBadge label="VERIFIED" />
          </div>
        )}
      </div>
      {cert.image && (
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-terminal border-2 border-white shadow flex items-center justify-center text-white text-[10px] font-bold">
          ✓
        </span>
      )}

      <div className="p-4">
        <h3 className="text-ink font-medium leading-snug">{cert.title}</h3>
        <p className="mt-1 text-sm text-stone-500">{cert.issuer}</p>
        <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-stone-400">
          <span>{cert.date || "—"}</span>
          {cert.url && (
            <span className="flex items-center gap-1 text-signal">
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
    <Section id="certificates" title="CERTIFICATES">
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
            <Reveal key={i} delay={i * 80} className="h-full">
              <CertificateCard cert={cert} onClick={() => setSelected(cert)} />
            </Reveal>
          ))}
        </div>
      )}

      {selected && (
        <CertificateModal cert={selected} onClose={() => setSelected(null)} />
      )}
    </Section>
  );
}
```

- [ ] **Step 2: Update `src/Portfolio.tsx` import**

```tsx
import Certificates from "./components/Certificates";
```
to:
```tsx
import Certificates from "./components/sections/Certificates";
```

- [ ] **Step 3: Delete `src/components/Certificates.tsx`**

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Certificates.tsx src/Portfolio.tsx
git commit -m "refactor: move certificates to sections with staggered reveal"
```

---

### Task 9: Contact → sections/

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Delete: `src/components/Contact.tsx`
- Modify: `src/Portfolio.tsx`

**Interfaces:**
- Consumes: `Section` from `../ui/Section`, `Mail` from lucide-react.
- Produces: default export `Contact()` using the `Section` primitive with `className="border-t border-stone-300"`. Inline GitHub/LinkedIn SVG icon components kept as-is.

- [ ] **Step 1: Create `src/components/sections/Contact.tsx`**

```tsx
import { Mail } from "lucide-react";
import Section from "../ui/Section";

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
    <Section id="contact" title="CONTACT" className="border-t border-stone-300">
      <p className="text-stone-600">
        Open to data engineering roles and collaborations. Reach out below.
      </p>
      <dl className="mt-5 font-mono text-xs divide-y divide-stone-200 border-t border-b border-stone-200 max-w-md">
        <div className="flex items-center gap-3 py-2.5">
          <dt className="w-6 text-stone-400">
            <Mail size={14} />
          </dt>
          <dd>
            <a
              href="mailto:johnwencesponferradadumangcas@gmail.com"
              className="break-all hover:text-signal transition-colors"
            >
              johnwencesponferradadumangcas@gmail.com
            </a>
          </dd>
        </div>
        <div className="flex items-center gap-3 py-2.5">
          <dt className="w-6 text-stone-400">
            <GithubIcon size={14} />
          </dt>
          <dd>
            <a
              href="https://github.com/Yoeees"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-signal transition-colors"
            >
              github.com/Yoeees
            </a>
          </dd>
        </div>
        <div className="flex items-center gap-3 py-2.5">
          <dt className="w-6 text-stone-400">
            <LinkedinIcon size={14} />
          </dt>
          <dd>
            <a
              href="https://linkedin.com/in/johnwences-dumangcas-5242983b4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-signal transition-colors"
            >
              linkedin.com/in/johnwences-dumangcas-5242983b4
            </a>
          </dd>
        </div>
      </dl>
      <p className="mt-10 font-mono text-[10px] text-stone-400">
        end of report.
      </p>
    </Section>
  );
}
```

- [ ] **Step 2: Update `src/Portfolio.tsx` import**

```tsx
import Contact from "./components/Contact";
```
to:
```tsx
import Contact from "./components/sections/Contact";
```

- [ ] **Step 3: Delete `src/components/Contact.tsx`**

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Contact.tsx src/Portfolio.tsx
git commit -m "refactor: move contact to sections"
```

---

### Task 10: Header polish, Portfolio composition, cleanup

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/Portfolio.tsx`
- Delete: `src/components/SectionTag.tsx`

**Interfaces:**
- Consumes: `Container` from `./components/ui/Container`, `NAV_LINKS` from `./data`.
- Produces: `Header()` using tokens (`text-signal`, `bg-paper`); `Portfolio()` wrapping content in `Container` with token-based page background.

- [ ] **Step 1: Update `src/components/Header.tsx`**

Replace the whole file with:
```tsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between py-6 border-b border-stone-300">
      <span className="font-display font-bold text-sm tracking-wide">
        SCHWARZEL.DEV
      </span>

      <nav className="hidden sm:flex items-center gap-5 font-mono text-[11px] uppercase tracking-wide text-stone-500">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-signal transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="sm:hidden text-stone-500 hover:text-signal transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <nav className="sm:hidden absolute top-full left-0 right-0 bg-paper border-b border-stone-300 font-mono text-[11px] uppercase tracking-wide text-stone-500">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-1 hover:text-signal transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
```

Changes: `hover:text-amber-800` → `hover:text-signal` (nav links, icon button, mobile links), mobile menu `bg-stone-100` → `bg-paper`.

- [ ] **Step 2: Replace `src/Portfolio.tsx`**

```tsx
import Header from "./components/Header";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Stack from "./components/sections/Stack";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";
import Container from "./components/ui/Container";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body bg-[radial-gradient(circle,rgba(120,113,108,0.18)_1px,transparent_1px)] bg-[length:18px_18px]">
      <Container>
        <Header />
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Certificates />
        <Contact />
      </Container>
    </div>
  );
}
```

Changes: `bg-stone-100` → `bg-paper`, `text-stone-900` → `text-ink`, `font-body` moved from the inner div to the outer div, and the inner max-width div is now the `Container` component.

- [ ] **Step 3: Delete `src/components/SectionTag.tsx`**

All remaining imports of it were replaced in Tasks 5–9. Verify with a grep for `SectionTag` from `"./SectionTag"` or `"./components/SectionTag"` — none should remain except `src/components/ui/SectionTag.tsx`.

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: builds successfully.

Run: `npm run dev` — check header, sections, and mobile menu at 360px / 768px / 1440px.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/Portfolio.tsx
git commit -m "refactor: apply tokens to header and compose portfolio with container"
```

---

### Task 11: Reveal on project cards and final verification

**Files:**
- Modify: `src/components/sections/Projects.tsx`

**Interfaces:**
- Consumes: `Reveal` from `../ui/Reveal`, existing `Projects()` structure from Task 7.
- Produces: `Projects()` with each card wrapped in `Reveal`, staggered by index.

- [ ] **Step 1: Wrap project cards in `Reveal`**

Replace the entire contents of `src/components/sections/Projects.tsx` with:

```tsx
import Section from "../ui/Section";
import Tag from "../ui/Tag";
import Reveal from "../ui/Reveal";
import { PROJECTS } from "../../data";
import { ACCENT } from "../../lib/accents";

export default function Projects() {
  return (
    <Section id="projects" title="PROJECTS">
      <div className="grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="h-full">
            <article
              className={`border border-stone-200 rounded p-5 bg-white h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ${ACCENT[p.accent].hoverBorder}`}
            >
              <p
                className={`font-mono text-[10px] uppercase tracking-wide ${ACCENT[p.accent].text} mb-3`}
              >
                {p.tag}
              </p>
              <p className="font-mono text-[10px] text-stone-400 mb-1">
                {p.period}
              </p>
              <h3 className="font-display font-bold text-ink leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                {p.body}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Tag
                    key={t}
                    className={`text-[10px] ${ACCENT[p.accent].text} ${ACCENT[p.accent].border}`}
                  >
                    {t}
                  </Tag>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 3: Full visual verification**

Run: `npm run dev` and open the site. Confirm:
- 360px: stacked hero (avatar above terminal), hamburger menu works, no horizontal scroll.
- 768px: hero side-by-side, cards 2-col.
- 1440px: 3-col certificates, comfortable spacing.
- Scroll reveals section headers and cards; with OS reduced-motion on, content shows without animation.

- [ ] **Step 4: Final commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: add staggered reveal to project cards"
```
