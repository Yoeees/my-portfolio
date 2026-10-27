# DPWH Project Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Feature the DPWH Caraga Flood Control Data Pipeline as the first project card, linked to both GitHub and its live Streamlit dashboard.

**Architecture:** Portfolio is data-driven — cards render from the `PROJECTS` array in `src/data.ts`. This plan replaces the single `url` field with a labeled `links` array (fixing the hardcoded "View_Thesis" label bug in both card components), then inserts the new project entry at index 0 so it appears on the homepage (first 4 shown) and the `/projects` archive page.

**Tech Stack:** React 19 + TypeScript + Tailwind 4 (Vite). No test framework — verification is `tsc -b && vite build`, ESLint, and visual smoke test.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-25-dpwh-project-card-design.md`
- NO code comments anywhere (project rule).
- Do NOT git commit — the user has not requested commits.
- Match existing file conventions in `src/data.ts`: double quotes, trailing commas on multi-line object literals.
- Exact strings to use verbatim:
  - Repo link: `https://github.com/Yoeees/Data_Engineering_DPWH13_Project` label `View_Repo`
  - Dashboard link: `https://dataengineeringdpwh13project.streamlit.app/` label `Live_Dashboard`
  - Thesis link: `/Thesis.pdf` label `View_Thesis`
  - JaFA link: `https://jafa-pl.vercel.app/` label `View_Live`

---

### Task 1: Replace `url` with labeled `links` array (data model + both card components)

**Files:**
- Modify: `src/data.ts` (interface ~line 12–20; Thesis entry ~line 130; JaFA entry ~line 139)
- Modify: `src/components/sections/Projects.tsx:31-40`
- Modify: `src/pages/ProjectsPage.tsx:31-40`

**Interfaces:**
- Produces: `export interface ProjectLink { label: string; href: string }` and `Project.links?: ProjectLink[]`. Both card components iterate `(p.links ?? [])`.

- [ ] **Step 1: Update the `Project` interface in `src/data.ts`**

Replace:

```ts
export interface Project {
  tag: string;
  title: string;
  period: string;
  body: string;
  tags: string[];
  url?: string;
  fullDesc?: string[];
}
```

with:

```ts
export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  tag: string;
  title: string;
  period: string;
  body: string;
  tags: string[];
  links?: ProjectLink[];
  fullDesc?: string[];
}
```

- [ ] **Step 2: Migrate the two entries using `url`**

In the thesis entry, replace:

```ts
    url: "/Thesis.pdf",
```

with:

```ts
    links: [{ label: "View_Thesis", href: "/Thesis.pdf" }],
```

In the JaFA entry, replace:

```ts
    url:'https://jafa-pl.vercel.app/'
```

with:

```ts
    links: [{ label: "View_Live", href: "https://jafa-pl.vercel.app/" }],
```

- [ ] **Step 3: Render `links` in `src/components/sections/Projects.tsx`**

Replace (inside `ProjectCard`, the `{p.url && (...)}` block):

```tsx
        {p.url && (
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 cursor-pointer hover:underline"
          >
            View_Thesis <ExternalLink size={10} />
          </a>
        )}
```

with:

```tsx
        {(p.links ?? []).map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 cursor-pointer hover:underline"
          >
            {link.label} <ExternalLink size={10} />
          </a>
        ))}
```

- [ ] **Step 4: Apply the identical change in `src/pages/ProjectsPage.tsx`**

Replace (the `{project.url && (...)}` block):

```tsx
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 cursor-pointer hover:underline"
          >
            View_Thesis <ExternalLink size={10} />
          </a>
        )}
```

with:

```tsx
        {(project.links ?? []).map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 cursor-pointer hover:underline"
          >
            {link.label} <ExternalLink size={10} />
          </a>
        ))}
```

- [ ] **Step 5: Typecheck + lint**

Run: `npm run build` then `npm run lint`
Expected: both pass with no errors referencing `url`, `links`, or `ProjectLink`.

---

### Task 2: Insert DPWH project entry at index 0 of `PROJECTS`

**Files:**
- Modify: `src/data.ts` (`PROJECTS` array, insert before the Quantum Inspired RAG object)

**Interfaces:**
- Consumes: `ProjectLink` from Task 1.

- [ ] **Step 1: Insert new entry**

Inside `export const PROJECTS: Project[] = [`, immediately after the opening bracket, insert:

```ts
  {
    tag: "DATA ENGINEERING · PIPELINE",
    title: "DPWH Caraga Flood Control Data Pipeline",
    period: "Aug 2026",
    body:
      "End-to-end ELT pipeline ingesting Philippine flood-control project data from two independent government sources (DPWH portal + BetterGov), reconciling them into a unified fact table and flagging records matching publicly documented procurement anomaly patterns — orchestrated with Airflow, transformed with dbt, containerized with Docker, served via a live Streamlit dashboard.",
    tags: ["Python", "Apache Airflow", "PostgreSQL", "dbt", "Docker", "Streamlit"],
    links: [
      { label: "View_Repo", href: "https://github.com/Yoeees/Data_Engineering_DPWH13_Project" },
      { label: "Live_Dashboard", href: "https://dataengineeringdpwh13project.streamlit.app/" },
    ],
    fullDesc: [
      "## Problem",
      "Philippine flood-control infrastructure data is published across two independent government portals that disagree on project IDs, contractor naming, and level of detail. Reconciling them into one trustworthy dataset is a genuine entity-resolution problem — real, messy government procurement data, not a cleaned Kaggle CSV.",
      "## Architecture",
      "Fully dockerized stack: Python extractors (requests + BeautifulSoup) land raw data into separate Postgres raw schemas, an Airflow DAG orchestrates extraction and loading on a weekly schedule, dbt stages and models the data, and a Streamlit dashboard serves the result with interactive filters, charts, and a Folium map.",
      "## Entity Resolution",
      "The core mart, fct_unified_projects, unifies both sources at a contract × source grain. Messy raw contractor text is parsed into a clean dim_contractors dimension with a many-to-many bridge table, and fuzzy matching links the same real-world project across sources despite differing IDs and naming formats.",
      "## Anomaly Flags",
      "Marts flag records matching publicly documented procurement patterns such as chop-chop (artificially split projects) and doppelganger near-duplicates, based on BetterGov's published methodology. All outputs are framed as flagged-for-review data quality signals, not accusations.",
      "## Data Quality",
      "Custom dbt tests enforce the fact grain — composite uniqueness on (contract_id, source), referential integrity between fact contractors and the dimension — plus unique and not_null schema tests on all key columns.",
      "## Tech Stack",
      "Python · requests/BeautifulSoup · Apache Airflow · PostgreSQL · dbt-core · Docker Compose · Streamlit · Folium",
    ],
  },
```

- [ ] **Step 2: Typecheck + lint**

Run: `npm run build` then `npm run lint`
Expected: both pass.

---

### Task 3: Visual smoke test

**Files:** none (verification only)

- [ ] **Step 1: Start dev server**

Run: `npm run dev` (keep running)

- [ ] **Step 2: Check homepage**

Navigate to `http://localhost:5173/#projects`. Confirm:
- DPWH card is first, numbered 01
- Two links visible: `View_Repo` and `Live_Dashboard`
- `View_full_desc` expands showing the six `##` sections

- [ ] **Step 3: Check archive page**

Navigate to `http://localhost:5173/projects`. Confirm all 7 cards render; Thesis shows `View_Thesis`; JaFA shows `View_Live`; TOTAL reads "7 systems".

- [ ] **Step 4: Stop dev server**
