# Work Experience Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `WORK_EXPERIENCE` section that hosts the DOST-Caraga OJT card (clickable to show its certificate image in a modal) while keeping the thesis card in Projects.

**Architecture:** Content stays in `data.ts` (single source of truth). A new `WorkExperience.tsx` section reuses the card layout from `Projects.tsx` and the image-modal pattern from `Courses.tsx`. `PROJECTS` is reduced to the thesis entry only.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, lucide-react.

## Global Constraints

- No new dependencies; no test framework exists — verification is `npm run lint` and `npm run build`.
- Section header text uses terminal/mono style (`WORK_EXPERIENCE`); nav labels are human-readable ("Work Experience").
- Card layout mirrors the existing Projects cards: mono header row (`0X`, tag, period), title, body, tags.
- Modal behavior copied verbatim from `Courses.tsx`: fixed overlay, backdrop click + `[ESC]` close, "STATEMENT_VIEWER.exe" header.
- Files follow existing structure: section components in `src/components/sections/`, content + types in `src/data.ts`.

---

### Task 1: Update data — move OJT into WORK_EXPERIENCE, trim PROJECTS

**Files:**
- Modify: `src/data.ts:16-30` (types), `src/data.ts:71-88` (PROJECTS), append `WORK_EXPERIENCE`

**Interfaces:**
- Consumes: nothing (existing `Course` type as reference for `image`/`url` optional fields).
- Produces:
  - `WorkExperience` interface with `tag: string; title: string; company: string; period: string; body: string; tags: string[]; image?: string; url?: string;`
  - `WORK_EXPERIENCE: WorkExperience[]` (1 entry: the DOST OJT card)
  - `PROJECTS: Project[]` (reduced to the thesis entry only)
  - `NAV_LINKS` gains `{ href: "#experience", label: "Work Experience" }` after Stack, before Projects.

- [ ] **Step 1: Add the `WorkExperience` interface**

Add after the `Course` interface (line 29) in `src/data.ts`:

```ts
export interface WorkExperience {
  tag: string;
  title: string;
  company: string;
  period: string;
  body: string;
  tags: string[];
  image?: string;
  url?: string;
}
```

- [ ] **Step 2: Trim `PROJECTS` to the thesis entry only**

Replace lines 71-88 in `src/data.ts` so `PROJECTS` contains only the first object (the "RL for IoT Anomaly Detection" thesis entry, unchanged fields). Delete the second object (the Robusta coffee OJT entry).

- [ ] **Step 3: Add `WORK_EXPERIENCE` array**

Append after `PROJECTS`:

```ts
export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    tag: "OJT · DEFECT DETECTION",
    title: "Robusta Coffee Defect Detection + No-Code Training Platform",
    company: "DOST-Caraga",
    period: "On-the-Job Training, DOST-Caraga",
    body:
      "Built a YOLO-based mobile app that flags defects in Robusta coffee beans bean-by-bean, and contributed to a no-code platform that lets non-technical users train their own detection models.",
    tags: ["YOLO", "Computer Vision", "Mobile", "No-Code ML"],
    image: undefined,
    url: undefined,
  },
];
```

- [ ] **Step 4: Add nav link**

In `NAV_LINKS` (lines 38-45), insert after the Stack entry and before the Projects entry:

```ts
  { href: "#experience", label: "Work Experience" },
```

- [ ] **Step 5: Verify**

Run: `npm run lint`
Expected: no lint errors.

Run: `npm run build`
Expected: TypeScript compiles and Vite builds successfully.

- [ ] **Step 6: Commit**

```bash
git add src/data.ts
git commit -m "feat: add work experience data, trim projects to thesis"
```

---

### Task 2: Create the WorkExperience section component

**Files:**
- Create: `src/components/sections/WorkExperience.tsx`

