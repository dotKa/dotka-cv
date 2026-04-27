import React, { useMemo, useState, useEffect, useRef } from "react";

/**
 * Interactive CV — Exploration Game Mode
 * Dependency-free React component.
 * No external icon libraries, no router, no animations package.
 */

const projects = [
  {
    id: "relackout",
    title: "Relackout",
    type: "Product / Stage Technology / Developer-led SaaS",
    year: "2024 — Present",
    short: "Production-ready real-time lighting control software for live events.",
    story:
      "Relackout is a production-ready lighting control product focused on making DMX and Art-Net workflows simpler for theatres, venues and event operators. It reflects my developer identity clearly: realtime architecture, UI engineering, hardware integration and product delivery in one system.",
    points: [
      "Production-ready product with real users and public positioning",
      "DMX512 and Art-Net based lighting control",
      "Scene, cue stack and live operation workflows",
      "Custom mixer layout with faders, buttons and groups",
      "Built around simplicity, speed, low-latency control and practical stage usage"
    ],
    stack: ["Electron", "JavaScript", "Realtime", "DMX", "Art-Net", "Product Engineering"],
    unlockHint: "production product unlocked"
  },
  {
    id: "usb-dmx",
    title: "Relackout USB-DMX Hardware",
    type: "Production Hardware / Developer-built Device",
    year: "2025 — Present",
    short: "Physical USB-DMX hardware produced for Relackout workflows.",
    story:
      "A physical USB-to-DMX hardware product developed for Relackout. This is not just a prototype direction: it represents hands-on production thinking across electronics, RS485/DMX communication, enclosure design, device usability and software compatibility.",
    points: [
      "Physical USB-DMX device produced for Relackout ecosystem",
      "USB to RS485 / DMX communication layer",
      "3D printed enclosure planning and hardware usability iteration",
      "Production-ready direction for stage and event operators",
      "Combines software engineering, physical device design and real-world testing"
    ],
    stack: ["RS485", "DMX", "USB-DMX", "3D Printing", "Hardware", "Production"],
    unlockHint: "production hardware unlocked"
  },
  {
    id: "content-generator",
    title: "Content Generator & Distributor",
    type: "Automation / Publishing",
    year: "2025 — Present",
    short: "Content generation and publishing workflow platform.",
    story:
      "A multi-tenant platform for generating, scheduling and distributing content to CMS targets such as WordPress and custom systems.",
    points: [
      "Prompt and content workflow management",
      "Scheduled publishing jobs",
      "WordPress and CMS integrations",
      "Worker-based architecture for content operations"
    ],
    stack: ["Meteor.js", "Svelte", "OpenAI", "Jobs", "CMS"],
    unlockHint: "automation workflow unlocked"
  },
  {
    id: "library",
    title: "Library Management System",
    type: "SaaS / Operations",
    year: "2025",
    short: "Multi-tenant management system for small libraries.",
    story:
      "A practical library platform designed for smaller collections, including book tracking, borrowing workflows and visual shelf mapping ideas.",
    points: [
      "Book lending and return workflows",
      "Global book metadata API integration",
      "Tenant-specific book codes",
      "Visual shelf / map concept for physical libraries"
    ],
    stack: ["Meteor.js", "Svelte", "MongoDB", "Multi-tenant"],
    unlockHint: "library archive unlocked"
  },
  {
    id: "tickentra",
    title: "Tickentra",
    type: "Event / Ticketing Infrastructure",
    year: "2025",
    short: "Ticketing and event infrastructure concept.",
    story:
      "A ticketing infrastructure direction for event organizers, designed around event creation, ticket workflows, CRM-ready flows and integrations.",
    points: [
      "Organizer-focused event management",
      "Ticket operation workflows",
      "CRM-ready backend structure",
      "Integration-friendly product architecture"
    ],
    stack: ["Events", "SaaS", "CRM", "Backend", "UX"],
    unlockHint: "box office unlocked"
  },
  {
    id: "quiz-night",
    title: "Quiz Night Platform",
    type: "Interactive Event Experience",
    year: "2024 — Present",
    short: "Live quiz experience system for events.",
    story:
      "An interactive event system for quiz nights, focused on participation, real-time scoring and audience engagement.",
    points: [
      "Live question flow",
      "Real-time scoring logic",
      "Audience participation experience",
      "Designed for social events and venues"
    ],
    stack: ["Realtime", "Events", "UX", "Game Flow"],
    unlockHint: "game room unlocked"
  },
  {
    id: "automation",
    title: "Automation & Data Systems",
    type: "Automation / Data",
    year: "2017 — Present",
    short: "Custom scraping, workflow and business automation systems.",
    story:
      "Long-running experience building custom automation systems, data collection pipelines, CRM flows and operational tools.",
    points: [
      "Data collection and scraping pipelines",
      "Business process automation",
      "CRM and internal workflow tools",
      "Bot-based operational systems"
    ],
    stack: ["Puppeteer", "Node.js", "Pipelines", "Bots", "CRM"],
    unlockHint: "engine room unlocked"
  }
];

