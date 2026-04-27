import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./components/Button";
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

function addUnique(list, item) {
  return list.includes(item) ? list : [...list, item];
}

const selectedProjectStorageKey = "interactive-cv:selected-project";
const visitedProjectsStorageKey = "interactive-cv:visited-projects";
const projectIds = projects.map((project) => project.id);

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

export default function App() {
  const logRef = useRef(null);
  const [logOpen, setLogOpen] = useState(false);
  const [scene, setScene] = useState("intro");
  const [selectedProjectId, setSelectedProjectId] = useState(readStoredSelectedProjectId);
  const [visitedProjects, setVisitedProjects] = useState(readStoredVisitedProjects);
  const [logs, setLogs] = useState([
    "profile ready",
    "sections available",
    "projects ready"
  ]);

  const selectedProject = useMemo(() => {
    return projects.find((project) => project.id === selectedProjectId) || projects[0];
  }, [selectedProjectId]);

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
    setScene(nextScene);
    pushLog(`opened: ${nextScene}`);
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

  return (
    <div className="h-screen overflow-hidden bg-black text-white selection:bg-cyan-300/30">
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-size-[48px_48px]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-cyan-300/10 blur-2xl" style={{ animation: "scanline 8s linear infinite" }} />
      </div>

      <header className="fixed left-0 top-0 z-50 flex h-[84px] w-full items-center justify-between border-b border-white/10 bg-black/90 px-5 py-4 backdrop-blur md:px-10">
        <button
          type="button"
          onClick={() => go("intro")}
          className="flex min-w-0 items-center gap-3 font-mono text-sm uppercase tracking-[0.18em] text-white"
        >
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0 leading-tight">
            <span className="whitespace-nowrap">Yasin Karadeniz</span>
            <span className="whitespace-nowrap text-cyan-300 sm:before:mr-2 sm:before:content-['/']">Interactive CV</span>
          </span>
        </button>
        <nav className="hidden gap-2 md:flex">
          {scenes.map((item) => (
            <Button key={item} active={scene === item} onClick={() => go(item)}>
              {sceneLabels[item]}
            </Button>
          ))}
        </nav>
      </header>

      <main className={`fixed left-0 right-0 z-10 overflow-y-auto px-5 md:px-10 ${logOpen ? "bottom-[258px] top-[84px]" : "bottom-[126px] top-[84px]"}`}>
        {scene === "intro" && <IntroScene discoveredCount={discoveredCount} go={go} randomDiscovery={randomDiscovery} />}
        {scene === "about" && <AboutScene />}
        {scene === "projects" && <ProjectsScene discoveredCount={discoveredCount} inspectProject={inspectProject} visitedProjects={visitedProjects} />}
        {scene === "project" && (
          <ProjectScene
            go={go}
            inspectProject={inspectProject}
            randomDiscovery={randomDiscovery}
            selectedProject={selectedProject}
            visitedProjects={visitedProjects}
          />
        )}
        {scene === "experience" && <ExperienceScene />}
        {scene === "contact" && <ContactScene />}
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
