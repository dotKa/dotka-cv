import { Button } from "../components/Button";
import { Panel } from "../components/Panel";
import { ProfileReveal } from "../components/ProfileReveal";
import { Progress } from "../components/Progress";

export function IntroScene({ discoveredCount, go, randomDiscovery }) {
  return (
    <section className="fade-in grid min-h-full items-center">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="mb-5 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">interactive cv</p>
          <h1 className="max-w-4xl text-3xl font-semibold leading-snug sm:text-4xl md:text-5xl lg:text-6xl">
            An interactive CV of a developer who builds real systems.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Full-stack developer, product builder and hands-on system maker. Explore projects, experience and practical know-how through an interactive CV flow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => go("projects")}>view projects</Button>
            <Button onClick={() => go("about")}>about me</Button>
            <Button onClick={randomDiscovery}>explore a project</Button>
          </div>
        </div>

        <Panel className="p-6">
          <div className="flex items-center gap-5">
            <ProfileReveal />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">profile</p>
              <h2 className="mt-2 text-2xl font-semibold">Yasin Karadeniz</h2>
              <p className="mt-2 text-cyan-200">Full Stack Developer / Product Engineer</p>
            </div>
          </div>
          <div className="mt-8">
            <Progress unlockedCount={discoveredCount} />
          </div>
        </Panel>
      </div>
    </section>
  );
}
