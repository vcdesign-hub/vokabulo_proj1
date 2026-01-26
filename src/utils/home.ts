import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Language } from './i18n';
import { generateFallbackDescription } from './seo';

// --- 1. DEFINE THE VISUAL DATA TYPES ---
export type VisualData = {
  philosophyVisuals: any;
  vocabMarquee: any;
  heroBadges: any;
  hero: { ctaText: string };
  featureShowcase: any;
  bentoGrid: any;
  caseStudies: any;
  testimonials: any;
  faq: any;
  promptMarquee: any;

  zigzagFeatures: {
    kicker: string;
    heading: string;
    items: Array<{
      title: string;
      description: string;
      words: string[]; // The relevant words for the marquee
    }>;
  };
};

// --- 2. DEFINE DATA FOR EACH LANGUAGE ---
const VISUALS_BY_LANG: Record<string, VisualData> = {
  en: {
    // NEW DATA START
    zigzagFeatures: {
      kicker: "Deep Dive",
      heading: "Mastery in every detail.",
      items: [
        {
          title: "Keep every project moving forward",
          description: "Plan, assign, and deliver your work - all in one place. With smart task tracking and real-time progress.",
          words: ["Deadline", "Milestone", "Delegate", "Priority", "Workflow", "Agile", "Sprint", "Backlog", "Roadmap", "Synergy"]
        },
        {
          title: "Seamless Cloud Sync",
          description: "Your vocabulary follows you everywhere. Start on your laptop, review on your phone during your commute.",
          words: ["Synchronize", "Cloud", "Backup", "Restore", "Real-time", "Device", "Seamless", "Integration", "Upload", "Download"]
        },
        {
          title: "Never forget a word",
          description: "Our smart spaced-repetition algorithm schedules reviews at the perfect moment, ensuring long-term retention.",
          words: ["Retention", "Memory", "Algorithm", "Recall", "Interval", "Cognitive", "Focus", "Mastery", "Review", "Permanent"]
        },
        {
          title: "AI-Powered Context",
          description: "Instantly generate real-world sentences and usage examples. Don't just memorize definitions—learn how words are used.",
          words: ["Context", "Nuance", "Syntax", "Semantics", "Usage", "Example", "Native", "Fluency", "Expression", "Dialogue"]
        }
      ]
    },
    philosophyVisuals: {
      flowTags: ["Context", "Definition", "Source"],
      chat: {
        question: "Has anyone seen \"Travel 101\"?",
        reply: "I just shared it! 🔥"
      }
    },
    vocabMarquee: {
      kicker: "Endless Possibilities",
      heading: "From casual slang to boardroom fluency.",
      row1: [
        { "text": "Order a flat white with oat milk", "icon": "coffee" },
        { "text": "Negotiate a salary increase", "icon": "briefcase" },
        { "text": "Ask for a refund kindly", "icon": "receipt" },
        { "text": "Explain a gap in your resume", "icon": "clock" },
        { "text": "Describe medical symptoms", "icon": "heart" },
        { "text": "Discuss climate change nuances", "icon": "globe" }
      ],
      row2: [
        { "text": "Understand local slang", "icon": "message" },
        { "text": "Flirt respectfully", "icon": "heart" },
        { "text": "Debate art history", "icon": "palette" },
        { "text": "Write a formal email", "icon": "mail" },
        { "text": "Give directions to a taxi", "icon": "map" },
        { "text": "Talk about your childhood", "icon": "user" }
      ]
    },
    heroBadges: {
      card1: { title: "+5 New", sub: "Words learned" },
      card2: { title: "14 Days", sub: "On fire! 🔥" },
      card3: { title: "Review", sub: "Complete" }
    },
    hero: {
      ctaText: "Discover more"
    },
    featureShowcase: {
      badge: "Features",
      slides: [
        "Collect words that you come across in the most simple way",
        "Swipe & Study until you can’t forget anymore",
        "Build vocabulary for the situations you live every day",
        "Create or follow Community curated Vocabulary Sets"
      ],
      cards: {
        left: {
          title: "Community",
          sub: "Active Threads",
          msg: "\"Has anyone seen Travel 101?\""
        },
        right: {
          title: "Review Time",
          sub: "Spaced Repetition",
          prefix: "You added",
          word: "Serendipity"
        }
      }
    },
    bentoGrid: {
      badge: "SMART FEATURES",
      heading: "Designed for modern learners.",
      subheading: "Experience the tools that make Vokabulo different.",
      ctaText: "Learn more",
      cards: [
        {
          title: "Smart Collections",
          body: "Organize your vocabulary into dynamic decks that match your life—work, travel, or hobbies.",
          img: "/images/blog/eye.jpg"
        },
        {
          title: "AI Pronunciation",
          body: "Get instant feedback on your accent with our advanced speech recognition engine.",
          img: "/images/blog/Hand reaching.jpg"
        },
        {
          title: "Context Engine",
          body: "See words used in real news articles, videos, and books to understand nuance.",
          img: "/images/blog/Moon rising.jpg"
        },
        {
          title: "Spaced Repetition",
          body: "Never forget a word. The algorithm calculates the perfect time for you to review.",
          img: "/images/blog/Ocean.jpg"
        },
        {
          title: "Cloud Sync",
          "body": "Start on your phone, continue on your iPad. Your progress is always safe.",
          img: "/images/blog/eye.jpg"
        },
        {
          title: "Community Sets",
          body: "Explore thousands of lists created by other learners and share your own.",
          img: "/images/blog/Hand reaching.jpg"
        }
      ]
    },
    caseStudies: {
      kicker: "Success Stories",
      heading: "See how others master fluency.",
      cards: [
        {
          title: "How Sophie mastered medical terminology in 3 months",
          linkText: "Read story",
          img: "/images/home/sophie.jpg"
        },
        {
          title: "Lukas's journey from beginner to business German",
          linkText: "Read story",
          img: "/images/home/lukas.jpg"
        },
        {
          title: "Why Maria switched from Duolingo to Vokabulo",
          linkText: "Read story",
          img: "/images/home/maria.jpg"
        }
      ]
    },
    testimonials: {
      kicker: "Wall of Love",
      heading: "Loved by learners.",
      subheading: "Don't take our word for it.",
      cards: [
        {
          id: 1,
          title: "Sophie, medical student",
          body: "I hit my daily goals in 15 minutes. Everything is structured, nothing distracts me.",
          img: "/images/home/sophie.jpg"
        },
        {
          id: 2,
          title: "Lukas, product manager",
          body: "Reviews are perfectly timed. My vocabulary grows without stress.",
          img: "/images/home/lukas.jpg"
        },
        {
          id: 3,
          title: "Maria, language coach",
          body: "Minimal yet powerful. Exactly the mix of design and pace I wanted.",
          img: "/images/home/maria.jpg"
        }
      ]
    },
    faq: {
      badge: "FAQs",
      heading: "Frequently Asked Questions",
      subheading: "If anything's missing, reach out anytime, we reply quickly and personally.",
      supportText: "Is your question not listed here? Please get in touch at",
      supportEmail: "support@vokabulo.com",
      items: [
        {
          id: 0,
          question: "How does the review system work?",
          answer: "Vokabulo calculates intervals based on your answers. Confident words appear less often; tricky ones show up more until they stick."
        },
        {
          id: 1,
          question: "Does it work offline?",
          answer: "Yes. Your progress is cached and syncs automatically once you're back online."
        },
        {
          id: 2,
          question: "Can I import my own lists?",
          answer: "Import CSV files or share existing lists with your team. Vokabulo handles duplicates and structure."
        },
        {
          id: 3,
          question: "How does the AI pronunciation feedback work?",
          answer: "Our engine analyzes your speech in real-time, comparing your intonation and accent with native speakers to give you an instant accuracy score."
        }
      ]
    },
    promptMarquee: {
      row1: [
        "Serendipity", "Eloquence", "Pragmatic", "Resilience", "Ambiguity", "Nuance"
      ],
      row2: [
        "Ephemeral", "Luminous", "Cognitive", "Synthesis", "Mellifluous", "Paradigm"
      ],
      row3: [
        "Authenticity", "Vibrant", "Insightful", "Equanimity", "Versatile", "Bolster"
      ]
    }
  },
  
  // --- GERMAN TRANSLATIONS ---
  de: {
    zigzagFeatures: {
      kicker: "Tiefgang",
      heading: "Meisterschaft im Detail.",
      items: [
        {
          title: "Halte jedes Projekt am Laufen",
          description: "Planen, zuweisen und liefern – alles an einem Ort. Mit smarter Aufgabenverfolgung und Echtzeit-Fortschritt.",
          words: ["Frist", "Meilenstein", "Delegieren", "Priorität", "Workflow", "Agil", "Sprint", "Rückstand", "Roadmap", "Synergie"]
        },
        {
          title: "Nahtlose Cloud-Synchronisierung",
          description: "Dein Wortschatz folgt dir überall hin. Starte auf dem Laptop, wiederhole auf dem Handy während des Pendelns.",
          words: ["Synchronisieren", "Cloud", "Backup", "Wiederherstellen", "Echtzeit", "Gerät", "Nahtlos", "Integration", "Upload", "Download"]
        },
        {
          title: "Vergiss nie wieder ein Wort",
          description: "Unser intelligenter Spaced-Repetition-Algorithmus plant Wiederholungen zum perfekten Zeitpunkt.",
          words: ["Retention", "Gedächtnis", "Algorithmus", "Abruf", "Intervall", "Kognitiv", "Fokus", "Meisterschaft", "Review", "Dauerhaft"]
        },
        {
          title: "KI-basierter Kontext",
          description: "Generiere sofort echte Beispielsätze. Lerne nicht nur Definitionen, sondern wie Wörter wirklich verwendet werden.",
          words: ["Kontext", "Nuance", "Syntax", "Semantik", "Nutzung", "Beispiel", "Muttersprachler", "Fließend", "Ausdruck", "Dialog"]
        }
      ]
    },
    philosophyVisuals: {
      flowTags: ["Kontext", "Definition", "Quelle"],
      chat: {
        question: "Hat jemand \"Reisen 101\" gesehen?",
        reply: "Ich habe es gerade geteilt! 🔥"
      }
    },
    vocabMarquee: {
      kicker: "Unendliche Möglichkeiten",
      heading: "Von Umgangssprache zu Verhandlungssicherheit.",
      row1: [
        { "text": "Flat White mit Hafermilch bestellen", "icon": "coffee" },
        { "text": "Gehaltserhöhung aushandeln", "icon": "briefcase" },
        { "text": "Höflich um Rückerstattung bitten", "icon": "receipt" },
        { "text": "Lücke im Lebenslauf erklären", "icon": "clock" },
        { "text": "Medizinische Symptome beschreiben", "icon": "heart" },
        { "text": "Über Klimawandel diskutieren", "icon": "globe" }
      ],
      row2: [
        { "text": "Lokalen Slang verstehen", "icon": "message" },
        { "text": "Respektvoll flirten", "icon": "heart" },
        { "text": "Über Kunstgeschichte debattieren", "icon": "palette" },
        { "text": "Formelle E-Mail schreiben", "icon": "mail" },
        { "text": "Dem Taxifahrer den Weg erklären", "icon": "map" },
        { "text": "Über die Kindheit sprechen", "icon": "user" }
      ]
    },
    heroBadges: {
      card1: { title: "+5 Neue", sub: "Wörter gelernt" },
      card2: { title: "14 Tage", sub: "Läuft! 🔥" },
      card3: { title: "Review", sub: "Abgeschlossen" }
    },
    hero: {
      ctaText: "Mehr erfahren"
    },
    featureShowcase: {
      badge: "Features",
      slides: [
        "Sammle Wörter, die dir begegnen, auf einfachste Weise",
        "Swipe & Lerne, bis du es nicht mehr vergessen kannst",
        "Baue Wortschatz für Situationen auf, die du täglich erlebst",
        "Erstelle oder folge von der Community kuratierten Wortschatz-Sets"
      ],
      cards: {
        left: {
          title: "Community",
          sub: "Aktive Threads",
          msg: "\"Hat jemand Reisen 101 gesehen?\""
        },
        right: {
          title: "Lernzeit",
          sub: "Spaced Repetition",
          prefix: "Du hast hinzugefügt:",
          word: "Serendipität"
        }
      }
    },
    bentoGrid: {
      badge: "SMARTE FUNKTIONEN",
      heading: "Entwickelt für moderne Lerner.",
      subheading: "Erlebe die Tools, die Vokabulo anders machen.",
      ctaText: "Mehr erfahren",
      cards: [
        {
          title: "Smarte Sammlungen",
          body: "Organisiere deinen Wortschatz in dynamischen Decks, die zu deinem Leben passen – Arbeit, Reisen oder Hobbys.",
          img: "/images/blog/eye.jpg"
        },
        {
          title: "KI-Aussprache",
          body: "Erhalte sofortiges Feedback zu deinem Akzent mit unserer fortschrittlichen Spracherkennungs-Engine.",
          img: "/images/blog/Hand reaching.jpg"
        },
        {
          title: "Kontext-Engine",
          body: "Sieh Wörter in echten Nachrichtenartikeln, Videos und Büchern, um Nuancen zu verstehen.",
          img: "/images/blog/Moon rising.jpg"
        },
        {
          title: "Spaced Repetition",
          body: "Vergiss nie wieder ein Wort. Der Algorithmus berechnet den perfekten Zeitpunkt für deine Wiederholung.",
          img: "/images/blog/Ocean.jpg"
        },
        {
          title: "Cloud Sync",
          "body": "Starte auf dem Handy, mach weiter auf dem iPad. Dein Fortschritt ist immer sicher.",
          img: "/images/blog/eye.jpg"
        },
        {
          title: "Community Sets",
          body: "Entdecke Tausende von Listen anderer Lerner und teile deine eigenen.",
          img: "/images/blog/Hand reaching.jpg"
        }
      ]
    },
    caseStudies: {
      kicker: "Erfolgsgeschichten",
      heading: "Sieh, wie andere fließend wurden.",
      cards: [
        {
          title: "Wie Sophie medizinische Terminologie in 3 Monaten meisterte",
          linkText: "Story lesen",
          img: "/images/home/sophie.jpg"
        },
        {
          title: "Lukas' Weg vom Anfänger zu Business-Deutsch",
          linkText: "Story lesen",
          img: "/images/home/lukas.jpg"
        },
        {
          title: "Warum Maria von Duolingo zu Vokabulo wechselte",
          linkText: "Story lesen",
          img: "/images/home/maria.jpg"
        }
      ]
    },
    testimonials: {
      kicker: "Wall of Love",
      heading: "Von Lernern geliebt.",
      subheading: "Verlass dich nicht nur auf unser Wort.",
      cards: [
        {
          id: 1,
          title: "Sophie, Medizinstudentin",
          body: "Ich erreiche meine täglichen Ziele in 15 Minuten. Alles ist strukturiert, nichts lenkt ab.",
          img: "/images/home/sophie.jpg"
        },
        {
          id: 2,
          title: "Lukas, Produktmanager",
          body: "Wiederholungen sind perfekt getimt. Mein Wortschatz wächst ohne Stress.",
          img: "/images/home/lukas.jpg"
        },
        {
          id: 3,
          title: "Maria, Sprachcoach",
          body: "Minimalistisch und doch mächtig. Genau die Mischung aus Design und Tempo, die ich wollte.",
          img: "/images/home/maria.jpg"
        }
      ]
    },
    faq: {
      badge: "FAQs",
      heading: "Häufig gestellte Fragen",
      subheading: "Falls etwas fehlt, melde dich jederzeit, wir antworten schnell und persönlich.",
      supportText: "Ist deine Frage nicht dabei? Melde dich unter",
      supportEmail: "support@vokabulo.com",
      items: [
        {
          id: 0,
          question: "Wie funktioniert das Wiederholungssystem?",
          answer: "Vokabulo berechnet Intervalle basierend auf deinen Antworten. Sichere Wörter erscheinen seltener, schwierige öfter, bis sie sitzen."
        },
        {
          id: 1,
          question: "Funktioniert es offline?",
          answer: "Ja. Dein Fortschritt wird zwischengespeichert und synchronisiert sich automatisch, sobald du wieder online bist."
        },
        {
          id: 2,
          question: "Kann ich eigene Listen importieren?",
          answer: "Importiere CSV-Dateien oder teile bestehende Listen mit deinem Team. Vokabulo kümmert sich um Duplikate und Struktur."
        },
        {
          id: 3,
          question: "Wie funktioniert das KI-Aussprache-Feedback?",
          answer: "Unsere Engine analysiert deine Sprache in Echtzeit und vergleicht Intonation und Akzent mit Muttersprachlern für einen sofortigen Genauigkeits-Score."
        }
      ]
    },
    promptMarquee: {
      row1: [
        "Serendipität", "Eloquenz", "Pragmatisch", "Resilienz", "Ambiguität", "Nuance"
      ],
      row2: [
        "Ephemer", "Luminös", "Kognitiv", "Synthese", "Mellifluös", "Paradigma"
      ],
      row3: [
        "Authentizität", "Vibrant", "Einsichtsvoll", "Gleichmut", "Vielseitig", "Stärken"
      ]
    }
  }
};