const experience = [
  {
    role: "Co-Founder",
    company: "reMana",
    date: "Mar 2023 — Present",
    location: "İstanbul, Türkiye · Remote",
    details:
      "Building SaaS products, automation platforms and business tools. Responsible for product direction, full-stack development, system design and delivery."
  },
  {
    role: "Full Stack Developer",
    company: "GridStudio",
    date: "Jun 2020 — Present",
    location: "İstanbul, Türkiye · Remote",
    details:
      "Developing full-stack web applications, integrations and business systems with JavaScript-focused stacks including Meteor.js and modern frontend tools."
  },
  {
    role: "Full Stack Developer",
    company: "Bordo.io",
    date: "Oct 2021 — Present",
    location: "Samsun, Türkiye",
    details:
      "Building scalable and UI-heavy web applications with Svelte, MeteorJS and product-focused development workflows."
  },
  {
    role: "Frontend Developer",
    company: "Bordo.io",
    date: "May 2020 — Feb 2022",
    location: "Remote",
    details:
      "Developed frontend interfaces from Figma to production and worked on UI delivery pipelines."
  },
  {
    role: "Sound & Lighting Design",
    company: "Yankı Kumpanya",
    date: "Oct 2017 — Present",
    location: "Muğla, Türkiye",
    details:
      "Designing and operating sound and lighting systems for theatre productions, including DMX workflows, cue planning and live operation."
  }
];

const skillGroups = [
  {
    title: "Developer Core",
    note: "High hands-on ability across product code, frontend, backend and realtime flows.",
    items: [
      { name: "JavaScript", logo: "JS" },
      { name: "Node.js", logo: "N" },
      { name: "React", logo: "R" },
      { name: "Svelte", logo: "S" },
      { name: "SvelteKit", logo: "SK" },
      { name: "Meteor.js", logo: "M" },
      { name: "REST APIs", logo: "API" },
      { name: "Realtime Systems", logo: "RT" },
      { name: "Component UI", logo: "UI" },
      { name: "Frontend Architecture", logo: "FE" }
    ]
  },
  {
    title: "Backend & Data",
    note: "Building systems that store, process, automate and expose data reliably.",
    items: [
      { name: "MongoDB", logo: "MDB" },
      { name: "PostgreSQL", logo: "PG" },
      { name: "SQLite", logo: "SQL" },
      { name: "Job Queues", logo: "JOB" },
      { name: "Multi-tenant", logo: "MT" },
      { name: "Auth Flows", logo: "AUTH" },
      { name: "Integrations", logo: "INT" },
      { name: "Scraping", logo: "SCR" },
      { name: "CRM Workflows", logo: "CRM" },
      { name: "CMS Integrations", logo: "CMS" }
    ]
  },
  {
    title: "DevOps & Deployment",
    note: "Comfortable taking products from code to running infrastructure.",
    items: [
      { name: "Docker", logo: "DK" },
      { name: "Docker Compose", logo: "DC" },
      { name: "Coolify", logo: "CO" },
      { name: "Linux Server", logo: "LX" },
      { name: "Nginx", logo: "NX" },
      { name: "Traefik", logo: "TR" },
      { name: "SSL / DNS", logo: "DNS" },
      { name: "CI/CD", logo: "CI" },
      { name: "S3 / MinIO", logo: "S3" },
      { name: "VPS Ops", logo: "VPS" },
      { name: "Log Debugging", logo: "LOG" }
    ]
  },
  {
    title: "Product & Delivery",
    note: "Know-how is not limited to code; I can shape, build, ship and operate products.",
    items: [
      { name: "Product Thinking", logo: "PX" },
      { name: "System Architecture", logo: "SA" },
      { name: "Figma to Product", logo: "FG" },
      { name: "MVP Planning", logo: "MVP" },
      { name: "SaaS Structure", logo: "SaaS" },
      { name: "User Workflows", logo: "UX" },
      { name: "Technical Decisions", logo: "TD" },
      { name: "Problem Solving", logo: "PS" },
      { name: "Client Delivery", logo: "CD" },
      { name: "Documentation", logo: "DOC" }
    ]
  },
  {
    title: "Hardware / Event Tech",
    note: "Practical production knowledge from theatre, lighting systems and physical devices.",
    items: [
      { name: "DMX512", logo: "DMX" },
      { name: "Art-Net", logo: "ART" },
      { name: "USB-DMX", logo: "USB" },
      { name: "RS485", logo: "485" },
      { name: "Stage Workflows", logo: "STG" },
      { name: "Cue Planning", logo: "CUE" },
      { name: "Sound & Lighting", logo: "S/L" },
      { name: "3D Enclosures", logo: "3D" },
      { name: "Hardware Testing", logo: "HW" },
      { name: "Live Event Systems", logo: "LIVE" }
    ]
  }
];

