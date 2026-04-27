import { projects } from "../data/projects";

export function Progress({ unlockedCount }) {
  const percent = Math.round((unlockedCount / projects.length) * 100);

  return (
    <div>
      <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
        <span>Projects Viewed</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 border border-white/10 bg-black">
        <div className="h-full bg-cyan-300 transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
