import { Panel } from "../components/Panel";
import { ProfileReveal } from "../components/ProfileReveal";
import { useI18n } from "../i18n/useI18n";

export function AboutScene() {
  const { t } = useI18n();
  const cards = t("about.cards");

  return (
    <section className="fade-in grid min-h-full items-center">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[420px_1fr]">
        <Panel className="p-6">
          <ProfileReveal />
          <p className="mt-6 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">{t("about.eyebrow")}</p>
          <h2 className="mt-3 text-4xl font-semibold">
            {t("about.title")} <br/> {t("about.titleBreak")}
          </h2>
          <p className="mt-5 leading-7 text-slate-300">
            {t("about.description")}
          </p>
        </Panel>

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Panel key={card.title} className="p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">{card.title}</p>
              <p className="mt-4 leading-7 text-slate-300">{card.text}</p>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
