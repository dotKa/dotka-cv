import { projects } from "../data/projects";
import { useI18n } from "../i18n/useI18n";

export function Progress({ unlockedCount }) {
  const { t } = useI18n();
  const percent = Math.round((unlockedCount / projects.length) * 100);

  return (
    <div>
      <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
        <span>{t("progress.projectsViewed")}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 border border-white/10 bg-black">
        <div className="h-full bg-cyan-300 transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
