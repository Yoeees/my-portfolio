# Work Experience Archive Page + Card Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/experience` archive page, clean up the work experience card (remove redundancy, add role, add View_Certificate link).

**Architecture:** Mirror the existing `/projects` archive pattern. Data stays in `data.ts`. Card component in `WorkExperience.tsx` stays in place. New `ExperiencePage.tsx` under `src/pages/`. Routing in `App.tsx`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, lucide-react.

## Global Constraints

- No new dependencies; no test framework exists — verification is `npm run lint` and `npm run build`.
- Section header text uses terminal/mono style (`WORK_EXPERIENCE`); nav labels human-readable ("Work Experience").
- Follow existing patterns: `ProjectsPage.tsx` is the template for the archive page, `Projects.tsx` for the section link.
- `WorkExperienceCard` must be `<article>` (not `<button>`) — no nested interactive elements.

---

### Task 1: Update data — add role, fix DOST entry

**Files:**
- Modify: `src/data.ts:31-40` (interface), `src/data.ts:94-106` (WORK_EXPERIENCE array)

**Interfaces:**
- Consumes: nothing (first task).
- Produces: `role?: string` on `WorkExperience`; cleaned-up `WORK_EXPERIENCE` array.

- [ ] **Step 1: Add `role` to the interface**

In `src/data.ts`, add `role?: string` to the `WorkExperience` interface between `company` and `period`:

```ts
export interface WorkExperience {
  tag: string;
  title: string;
  company: string;
  role?: string;
  period: string;
  body: string;
  tags: string[];
  image?: string;
  url?: string;
}
```

- [ ] **Step 2: Fix the DOST entry**

Replace the `WORK_EXPERIENCE` array in `src/data.ts` (lines 94-106):

```ts
export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    tag: "DEFECT DETECTION",
    title: "Robusta Coffee Defect Detection + No-Code Training Platform",
    company: "DOST-Caraga",
    role: "Intern",
    period: "Jan 2025 – May 2025",
    body:
      "Built a YOLO-based mobile app that flags defects in Robusta coffee beans bean-by-bean, and contributed to a no-code platform that lets non-technical users train their own detection models.",
    tags: ["YOLO", "Computer Vision", "Mobile", "No-Code ML"],
  },
];
```

- [ ] **Step 3: Verify**

Run: `npm run lint`
Expected: no lint errors.

Run: `npm run build`
Expected: TypeScript compiles and Vite builds successfully.

- [ ] **Step 4: Commit**

```bash
git add src/data.ts
git commit -m "feat: add role field to work experience, fix DOST card data"
```

---

### Task 2: Redesign WorkExperienceCard

**Files:**
- Modify: `src/components/sections/WorkExperience.tsx:8-74` (card component), `src/components/sections/WorkExperience.tsx:115-151` (modal)

**Interfaces:**
- Consumes: `WorkExperience` interface from `src/data.ts` (with `role?` field).
- Produces: updated card with role display, View_Certificate link, article-only root.

- [ ] **Step 1: Rewrite the card component**

Replace the `WorkExperienceCard` function in `src/components/sections/WorkExperience.tsx` (lines 8-74):

```tsx
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
    </article>
  );
}
```

- [ ] **Step 2: Remove unused imports**

The `useState` and `useEffect` imports in the parent `WorkExperience` function remain (used by the modal). No import changes needed — `Tag`, `Reveal`, `Section`, `ExternalLink` are still used.

- [ ] **Step 3: Verify**

Run: `npm run lint`
Expected: no lint errors.

Run: `npm run build`
Expected: TypeScript compiles and Vite builds successfully.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/WorkExperience.tsx
git commit -m "feat: redesign work experience card — role, View_Certificate, article-only"
```

---

### Task 3: Create ExperiencePage, add archive link, wire routing

**Files:**
- Create: `src/pages/ExperiencePage.tsx`
- Modify: `src/components/sections/WorkExperience.tsx` (add "View_All_Experience" link)
- Modify: `src/App.tsx` (add `/experience` route)

**Interfaces:**
- Consumes: `WORK_EXPERIENCE` and `WorkExperience` from `src/data`, `Tag` from `src/components/ui/Tag`, `ThemeProvider` and `useTheme` from `src/lib/theme`.
- Produces: default-exported `ExperiencePage` component; homepage section gains archive link.

- [ ] **Step 1: Create ExperiencePage**

Create `src/pages/ExperiencePage.tsx` — copy the structure from `src/pages/ProjectsPage.tsx`, adapting for work experience:

```tsx
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { ThemeProvider } from "../lib/theme";
import { useTheme } from "../lib/theme-context";
import { WORK_EXPERIENCE } from "../data";
import Tag from "../components/ui/Tag";

function ExperiencePageContent() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-paper text-ink font-body page-enter">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 sm:px-8 lg:flex-row lg:gap-16 lg:px-12 xl:px-16">
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:max-w-xl lg:flex-col lg:justify-between py-8 lg:py-24">
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> BACK
            </a>
            <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              ALL_EXPERIENCE
            </h1>
            <p className="mt-4 font-display text-lg font-semibold text-muted">
              Complete Work Experience
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              Every role I've held — from internships to professional positions.
              Each experience shaped my approach to data engineering and software development.
            </p>
          </div>

          <div className="mt-12 hidden lg:block">
            <button
              type="button"
              onClick={toggle}
              className="cursor-pointer mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              {theme === "dark" ? "LIGHT_MODE" : "DARK_MODE"}
            </button>
            <p className="font-mono text-xs uppercase tracking-widest text-soft">
              TOTAL: {WORK_EXPERIENCE.length} role{WORK_EXPERIENCE.length === 1 ? "" : "s"}
            </p>
          </div>
        </header>

        <main className="w-full pb-16 lg:w-[58%] lg:py-24">
          <div className="space-y-4">
            {WORK_EXPERIENCE.map((job, i) => (
              <article
                key={job.title}
                className="border-2 border-line bg-panel p-5 shadow-brutal"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-soft">
                  <span>{String(i + 1).padStart(2, "0")}</span>
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
                  {job.tags.map((tag) => (
                    <Tag key={tag} static className="text-[10px]">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <ThemeProvider>
      <ExperiencePageContent />
    </ThemeProvider>
  );
}
```

- [ ] **Step 2: Add "View_All_Experience" link to the homepage section**

In `src/components/sections/WorkExperience.tsx`, add the archive link after the closing `</div>` of the cards container (after line 112, before the modal):

```tsx
      <div className="mt-6">
        <a
          href="/experience"
          className="inline-flex items-center gap-2 border-2 border-line bg-panel px-4 py-2 font-mono text-xs text-muted transition-brutal cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm hover:border-accent hover:text-accent"
        >
          View_All_Experience →
        </a>
      </div>
```

- [ ] **Step 3: Wire routing in App.tsx**

In `src/App.tsx`, add the import and route:

```tsx
import ExperiencePage from "./pages/ExperiencePage";

function App() {
  const isProjectsPage = window.location.pathname === "/projects";
  const isExperiencePage = window.location.pathname === "/experience";

  return (
    <ThemeProvider>
      {isExperiencePage ? <ExperiencePage /> : isProjectsPage ? <ProjectsPage /> : <Portfolio />}
    </ThemeProvider>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run lint`
Expected: no lint errors.

Run: `npm run build`
Expected: TypeScript compiles and Vite builds successfully.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ExperiencePage.tsx src/components/sections/WorkExperience.tsx src/App.tsx
git commit -m "feat: add experience archive page, homepage link, and routing"
```
