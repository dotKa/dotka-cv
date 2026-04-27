import { marqueeSkills } from "../data/skills";
import { getSkillIcon } from "./skillIcons";

function SkillBadge({ skill }) {
  const Icon = getSkillIcon(skill.name);

  return (
    <span className="mx-2 inline-flex items-center gap-2 border border-white/10 bg-black px-3 py-2 text-xs text-slate-300">
      <span className="flex h-7 min-w-7 items-center justify-center border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
        <Icon aria-hidden="true" className="h-4 w-4" />
      </span>
      <span className="whitespace-nowrap">{skill.name}</span>
    </span>
  );
}

export function SkillsMarquee() {
  return (
    <div className="group border-b border-white/10 bg-black/95 py-3">
      <div className="mb-2 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 md:px-10">
        Skills & Tools
      </div>
      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-[marquee_110s_linear_infinite] group-hover:[animation-play-state:paused]">
          {marqueeSkills.map((skill, index) => (
            <SkillBadge key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