// --- EXISTING TYPES (Keep these) ---
export type HomeSectionMeta = { kicker?: string; heading?: string; subheading?: string; };
export type HomeHero = { title: string; description: string; heroHeadingHtml: string; heroSubheading: string; ctaText: string; ctaHref: string; };
export type SimpleCard = { title: string; body: string };
export type FeatureBlock = { label: string; title: string; body: string; pills: string[]; };
export type Testimonial = { author: string; quote: string };
export type FaqItem = { question: string; answer: string };
export type HomeCta = { kicker: string; heading: string; subheading: string; primaryCtaText: string; primaryCtaHref: string; secondaryCtaText: string; secondaryCtaHref: string; };

// --- UPDATE THE HOME COPY RETURN TYPE ---
export type HomeCopy = {
  isTranslated: boolean;
  hero: HomeHero;
  philosophy: HomeSectionMeta & { cards: SimpleCard[] };
  featureBlocks: HomeSectionMeta & { blocks: FeatureBlock[] };
  features: HomeSectionMeta & { cards: SimpleCard[] };
  testimonials: HomeSectionMeta & { items: Testimonial[] };
  faq: HomeSectionMeta & { items: FaqItem[] };
  cta: HomeCta;
  visuals: VisualData;
};

type FrontmatterParseResult = { frontmatter: Record<string, string>; markdown: string };

