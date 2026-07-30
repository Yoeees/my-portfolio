import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Stack from "./components/Stack";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";

// Make sure index.css (with the @import "tailwindcss" line) is imported
// once in main.tsx.

export default function Portfolio() {
  return (
    <div
      className="min-h-screen bg-stone-100 text-stone-900"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(120,113,108,0.18) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="font-body w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <Header />
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Certificates />
        <Contact />
      </div>
    </div>
  );
}