const skills = skillGroups.flatMap((group) => group.items);
const marqueeSkills = [...skills, ...skills];
const profilePhoto = "/profile.jpg";

const contact = [
  { label: "Email", value: "info@dotka.xyz", href: "mailto:info@dotka.xyz" },
  { label: "Phone", value: "+90 531 813 62 73", href: "tel:+905318136273" },
  { label: "LinkedIn", value: "linkedin.com/in/yasinka", href: "https://linkedin.com/in/yasinka" },
  { label: "GitHub", value: "github.com/dotka", href: "https://github.com/dotka" }
];

// navigation scenes (UI)
const scenes = ["intro", "about", "projects", "experience", "contact"];

function addUnique(list, item) {
  return list.includes(item) ? list : [...list, item];
}

function runDataChecks() {
  const errors = [];
  if (projects.length < 7) errors.push("Expected at least 7 projects.");
  if (skillGroups.length < 5) errors.push("Expected at least 5 skill groups.");
  if (skills.length < 40) errors.push("Expected expanded skills inventory.");
  if (!scenes.includes("about")) errors.push("About scene missing.");
  if (!projects.some((p) => p.id === "relackout")) errors.push("Relackout project missing.");
  if (!projects.some((p) => p.id === "usb-dmx")) errors.push("USB-DMX project missing.");
  if (!projects.some((p) => p.id === "quiz-night")) errors.push("Quiz Night project missing.");
  if (!projects.some((p) => p.id === "tickentra")) errors.push("Tickentra project missing.");
  if (!skillGroups.some((group) => group.title === "DevOps & Deployment")) errors.push("DevOps skill group missing.");
  if (!experience.some((e) => e.company === "Yankı Kumpanya")) errors.push("Yankı Kumpanya experience missing.");
  if (contact.length < 4) errors.push("Expected at least 4 contact methods.");
  return errors;
}

const dataErrors = runDataChecks();
if (dataErrors.length > 0) {
  console.warn("CV data check warnings:", dataErrors);
}

function LogLine({ children }) {
  return (
    <div className="whitespace-nowrap text-slate-300">
      <span className="text-cyan-300">&gt;</span> {children}
    </div>
  );
}

