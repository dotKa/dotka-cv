import { Progress } from "../components/Progress";
import { projects } from "../data/projects";

export function ProjectsScene({ discoveredCount, inspectProject, visitedProjects }) {
  return (
    <section className="fade-in min-h-full py-10">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">selected projects</p>
          <h2 className="text-4xl font-semibold md:text-6xl">Selected projects.</h2>
        </div>
        <div className="w-full md:w-80">
          <Progress unlockedCount={discoveredCount} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => {
          const visited = visitedProjects.includes(project.id);
          return (
            <button
              type="button"
              key={project.id}
              onClick={() => inspectProject(project)}
              className={`group border p-5 text-left transition hover:-translate-y-1 ${
                visited ? "border-cyan-300/60 bg-cyan-300/10" : "border-white/10 bg-white/[0.03] hover:border-cyan-300/50"
              }`}
            >
              <div className="mb-5 flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em]">
                <span className="text-slate-500">project {String(index + 1).padStart(2, "0")}</span>
                <span className={visited ? "text-cyan-300" : "text-slate-600"}>{visited ? "viewed" : "view"}</span>
              </div>
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 min-h-[56px] text-sm leading-6 text-slate-400">{project.short}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((tag) => (
                  <span key={tag} className="border border-white/10 px-2 py-1 text-xs text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
