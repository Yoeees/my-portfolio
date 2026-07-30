import ScanFrame from "./ScanFrame";
import avatarImg from "../assets/DUMANGCAS.png";

export default function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <div>
        <ScanFrame className="float-left mr-8 mb-3">
          <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full border border-stone-300 bg-white overflow-hidden">
            <img
              src={avatarImg}
              alt="Schwarzel"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-stone-900 text-stone-50 font-mono text-[9px] px-2 py-0.5 rounded">
            SAMPLE_01 · MATCH 99.2%
          </span>
        </ScanFrame>

        <p className="font-mono text-sm text-green-700 mb-3 inline-flex items-center gap-1">
          <span className="text-green-600">$</span>
          whoami
          <span className="cursor-blink inline-block w-[7px] h-[16px] bg-green-700 align-middle" />
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight">
          Johnwences Fabe P. Dumangcas
        </h1>
        <p className="font-body mt-4 text-lg sm:text-xl text-stone-600">
          Aspiring data engineer — BS Computer Science graduate from Caraga
          State University. I'm drawn to sorting signal from noise, whether
          that means building pipelines, training models, or just making
          sense of messy data.
        </p>
      </div>

      <div className="clear-both mt-10 flex flex-wrap gap-3">
        <a
          href="#certificates"
          className="font-mono text-xs uppercase tracking-wide bg-amber-800 text-stone-50 px-4 py-2.5 rounded hover:bg-amber-900 transition-colors"
        >
          View Certificates
        </a>
        <a
          href="#projects"
          className="font-mono text-xs uppercase tracking-wide border border-stone-300 px-4 py-2.5 rounded hover:border-amber-800/50 transition-colors"
        >
          View Projects
        </a>
      </div>
    </section>
  );
}