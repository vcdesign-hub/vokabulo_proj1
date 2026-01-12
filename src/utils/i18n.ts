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
