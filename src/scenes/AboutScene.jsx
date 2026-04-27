import { Panel } from "../components/Panel";
import { ProfileReveal } from "../components/ProfileReveal";

export function AboutScene() {
  return (
    <section className="fade-in grid min-h-full items-center">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[420px_1fr]">
        <Panel className="p-6">
          <ProfileReveal />
          <p className="mt-6 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">about me</p>
          <h2 className="mt-3 text-4xl font-semibold">I build real systems <br/> not just code.</h2>
          <p className="mt-5 leading-7 text-slate-300">
            I am a full-stack developer with strong hands-on know-how. I do not only design interfaces or write isolated features; I build systems that run, scale, integrate and solve real operational problems.
          </p>
        </Panel>

        <div className="grid gap-4 md:grid-cols-2">
          <Panel className="p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">01 / Developer Identity</p>
            <p className="mt-4 leading-7 text-slate-300">
              Full-stack developer with a product-first mindset. I design and build systems end-to-end — from interface to backend to deployment — focused on real-world usability, reliability, and solving operational problems.
            </p>
          </Panel>
          <Panel className="p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">02 / Know-how</p>
            <p className="mt-4 leading-7 text-slate-300">
              My strongest side is practical know-how: debugging, connecting systems, making trade-offs and turning uncertain ideas into working products. I use AI-assisted tools to accelerate research, prototyping and iteration while keeping engineering judgment at the center.
            </p>
          </Panel>
          <Panel className="p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">03 / DevOps Mindset</p>
            <p className="mt-4 leading-7 text-slate-300">
              I am comfortable with Linux servers, Docker, Coolify, reverse proxies, SSL/DNS, object storage and log-based debugging. I care about running systems, not just writing code.
            </p>
          </Panel>
          <Panel className="p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">04 / Physical Systems</p>
            <p className="mt-4 leading-7 text-slate-300">
              With Relackout and USB-DMX hardware, I combine software with physical devices. The USB-DMX product direction is production-ready and built for real stage/event usage.
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}
