import { contact } from "./contact";
import { experience } from "./experience";
import { projects } from "./projects";
import { scenes } from "./scenes";
import { skillGroups, skills } from "./skills";

export function runDataChecks() {
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