function parseFrontmatter(content: string): FrontmatterParseResult {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    return { frontmatter: {}, markdown: content };
  }
  const frontmatterText = frontmatterMatch[1];
  const markdown = frontmatterMatch[2];
  const frontmatter: Record<string, string> = {};

  frontmatterText.split('\n').map(l => l.trim()).filter(Boolean).forEach(line => {
      const match = line.match(/^(\w+):\s*(.*)\s*$/);
      if (!match) return;
      const key = match[1];
      const rawValue = match[2];
      const value = rawValue.replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    });

  return { frontmatter, markdown };
}

function readLocalizedFile(lang: Language, relativeParts: string[]): string | null {
  const langPath = join(process.cwd(), 'content', ...relativeParts.map(p => p.replace(':lang', lang)));
  if (existsSync(langPath)) return readFileSync(langPath, 'utf-8');
  const enPath = join(process.cwd(), 'content', ...relativeParts.map(p => p.replace(':lang', 'en')));
  if (existsSync(enPath)) return readFileSync(enPath, 'utf-8');
  return null;
}

function splitByH2(markdown: string): Array<{ heading: string; body: string }> {
  const lines = markdown.split('\n');
  const chunks: Array<{ heading: string; body: string }> = [];
  let currentHeading: string | null = null;
  let buffer: string[] = [];
  const flush = () => {
    if (!currentHeading) return;
    const body = buffer.join('\n').trim();
    chunks.push({ heading: currentHeading, body });
  };
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)\s*$/);
    if (h2) {
      flush();
      currentHeading = h2[1].trim();
      buffer = [];
      continue;
    }
    if (currentHeading) buffer.push(line);
  }
  flush();
  return chunks;
}

