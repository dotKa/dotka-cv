import { Button } from "../components/Button";
import { Panel } from "../components/Panel";
import { projects } from "../data/projects";

export function ProjectScene({ go, inspectProject, randomDiscovery, selectedProject, visitedProjects }) {
  return (
    <section className="fade-in grid min-h-full gap-6 py-10 lg:grid-cols-[360px_1fr]">
      <Panel className="p-5">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">selected projects</p>
        <div className="space-y-2">
          {projects.map((project) => (
            <button
              type="button"
              key={project.id}
              onClick={() => inspectProject(project)}
              className={`w-full border px-4 py-3 text-left text-sm transition ${
                project.id === selectedProject.id ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/10 text-slate-300 hover:border-cyan-300/60"
              }`}
            >
              {visitedProjects.includes(project.id) ? "✓" : "□"} {project.title}
            </button>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <Button onClick={() => go("projects")}>projects</Button>
          <Button onClick={randomDiscovery}>explore another</Button>
        </div>
      </Panel>

      <Panel className="p-6 md:p-8">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-300">{selectedProject.type}</p>
        <h2 className="mt-3 text-4xl font-semibold md:text-6xl">{selectedProject.title}</h2>
        <p className="mt-2 text-slate-500">{selectedProject.year}</p>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">{selectedProject.story}</p>

        {selectedProject.link && (
          <a
            href={selectedProject.link}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex border border-cyan-300 bg-cyan-300 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-950 transition hover:bg-cyan-200"
          >
            visit project
          </a>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {selectedProject.points.map((point) => (
            <div key={point} className="border border-white/10 bg-black/40 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">highlight</p>
              <p className="mt-2 text-slate-200">{point}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {selectedProject.stack.map((tag) => (
            <span key={tag} className="border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">
              {tag}
            </span>
          ))}
        </div>
      </Panel>
    </section>
  );
}
