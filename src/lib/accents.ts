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