function parseKeyValueBody(body: string): { fields: Record<string, string>; rest: string } {
  const lines = body.split('\n');
  const fields: Record<string, string> = {};
  const rest: string[] = [];
  let i = 0;
  for (; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const kv = line.match(/^(\w+):\s*(.*)\s*$/);
    if (!kv) break;
    fields[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  for (; i < lines.length; i++) rest.push(lines[i]);
  return { fields, rest: rest.join('\n').trim() };
}

function parsePills(body: string): { pills: string[]; rest: string } {
  const lines = body.split('\n');
  const pills: string[] = [];
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.toLowerCase() === 'pills:' || /^pills:\s*$/i.test(line)) {
      i++;
      while (i < lines.length) {
        const pillLine = lines[i].trim();
        const bullet = pillLine.match(/^-\s+(.*)$/);
        if (!bullet) break;
        const val = bullet[1].trim();
        if (val) pills.push(val);
        i++;
      }
      continue;
    }
    out.push(lines[i]);
    i++;
  }
  return { pills, rest: out.join('\n').trim() };
}

function normalizeCtaHref(rawHref: string, defaultHref: string): string {
  const href = rawHref.trim();
  if (!href) return defaultHref;
  if (href.startsWith('#')) return href;
  if (href.startsWith('/')) return href;
  return `#${href.replace(/^#/, '')}`;
}