**Interfaces:**
- Consumes: `Section` (`src/components/ui/Section.tsx`, props `id: string`, `title: string`, `children`), `Reveal` (`src/components/ui/Reveal.tsx`, prop `delay?: number`), `WORK_EXPERIENCE` and `WorkExperience` from `../../data`, `ExternalLink` from `lucide-react`.
- Produces: default-exported `WorkExperience` component (renders `<Section id="experience" title="WORK_EXPERIENCE">`).

- [ ] **Step 1: Write the component**

Create `src/components/sections/WorkExperience.tsx`:

```tsx
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
    <button
      onClick={() => job.image && onImageClick(job.image)}
      className="w-full cursor-pointer border-2 border-line bg-panel p-5 text-left shadow-brutal"
    >
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
          <span className="flex items-center gap-1">
            Open_Link <ExternalLink size={10} />
          </span>
        )}
        {job.image && <span>View_File</span>}
      </div>
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
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no lint errors.

Run: `npm run build`
Expected: TypeScript compiles and Vite builds successfully.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/WorkExperience.tsx
git commit -m "feat: add work experience section with certificate modal"
```

---

### Task 3: Compose the section in Portfolio

**Files:**
- Modify: `src/Portfolio.tsx:1-8` (imports), `src/Portfolio.tsx:18-20` (section order)

**Interfaces:**
- Consumes: default export `WorkExperience` from `./components/sections/WorkExperience`.
- Produces: page renders Work Experience between Stack and Projects.

- [ ] **Step 1: Import the component**

In `src/Portfolio.tsx`, add after the Stack import (line 4):

```tsx
import WorkExperience from "./components/sections/WorkExperience";
```

- [ ] **Step 2: Render it between Stack and Projects**

Change the `<main>` children (lines 16-22) so the order is:

```tsx
          <Hero />
          <About />
          <Stack />
          <WorkExperience />
          <Projects />
          <Certificates />
          <Courses />
          <Contact />
```

- [ ] **Step 3: Verify**

Run: `npm run lint`
Expected: no lint errors.

Run: `npm run build`
Expected: TypeScript compiles and Vite builds successfully.

- [ ] **Step 4: Commit**

```bash
git add src/Portfolio.tsx
git commit -m "feat: render work experience section on homepage"
```

---

### Task 4: Manual visual verification

**Files:** none.

**Interfaces:** n/a.

- [ ] **Step 1: Run dev server**

Run: `npm run dev`
Expected: dev server starts without errors.

- [ ] **Step 2: Verify page behavior**

Open the homepage and check:

1. Work Experience section renders after Stack and before Projects, header shows `WORK_EXPERIENCE`.
2. The DOST OJT card appears once in Work Experience; Projects shows only the thesis card.
3. Nav shows "Work Experience" link; clicking it highlights the section and scrolls there.
4. The Work Experience card currently has no `image`, so it is not clickable and shows no `View_File` hint (expected until a certificate is added).
5. Projects' `View_All_Systems →` link and `/projects` archive page still work (shows 1 system).

- [ ] **Step 3: Verify certificate modal (optional)**

Temporarily set `image` on the `WORK_EXPERIENCE` entry to the existing `dataengineerCert` import, reload, click the card, confirm the `STATEMENT_VIEWER.exe` modal opens, closes on backdrop click and `[ESC]`. Revert the temporary change.

- [ ] **Step 4: Commit (if any code changed during verification)**

```bash
git add -A
git commit -m "chore: verify work experience section"
```

---

## Self-Review Notes

- **Spec coverage:** Task 1 covers the data split + nav link; Task 2 covers the new section + modal + empty state; Task 3 covers composition; Task 4 covers the unchanged Projects/archive behavior and modal verification. No spec requirement is left untasked.
- **Type consistency:** `WorkExperience` field names (`tag`, `title`, `company`, `period`, `body`, `tags`, `image`, `url`) match across the interface, `WORK_EXPERIENCE` array, and component props. `Section`/`Reveal` usage matches their existing signatures.
- **No placeholders:** every code step contains full content; verification commands are exact.
