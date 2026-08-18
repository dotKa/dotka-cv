export const projects = [
  {
    id: "relackout",
    title: "Relackout",
    type: "Product / Stage Technology / Developer-led SaaS",
    year: "2026 — Present",
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
    link: "https://relackout.com",
    unlockHint: "Relackout viewed"
  },
  {
    id: "usb-dmx",
    title: "Relackout USB-DMX Hardware",
    type: "Production Hardware / Developer-built Device",
    year: "2026 — Present",
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
    unlockHint: "USB-DMX hardware viewed"
  },
  {
    id: "kalfa",
    title: "Kalfa",
    type: "Product / AI Studio / SaaS",
    year: "2026 — Present",
    short: "Live AI studio for artists: playwrights, screenwriters, novelists, poets and lyricists.",
    story:
      "Kalfa is a live, actively used AI workspace built for creative professionals working on theatre plays, screenplays, stories, poetry and lyrics. Instead of a stateless chatbot, it is a memory-aware studio that understands the whole work, explains the reasoning behind every suggestion and keeps the artist in control from first idea to production.",
    points: [
      "Live product with active users and subscription + usage-based pricing",
      "Memory-aware AI that keeps context of the entire work, not single prompts",
      "Modules for writing support, dramaturgy analysis, lighting and stage design",
      "Creation Mode lets artists tune AI involvement from assistant to co-creator",
      "Decision Log records creative choices with their reasoning",
      "Contractual no-training guarantee on user content and GDPR compliance"
    ],
    stack: ["AI", "LLM Orchestration", "SaaS", "Multi-tenant", "Product Engineering", "UX"],
    link: "https://www.kalfa.art",
    unlockHint: "Kalfa viewed"
  },
  {
    id: "agentmagnify",
    title: "AgentMagnify",
    type: "Product / Developer Tooling / AI Agent Observability",
    year: "2026 — Present",
    short: "Live monitoring platform that verifies what AI coding agents actually did.",
    story:
      "AgentMagnify is a live, actively used platform that gives developers real visibility into AI coding agent work. It builds a replayable, append-only record of every project and separates what agents claim from what evidence — tests, builds, screenshots — actually supports, closing the trust gap between agent activity and real progress.",
    points: [
      "Live product integrated with Claude Code, Codex, Cursor and any bash environment",
      "Reported / Roadmap / Verified metrics keep claims separate from evidence",
      "Replayable project history built on append-only events",
      "Independent verification pass that disputes claim–evidence contradictions",
      "Offline-first event queue and single-command install via npx",
      "Open-source (MIT) agent skill with free and paid SaaS tiers"
    ],
    stack: ["AI Agents", "Node.js", "CLI", "Event Sourcing", "Observability", "SaaS"],
    link: "https://agentmagnify.com",
    unlockHint: "AgentMagnify viewed"
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
    unlockHint: "Content workflow viewed"
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
    unlockHint: "Library system viewed"
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
    unlockHint: "Tickentra viewed"
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
    unlockHint: "Quiz platform viewed"
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
    unlockHint: "Automation systems viewed"
  }
];

