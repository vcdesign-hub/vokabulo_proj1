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
    'footer.created': 'Created by Wolfgang Männel.'
  },
  de: {
    'nav.great': 'WAS ES GROSSARTIG MACHT',
    'nav.works': 'WIE ES FUNKTIONIERT',
    'nav.blog': 'BLOG',
    'footer.starts': 'beginnt mit',
    'footer.legal': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.contact': 'Kontakt',
    'footer.created': 'Erstellt von Wolfgang Männel.'
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