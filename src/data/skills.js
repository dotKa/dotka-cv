export const skillGroups = [
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

export const skills = skillGroups.flatMap((group) => group.items);
export const marqueeSkills = [...skills, ...skills];

const skillGroupTranslations = {
  tr: [
    {
      title: "Developer Core",
      note: "Ürün kodu, frontend, backend ve realtime akışlarda güçlü uygulamalı yetkinlik.",
      items: skillGroups[0].items
    },
    {
      title: "Backend & Data",
      note: "Veriyi güvenilir şekilde saklayan, işleyen, otomatikleştiren ve dışa açan sistemler geliştirme.",
      items: skillGroups[1].items
    },
    {
      title: "DevOps & Deployment",
      note: "Ürünleri koddan çalışan altyapıya taşımakta rahat çalışma.",
      items: skillGroups[2].items
    },
    {
      title: "Product & Delivery",
      note: "Know-how yalnızca kodla sınırlı değil; ürünü şekillendirebilir, geliştirebilir, yayına alabilir ve işletebilirim.",
      items: skillGroups[3].items
    },
    {
      title: "Hardware / Event Tech",
      note: "Tiyatro, ışık sistemleri ve fiziksel cihazlardan gelen pratik production bilgisi.",
      items: skillGroups[4].items
    }
  ]
};

export function getSkillGroups(language = "en") {
  return skillGroupTranslations[language] || skillGroups;
}

export function getMarqueeSkills(language = "en") {
  const localizedSkills = getSkillGroups(language).flatMap((group) => group.items);
  return [...localizedSkills, ...localizedSkills];
}
