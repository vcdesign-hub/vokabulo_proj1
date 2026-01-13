import { SUPPORTED_LANGS, DEFAULT_LANG } from './i18n';
import type { Language } from './i18n';

/**
 * Normalize a URL path by removing trailing slashes (to match trailingSlash: 'never')
 */
export function normalizePathname(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.replace(/\/$/, '');
}

/**
 * Build the canonical URL for a given pathname
 */
export function buildCanonicalUrl(siteUrl: string, pathname: string): string {
  const normalized = normalizePathname(pathname);
  return `${siteUrl}${normalized}`;
}

/**
 * Extract the locale-agnostic path from a pathname
 * E.g., /en/support -> /support, /de/blog/post -> /blog/post
 */
export function extractPathWithoutLocale(pathname: string): string {
  const normalized = normalizePathname(pathname);
  
  // Handle root paths like /en or /de
  for (const lang of SUPPORTED_LANGS) {
    if (normalized === `/${lang}`) {
      return '/';
    }
    if (normalized.startsWith(`/${lang}/`)) {
      return normalized.substring(lang.length + 1);
    }
  }
  
  // If no locale prefix found, return as-is
  return normalized;
}

/**
 * Build hreflang alternate URLs for all supported locales
 * Returns an array of { lang, url } objects
 */
export function buildHreflangAlternates(
  siteUrl: string,
  pathname: string
): Array<{ lang: string; url: string }> {
  const pathWithoutLocale = extractPathWithoutLocale(pathname);
  
  const alternates = SUPPORTED_LANGS.map((lang) => {
    const localizedPath = `/${lang}${pathWithoutLocale}`;
    const url = buildCanonicalUrl(siteUrl, localizedPath);
    return { lang, url };
  });

  // Add x-default pointing to English
  const xDefaultPath = `/${DEFAULT_LANG}${pathWithoutLocale}`;
  const xDefaultUrl = buildCanonicalUrl(siteUrl, xDefaultPath);
  alternates.push({ lang: 'x-default', url: xDefaultUrl });

  return alternates;
}

/**
 * Generate a safe fallback description from markdown content
 */
export function generateFallbackDescription(
  markdown: string,
  maxLength: number = 160
): string {
  if (!markdown) return '';
  
  // Remove markdown formatting and get first paragraph
  const cleaned = markdown
    .replace(/^#+\s+/gm, '') // Remove headings
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/`([^`]+)`/g, '$1') // Remove code
    .trim();
  
  const firstParagraph = cleaned.split('\n\n')[0] || '';
  const truncated = firstParagraph.substring(0, maxLength);
  
  return truncated.length < firstParagraph.length
    ? `${truncated.trim()}...`
    : truncated.trim();
}
