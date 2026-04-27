import { useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { contact } from "../data/contact";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import { siteMeta } from "../data/site";
import { skillGroups } from "../data/skills";

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

function LiveVersionQr() {
  return (
    <div className="print-live-qr">
      <p>For live version scan QR code</p>
      <QRCodeSVG
        value={siteMeta.liveUrl}
        size={92}
        bgColor="#ffffff"
        fgColor="#0f172a"
        level="M"
        marginSize={2}
        title="Live CV QR code"
      />
      <a href={siteMeta.liveUrl}>cv.dotka.xyz</a>
    </div>
  );
}

export function PrintCvPage() {
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
          Print / Save PDF
        </button>
        <a href="/">Back to interactive CV</a>
      </div>

      <article className="print-document">
        <header className="print-header">
          <div>
            <p className="print-eyebrow">Interactive CV / Printable Version</p>
            <h1>{siteMeta.name}</h1>
            <p className="print-role">{siteMeta.role}</p>
          </div>
          <div className="print-header-aside">
            <div className="print-contact-grid">
              {contact.map((item) => (
                <ContactLink key={item.label} item={item} />
              ))}
            </div>
            <LiveVersionQr />
          </div>
        </header>

        <PrintSection title="Summary">
          <p>
            Full-stack developer with a product-first mindset. I design and build systems end-to-end, from interface to backend to deployment, focused on real-world usability, reliability, and solving operational problems.
          </p>
          <p>
            My strongest side is practical know-how: debugging, connecting systems, making trade-offs and turning uncertain ideas into working products. I use AI-assisted tools to accelerate research, prototyping and iteration while keeping engineering judgment at the center.
          </p>
        </PrintSection>

        <PrintSection title="Skills & Tools">
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

        <PrintSection title="Selected Projects">
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
                <p className="print-stack">Stack: {project.stack.join(", ")}</p>
                {project.link && (
                  <p className="print-link">
                    Project link: <a href={project.link}>{project.link}</a>
                  </p>
                )}
              </article>
            ))}
          </div>
        </PrintSection>

        <PrintSection title="Experience">
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

        <PrintSection title="Contact">
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
