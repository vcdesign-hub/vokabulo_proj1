export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  pt: 'Português',
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANG: Language = 'en';

export const SUPPORTED_LANGS = Object.keys(LANGUAGES) as Language[];

export function getLanguageName(lang: Language): string {
  return LANGUAGES[lang] || LANGUAGES[DEFAULT_LANG];
}

export function isValidLanguage(lang: string): lang is Language {
  return lang in LANGUAGES;
}



// Keep your existing code above...

export const ui = {
  en: {
    'nav.great': 'WHAT MAKES IT GREAT',
    'nav.works': 'HOW IT WORKS',
    'nav.blog': 'BLOG',
    'footer.starts': 'starts with',
    'footer.legal': 'Legal Notice',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact',
    'footer.created': 'Created by Wolfgang Männel.',

    // --- NEW COPY: Vocabulary Training Theme ---
    // Hero Section
    'airtag.hero.main': 'Don’t just memorize. Internalize.',
    'airtag.hero.desc': 'With spaced repetition that is 50% more effective and context-aware tracking, the next generation of Vokabulo makes it effortless to master the right words.',
    'airtag.hero.cta_buy': 'Start Training',
    'airtag.hero.cta_ar': 'View Demo',
    
    // Family / Sharing Section
    'airtag.family.title': 'Fluency is better together.',
    'airtag.family.desc': 'Share custom decks with up to five friends. So vocabulary that everyone needs — like business idioms, slang, or technical terms — can be mastered together.',

    // "Ping It" -> "Recall It" Section
    'airtag.ping.title': 'Blanking out? Not anymore.',
    'airtag.ping.desc1': 'Forgetting a word during a conversation doesn’t have to be a big deal when you have Vokabulo.',
    'airtag.ping.desc2': 'Open the Rapid Recall tab in the app to instantly retrieve the word that is hiding on the tip of your tongue.',
    
    // Precision Finding -> Nuance Training
    'airtag.precision.cold': 'Vague.',
    'airtag.precision.warm': 'Clear.',
    'airtag.precision.warmer': 'Precise.',
    'airtag.precision.title': 'Precision Training leads you to the perfect nuance.',
    'airtag.precision.desc': 'If a word feels "close enough" but not quite right, Vokabulo leads you to the better alternative. Thanks to our Context Engine, you’ll see the exact synonym to use.',

    // Network Section
    'airtag.network.title': 'Learn with a little help from real-world context.',
    
    // Privacy
    'airtag.privacy.title': 'Privacy is built in.',
    
    // Setup
    'airtag.setup.title': 'Beautifully simple.',
    
    // Grid Features (Battery/Water/Personal -> Memory/Fluidity/Custom)
    'airtag.grid.battery': 'Long-term memory.',
    'airtag.grid.water': 'Fluid conversation.',
    'airtag.grid.personal': 'Your decks. Your style.'
  },
  de: {
    'nav.great': 'WAS ES GROSSARTIG MACHT',
    'nav.works': 'WIE ES FUNKTIONIERT',
    'nav.blog': 'BLOG',
    'footer.starts': 'beginnt mit',
    'footer.legal': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.contact': 'Kontakt',
    'footer.created': 'Erstellt von Wolfgang Männel.',

    // --- NEW PAGE: What Makes It Great (German) ---
    'airtag.hero.main': 'Was ungesagt war, wird jetzt verstanden.',
    'airtag.hero.desc': 'Mit einem Wortschatz, der 50 % freundlicher ist und eine bis zu 1,5-fach größere emotionale Reichweite bietet, macht es die nächste Generation von Vokabulo einfacher denn je, den Überblick über das Wesentliche zu behalten.',
    'airtag.hero.cta_buy': 'Vokabulo kaufen',
    'airtag.hero.cta_ar': 'In AR ansehen',

    'airtag.family.title': 'Verbindung wird Familiensache.',
    'airtag.family.desc': 'Teile Vokabulo mit bis zu fünf Personen. So können Gefühle, die jeder hat – wie Freude, Frustration oder das Bedürfnis nach Freiraum – erkannt und verstanden werden.',

    'airtag.ping.title': 'Ping es. Find es.',
    'airtag.ping.desc1': 'Das Vertrauen zu verlegen muss keine große Sache sein, wenn Vokabulo daran befestigt ist.',
    'airtag.ping.desc2': 'Öffne den Tab „Objekte“ in der App, um die richtigen Worte in der Nähe zu finden.',

    'airtag.precision.cold': 'Kalt.',
    'airtag.precision.warm': 'Warm.',
    'airtag.precision.warmer': 'Wärmer.',
    'airtag.precision.title': 'Genaue Suche führt dich direkt zum Punkt.',
    'airtag.precision.desc': 'Wenn dein Punkt in der Nähe ist, kann dein iPhone dich direkt dorthin führen. Dank der erweiterten genauen Suche und eingebauter emotionaler Intelligenz.',

    'airtag.network.title': 'Komm weiter mit etwas Hilfe von über einer Milliarde Freunden.',
    'airtag.privacy.title': 'Datenschutz ist eingebaut.',
    'airtag.setup.title': 'Wunderschön einfach.',

    'airtag.grid.battery': 'Lang lebe die Batterie.',
    'airtag.grid.water': 'Plitsch, platsch.',
    'airtag.grid.personal': 'Deine Initialen. Dein Emoji.',
  }
  // Add fr, it, es, pt as needed
} as const;

/**
 * Helper to get a translation string based on the current language.
 */
export function useTranslations(lang: string) {
  return function t(key: keyof typeof ui['en']) {
    // Fallback to English if the specific language key doesn't exist
    const translation = ui[lang as keyof typeof ui] || ui[DEFAULT_LANG];
    return translation[key] || ui[DEFAULT_LANG][key];
  }
}