function Button({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-3 text-left text-sm uppercase tracking-[0.14em] transition ${
        active
          ? "border-cyan-300 bg-cyan-300 text-slate-950"
          : "border-white/15 bg-black text-slate-300 hover:border-cyan-300 hover:bg-cyan-300/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Panel({ children, className = "" }) {
  return <div className={`border border-white/10 bg-white/[0.035] ${className}`}>{children}</div>;
}

function Avatar({ size = "md" }) {
  const sizeClass = size === "lg" ? "h-28 w-28 md:h-36 md:w-36" : "h-10 w-10";
  return (
    <div className={`${sizeClass} overflow-hidden border border-cyan-300/50 bg-cyan-300/10`}>
      <img
        src={profilePhoto}
        alt="Yasin Karadeniz"
        className="h-full w-full object-cover grayscale contrast-125"
        onError={(event) => {
          event.currentTarget.style.display = "none";
          const parent = event.currentTarget.parentElement;
          if (parent) {
            parent.innerHTML = '<div class="flex h-full w-full items-center justify-center font-mono text-cyan-200">YK</div>';
          }
        }}
      />
    </div>
  );
}

function Progress({ unlockedCount }) {
  const percent = Math.round((unlockedCount / projects.length) * 100);
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
        <span>Discovery</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 border border-white/10 bg-black">
        <div className="h-full bg-cyan-300 transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function SkillBadge({ skill }) {
  return (
    <span className="mx-2 inline-flex items-center gap-2 border border-white/10 bg-black px-3 py-2 text-xs text-slate-300">
      <span className="flex h-7 min-w-7 items-center justify-center border border-cyan-300/30 bg-cyan-300/10 px-1 font-mono text-[10px] text-cyan-200">
        {skill.logo}
      </span>
      <span className="whitespace-nowrap">{skill.name}</span>
    </span>
  );
}

function SkillsMarquee() {
  return (
    <div className="group border-b border-white/10 bg-black/95 py-3">
      <div className="mb-2 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 md:px-10">
        Skills Inventory · auto-scroll badges
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

export default function InteractiveCV() {
  const logRef = useRef(null);
  const [logOpen, setLogOpen] = useState(false);
  const [scene, setScene] = useState("intro");
  const [selectedProjectId, setSelectedProjectId] = useState("relackout");
  const [visitedProjects, setVisitedProjects] = useState([]);
  const [logs, setLogs] = useState([
    "interactive cv loaded",
    "profile sections ready",
    "project explorer initialized"
  ]);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const selectedProject = useMemo(() => {
    return projects.find((project) => project.id === selectedProjectId) || projects[0];
  }, [selectedProjectId]);

  const discoveredCount = visitedProjects.length;
  const canOpenContact = discoveredCount >= 3 || secretUnlocked;

  function pushLog(message) {
    setLogs((current) => [...current, message].slice(-50));
  }

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs, logOpen]);

  function go(nextScene) {
    setScene(nextScene);
    pushLog(`scene opened: ${nextScene}`);
  }

  function inspectProject(project) {
    setSelectedProjectId(project.id);
    setVisitedProjects((current) => addUnique(current, project.id));
    setScene("project");
    pushLog(project.unlockHint);
  }

  function randomDiscovery() {
    const unseen = projects.filter((project) => !visitedProjects.includes(project.id));
    const pool = unseen.length > 0 ? unseen : projects;
    const index = Math.floor(Math.random() * pool.length);
    inspectProject(pool[index]);
  }

  function unlockSecret() {
    setSecretUnlocked(true);
    pushLog("extended contact card enabled");
  }

  return (
    <div className="h-screen overflow-hidden bg-black text-white selection:bg-cyan-300/30">
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: .6; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .fade-in { animation: fadeIn .35s ease-out both; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-cyan-300/10 blur-2xl" style={{ animation: "scanline 8s linear infinite" }} />
      </div>

      <header className="fixed left-0 top-0 z-50 flex h-[84px] w-full items-center justify-between border-b border-white/10 bg-black/90 px-5 py-4 backdrop-blur md:px-10">
        <button
          type="button"
          onClick={() => go("intro")}
          className="flex min-w-0 items-center gap-3 font-mono text-sm uppercase tracking-[0.18em] text-white"
        >
          <Avatar />
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0 leading-tight">
            <span className="whitespace-nowrap">Yasin Karadeniz</span>
            <span className="whitespace-nowrap text-cyan-300 sm:before:content-['/'] sm:before:mr-2">Interactive CV</span>
          </span>
        </button>
        <nav className="hidden gap-2 md:flex">
          {scenes.map((item) => {
            const labelMap = {
              intro: "home",
              about: "about",
              projects: "projects",
              experience: "experience",
              contact: "contact"
            };

            return (
              <Button
                key={item}
                active={scene === item}
                onClick={() => go(item)}
              >
                {labelMap[item]}
              </Button>
            );
          })}
        </nav>
      </header>

      <main className={`fixed left-0 right-0 z-10 overflow-y-auto px-5 md:px-10 ${logOpen ? "top-[84px] bottom-[258px]" : "top-[84px] bottom-[126px]"}`}>
        {scene === "intro" && (
          <section className="fade-in grid min-h-full items-center">
            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_360px]">
              <div>
                <p className="mb-5 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">interactive cv</p>
                <h1 className="max-w-4xl text-3xl font-semibold leading-snug sm:text-4xl md:text-5xl lg:text-6xl">
                  An interactive CV of a developer who builds real systems.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  Full-stack developer, product builder and hands-on system maker. Explore projects, experience and practical know-how through an interactive CV flow.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button onClick={() => go("projects")}>view projects</Button>
                  <Button onClick={() => go("about")}>about me</Button>
                  <Button onClick={randomDiscovery}>random project</Button>
                </div>
              </div>

              <Panel className="p-6">
                <div className="flex items-center gap-5">
                  <Avatar size="lg" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">profile</p>
                    <h2 className="mt-2 text-2xl font-semibold">Yasin Karadeniz</h2>
                    <p className="mt-2 text-cyan-200">Full Stack Developer / Product Engineer</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Progress unlockedCount={discoveredCount} />
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-400">
                  Explore 3 projects to enable the extended contact card. Basic contact remains available at all times.
                </p>
              </Panel>
            </div>
          </section>
        )}

        {scene === "about" && (
          <section className="fade-in grid min-h-full items-center">
            <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[420px_1fr]">
              <Panel className="p-6">
                <Avatar size="lg" />
                <p className="mt-6 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">about me</p>
                <h2 className="mt-3 text-4xl font-semibold">Developer first. Builder by instinct.</h2>
                <p className="mt-5 leading-7 text-slate-300">
                  I am a full-stack developer with strong hands-on know-how. I do not only design interfaces or write isolated features; I build systems that run, scale, integrate and solve real operational problems.
                </p>
              </Panel>

              <div className="grid gap-4 md:grid-cols-2">
                <Panel className="p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">01 / Developer Identity</p>
                  <p className="mt-4 leading-7 text-slate-300">
                    JavaScript ecosystem, frontend-heavy product development, backend flows, realtime systems and deployment awareness. I can take an idea from UI to server to production.
                  </p>
                </Panel>
                <Panel className="p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">02 / Know-how</p>
                  <p className="mt-4 leading-7 text-slate-300">
                    My strongest side is practical know-how: debugging, connecting systems, making trade-offs, shipping MVPs and turning uncertain ideas into working products.
                  </p>
                </Panel>
                <Panel className="p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">03 / DevOps Mindset</p>
                  <p className="mt-4 leading-7 text-slate-300">
                    I am comfortable with Linux servers, Docker, Coolify, reverse proxies, SSL/DNS, object storage and log-based debugging. I care about running systems, not just writing code.
                  </p>
                </Panel>
                <Panel className="p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">04 / Physical Systems</p>
                  <p className="mt-4 leading-7 text-slate-300">
                    With Relackout and USB-DMX hardware, I combine software with physical devices. The USB-DMX product direction is production-ready and built for real stage/event usage.
                  </p>
                </Panel>
              </div>
            </div>
          </section>
        )}

        {scene === "projects" && (
          <section className="fade-in min-h-full py-10">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">project explorer</p>
                <h2 className="text-4xl font-semibold md:text-6xl">Explore selected projects.</h2>
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
                      <span className="text-slate-500">node {String(index + 1).padStart(2, "0")}</span>
                      <span className={visited ? "text-cyan-300" : "text-slate-600"}>{visited ? "inspected" : "open"}</span>
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
        )}

        {scene === "project" && (
          <section className="fade-in grid min-h-full gap-6 py-10 lg:grid-cols-[360px_1fr]">
            <Panel className="p-5">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">project list</p>
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
                <Button onClick={randomDiscovery}>random project</Button>
              </div>
            </Panel>

            <Panel className="p-6 md:p-8">
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-300">{selectedProject.type}</p>
              <h2 className="mt-3 text-4xl font-semibold md:text-6xl">{selectedProject.title}</h2>
              <p className="mt-2 text-slate-500">{selectedProject.year}</p>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">{selectedProject.story}</p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {selectedProject.points.map((point) => (
                  <div key={point} className="border border-white/10 bg-black/40 p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">detail</p>
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
        )}

        {scene === "experience" && (
          <section className="fade-in min-h-full py-10">
            <div className="mb-10">
              <p className="mb-3 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">experience</p>
              <h2 className="text-4xl font-semibold md:text-6xl">Professional experience.</h2>
            </div>
            <div className="space-y-4">
              {experience.map((item, index) => (
                <Panel key={`${item.company}-${item.role}`} className="p-5">
                  <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                    <div className="font-mono text-sm text-cyan-300">step {String(index + 1).padStart(2, "0")}</div>
                    <div>
                      <h3 className="text-2xl font-semibold">{item.role}</h3>
                      <p className="mt-1 text-cyan-200">{item.company}</p>
                      <p className="mt-2 text-sm text-slate-500">
                        {item.date} · {item.location}
                      </p>
                      <p className="mt-4 max-w-4xl leading-7 text-slate-300">{item.details}</p>
                    </div>
                  </div>
                </Panel>
              ))}
            </div>
          </section>
        )}

        {scene === "contact" && canOpenContact && (
          <section className="fade-in grid min-h-full items-center">
            <Panel className="mx-auto w-full max-w-4xl p-8 text-center">
              <p className="mb-3 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">contact</p>
              <h2 className="text-4xl font-semibold md:text-6xl">Let’s build something useful.</h2>
              <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
                Open to selected product, full-stack, automation, event infrastructure and stage technology opportunities.
              </p>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {contact.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="border border-white/10 bg-black px-5 py-4 text-left transition hover:border-cyan-300 hover:bg-cyan-300/10"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-lg text-white">{item.value}</p>
                  </a>
                ))}
              </div>
            </Panel>
          </section>
        )}

        {scene === "contact" && !canOpenContact && (
          <section className="fade-in grid min-h-full items-center">
            <Panel className="mx-auto w-full max-w-4xl p-8 text-center">
              <p className="mb-3 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">contact</p>
              <h2 className="text-4xl font-semibold md:text-6xl">Let’s build something useful.</h2>
              <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
                You can contact me directly. Explore 3 projects to mark the extended contact card as completed.
              </p>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {contact.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="border border-white/10 bg-black px-5 py-4 text-left transition hover:border-cyan-300 hover:bg-cyan-300/10"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-lg text-white">{item.value}</p>
                  </a>
                ))}
              </div>
            </Panel>
          </section>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-white/10 bg-black/95">
        <SkillsMarquee />

        <div className="border-t border-white/10">
          {/* Header */}
          <div
            onClick={() => setLogOpen((v) => !v)}
            className="flex cursor-pointer items-center justify-between px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-slate-500 hover:text-cyan-300"
          >
            <span>System Log</span>
            <div className="flex items-center gap-4">
              <span>{discoveredCount}/{projects.length} discovered</span>

              {/* Chevron Icon */}
              <div className="flex flex-col items-center justify-center text-[10px] leading-none">
                {logOpen ? (
                  <>
                    <span>˄</span>
                    <span>˄</span>
                  </>
                ) : (
                  <>
                    <span>˅</span>
                    <span>˅</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Collapsible Content */}
          {logOpen && (
            <div className="px-4 pb-4">
              <div ref={logRef} className="h-28 overflow-auto space-y-1">
                {logs.map((line, index) => (
                  <LogLine key={`${line}-${index}`}>{line}</LogLine>
                ))}
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
