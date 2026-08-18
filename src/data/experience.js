export const experience = [
  {
    role: "Co-Founder",
    company: "remana.tech",
    date: "Mar 2023 — Present",
    location: "İstanbul, Türkiye · Remote",
    details:
      "Building SaaS products, automation platforms and business tools, including the live AI products Kalfa and AgentMagnify. Responsible for product direction, full-stack development, system design and delivery."
  },
  {
    role: "Full Stack Developer",
    company: "GridStudio",
    date: "Jun 2020 — Present",
    location: "Dubai Internet City / UAE · Remote",
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

const experienceTranslations = {
  tr: [
    {
      role: "Co-Founder",
      company: "remana.tech",
      date: "Mar 2023 — Günümüz",
      location: "İstanbul, Türkiye · Remote",
      details:
        "Yayında olan AI ürünleri Kalfa ve AgentMagnify dahil; SaaS ürünleri, otomasyon platformları ve iş araçları geliştiriyorum. Ürün yönü, full-stack geliştirme, sistem tasarımı ve teslim süreçlerinden sorumluyum."
    },
    {
      role: "Full Stack Developer",
      company: "GridStudio",
      date: "Haz 2020 — Günümüz",
      location: "Dubai Internet City / UAE · Remote",
      details:
        "Meteor.js ve modern frontend araçları dahil JavaScript odaklı stack'lerle full-stack web uygulamaları, entegrasyonlar ve iş sistemleri geliştiriyorum."
    },
    {
      role: "Full Stack Developer",
      company: "Bordo.io",
      date: "Eki 2021 — Günümüz",
      location: "Samsun, Türkiye",
      details:
        "Svelte, MeteorJS ve ürün odaklı geliştirme akışlarıyla ölçeklenebilir ve UI ağırlıklı web uygulamaları geliştiriyorum."
    },
    {
      role: "Frontend Developer",
      company: "Bordo.io",
      date: "May 2020 — Şub 2022",
      location: "Remote",
      details:
        "Figma'dan production'a frontend arayüzler geliştirdim ve UI teslim pipeline'ları üzerinde çalıştım."
    },
    {
      role: "Ses ve Işık Tasarımı",
      company: "Yankı Kumpanya",
      date: "Eki 2017 — Günümüz",
      location: "Muğla, Türkiye",
      details:
        "Tiyatro prodüksiyonları için DMX iş akışları, cue planlama ve canlı operasyon dahil ses ve ışık sistemleri tasarlıyor ve işletiyorum."
    }
  ]
};

export function getExperience(language = "en") {
  return experienceTranslations[language] || experience;
}
