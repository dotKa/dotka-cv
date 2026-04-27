import { useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { getContact } from "../data/contact";
import { getExperience } from "../data/experience";
import { getProjects } from "../data/projects";
import { getSiteMeta } from "../data/site";
import { getSkillGroups } from "../data/skills";
import { useI18n } from "../i18n/useI18n";

function PrintSection({ title, children }) {
  return (
    <section className="print-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ContactLink({ item }) {
  return (
    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      <span>{item.label}</span>
      <strong>{item.value}</strong>
    </a>
  );
}

function LiveVersionQr({ siteMeta, title, text }) {
  return (
    <div className="print-live-qr">
      <p>{text}</p>
      <QRCodeSVG
        value={siteMeta.liveUrl}
        size={92}
        bgColor="#ffffff"
        fgColor="#0f172a"
        level="M"
        marginSize={2}
        title={title}
      />
      <a href={siteMeta.liveUrl}>cv.dotka.xyz</a>
    </div>
  );
}

export function PrintCvPage() {
  const { language, t } = useI18n();
  const aboutCards = t("about.cards");
  const contact = getContact(language);
  const experience = getExperience(language);
  const projects = getProjects(language);
  const siteMeta = getSiteMeta(language);
  const skillGroups = getSkillGroups(language);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.print();
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="print-cv-page">
      <div className="print-actions">
        <button type="button" onClick={() => window.print()}>
          {t("print.actions.print")}
        </button>
        <a href="/">{t("print.actions.back")}</a>
      </div>

      <article className="print-document">
        <header className="print-header">
          <div>
            <p className="print-eyebrow">{t("print.eyebrow")}</p>
            <h1>{siteMeta.name}</h1>
            <p className="print-role">{siteMeta.role}</p>
          </div>
          <div className="print-header-aside">
            <div className="print-contact-grid">
              {contact.map((item) => (
                <ContactLink key={item.label} item={item} />
              ))}
            </div>
            <LiveVersionQr siteMeta={siteMeta} text={t("print.liveQr")} title={t("print.liveQrTitle")} />
          </div>
        </header>

        <PrintSection title={t("print.summary")}>
          <p>{aboutCards[0].text}</p>
          <p>{aboutCards[1].text}</p>
        </PrintSection>

        <PrintSection title={t("print.skills")}>
          <div className="print-skill-grid">
            {skillGroups.map((group) => (
              <div key={group.title} className="print-card print-avoid-break">
                <h3>{group.title}</h3>
                <p>{group.note}</p>
                <ul className="print-pill-list">
                  {group.items.map((item) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PrintSection>

        <PrintSection title={t("print.selectedProjects")}>
          <div className="print-project-list">
            {projects.map((project) => (
              <article key={project.id} className="print-card print-project print-avoid-break">
                <div className="print-project-heading">
                  <div>
                    <p className="print-meta">{project.type}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <span>{project.year}</span>
                </div>
                <p>{project.story}</p>
                <ul>
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="print-stack">{t("projects.stack")}: {project.stack.join(", ")}</p>
                {project.link && (
                  <p className="print-link">
                    {t("projects.projectLink")}: <a href={project.link}>{project.link}</a>
                  </p>
                )}
              </article>
            ))}
          </div>
        </PrintSection>

        <PrintSection title={t("print.experience")}>
          <div className="print-experience-list">
            {experience.map((item) => (
              <article key={`${item.company}-${item.role}`} className="print-card print-avoid-break">
                <div className="print-project-heading">
                  <div>
                    <h3>{item.role}</h3>
                    <p className="print-meta">{item.company}</p>
                  </div>
                  <span>{item.date}</span>
                </div>
                <p className="print-meta">{item.location}</p>
                <p>{item.details}</p>
              </article>
            ))}
          </div>
        </PrintSection>

        <PrintSection title={t("print.contact")}>
          <div className="print-contact-grid print-contact-bottom">
            {contact.map((item) => (
              <ContactLink key={item.label} item={item} />
            ))}
          </div>
        </PrintSection>
      </article>
    </main>
  );
}
