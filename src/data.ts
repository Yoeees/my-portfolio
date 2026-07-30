import dataengineerCert from "./assets/certificate_page-0001.jpg";


export interface StackGroup {
  group: string;
  items: string[];
}

export interface Project {
  tag: string;
  accent: "emerald" | "red";
  title: string;
  period: string;
  body: string;
  tags: string[];
}

export interface Certificate {
  pdf: boolean;
  title: string;
  issuer: string;
  date?: string;
  url?: string;
  image?: string;
}

export const LANGUAGES: string[] = ["English", "Tagalog", "Cebuano", "Spanish"];

export const EDUCATION = {
  degree: "BS Computer Science",
  honor: "Cum Laude",
  school: "Caraga State University – Main Campus",
  year: "2026",
};

export const STACK: StackGroup[] = [
  {
    group: "Languages & Data",
    items: ["Python", "pandas", "PostgreSQL", "scikit-learn"],
  },
  {
    group: "Pipelines & Infra",
    items: ["Apache Airflow", "Docker", "Linux"],
  },
  {
    group: "Web",
    items: ["React", "Vue.js"],
  },
];

export const PROJECTS: Project[] = [
  {
    tag: "THESIS · ANOMALY DETECTION",
    accent: "emerald",
    title: "Reinforcement Learning for IoT Anomaly Detection",
    period: "Undergraduate Thesis",
    body:
      "Benchmarked four deep reinforcement learning algorithms — DQN, QR-DQN, PPO, and Recurrent PPO — paired with a convolutional autoencoder for anomaly detection on the Edge-IIoTset dataset. Recurrent PPO came out on top. Also prepared the research poster and SVG methodology diagrams for the defense.",
    tags: ["DQN", "PPO", "Recurrent PPO", "Autoencoder", "Edge-IIoTset"],
  },
  {
    tag: "OJT · DEFECT DETECTION",
    accent: "red",
    title: "Robusta Coffee Defect Detection + No-Code Training Platform",
    period: "On-the-Job Training, DOST-Caraga",
    body:
      "Built a YOLO-based mobile app that flags defects in Robusta coffee beans bean-by-bean, and contributed to a no-code platform that lets non-technical users train their own detection models.",
    tags: ["YOLO", "Computer Vision", "Mobile", "No-Code ML"],
  },
];

export const ACCENT: Record<Project["accent"], { text: string; border: string; hoverBorder: string }> = {
  emerald: { text: "text-emerald-700", border: "border-emerald-700/30", hoverBorder: "hover:border-emerald-600/60" },
  red: { text: "text-red-700", border: "border-red-700/30", hoverBorder: "hover:border-red-600/60" },
};

// ---------------------------------------------------------------------------
// Add your certificates here. Each entry needs at minimum a title and
// issuer — date, url, and image are optional.
//
// To include an image, import it at the top of this file (Vite needs a
// real import to bundle it, a plain string path won't resolve) and
// reference the imported variable:
//
//   import ibmCert from "./assets/certificates/ibm-data-eng.png";
//
//   export const CERTIFICATES: Certificate[] = [
//     {
//       title: "IBM Data Engineering Professional Certificate",
//       issuer: "IBM / Coursera",
//       date: "2026",
//       url: "https://...",
//       image: ibmCert,
//     },
//   ];
// ---------------------------------------------------------------------------
export const CERTIFICATES: Certificate[] = [
  {
    title: "Data Engineering Professional Certificate",
    issuer: "DataCamp",
    date: "2026",
    url: "https://www.datacamp.com/statement-of-accomplishment/track/1fecdc0cde3cfd03cd0de1acb24ded464ea93371?raw=1",
    image: dataengineerCert,
    pdf: true,
  }
];