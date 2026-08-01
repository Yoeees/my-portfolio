import type { Project } from "../data";

export const ACCENT: Record<
  Project["accent"],
  { text: string; border: string; hoverBorder: string }
> = {
  emerald: {
    text: "text-ink",
    border: "border-line",
    hoverBorder: "hover:border-accent",
  },
  red: {
    text: "text-ink",
    border: "border-line",
    hoverBorder: "hover:border-accent",
  },
};
