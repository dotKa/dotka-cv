import { useEffect, useRef, useState } from "react";
import { Link, Navigate, NavLink, Route, Routes, useNavigate, useParams } from "react-router";
import { LogLine } from "./components/LogLine";
import { SkillsMarquee } from "./components/SkillsMarquee";
import { runDataChecks } from "./data/checks";
import { projects } from "./data/projects";
import { sceneLabels, scenes } from "./data/scenes";
import { AboutScene } from "./scenes/AboutScene";
import { ContactScene } from "./scenes/ContactScene";
import { ExperienceScene } from "./scenes/ExperienceScene";
import { IntroScene } from "./scenes/IntroScene";
import { ProjectScene } from "./scenes/ProjectScene";
import { ProjectsScene } from "./scenes/ProjectsScene";
import { PrintCvPage } from "./pages/PrintCvPage";

function addUnique(list, item) {
  return list.includes(item) ? list : [...list, item];
}

const selectedProjectStorageKey = "interactive-cv:selected-project";
const visitedProjectsStorageKey = "interactive-cv:visited-projects";
const projectIds = projects.map((project) => project.id);
const scenePaths = {
  intro: "/",
  about: "/about",
  projects: "/projects",
  experience: "/experience",
  contact: "/contact"
};

function readStoredSelectedProjectId() {
  if (typeof window === "undefined") return "relackout";

  const storedProjectId = window.localStorage.getItem(selectedProjectStorageKey);
  return projectIds.includes(storedProjectId) ? storedProjectId : "relackout";
}

function readStoredVisitedProjects() {
  if (typeof window === "undefined") return [];

  try {
    const storedProjects = JSON.parse(window.localStorage.getItem(visitedProjectsStorageKey) || "[]");
    return Array.isArray(storedProjects) ? storedProjects.filter((projectId) => projectIds.includes(projectId)) : [];
  } catch {
    return [];
  }
}

const dataErrors = runDataChecks();
if (dataErrors.length > 0) {
  console.warn("CV data check warnings:", dataErrors);
}

function navClassName({ isActive }) {
  return `border px-4 py-3 text-left text-sm uppercase tracking-[0.14em] transition ${
    isActive
      ? "border-cyan-300 bg-cyan-300 text-slate-950"
      : "border-white/15 bg-black text-slate-300 hover:border-cyan-300 hover:bg-cyan-300/10 hover:text-white"
  }`;
}

function ProjectRoute({ setSelectedProjectId, setVisitedProjects, go, inspectProject, randomDiscovery, visitedProjects }) {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  useEffect(() => {
    if (!project) return;

    setSelectedProjectId(project.id);
    setVisitedProjects((current) => addUnique(current, project.id));
  }, [project, setSelectedProjectId, setVisitedProjects]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <ProjectScene
      go={go}
      inspectProject={inspectProject}
      randomDiscovery={randomDiscovery}
      selectedProject={project}
      visitedProjects={visitedProjects}
    />
  );
}

function AppShell() {
  const navigate = useNavigate();
  const logRef = useRef(null);
  const [logOpen, setLogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(readStoredSelectedProjectId);
  const [visitedProjects, setVisitedProjects] = useState(readStoredVisitedProjects);
  const [logs, setLogs] = useState([
    "profile ready",
    "sections available",
    "projects ready"
  ]);

  const discoveredCount = visitedProjects.length;

  function pushLog(message) {
    setLogs((current) => [...current, message].slice(-50));
  }

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs, logOpen]);

  useEffect(() => {
    window.localStorage.setItem(selectedProjectStorageKey, selectedProjectId);
  }, [selectedProjectId]);

  useEffect(() => {
    window.localStorage.setItem(visitedProjectsStorageKey, JSON.stringify(visitedProjects));
  }, [visitedProjects]);

  function go(nextScene) {
    navigate(scenePaths[nextScene] || "/");
    pushLog(`opened: ${nextScene}`);
  }

  function inspectProject(project) {
    setSelectedProjectId(project.id);
    setVisitedProjects((current) => addUnique(current, project.id));
    navigate(`/projects/${project.id}`);
    pushLog(project.unlockHint);
  }

  function randomDiscovery() {
    const unseen = projects.filter((project) => !visitedProjects.includes(project.id));
    const pool = unseen.length > 0 ? unseen : projects;
    const index = Math.floor(Math.random() * pool.length);
    inspectProject(pool[index]);
  }

  return (
    <div className="h-screen overflow-hidden bg-black text-white selection:bg-cyan-300/30">
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-size-[48px_48px]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-cyan-300/10 blur-2xl" style={{ animation: "scanline 8s linear infinite" }} />
      </div>

      <header className="fixed left-0 top-0 z-50 flex h-[84px] w-full items-center justify-between border-b border-white/10 bg-black/90 px-5 py-4 backdrop-blur md:px-10">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 font-mono text-sm uppercase tracking-[0.18em] text-white"
        >
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0 leading-tight">
            <span className="whitespace-nowrap">Yasin Karadeniz</span>
            <span className="whitespace-nowrap text-cyan-300 sm:before:mr-2 sm:before:content-['/']">Interactive CV</span>
          </span>
        </Link>
        <nav className="hidden gap-2 md:flex">
          {scenes.map((item) => (
            <NavLink key={item} to={scenePaths[item]} end={item === "intro"} className={navClassName}>
              {sceneLabels[item]}
            </NavLink>
          ))}
          <a
            href="/cv/print"
            target="_blank"
            rel="noreferrer"
            className="border border-cyan-300 bg-cyan-300 px-4 py-3 text-left text-sm uppercase tracking-[0.14em] text-slate-950 transition hover:bg-cyan-200"
          >
            Download PDF
          </a>
        </nav>
      </header>

      <main className={`fixed left-0 right-0 z-10 overflow-y-auto px-5 md:px-10 ${logOpen ? "bottom-[258px] top-[84px]" : "bottom-[126px] top-[84px]"}`}>
        <Routes>
          <Route index element={<IntroScene discoveredCount={discoveredCount} go={go} randomDiscovery={randomDiscovery} />} />
          <Route path="about" element={<AboutScene />} />
          <Route path="projects" element={<ProjectsScene discoveredCount={discoveredCount} inspectProject={inspectProject} visitedProjects={visitedProjects} />} />
          <Route
            path="projects/:projectId"
            element={
              <ProjectRoute
                setSelectedProjectId={setSelectedProjectId}
                setVisitedProjects={setVisitedProjects}
                go={go}
                inspectProject={inspectProject}
                randomDiscovery={randomDiscovery}
                visitedProjects={visitedProjects}
              />
            }
          />
          <Route path="experience" element={<ExperienceScene />} />
          <Route path="contact" element={<ContactScene />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-white/10 bg-black/95">
        <SkillsMarquee />

        <div className="border-t border-white/10">
          {/* Header */}
          <div
            onClick={() => setLogOpen((value) => !value)}
            className="flex cursor-pointer items-center justify-between px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-slate-500 hover:text-cyan-300"
          >
            <span>Activity</span>
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
              <div ref={logRef} className="h-28 space-y-1 overflow-auto">
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

export default function App() {
  return (
    <Routes>
      <Route path="/cv/print" element={<PrintCvPage />} />
      <Route path="/*" element={<AppShell />} />
    </Routes>
  );
}
