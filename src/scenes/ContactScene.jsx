import { Panel } from "../components/Panel";
import { contact } from "../data/contact";

export function ContactScene() {
  return (
    <section className="fade-in grid min-h-full items-center">
      <Panel className="mx-auto w-full max-w-4xl p-8 text-center">
        <p className="mb-3 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">contact</p>
        <h2 className="text-4xl font-semibold md:text-6xl">Let’s build something useful.</h2>
        <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
          Open to selected product, full-stack, automation, event infrastructure and stage technology opportunities.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {contact.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="border border-white/10 bg-black px-5 py-4 text-left transition hover:border-cyan-300 hover:bg-cyan-300/10"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
              <p className="mt-2 text-lg text-white">{item.value}</p>
            </a>
          ))}
        </div>
      </Panel>
    </section>
  );
}
