import { SUPPORTED_LANGS, type Language } from './i18n';

// --- 1. DEFINE THE DATA TYPES ---
export type WhatMakesItGreatData = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    priceLabel: string;
    primaryCta: string;
    secondaryCta: string;
  };
  family: {
    title: string;
    description: string;
  };
  recall: { // The "Ping It" section
    title: string;
    desc1: string;
    desc2: string;
    ui: {
      screenTitle: string;
      screenSubtitle: string;
      button: string;
    }
  };
  precision: { // The "Precision Finding" section
    cold: string;
    warm: string;
    warmer: string;
    title: string;
    description: string;
    ui: {
      matchPercent: string;
      matchLabel: string;
      accuracyLabel: string;
    }
  };
  network: {
    title: string;
  };
  smartReview: { // The "Lost Mode" section
    title: string;
    desc1: string;
    desc2: string;
    ui: {
      badge: string;
      title: string;
      subtitle: string;
    }
  };
  privacy: {
    title: string;
    desc1: string;
    desc2: string;
  };
  setup: {
    title: string;
    description: string;
    cardTitle: string;
    cardDesc: string;
    alertTitle: string;
    alertDesc: string;
  };
  grid: {
    memory: { title: string; desc: string; };
    fluidity: { title: string; desc: string; };
    personal: { title: string; desc: string; };
    environment: { title: string; desc: string; };
  };
};

