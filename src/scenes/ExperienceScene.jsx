import { Panel } from "../components/Panel";
import { experience } from "../data/experience";

export function ExperienceScene() {
  return (
    <section className="fade-in min-h-full py-10">
      <div className="mb-10">
        <p className="mb-3 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">experience</p>
        <h2 className="text-4xl font-semibold md:text-6xl">Professional experience.</h2>
      </div>
      <div className="space-y-4">
        {experience.map((item, index) => (
          <Panel key={`${item.company}-${item.role}`} className="p-5">
            <div className="grid gap-4 md:grid-cols-[180px_1fr]">
              <div className="font-mono text-sm text-cyan-300">step {String(index + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="text-2xl font-semibold">{item.role}</h3>
                <p className="mt-1 text-cyan-200">{item.company}</p>
                <p className="mt-2 text-sm text-slate-500">
                  {item.date} · {item.location}
                </p>
                <p className="mt-4 max-w-4xl leading-7 text-slate-300">{item.details}</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </section>
  );
}
