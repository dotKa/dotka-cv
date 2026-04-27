export const siteMeta = {
  name: "Yasin Karadeniz",
  title: "Yasin Karadeniz — Interactive CV",
  description:
    "Interactive CV and portfolio of Yasin Karadeniz, a full-stack developer building production-grade systems across real-time software, automation, event technology, backend architecture and deployment.",
  role: "Full Stack Developer / Product Engineer",
  email: "info@dotka.xyz",
  phone: "+90 531 813 62 73",
  location: "Türkiye",
  liveUrl: "https://cv.dotka.xyz",
  sameAs: ["https://linkedin.com/in/yasinka", "https://github.com/dotka"]
};

const siteMetaTranslations = {
  tr: {
    title: "Yasin Karadeniz — Interactive CV",
    description:
      "Yasin Karadeniz'in interaktif CV ve portfolyosu; gerçek zamanlı yazılım, otomasyon, event teknolojisi, backend mimarisi ve deployment alanlarında production-grade sistemler geliştiren full-stack developer.",
    role: "Full Stack Developer / Product Engineer",
    location: "Türkiye"
  }
};

export function getSiteMeta(language = "en") {
  return {
    ...siteMeta,
    ...(siteMetaTranslations[language] || {})
  };
}
