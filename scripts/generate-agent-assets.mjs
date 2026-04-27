import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { contact } from "../src/data/contact.js";
import { experience } from "../src/data/experience.js";
import { projects } from "../src/data/projects.js";
import { siteMeta } from "../src/data/site.js";
import { skillGroups } from "../src/data/skills.js";

const rootDir = dirname(fileURLToPath(import.meta.url)).replace(/\/scripts$/, "");
const publicDir = join(rootDir, "public");
const wellKnownDir = join(publicDir, ".well-known");
const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || "https://example.com");
const profileImageSource = join(rootDir, "references/img/WhatsApp Image 2026-04-24 at 17.02.48.jpeg");

const staticRoutes = ["/", "/about", "/projects", "/experience", "/contact"];
const projectRoutes = projects.map((project) => `/projects/${project.id}`);
const allRoutes = [...staticRoutes, ...projectRoutes];

function normalizeSiteUrl(url) {
  return url.replace(/\/+$/, "");
}

function absoluteUrl(path) {
  return `${siteUrl}${path}`;
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

function buildLlmsTxt() {
  return `# ${siteMeta.title}

${siteMeta.description}

## Primary Pages

- Home: ${absoluteUrl("/")}
- About: ${absoluteUrl("/about")}
- Projects: ${absoluteUrl("/projects")}
- Experience: ${absoluteUrl("/experience")}
- Contact: ${absoluteUrl("/contact")}
- Markdown CV: ${absoluteUrl("/cv.md")}

## Selected Projects

${projects.map((project) => `- [${project.title}](${absoluteUrl(`/projects/${project.id}`)}): ${project.short}`).join("\n")}

## Contact

${contact.map((item) => `- ${item.label}: ${item.value}`).join("\n")}

## Agent Notes

This is a personal interactive CV and portfolio. Public content is available as HTML and Markdown. There is no private API, login flow, commerce flow, or transactional agent endpoint for this site.
`;
}

function buildCvMarkdown() {
  return `# ${siteMeta.name}

${siteMeta.role}

${siteMeta.description}

## Contact

${contact.map((item) => `- ${item.label}: ${item.value}`).join("\n")}

## Experience

${experience
  .map((item) => {
    return `### ${item.role} — ${item.company}

- Date: ${item.date}
- Location: ${item.location}
- ${item.details}`;
  })
  .join("\n\n")}

## Projects

${projects
  .map((project) => {
    return `### ${project.title}

- Type: ${project.type}
- Year: ${project.year}
- URL: ${absoluteUrl(`/projects/${project.id}`)}
- ${project.story}

Highlights:
${project.points.map((point) => `- ${point}`).join("\n")}

Stack: ${project.stack.join(", ")}`;
  })
  .join("\n\n")}

## Skills & Tools

${skillGroups
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
      markdown_cv: absoluteUrl("/cv.md"),
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
      absoluteUrl("/llms.txt"),
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
        name: "Markdown CV",
        url: absoluteUrl("/cv.md"),
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
  Link: </cv.md>; rel="alternate"; type="text/markdown"
  Link: </.well-known/agent.json>; rel="service-desc"; type="application/json"

/cv.md
  Content-Type: text/markdown; charset=utf-8

/llms.txt
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
await writePublicFile("cv.md", buildCvMarkdown());
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