const projectTranslations = {
  tr: {
    relackout: {
      type: "Ürün / Sahne Teknolojisi / Developer-led SaaS",
      year: "2026 — Günümüz",
      short: "Canlı etkinlikler için production-ready gerçek zamanlı ışık kontrol yazılımı.",
      story:
        "Relackout; tiyatrolar, mekanlar ve etkinlik operatörleri için DMX ve Art-Net iş akışlarını sadeleştirmeye odaklanan production-ready bir ışık kontrol ürünüdür. Realtime mimari, UI mühendisliği, donanım entegrasyonu ve ürün teslimini tek sistemde birleştiren developer kimliğimi net biçimde yansıtır.",
      points: [
        "Gerçek kullanıcıları ve public konumlandırması olan production-ready ürün",
        "DMX512 ve Art-Net tabanlı ışık kontrolü",
        "Scene, cue stack ve canlı operasyon iş akışları",
        "Fader, buton ve gruplardan oluşan özel mixer layout'u",
        "Sadelik, hız, düşük gecikmeli kontrol ve pratik sahne kullanımı etrafında geliştirildi"
      ],
      unlockHint: "Relackout görüntülendi"
    },
    "usb-dmx": {
      type: "Production Donanım / Developer-built Cihaz",
      year: "2026 — Günümüz",
      short: "Relackout iş akışları için üretilen fiziksel USB-DMX donanımı.",
      story:
        "Relackout için geliştirilen fiziksel USB-DMX donanım ürünü. Bu yalnızca prototip yönü değil; elektronik, RS485/DMX iletişimi, enclosure tasarımı, cihaz kullanılabilirliği ve yazılım uyumluluğu genelinde uygulamalı production düşüncesini temsil eder.",
      points: [
        "Relackout ekosistemi için üretilen fiziksel USB-DMX cihazı",
        "USB'den RS485 / DMX iletişim katmanı",
        "3D baskı enclosure planlama ve donanım kullanılabilirliği iterasyonu",
        "Sahne ve etkinlik operatörleri için production-ready ürün yönü",
        "Yazılım mühendisliği, fiziksel cihaz tasarımı ve gerçek dünya testlerini birleştirir"
      ],
      unlockHint: "USB-DMX donanımı görüntülendi"
    },
    kalfa: {
      type: "Ürün / AI Stüdyo / SaaS",
      year: "2026 — Günümüz",
      short: "Sanatçılar için yayında olan AI stüdyosu: oyun yazarları, senaristler, romancılar, şairler ve söz yazarları.",
      story:
        "Kalfa; tiyatro oyunu, senaryo, öykü, şiir ve şarkı sözü üzerinde çalışan yaratıcı profesyoneller için geliştirilen, yayında ve aktif kullanımda olan bir AI çalışma alanıdır. Stateless bir chatbot yerine eserin bütününü anlayan memory-aware bir stüdyodur; her önerinin arkasındaki gerekçeyi gösterir ve ilk fikirden prodüksiyona kadar kontrolü sanatçıda tutar.",
      points: [
        "Aktif kullanıcıları ve abonelik + kullanım bazlı fiyatlandırması olan yayında bir ürün",
        "Tek prompt değil, eserin tamamının bağlamını tutan memory-aware AI",
        "Yazım desteği, dramaturji analizi, ışık ve sahne tasarımı modülleri",
        "Creation Mode ile AI müdahale seviyesi asistan'dan co-creator'a ayarlanabilir",
        "Decision Log yaratıcı kararları gerekçeleriyle birlikte kaydeder",
        "Kullanıcı içeriğinin modele eğitim için kullanılmayacağına dair sözleşmesel garanti ve GDPR uyumu"
      ],
      unlockHint: "Kalfa görüntülendi"
    },
    agentmagnify: {
      type: "Ürün / Developer Tooling / AI Agent Observability",
      year: "2026 — Günümüz",
      short: "AI kodlama agent'larının gerçekte ne yaptığını doğrulayan yayında bir izleme platformu.",
      story:
        "AgentMagnify; geliştiricilere AI kodlama agent'larının çalışmaları üzerinde gerçek görünürlük sağlayan, yayında ve aktif kullanımda olan bir platformdur. Her proje için tekrar oynatılabilir, append-only bir kayıt oluşturur ve agent'ların iddia ettiklerini kanıtların — testler, build'ler, ekran görüntüleri — gerçekten desteklediklerinden ayırarak agent aktivitesi ile gerçek ilerleme arasındaki güven boşluğunu kapatır.",
      points: [
        "Claude Code, Codex, Cursor ve her bash ortamıyla entegre yayında bir ürün",
        "Reported / Roadmap / Verified metrikleri iddiaları kanıtlardan ayrı tutar",
        "Append-only event'ler üzerine kurulu tekrar oynatılabilir proje geçmişi",
        "İddia–kanıt çelişkilerini tespit eden bağımsız doğrulama geçişi",
        "Offline-first event kuyruğu ve npx ile tek komutla kurulum",
        "Açık kaynak (MIT) agent skill'i, ücretsiz ve ücretli SaaS planları"
      ],
      unlockHint: "AgentMagnify görüntülendi"
    },
    "content-generator": {
      type: "Otomasyon / Yayınlama",
      year: "2025 — Günümüz",
      short: "İçerik üretimi ve yayınlama iş akışları için platform.",
      story:
        "WordPress ve özel sistemler gibi CMS hedeflerine içerik üretmek, planlamak ve dağıtmak için geliştirilen multi-tenant bir platform.",
      points: [
        "Prompt ve içerik iş akışı yönetimi",
        "Zamanlanmış yayınlama görevleri",
        "WordPress ve CMS entegrasyonları",
        "İçerik operasyonları için worker tabanlı mimari"
      ],
      unlockHint: "İçerik iş akışı görüntülendi"
    },
    library: {
      type: "SaaS / Operasyon",
      short: "Küçük kütüphaneler için multi-tenant yönetim sistemi.",
      story:
        "Kitap takibi, ödünç alma/verme iş akışları ve görsel raf haritalama fikirlerini içeren, küçük koleksiyonlar için pratik bir kütüphane platformu.",
      points: [
        "Kitap ödünç alma ve iade iş akışları",
        "Global kitap metadata API entegrasyonu",
        "Tenant'a özel kitap kodları",
        "Fiziksel kütüphaneler için görsel raf / harita konsepti"
      ],
      unlockHint: "Kütüphane sistemi görüntülendi"
    },
    tickentra: {
      type: "Event / Biletleme Altyapısı",
      short: "Biletleme ve event altyapısı konsepti.",
      story:
        "Etkinlik organizatörleri için event oluşturma, bilet iş akışları, CRM-ready akışlar ve entegrasyonlar etrafında tasarlanan biletleme altyapısı yönü.",
      points: [
        "Organizatör odaklı event yönetimi",
        "Bilet operasyon iş akışları",
        "CRM-ready backend yapısı",
        "Entegrasyon dostu ürün mimarisi"
      ],
      unlockHint: "Tickentra görüntülendi"
    },
    "quiz-night": {
      type: "İnteraktif Event Deneyimi",
      year: "2024 — Günümüz",
      short: "Etkinlikler için canlı quiz deneyimi sistemi.",
      story:
        "Quiz night etkinlikleri için katılım, gerçek zamanlı puanlama ve izleyici etkileşimine odaklanan interaktif event sistemi.",
      points: [
        "Canlı soru akışı",
        "Gerçek zamanlı puanlama mantığı",
        "İzleyici katılım deneyimi",
        "Sosyal etkinlikler ve mekanlar için tasarlandı"
      ],
      unlockHint: "Quiz platformu görüntülendi"
    },
    automation: {
      type: "Otomasyon / Veri",
      year: "2017 — Günümüz",
      short: "Özel scraping, iş akışı ve iş otomasyonu sistemleri.",
      story:
        "Özel otomasyon sistemleri, veri toplama pipeline'ları, CRM akışları ve operasyonel araçlar geliştirme konusunda uzun soluklu deneyim.",
      points: [
        "Veri toplama ve scraping pipeline'ları",
        "İş süreci otomasyonu",
        "CRM ve iç iş akışı araçları",
        "Bot tabanlı operasyonel sistemler"
      ],
      unlockHint: "Otomasyon sistemleri görüntülendi"
    }
  }
};

export function getProjects(language = "en") {
  const translations = projectTranslations[language];
  if (!translations) return projects;

  return projects.map((project) => ({
    ...project,
    ...translations[project.id]
  }));
}
