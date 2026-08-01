import Button from "../ui/Button";
import ScanFrame from "../ui/ScanFrame";
import { STATUS_LINE } from "../../data";
import avatarImg from "../../assets/DUMANGCAS.png";

export default function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-10">
        <ScanFrame className="shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-52 lg:h-52 rounded-full border border-stone-300 bg-white overflow-hidden">
            <img
              src={avatarImg}
              alt="Schwarzel"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink text-paper font-mono text-[9px] px-2 py-0.5 rounded">
            SAMPLE_01 · MATCH 99.2%
          </span>
        </ScanFrame>

        <div className="flex-1 w-full">
          <div className="rounded-lg overflow-hidden border border-stone-300 bg-white shadow-lg shadow-stone-200/50">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stone-200 bg-stone-50">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono text-[10px] tracking-wide text-stone-400">
                johnw@schwarzel.dev:~/portfolio
              </span>
            </div>
            <div className="p-5 sm:p-7">
              <p className="font-mono text-sm text-terminal mb-3 inline-flex items-center gap-1">
                <span className="text-terminal-bright">$</span>
                whoami
                <span className="cursor-blink inline-block w-[7px] h-[16px] bg-terminal align-middle" />
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
              <p className="mt-4 font-mono text-xs text-terminal inline-flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-terminal animate-pulse" />
                {STATUS_LINE}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="#certificates">View Certificates</Button>
        <Button href="#projects" variant="secondary">
          View Projects
        </Button>
      </div>
    </section>
  );
}
