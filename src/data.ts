import dataengineerCert from "./assets/certificate_page-0001.jpg";

export interface StackGroup {
  group: string;
  items: string[];
}

export interface Project {
  tag: string;
  title: string;
  period: string;
  body: string;
  tags: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
}

export interface Course {
  title: string;
  issuer: string;
  date?: string;
  image?: string;
  url?: string;
}

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

export interface NavLink {
  href: string;
  label: string;
}

export const STATUS_LINE = "open to data engineering roles · BS CS 2026";

export const NAV_LINKS: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Work Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#courses", label: "Courses" },
  { href: "#contact", label: "Contact" },
];

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
    items: ["Python", "pandas", "PostgreSQL", "scikit-learn","C++", "JavaScript", "TypeScript", "SQL"],
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
    title: "Reinforcement Learning for IoT Anomaly Detection",
    period: "Undergraduate Thesis",
    body:
      "Benchmarked four deep reinforcement learning algorithms — DQN, QR-DQN, PPO, and Recurrent PPO — paired with a convolutional autoencoder for anomaly detection on the Edge-IIoTset dataset. Recurrent PPO came out on top. Also prepared the research poster and SVG methodology diagrams for the defense.",
    tags: ["DQN", "PPO", "Recurrent PPO", "Autoencoder", "Edge-IIoTset"],
  },
  {
    tag: "COMPILER · FULL-STACK IDE",
    title: "JaFA — Custom Programming Language + Web IDE",
    period: "Programming Languages Course",
    body:
      "Built a complete programming language called JaFA with C-like syntax and Bisaya-inspired keywords, a compiler that generates MIPS assembly, and a browser-based IDE with Monaco Editor, syntax highlighting, autocomplete, and triple output panels (runtime, assembly, machine code).",
    tags: ["C", "Flex/Bison", "MIPS Assembly", "TypeScript", "Monaco Editor", "Vite"],
  },
  {
    tag: "FULL-STACK · LAB SYSTEM",
    title: "CSU BioLab — Lab Equipment Reservation System",
    period: "Software Development",
    body:
      "Full-stack web app for managing laboratory equipment reservations at Caraga State University. Flask backend with JWT auth, SQLAlchemy models, conflict-checked booking, and a React + Material-UI frontend with admin and student dashboards, notifications, and search/filter.",
    tags: ["Python", "Flask", "React", "TypeScript", "SQLAlchemy", "JWT"],
  },
  {
    tag: "GAME DEV · 2D ADVENTURE",
    title: "Explorers of the Pelagic",
    period: "ITE 18 Final Project",
    body:
      "2D adventure game built in GameMaker Studio 2 — explored game design patterns including sprite animation, room transitions, collision systems, and tilemap-based level design across 95 commits.",
    tags: ["GameMaker", "GML", "Game Design", "2D Art"],
  },
];

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

export const CERTIFICATES: Certificate[] = [];

export const COURSES: Course[] = [
  {
    title: "Data Engineering Professional Certificate",
    issuer: "DataCamp",
    date: "2026",
    url: "https://www.datacamp.com/statement-of-accomplishment/track/1fecdc0cde3cfd03cd0de1acb24ded464ea93371?raw=1",
    image: dataengineerCert,
  },
];
