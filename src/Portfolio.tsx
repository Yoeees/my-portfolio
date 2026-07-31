import Header from "./components/Header";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Stack from "./components/sections/Stack";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";
import Container from "./components/ui/Container";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body bg-[radial-gradient(circle,rgba(120,113,108,0.18)_1px,transparent_1px)] bg-[length:18px_18px]">
      <Container>
        <Header />
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Certificates />
        <Contact />
      </Container>
    </div>
  );
}