// --- 2. DEFINE CONTENT FOR EACH LANGUAGE ---
const DATA_BY_LANG: Record<string, WhatMakesItGreatData> = {
  en: {
    hero: {
      title: "Vokabulo",
      subtitle: "Don’t just memorize. Internalize.",
      description: "With spaced repetition that is 50% more effective and context-aware tracking, the next generation of Vokabulo makes it effortless to master the right words.",
      priceLabel: "Free to start. Pro at $5/mo.",
      primaryCta: "Start Training",
      secondaryCta: "View Demo"
    },
    family: {
      title: "Fluency is better together.",
      description: "Share custom decks with up to five friends. So vocabulary that everyone needs — like business idioms, slang, or technical terms — can be mastered together."
    },
    recall: {
      title: "Blanking out? Not anymore.",
      desc1: "Forgetting a word during a conversation doesn’t have to be a big deal when you have Vokabulo.",
      desc2: "Open the Rapid Recall tab in the app to instantly retrieve the word that is hiding on the tip of your tongue.",
      ui: {
        screenTitle: "Serendipity",
        screenSubtitle: "Meaning Found • Noun",
        button: "Add to Deck"
      }
    },
    precision: {
      cold: "Vague.",
      warm: "Clear.",
      warmer: "Precise.",
      title: "Precision Training leads you to the perfect nuance.",
      description: "If a word feels \"close enough\" but not quite right, Vokabulo leads you to the better alternative. Thanks to our Context Engine, you’ll see the exact synonym to use.",
      ui: {
        matchPercent: "98%",
        matchLabel: "Match",
        accuracyLabel: "Accuracy"
      }
    },
    network: {
      title: "Learn with a little help from real-world context."
    },
    smartReview: {
      title: "Smart Review makes retention effortless.",
      desc1: "Just like a personal tutor, Vokabulo knows when you are about to forget.",
      desc2: "Our algorithm triggers a notification right before a word slips from your memory, locking it in forever.",
      ui: {
        badge: "Smart Review • Now",
        title: "Review \"Ubiquitous\"",
        subtitle: "You haven't used this word in 2 weeks."
      }
    },
    privacy: {
      title: "Privacy is built in.",
      desc1: "Your progress data and search history are never sold to advertisers.",
      desc2: "We protect your learning, so you can speak freely."
    },
    setup: {
      title: "Beautifully simple.",
      description: "A one-tap setup instantly builds your profile. Select your goals, choose your difficulty, and you're good to go.",
      cardTitle: "Discourage repetitive speech.",
      cardDesc: "If you use the same word too many times, Vokabulo will notice your pattern and suggest a stronger alternative.",
      alertTitle: "Repetition Detected",
      alertDesc: "Try saying \"Essential\" instead."
    },
    grid: {
      memory: {
        title: "Long-term memory.",
        desc: "Vokabulo ensures words stick for more than a year with our memory algorithm."
      },
      fluidity: {
        title: "Fluid conversation.",
        desc: "Flow through conversations. Vokabulo is resistance-proof."
      },
      personal: {
        title: "Your decks. Your style.",
        desc: "Customize your difficulty level. From beginner to C2 proficiency."
      },
      environment: {
        title: "Tracking a smaller footprint.",
        desc: "We are committed to digital sustainability. Our servers run on 100% renewable energy."
      }
    }
  },
  // Add German (de) here when ready...
  de: {
    hero: {
      title: "Vokabulo",
      subtitle: "Nicht nur auswendig lernen. Verinnerlichen.",
      description: "Mit 50% effektiverer Spaced Repetition und kontextbezogenem Tracking macht es die nächste Generation von Vokabulo mühelos, die richtigen Wörter zu meistern.",
      priceLabel: "Kostenlos starten. Pro für 5€/Monat.",
      primaryCta: "Training starten",
      secondaryCta: "Demo ansehen"
    },
    family: {
      title: "Zusammen lernt es sich besser.",
      description: "Teile benutzerdefinierte Decks mit bis zu fünf Freunden. So können wichtige Vokabeln – wie Business-Idiome, Slang oder Fachbegriffe – gemeinsam gemeistert werden."
    },
    recall: {
      title: "Wort vergessen? Nicht mehr.",
      desc1: "Ein Wort während eines Gesprächs zu vergessen, muss keine große Sache sein, wenn du Vokabulo hast.",
      desc2: "Öffne den Rapid Recall Tab in der App, um sofort das Wort zu finden, das dir auf der Zunge liegt.",
      ui: {
        screenTitle: "Serendipität",
        screenSubtitle: "Bedeutung gefunden • Nomen",
        button: "Zum Deck hinzufügen"
      }
    },
    precision: {
      cold: "Vage.",
      warm: "Klar.",
      warmer: "Präzise.",
      title: "Präzisionstraining führt dich zur perfekten Nuance.",
      description: "Wenn sich ein Wort „nah dran“ anfühlt, aber nicht ganz richtig ist, führt dich Vokabulo zur besseren Alternative. Dank unserer Context Engine siehst du genau das richtige Synonym.",
      ui: {
        matchPercent: "98%",
        matchLabel: "Treffer",
        accuracyLabel: "Genauigkeit"
      }
    },
    network: {
      title: "Lerne mit etwas Hilfe aus echtem Kontext."
    },
    smartReview: {
      title: "Smart Review macht Behalten mühelos.",
      desc1: "Wie ein persönlicher Tutor weiß Vokabulo, wann du etwas vergessen wirst.",
      desc2: "Unser Algorithmus löst eine Benachrichtigung aus, kurz bevor ein Wort aus deinem Gedächtnis verschwindet, und verankert es für immer.",
      ui: {
        badge: "Smart Review • Jetzt",
        title: "Wiederhole \"Ubiquitär\"",
        subtitle: "Du hast dieses Wort seit 2 Wochen nicht benutzt."
      }
    },
    privacy: {
      title: "Datenschutz ist eingebaut.",
      desc1: "Deine Fortschrittsdaten und der Suchverlauf werden niemals an Werbetreibende verkauft.",
      desc2: "Wir schützen dein Lernen, damit du frei sprechen kannst."
    },
    setup: {
      title: "Wunderschön einfach.",
      description: "Ein One-Tap-Setup erstellt sofort dein Profil. Wähle deine Ziele, wähle deine Schwierigkeit und los geht's.",
      cardTitle: "Vermeide repetitive Sprache.",
      cardDesc: "Wenn du dasselbe Wort zu oft benutzt, bemerkt Vokabulo dein Muster und schlägt eine stärkere Alternative vor.",
      alertTitle: "Wiederholung erkannt",
      alertDesc: "Versuche stattdessen \"Essenziell\" zu sagen."
    },
    grid: {
      memory: {
        title: "Langzeitgedächtnis.",
        desc: "Vokabulo sorgt mit unserem Gedächtnis-Algorithmus dafür, dass Wörter länger als ein Jahr haften bleiben."
      },
      fluidity: {
        title: "Flüssige Unterhaltung.",
        desc: "Fließe durch Gespräche. Vokabulo ist widerstandsfest."
      },
      personal: {
        title: "Deine Decks. Dein Stil.",
        desc: "Passe deinen Schwierigkeitsgrad an. Vom Anfänger bis zur C2-Kompetenz."
      },
      environment: {
        title: "Kleinerer Fußabdruck.",
        desc: "Wir verpflichten uns zur digitalen Nachhaltigkeit. Unsere Server laufen zu 100% mit erneuerbarer Energie."
      }
    }
  }
};

// --- 3. EXPORT LOADER FUNCTION ---
export function loadWhatMakesItGreatCopy(lang: string | undefined): WhatMakesItGreatData {
  const code = (lang && SUPPORTED_LANGS.includes(lang as any)) ? lang : 'en';
  return DATA_BY_LANG[code] || DATA_BY_LANG['en'];
}