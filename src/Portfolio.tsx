import Header from "./components/Header";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Stack from "./components/sections/Stack";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Courses from "./components/sections/Courses";
import Contact from "./components/sections/Contact";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 sm:px-8 lg:flex-row lg:gap-16 lg:px-12 xl:px-16">
        <Header />
        <main className="w-full pb-16 lg:w-[58%] lg:py-24">
          <Hero />
          <About />
          <Stack />
          <Projects />
          <Certificates />
          <Courses />
          <Contact />
        </main>
      </div>
    </div>
  );
}
