import dataengineerCert from "./assets/certificate_page-0001.jpg";
import sqlfundamentals from "./assets/SQL_Fundamentals.jpg"
import deProfessionalCert from "./assets/data-engineering-cert.jpg";
import dostCert from "./assets/DOST CARAGA.jpg";
import lodiCert from "./assets/Project LODI.jpg";

export interface StackGroup {
  group: string;
  items: string[];
}

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

export interface Certificate {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
  image?: string;
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
    items: ["Apache Airflow", "Docker", "Linux","DataBricks"],
  },
  {
    group: "Web",
    items: ["React", "Vue.js"],
  },
];

export const PROJECTS: Project[] = [
  {
    tag: "DATA ENGINEERING · PIPELINE",
    title: "DPWH Caraga Infrastractures Data Pipeline",
    period: "Aug 2026",
    body:
      "End-to-end ELT pipeline ingesting Caraga Infrastractures project data from two independent government sources (DPWH portal + BetterGov), reconciling them into a unified fact table and flagging records matching publicly documented procurement anomaly patterns — orchestrated with Airflow, transformed with dbt, containerized with Docker, served via a live Streamlit dashboard.",
    tags: ["Python", "Apache Airflow", "PostgreSQL", "dbt", "Docker", "Streamlit"],
    links: [
      { label: "View_Repo", href: "https://github.com/Yoeees/Data_Engineering_DPWH13_Project" },
      { label: "Live_Dashboard", href: "https://dataengineeringdpwh13project.streamlit.app/" },
    ],
  },
  {
    tag: "RAG · PERSONAL",
    title: "Quantum Inspired RAG",
    period: "Ongoing",
    body:
      "Investigates whether quantum-inspired tensor network decomposition — specifically Tucker and tensor-train (MPS) — can compress retrieved-passage embeddings in RAG systems more effectively than hard and soft compression baselines.",
    tags: ["Python", "TensorLy", "PyTorch", "RAG", "Tensor Decomposition"],
    fullDesc: [
      "## Problem",
      "RAG systems ground LLM outputs in retrieved documents, but this substantially increases input context length, raising inference latency and token cost. Existing compression methods — hard (selection/extraction) and soft (autoencoders like ICAE, xRAG, COCOM) — either lack learned semantic compression or compress indiscriminately without query conditioning.",
      "## Approach",
      "Applies quantum-inspired tensor network decomposition (Tucker and tensor-train/MPS) to retrieved-passage embeddings. Unlike autoencoders, tensor decomposition provides interpretable structure (core tensor + factor matrices revealing semantic modes), controlled compression via rank selection, and query-conditioned potential.",
      "## Methodology",
      "1. Baselines: no compression, hard compression (selection + extraction + token budget), simple autoencoder",
      "2. Tensor compressor: reshape retrieved-chunk embeddings into a higher-order tensor, decompose via Tucker/TT, reconstruct",
      "3. LLM interface: feed reconstructed text to local LLM (Qwen3/Llama 3.2 via Ollama) — no model modification required",
      "4. Evaluation: Natural Questions and TriviaQA — answer accuracy (EM/F1), compression ratio, latency, reconstruction fidelity",
      "## Expected Contributions",
      "First application of Tucker/tensor-train decomposition to retrieved-passage embeddings for RAG context compression, with empirical comparison against hard/soft baselines. Prior work (CompactifAI, KARIPAP, TensorLLM) applies tensor networks only to LLM weight compression.",
      "## Tech Stack",
      "TensorLy · PyTorch · sentence-transformers · Chroma/FAISS · Ollama · Hugging Face datasets · tiktoken · pandas/matplotlib",
    ],
  },
  {
    tag: "DATA ENGINEERING · PERSONAL",
    title: "Data Engineering Projects",
    period: "Dec 2025 – Present",
    body:
      "Built ETL pipelines to ingest, transform, and store data from multiple sources, including weather APIs, taxi datasets, and stock market data. Automated data workflows using Apache Airflow for scheduled extraction and processing, and performed data cleaning with Pandas.",
    tags: ["Python", "Apache Airflow", "Pandas", "ETL", "PostgreSQL"],
  },
  {
    tag: "THESIS · ANOMALY DETECTION",
    title: "Reinforcement Learning for IoT Anomaly Detection",
    period: "Undergraduate Thesis",
    body:
      "Benchmarked four deep reinforcement learning algorithms — DQN, QR-DQN, PPO, and Recurrent PPO — paired with a convolutional autoencoder for anomaly detection on the Edge-IIoTset dataset. Recurrent PPO came out on top. Also prepared the research poster and SVG methodology diagrams for the defense.",
    tags: ["DQN", "PPO", "Recurrent PPO", "Autoencoder", "Edge-IIoTset"],
    links: [{ label: "View_Thesis", href: "/Thesis.pdf" }],
  },
  {
    tag: "COMPILER · FULL-STACK IDE",
    title: "JaFA — Custom Programming Language + Web IDE",
    period: "Programming Languages Course",
    body:
      "Built a complete programming language called JaFA with C-like syntax and Bisaya-inspired keywords, a compiler that generates MIPS assembly, and a browser-based IDE with Monaco Editor, syntax highlighting, autocomplete, and triple output panels (runtime, assembly, machine code).",
    tags: ["C", "Flex/Bison", "MIPS Assembly", "TypeScript", "Monaco Editor", "Vite"],
    links: [{ label: "View_Live", href: "https://jafa-pl.vercel.app/" }],
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
    tag: "Machine Learning / Computer Vision",
    title: "Robusta Coffee Defect Detection + No-Code Training Platform",
    company: "DOST-Caraga",
    role: "Intern",
    period: "Jan 2025 – May 2025",
    body:
      "Built a YOLO-based mobile app that flags defects in Robusta coffee beans bean-by-bean, and contributed to a no-code platform that lets non-technical users train their own detection models.",
    tags: ["YOLO", "Computer Vision", "Mobile", "No-Code ML"],
    image: dostCert,
  },
  {
    tag: "QA Testing / Analysis",
    title: "DOST Project League of Developers Initiative (LODI)",
    company: "DOST-Central Office",
    role: "Intern",
    period: "Sep 2025 – Oct 2025",
    body:
      "Analyzed system functionality, identified defects and process improvements, documented requirements and findings, and collaborated with developers to enhance application quality.",
    tags: ["QA Testing", "Defect Tracking", "Requirements Analysis", "Process Improvement"],
    image: lodiCert,
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    title: "Data Engineering Professional Certificate",
    issuer: "DataCamp",
    date: "Aug 2026",
    image: deProfessionalCert,
  },
];

export const COURSES: Course[] = [
  {
    title: "Data Engineering in Python",
    issuer: "DataCamp",
    date: "2026",
    url: "https://www.datacamp.com/statement-of-accomplishment/track/1fecdc0cde3cfd03cd0de1acb24ded464ea93371?raw=1",
    image: dataengineerCert,
  },
  {
    title: "SQL Fundamentals",
    issuer: "DataCamp",
    date: "2026",
    url: "https://www.datacamp.com/statement-of-accomplishment/track/5184ca30c0d4df2308441f58619c17745ffc4ee5?raw=1",
    image: sqlfundamentals,
  },
];
