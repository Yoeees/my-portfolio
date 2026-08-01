# Portfolio Design Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `Desktop/my-portfolio-v2` into a modern Brittany Chiang + Anirban-style portfolio with dark/light toggle, stronger typography hierarchy, denser section layout, new palette, and no profile picture.

**Architecture:** Implement theme tokens for dark/light mode, remove the hero avatar, convert the hero to a typography-led intro, refactor sections into denser card/list layouts, and update the header with a theme toggle. Keep React + Vite + Tailwind v4 stack.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4 (`@tailwindcss/vite`), lucide-react, React context for theme state.

## Global Constraints
- No new major UI libraries unless required for theme persistence (small helper code preferred over deps).
- Keep current section order unless moving sections improves hierarchy.
- Keep content nearly identical; minor copy wording may change to fit reference style.
- Visual result should match a modern developer portfolio: cleaner hierarchy, compact cards, stronger contrast.
- Maintain responsive layout (mobile/tablet/desktop).

---

## File Structure

| File | Purpose |
|---|---|
| `src/lib/theme.tsx` | Theme context + toggle hook |
| `src/index.css` | Tailwind theme tokens for light/dark |
| `src/components/Header.tsx` | Theme toggle button + nav updates |
| `src/components/sections/Hero.tsx` | Typography-led hero without avatar |
| `src/components/sections/About.tsx` | Tighter, denser about block |
| `src/components/sections/Stack.tsx` | Compact tag grid |
| `src/components/sections/Projects.tsx` | Card list with stronger hierarchy |
| `src/components/sections/Certificates.tsx` | Clean certificate cards |
| `src/components/sections/Contact.tsx` | Strong final CTA block |
| `src/components/ui/Section.tsx` | Section styling updates |
| `src/data.ts` | Minor role/CTA copy updates if needed |

---

### Task 1: Create theme system

**Files:**
- Create: `src/lib/theme.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: nothing
- Produces: `ThemeProvider`, `useTheme`, CSS dark mode tokens

- [ ] **Step 1: Add theme context**

```tsx
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

- [ ] **Step 2: Update CSS tokens**

Modify `src/index.css` to include dark/light token sets using Tailwind `@theme` and `@variant dark`.

- [ ] **Step 3: Verify build**

Run: `npm run lint && npm run build`
Expected: pass

- [ ] **Step 4: Commit**

```bash
git add src/lib/theme.tsx src/index.css
git commit -m "feat: add dark light theme system"
```

---

### Task 2: Add theme toggle to header

**Files:**
- Modify: `src/components/Header.tsx`

**Interfaces:**
- Consumes: `useTheme`
- Produces: visible toggle control

- [ ] **Step 1: Add theme toggle button**

Add Sun/Moon icon button using `lucide-react`.

- [ ] **Step 2: Verify build and toggle rendering**

Run: `npm run build`
Expected: pass

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: add theme toggle button"
```

---

### Task 3: Redesign hero without avatar

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/data.ts` if role wording updates needed

**Interfaces:**
- Consumes: tokens, no avatar image
- Produces: clean typography-led hero

- [ ] **Step 1: Rewrite hero**

Remove avatar. Use name + role + concise value line + CTA links.

- [ ] **Step 2: Verify layout at mobile and desktop widths**

Run: `npm run build`
Expected: pass

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx src/data.ts
git commit -m "feat: redesign hero to typography led layout"
```

---

### Task 4: Denser about section

**Files:**
- Modify: `src/components/sections/About.tsx`

- [ ] **Step 1: Refactor about block**

Use a concise intro paragraph + quick facts chips/sidebar. Stronger heading and spacing rhythm.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: pass

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "refactor: densify about section"
```

---

### Task 5: Compact stack section

**Files:**
- Modify: `src/components/sections/Stack.tsx`

- [ ] **Step 1: Update stack to compact tag grid**

Group chips more tightly, improve category headings.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: pass

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Stack.tsx
git commit -m "refactor: compact stack tags"
```

---

### Task 6: Stronger project cards

**Files:**
- Modify: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Update project cards**

Increase hierarchy: title/tag contrast, tighter padding, subtle hover depth.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: pass

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "refactor: strengthen project cards"
```

---

### Task 7: Cleaner certificates section

**Files:**
- Modify: `src/components/sections/Certificates.tsx`

- [ ] **Step 1: Refine certificate cards**

Cleaner borders, label hierarchy, tighter grid.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: pass

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Certificates.tsx
git commit -m "refactor: polish certificates section"
```

---

### Task 8: Final contact CTA

**Files:**
- Modify: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Refactor contact block**

Turn into a stronger CTA section with heading + short message + links.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: pass

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "refactor: improve contact cta"
```

---

### Task 9: Final responsive + consistency pass

**Files:**
- Modify: multiple section/UI files as needed

- [ ] **Step 1: Tighten spacing, color consistency, typography scale**

Ensure light/dark theme colors apply correctly and hierarchy matches references.

- [ ] **Step 2: Visual verification**

Run locally at 360px, 768px, 1440px.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final design consistency pass"
```