function extractFirstParagraph(markdown: string): string {
  const cleaned = markdown.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#') && !l.startsWith('<')).join('\n').trim();
  return cleaned.split('\n\n')[0] || '';
}

function extractFirstLink(markdown: string): { text: string; href: string } | null {
  const htmlA = markdown.match(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
  if (htmlA) { return { href: htmlA[1].trim(), text: htmlA[2].replace(/<[^>]*>/g, '').trim() }; }
  const mdA = markdown.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (mdA) { return { text: mdA[1].trim(), href: mdA[2].trim() }; }
  return null;
}

export function loadHomeCopy(lang: Language): HomeCopy {
  const isTranslated = lang === 'en';
  
  // --- SELECT THE CORRECT VISUALS BASED ON LANGUAGE ---
  const currentVisuals = VISUALS_BY_LANG[lang] || VISUALS_BY_LANG['en'];

  // HERO
  const heroRaw = readLocalizedFile(lang, ['pages', ':lang', 'home', 'hero.md']) ?? readLocalizedFile(lang, ['pages', ':lang', 'home.md']) ?? '';
  const heroParsed = parseFrontmatter(heroRaw);
  const heroH1 = heroParsed.markdown.match(/^#\s+(.+)\s*$/m)?.[1]?.trim();
  
  // MERGE THE VISUALS: Use the Marquee heading if Markdown is empty, or vice versa
  const heroHeadingHtml = heroH1 ? heroH1 : currentVisuals.vocabMarquee.heading; 
  
  const heroSubheading = extractFirstParagraph(heroParsed.markdown) || 'Language learning coming alive - AI-powered, community-inspired, pure magic';
  const heroLink = extractFirstLink(heroParsed.markdown);
  const heroTitle = heroParsed.frontmatter.title || 'Vokabulo – Smarter Learning';
  const heroDescription = heroParsed.frontmatter.description || generateFallbackDescription(heroParsed.markdown, 160) || '';
  const heroCtaText = heroParsed.frontmatter.ctaText || heroLink?.text || 'Discover the Magic of Vokabulo';
  const heroCtaHref = normalizeCtaHref(heroParsed.frontmatter.ctaHref || heroLink?.href || '', '#feature-blocks');

  // PHILOSOPHY
  const philosophyRaw = readLocalizedFile(lang, ['pages', ':lang', 'home', 'philosophy.md']) ?? '';
  const philosophyParsed = parseFrontmatter(philosophyRaw);
  const philosophyChunks = splitByH2(philosophyParsed.markdown);

  // FEATURE BLOCKS
  const featureBlocksRaw = readLocalizedFile(lang, ['pages', ':lang', 'home', 'feature-blocks.md']) ?? '';
  const featureBlocksParsed = parseFrontmatter(featureBlocksRaw);
  const featureBlockChunks = splitByH2(featureBlocksParsed.markdown).map(chunk => {
    const { fields, rest } = parseKeyValueBody(chunk.body);
    const { pills, rest: restWithoutPills } = parsePills(rest);
    return { label: chunk.heading, title: fields.title || '', body: fields.description || restWithoutPills || '', pills };
  });

  // FEATURES
  const featuresRaw = readLocalizedFile(lang, ['pages', ':lang', 'home', 'features.md']) ?? '';
  const featuresParsed = parseFrontmatter(featuresRaw);
  const featuresChunks = splitByH2(featuresParsed.markdown).map(chunk => ({ title: chunk.heading, body: chunk.body.trim() }));

  // TESTIMONIALS
  const testimonialsRaw = readLocalizedFile(lang, ['pages', ':lang', 'home', 'testimonials.md']) ?? '';
  const testimonialsParsed = parseFrontmatter(testimonialsRaw);
  const testimonialsChunks = splitByH2(testimonialsParsed.markdown).map(chunk => {
    const { fields, rest } = parseKeyValueBody(chunk.body);
    const quote = fields.quote || rest;
    return { author: chunk.heading, quote: quote.trim() };
  });

  // FAQ
  const faqRaw = readLocalizedFile(lang, ['pages', ':lang', 'home', 'faq.md']) ?? '';
  const faqParsed = parseFrontmatter(faqRaw);
  const faqChunks = splitByH2(faqParsed.markdown).map(chunk => ({ question: chunk.heading, answer: chunk.body.trim() }));

  // CTA
  const ctaRaw = readLocalizedFile(lang, ['pages', ':lang', 'home', 'cta.md']) ?? '';
  const ctaParsed = parseFrontmatter(ctaRaw);

  return {
    isTranslated,
    hero: {
      title: heroTitle,
      description: heroDescription,
      heroHeadingHtml: heroHeadingHtml,
      heroSubheading,
      ctaText: heroCtaText,
      ctaHref: heroCtaHref,
    },
    philosophy: {
      kicker: philosophyParsed.frontmatter.kicker || 'Our philosophy',
      heading: philosophyParsed.frontmatter.heading || 'No shortcuts. Just the right words.',
      subheading: philosophyParsed.frontmatter.subheading || 'Language learning takes endurance, but momentum starts with the words you actually use.',
      cards: philosophyChunks.length > 0 ? philosophyChunks.map(c => ({ title: c.heading, body: c.body.trim() })) : [
              { title: 'Context first', body: "Words matter most when they're tied to real moments and emotions." },
              { title: 'Built around your life', body: 'Work, hobbies, everyday situations. No one-size-fits-all lists.' },
              { title: 'Learn together', body: 'Community Sets let you share and grow vocabulary with others.' },
            ],
    },
    featureBlocks: {
      kicker: featureBlocksParsed.frontmatter.kicker || 'The magic of Vokabulo',
      heading: featureBlocksParsed.frontmatter.heading || 'Built for real-time, focused learning.',
      subheading: featureBlocksParsed.frontmatter.subheading || 'Four essentials that keep you moving faster - across devices, lists, and daily sessions.',
      blocks: featureBlockChunks.length > 0 ? featureBlockChunks : [
              { label: 'Words', title: 'A garden of vocabulary', body: 'A space where learning becomes lasting, and every word becomes yours.', pills: ['Full context', 'Pronunciation', 'Live sync'] },
              { label: 'Quiz', title: 'Turn practice into power', body: 'Where persistence becomes progress, and progress becomes mastery.', pills: ['Swiping', 'Keyword-focused', 'Memory optimized'] },
              { label: 'Situations', title: 'The right words. Right on time', body: 'Set the scene, and the right vocabulary will appear to help you.', pills: ['Personal', 'Made to be used', 'Proficiency-adjusted'] },
              { label: 'Community Sets', title: 'Words we share', body: 'A living library of vocabulary, curated by the community and waiting to be explored.', pills: ['Curated', 'Share your own', 'Collaborate with others'] },
            ],
    },
    features: {
      kicker: featuresParsed.frontmatter.kicker || 'Why Vokabulo',
      heading: featuresParsed.frontmatter.heading || 'Smart features that keep you on track.',
      subheading: featuresParsed.frontmatter.subheading || 'Every detail is built for clear progress. Spend less time, remember more, and always know where you stand.',
      cards: featuresChunks.length > 0 ? featuresChunks : [
              { title: 'Spaced Repetition', body: 'Adaptive intervals surface each word exactly when your memory needs it.' },
              { title: 'Adjustable pronunciation', body: 'Select your voices, set the speed. Made to understand.' },
              { title: 'Built with magic', body: 'Uses the best AI tools to help you become a little better every day.' },
            ],
    },
    testimonials: {
      kicker: testimonialsParsed.frontmatter.kicker || 'Testimonials',
      heading: testimonialsParsed.frontmatter.heading || 'Learners love the focus.',
      subheading: testimonialsParsed.frontmatter.subheading || 'Vokabulo blends science and design—so you stay consistent and retain more.',
      items: testimonialsChunks.length > 0 ? testimonialsChunks : [
              { author: 'Sophie, medical student', quote: '"I hit my daily goals in 15 minutes. Everything is structured, nothing distracts me."' },
              { author: 'Jonas, product manager', quote: '"Reviews are perfectly timed. My vocabulary grows without stress."' },
              { author: 'Mara, language coach', quote: '"Minimal yet powerful. Exactly the mix of design and pace I wanted."' },
            ],
    },
    faq: {
      kicker: faqParsed.frontmatter.kicker || 'FAQ',
      heading: faqParsed.frontmatter.heading || 'Answers to your questions.',
      subheading: faqParsed.frontmatter.subheading || "If anything's missing, reach out anytime—we reply quickly and personally.",
      items: faqChunks.length > 0 ? faqChunks : [
              { question: 'How does the review system work?', answer: "Vokabulo calculates intervals based on your answers. Confident words appear less often; tricky ones show up more until they stick." },
              { question: 'Does it work offline?', answer: "Yes. Your progress is cached and syncs automatically once you're back online." },
              { question: 'Can I import my own lists?', answer: 'Import CSV files or share existing lists with your team. Vokabulo handles duplicates and structure.' },
            ],
    },
    cta: {
      kicker: ctaParsed.frontmatter.kicker || 'Ready?',
      heading: ctaParsed.frontmatter.heading || 'Start today and stay on track every day.',
      subheading: ctaParsed.frontmatter.subheading || 'Secure your learning edge with clear sessions, smart reviews, and an interface that supports you rather than distracts you.',
      primaryCtaText: ctaParsed.frontmatter.primaryCtaText || 'Start free',
      primaryCtaHref: ctaParsed.frontmatter.primaryCtaHref || '#hero',
      secondaryCtaText: ctaParsed.frontmatter.secondaryCtaText || 'Get answers',
      secondaryCtaHref: ctaParsed.frontmatter.secondaryCtaHref || '#faq',
    },
    // --- 3. RETURN THE SELECTED LANGUAGE VISUALS ---
    visuals: currentVisuals 
  };
}