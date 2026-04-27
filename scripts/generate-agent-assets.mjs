import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { contact, getContact } from "../src/data/contact.js";
import { experience, getExperience } from "../src/data/experience.js";
import { getProjects, projects } from "../src/data/projects.js";
import { getSiteMeta, siteMeta } from "../src/data/site.js";
import { getSkillGroups, skillGroups } from "../src/data/skills.js";

const rootDir = dirname(fileURLToPath(import.meta.url)).replace(/\/scripts$/, "");
const publicDir = join(rootDir, "public");
const wellKnownDir = join(publicDir, ".well-known");
const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || "https://example.com");
const profileImageSource = join(rootDir, "references/img/WhatsApp Image 2026-04-24 at 17.02.48.jpeg");

const staticRoutes = ["/", "/about", "/projects", "/experience", "/contact", "/cv/print"];
const projectRoutes = projects.map((project) => `/projects/${project.id}`);
const allRoutes = [...staticRoutes, ...projectRoutes];

function normalizeSiteUrl(url) {
  return url.replace(/\/+$/, "");
}

function absoluteUrl(path) {
  return `${siteUrl}${path}`;
}

function getLocalizedData(language = "en") {
  return {
    contact: getContact(language),
    experience: getExperience(language),
    projects: getProjects(language),
    siteMeta: getSiteMeta(language),
    skillGroups: getSkillGroups(language)
  };
}

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function writePublicFile(path, content) {
  const filePath = join(publicDir, path);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

function buildRobotsTxt() {
  return `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
}

function buildSitemapXml() {
  const now = new Date().toISOString();
  const urls = allRoutes
    .map((route) => {
      return `  <url>
    <loc>${xmlEscape(absoluteUrl(route))}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === "/" ? "1.0" : route.startsWith("/projects/") ? "0.7" : "0.8"}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildLlmsTxt(language = "en") {
  const data = getLocalizedData(language);
  const labels =
    language === "tr"
      ? {
          primaryPages: "Ana Sayfalar",
          home: "Ana Sayfa",
          about: "Hakkımda",
          projects: "Projeler",
          experience: "Deneyim",
          contact: "İletişim",
          markdownCv: "Markdown CV",
          printablePdf: "Yazdırılabilir PDF route'u",
          selectedProjects: "Seçilmiş Projeler",
          agentNotes: "Agent Notları",
          notes:
            "Bu kişisel bir interaktif CV ve portfolyo sitesidir. Public içerik HTML ve Markdown olarak erişilebilir. Bu sitede private API, login akışı, commerce akışı veya transactional agent endpoint'i yoktur."
        }
      : {
          primaryPages: "Primary Pages",
          home: "Home",
          about: "About",
          projects: "Projects",
          experience: "Experience",
          contact: "Contact",
          markdownCv: "Markdown CV",
          printablePdf: "Printable PDF route",
          selectedProjects: "Selected Projects",
          agentNotes: "Agent Notes",
          notes:
            "This is a personal interactive CV and portfolio. Public content is available as HTML and Markdown. There is no private API, login flow, commerce flow, or transactional agent endpoint for this site."
        };

  return `# ${data.siteMeta.title}

${data.siteMeta.description}

## ${labels.primaryPages}

- ${labels.home}: ${absoluteUrl("/")}
- ${labels.about}: ${absoluteUrl("/about")}
- ${labels.projects}: ${absoluteUrl("/projects")}
- ${labels.experience}: ${absoluteUrl("/experience")}
- ${labels.contact}: ${absoluteUrl("/contact")}
- ${labels.markdownCv}: ${absoluteUrl(language === "tr" ? "/cv.tr.md" : "/cv.md")}
- ${labels.printablePdf}: ${absoluteUrl("/cv/print")}

## ${labels.selectedProjects}

${data.projects.map((project) => `- [${project.title}](${absoluteUrl(`/projects/${project.id}`)}): ${project.short}`).join("\n")}

## ${labels.contact}

${data.contact.map((item) => `- ${item.label}: ${item.value}`).join("\n")}

## ${labels.agentNotes}

${labels.notes}
`;
}

function buildCvMarkdown(language = "en") {
  const data = getLocalizedData(language);
  const labels =
    language === "tr"
      ? {
          contact: "İletişim",
          experience: "Deneyim",
          date: "Tarih",
          location: "Lokasyon",
          projects: "Projeler",
          type: "Tip",
          year: "Yıl",
          highlights: "Öne Çıkanlar",
          stack: "Stack",
          skills: "Skills & Tools"
        }
      : {
          contact: "Contact",
          experience: "Experience",
          date: "Date",
          location: "Location",
          projects: "Projects",
          type: "Type",
          year: "Year",
          highlights: "Highlights",
          stack: "Stack",
          skills: "Skills & Tools"
        };

  return `# ${data.siteMeta.name}

${data.siteMeta.role}

${data.siteMeta.description}

## ${labels.contact}

${data.contact.map((item) => `- ${item.label}: ${item.value}`).join("\n")}

## ${labels.experience}

${data.experience
  .map((item) => {
    return `### ${item.role} — ${item.company}

- ${labels.date}: ${item.date}
- ${labels.location}: ${item.location}
- ${item.details}`;
  })
  .join("\n\n")}

## ${labels.projects}

${data.projects
  .map((project) => {
    return `### ${project.title}

- ${labels.type}: ${project.type}
- ${labels.year}: ${project.year}
- URL: ${absoluteUrl(`/projects/${project.id}`)}
- ${project.story}

${labels.highlights}:
${project.points.map((point) => `- ${point}`).join("\n")}

${labels.stack}: ${project.stack.join(", ")}`;
  })
  .join("\n\n")}

## ${labels.skills}

${data.skillGroups
  .map((group) => {
    return `### ${group.title}

${group.note}

${group.items.map((item) => `- ${item.name}`).join("\n")}`;
  })
  .join("\n\n")}
`;
}

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function buildAgentJson() {
  return json({
    name: siteMeta.title,
    description: siteMeta.description,
    url: siteUrl,
    type: "personal_portfolio",
    primary_language: "en",
    human_contact: {
      email: siteMeta.email,
      phone: siteMeta.phone
    },
    links: {
      sitemap: absoluteUrl("/sitemap.xml"),
      llms: absoluteUrl("/llms.txt"),
      llms_tr: absoluteUrl("/llms.tr.txt"),
      markdown_cv: absoluteUrl("/cv.md"),
      markdown_cv_tr: absoluteUrl("/cv.tr.md"),
      api_catalog: absoluteUrl("/.well-known/api-catalog.json"),
      mcp_server_card: absoluteUrl("/.well-known/mcp-server.json"),
      webmcp: absoluteUrl("/.well-known/webmcp.json")
    },
    capabilities: ["browse_public_profile", "read_markdown_cv", "discover_projects"],
    routes: allRoutes.map((route) => absoluteUrl(route))
  });
}

function buildMcpServerCard() {
  return json({
    name: `${siteMeta.name} Portfolio MCP Card`,
    description: "Static discovery card for a public portfolio. This site does not expose a live MCP endpoint.",
    url: siteUrl,
    mcp_endpoint: null,
    capabilities: [],
    resources: [
      {
        name: "Markdown CV",
        uri: absoluteUrl("/cv.md"),
        mime_type: "text/markdown"
      },
      {
        name: "LLMS summary",
        uri: absoluteUrl("/llms.txt"),
        mime_type: "text/plain"
      },
      {
        name: "Turkish Markdown CV",
        uri: absoluteUrl("/cv.tr.md"),
        mime_type: "text/markdown"
      },
      {
        name: "Turkish LLMS summary",
        uri: absoluteUrl("/llms.tr.txt"),
        mime_type: "text/plain"
      }
    ]
  });
}

function buildWebMcpJson() {
  return json({
    name: `${siteMeta.name} WebMCP Discovery`,
    description: "Public discovery metadata for an interactive CV. No authenticated tools are exposed.",
    url: siteUrl,
    tools: [],
    resources: [
      absoluteUrl("/cv.md"),
      absoluteUrl("/cv.tr.md"),
      absoluteUrl("/llms.txt"),
      absoluteUrl("/llms.tr.txt"),
      absoluteUrl("/sitemap.xml")
    ]
  });
}

function buildApiCatalog() {
  return json({
    name: `${siteMeta.name} Public Content Catalog`,
    description: "This site does not expose an application API. Public portfolio content is available through static HTML, sitemap and Markdown resources.",
    version: "1.0.0",
    base_url: siteUrl,
    apis: [],
    public_resources: [
      {
        name: "Sitemap",
        url: absoluteUrl("/sitemap.xml"),
        type: "application/xml"
      },
      {
        name: "LLMS text",
        url: absoluteUrl("/llms.txt"),
        type: "text/plain"
      },
      {
        name: "Turkish LLMS text",
        url: absoluteUrl("/llms.tr.txt"),
        type: "text/plain"
      },
      {
        name: "Markdown CV",
        url: absoluteUrl("/cv.md"),
        type: "text/markdown"
      },
      {
        name: "Turkish Markdown CV",
        url: absoluteUrl("/cv.tr.md"),
        type: "text/markdown"
      }
    ]
  });
}

function buildOAuthNotApplicable(name) {
  return json({
    issuer: siteUrl,
    name,
    status: "not_applicable",
    reason: "This public portfolio does not require OAuth or expose protected resources.",
    authorization_endpoint: null,
    token_endpoint: null,
    protected_resources: []
  });
}

function buildAgentSkills() {
  return json({
    name: `${siteMeta.name} Portfolio Skills`,
    description: "Machine-readable summary of public portfolio skills.",
    skills: skillGroups.map((group) => ({
      category: group.title,
      description: group.note,
      items: group.items.map((item) => item.name)
    }))
  });
}

function buildHeaders() {
  return `/*
  Link: </sitemap.xml>; rel="sitemap"; type="application/xml"
  Link: </llms.txt>; rel="alternate"; type="text/plain"
  Link: </llms.tr.txt>; rel="alternate"; type="text/plain"; hreflang="tr"
  Link: </cv.md>; rel="alternate"; type="text/markdown"
  Link: </cv.tr.md>; rel="alternate"; type="text/markdown"; hreflang="tr"
  Link: </.well-known/agent.json>; rel="service-desc"; type="application/json"

/cv.md
  Content-Type: text/markdown; charset=utf-8

/cv.tr.md
  Content-Type: text/markdown; charset=utf-8

/llms.txt
  Content-Type: text/plain; charset=utf-8

/llms.tr.txt
  Content-Type: text/plain; charset=utf-8

/.well-known/*
  Content-Type: application/json; charset=utf-8
`;
}

function buildRedirects() {
  return `/*    /index.html   200
`;
}

await mkdir(wellKnownDir, { recursive: true });
await writePublicFile("robots.txt", buildRobotsTxt());
await writePublicFile("sitemap.xml", buildSitemapXml());
await writePublicFile("llms.txt", buildLlmsTxt());
await writePublicFile("llms.tr.txt", buildLlmsTxt("tr"));
await writePublicFile("cv.md", buildCvMarkdown());
await writePublicFile("cv.tr.md", buildCvMarkdown("tr"));
await copyFile(profileImageSource, join(publicDir, "profile.jpeg"));
await writePublicFile(".well-known/agent.json", buildAgentJson());
await writePublicFile(".well-known/agent-card.json", buildAgentJson());
await writePublicFile(".well-known/a2a.json", buildAgentJson());
await writePublicFile(".well-known/agent-skills.json", buildAgentSkills());
await writePublicFile(".well-known/mcp-server.json", buildMcpServerCard());
await writePublicFile(".well-known/mcp.json", buildMcpServerCard());
await writePublicFile(".well-known/webmcp.json", buildWebMcpJson());
await writePublicFile(".well-known/api-catalog.json", buildApiCatalog());
await writePublicFile(".well-known/oauth-authorization-server", buildOAuthNotApplicable("OAuth Authorization Server Metadata"));
await writePublicFile(".well-known/oauth-protected-resource", buildOAuthNotApplicable("OAuth Protected Resource Metadata"));
await writePublicFile(".well-known/x402.json", json({ status: "not_applicable", reason: "No commerce flow is exposed by this portfolio." }));
await writePublicFile(".well-known/mpp.json", json({ status: "not_applicable", reason: "No commerce flow is exposed by this portfolio." }));
await writePublicFile(".well-known/ucp.json", json({ status: "not_applicable", reason: "No commerce flow is exposed by this portfolio." }));
await writePublicFile(".well-known/acp.json", json({ status: "not_applicable", reason: "No commerce flow is exposed by this portfolio." }));
await writePublicFile("_headers", buildHeaders());
await writePublicFile("_redirects", buildRedirects());
