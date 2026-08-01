import Button from "../ui/Button";

export default function Hero() {
  return (
    <section id="home" className="pb-20 lg:hidden">
      <p className="font-mono text-sm text-accent">$ whoami</p>

      <h1 className="mt-5 font-display font-bold tracking-tight text-ink text-4xl sm:text-6xl leading-[1.05]">
        Johnwences Fabe P. Dumangcas
      </h1>

      <p className="mt-4 font-display font-semibold text-muted text-xl sm:text-2xl">
        Aspiring Data Engineer
      </p>

      <p className="mt-6 text-muted text-lg max-w-2xl">
        Aspiring data engineer — BS Computer Science graduate from Caraga State
        University. I'm drawn to sorting signal from noise, whether that means
        building pipelines, training models, or just making sense of messy
        data.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="#projects">View Projects</Button>
        <Button href="#contact" variant="secondary">
          Contact Me
        </Button>
      </div>
    </section>
  );
}
