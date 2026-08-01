import type { Project } from "../data";

export const ACCENT: Record<
  Project["accent"],
  { text: string; border: string; hoverBorder: string }
> = {
  emerald: {
    text: "text-accent",
    border: "border-accent/30",
    hoverBorder: "hover:border-accent/60",
  },
  red: {
    text: "text-warning",
    border: "border-warning/30",
    hoverBorder: "hover:border-warning/60",
  },
};
