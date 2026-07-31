import Header from "./components/Header";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Stack from "./components/sections/Stack";
import Projects from "./components/Projects";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";

// Make sure index.css (with the @import "tailwindcss" line) is imported
// once in main.tsx.

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 bg-[radial-gradient(circle,rgba(120,113,108,0.18)_1px,transparent_1px)] bg-[length:18px_18px]">
      <div className="font-body w-full max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
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
