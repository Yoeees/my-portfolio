import Header from "./components/Header";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Stack from "./components/sections/Stack";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Courses from "./components/sections/Courses";
import Contact from "./components/sections/Contact";
import Container from "./components/ui/Container";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      <Container>
        <Header />
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Certificates />
        <Courses />
        <Contact />
      </Container>
    </div>
  );
}
