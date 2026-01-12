// i18n configuration for the app
export const locales = ['en', 'de', 'fr', 'es', 'it', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
