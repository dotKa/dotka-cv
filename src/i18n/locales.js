export const supportedLanguages = ["en", "tr"];
export const defaultLanguage = "en";
export const languageStorageKey = "interactive-cv:language";

export const messages = {
  en: {
    languageName: "English",
    nav: {
      intro: "home",
      about: "about",
      projects: "projects",
      experience: "experience",
      contact: "contact"
    },
    header: {
      titleSuffix: "Interactive CV",
      menu: "menu",
      close: "close",
      downloadPdf: "Download PDF",
      languageLabel: "Language"
    },
    footer: {
      activity: "Activity",
      discovered: "discovered"
    },
    progress: {
      projectsViewed: "Projects Viewed"
    },
    intro: {
      eyebrow: "interactive cv",
      title: "An interactive CV of a developer who builds real systems.",
      description:
        "Full-stack developer, product builder and hands-on system maker. Explore projects, experience and practical know-how through an interactive CV flow.",
      viewProjects: "view projects",
      aboutMe: "about me",
      exploreProject: "explore a project",
      profile: "profile"
    },
    about: {
      eyebrow: "about me",
      title: "I build real systems",
      titleBreak: "not just code.",
      description:
        "I am a full-stack developer with strong hands-on know-how. I do not only design interfaces or write isolated features; I build systems that run, scale, integrate and solve real operational problems.",
      cards: [
        {
          title: "01 / Developer Identity",
          text:
            "Full-stack developer with a product-first mindset. I design and build systems end-to-end — from interface to backend to deployment — focused on real-world usability, reliability, and solving operational problems."
        },
        {
          title: "02 / Know-how",
          text:
            "My strongest side is practical know-how: debugging, connecting systems, making trade-offs and turning uncertain ideas into working products. I use AI-assisted tools to accelerate research, prototyping and iteration while keeping engineering judgment at the center."
        },
        {
          title: "03 / DevOps Mindset",
          text:
            "I am comfortable with Linux servers, Docker, Coolify, reverse proxies, SSL/DNS, object storage and log-based debugging. I care about running systems, not just writing code."
        },
        {
          title: "04 / Physical Systems",
          text:
            "With Relackout and USB-DMX hardware, I combine software with physical devices. The USB-DMX product direction is production-ready and built for real stage/event usage."
        }
      ]
    },
    projects: {
      eyebrow: "selected projects",
      title: "Selected projects.",
      projectLabel: "project",
      viewed: "viewed",
      view: "view",
      listTitle: "selected projects",
      projectsButton: "projects",
      exploreAnother: "explore another",
      visitProject: "visit project",
      highlight: "highlight",
      stack: "Stack",
      projectLink: "Project link"
    },
    experience: {
      eyebrow: "experience",
      title: "Professional experience.",
      step: "step"
    },
    contact: {
      eyebrow: "contact",
      title: "Let’s build something useful.",
      description:
        "Open to selected product, full-stack, automation, event infrastructure and stage technology opportunities."
    },
    logs: {
      initial: ["profile ready", "sections available", "projects ready"],
      opened: "opened"
    },
    print: {
      actions: {
        print: "Print / Save PDF",
        back: "Back to interactive CV"
      },
      eyebrow: "Interactive CV / Printable Version",
      liveQr: "For live version scan QR code",
      liveQrTitle: "Live CV QR code",
      summary: "Summary",
      skills: "Skills & Tools",
      selectedProjects: "Selected Projects",
      experience: "Experience",
      contact: "Contact"
    },
    skills: {
      title: "Skills & Tools"
    }
  },
  tr: {
    languageName: "Türkçe",
    nav: {
      intro: "ana sayfa",
      about: "hakkımda",
      projects: "projeler",
      experience: "deneyim",
      contact: "iletişim"
    },
    header: {
      titleSuffix: "Interactive CV",
      menu: "menü",
      close: "kapat",
      downloadPdf: "PDF indir",
      languageLabel: "Dil"
    },
    footer: {
      activity: "Aktivite",
      discovered: "keşfedildi"
    },
    progress: {
      projectsViewed: "Görüntülenen Projeler"
    },
    intro: {
      eyebrow: "interactive cv",
      title: "Gerçek sistemler geliştiren bir developer'ın interaktif CV'si.",
      description:
        "Full-stack developer, ürün geliştirici ve uygulamalı sistem üreticisi. Projeleri, deneyimi ve pratik know-how'ı interaktif CV akışı içinde keşfedin.",
      viewProjects: "projeleri gör",
      aboutMe: "hakkımda",
      exploreProject: "bir proje keşfet",
      profile: "profil"
    },
    about: {
      eyebrow: "hakkımda",
      title: "Gerçek sistemler geliştiririm",
      titleBreak: "sadece kod değil.",
      description:
        "Güçlü uygulamalı know-how'a sahip bir full-stack developer'ım. Yalnızca arayüz tasarlamak ya da izole özellikler yazmakla kalmam; çalışan, ölçeklenen, entegre olan ve gerçek operasyonel problemleri çözen sistemler geliştiririm.",
      cards: [
        {
          title: "01 / Developer Kimliği",
          text:
            "Ürün öncelikli düşünen bir full-stack developer'ım. Arayüzden backend'e ve deployment'a kadar sistemleri uçtan uca tasarlar ve geliştiririm; odağım gerçek kullanım, güvenilirlik ve operasyonel problemleri çözmektir."
        },
        {
          title: "02 / Know-how",
          text:
            "En güçlü tarafım pratik know-how: hata ayıklamak, sistemleri birbirine bağlamak, doğru trade-off'ları yapmak ve belirsiz fikirleri çalışan ürünlere dönüştürmek. AI destekli araçları araştırma, prototipleme ve iterasyonu hızlandırmak için kullanırım; mühendislik kararını merkezde tutarım."
        },
        {
          title: "03 / DevOps Bakışı",
          text:
            "Linux sunucular, Docker, Coolify, reverse proxy'ler, SSL/DNS, object storage ve log temelli debugging konularında rahat çalışırım. Sadece kod yazmayı değil, sistemleri çalışır tutmayı önemserim."
        },
        {
          title: "04 / Fiziksel Sistemler",
          text:
            "Relackout ve USB-DMX donanımıyla yazılımı fiziksel cihazlarla birleştiriyorum. USB-DMX ürün yönü production-ready ve gerçek sahne/event kullanımına göre geliştirildi."
        }
      ]
    },
    projects: {
      eyebrow: "seçilmiş projeler",
      title: "Seçilmiş projeler.",
      projectLabel: "proje",
      viewed: "görüldü",
      view: "gör",
      listTitle: "seçilmiş projeler",
      projectsButton: "projeler",
      exploreAnother: "başka keşfet",
      visitProject: "projeyi ziyaret et",
      highlight: "öne çıkan",
      stack: "Stack",
      projectLink: "Proje linki"
    },
    experience: {
      eyebrow: "deneyim",
      title: "Profesyonel deneyim.",
      step: "adım"
    },
    contact: {
      eyebrow: "iletişim",
      title: "Faydalı bir şey inşa edelim.",
      description:
        "Seçilmiş ürün, full-stack, otomasyon, event altyapısı ve sahne teknolojisi fırsatlarına açığım."
    },
    logs: {
      initial: ["profil hazır", "bölümler hazır", "projeler hazır"],
      opened: "açıldı"
    },
    print: {
      actions: {
        print: "Yazdır / PDF kaydet",
        back: "Interactive CV'ye dön"
      },
      eyebrow: "Interactive CV / Yazdırılabilir Versiyon",
      liveQr: "Canlı versiyon için QR kodu tarayın",
      liveQrTitle: "Canlı CV QR kodu",
      summary: "Özet",
      skills: "Skills & Tools",
      selectedProjects: "Seçilmiş Projeler",
      experience: "Deneyim",
      contact: "İletişim"
    },
    skills: {
      title: "Skills & Tools"
    }
  }
};
