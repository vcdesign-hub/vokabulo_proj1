import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

// Inline SEO utility logic for testing (mirrors src/utils/seo.ts)
const SUPPORTED_LANGS = ['en', 'de', 'fr', 'it', 'es', 'pt'];
const DEFAULT_LANG = 'en';

function normalizePathname(pathname) {
  if (pathname === '/') return '/';
  return pathname.replace(/\/$/, '');
}

function buildCanonicalUrl(siteUrl, pathname) {
  const normalized = normalizePathname(pathname);
  return `${siteUrl}${normalized}`;
}

function extractPathWithoutLocale(pathname) {
  const normalized = normalizePathname(pathname);
  
  for (const lang of SUPPORTED_LANGS) {
    if (normalized === `/${lang}`) {
      return '/';
    }
    if (normalized.startsWith(`/${lang}/`)) {
      return normalized.substring(lang.length + 1);
    }
  }
  
  return normalized;
}

function buildHreflangAlternates(siteUrl, pathname) {
  const pathWithoutLocale = extractPathWithoutLocale(pathname);
  
  const alternates = SUPPORTED_LANGS.map((lang) => {
    const localizedPath = `/${lang}${pathWithoutLocale}`;
    const url = buildCanonicalUrl(siteUrl, localizedPath);
    return { lang, url };
  });

  const xDefaultPath = `/${DEFAULT_LANG}${pathWithoutLocale}`;
  const xDefaultUrl = buildCanonicalUrl(siteUrl, xDefaultPath);
  alternates.push({ lang: 'x-default', url: xDefaultUrl });

  return alternates;
}

function generateFallbackDescription(markdown, maxLength = 160) {
  if (!markdown) return '';
  
  const cleaned = markdown
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
  
  const firstParagraph = cleaned.split('\n\n')[0] || '';
  const truncated = firstParagraph.substring(0, maxLength);
  
  return truncated.length < firstParagraph.length
    ? `${truncated.trim()}...`
    : truncated.trim();
}

describe('SEO utility tests', () => {
  const siteUrl = 'https://vokabulo.com';

  describe('normalizePathname', () => {
    test('should keep root path as-is', () => {
      assert.equal(normalizePathname('/'), '/');
    });

    test('should remove trailing slash from other paths', () => {
      assert.equal(normalizePathname('/en/'), '/en');
      assert.equal(normalizePathname('/de/support/'), '/de/support');
    });

    test('should keep paths without trailing slash unchanged', () => {
      assert.equal(normalizePathname('/en'), '/en');
      assert.equal(normalizePathname('/fr/blog'), '/fr/blog');
    });
  });

  describe('buildCanonicalUrl', () => {
    test('should build correct canonical URL for root', () => {
      assert.equal(
        buildCanonicalUrl(siteUrl, '/'),
        'https://vokabulo.com/'
      );
    });

    test('should build correct canonical URL for /en/', () => {
      assert.equal(
        buildCanonicalUrl(siteUrl, '/en/'),
        'https://vokabulo.com/en'
      );
    });

    test('should build correct canonical URL for /de/support', () => {
      assert.equal(
        buildCanonicalUrl(siteUrl, '/de/support'),
        'https://vokabulo.com/de/support'
      );
    });

    test('should build correct canonical URL for /en/blog/my-post', () => {
      assert.equal(
        buildCanonicalUrl(siteUrl, '/en/blog/my-post'),
        'https://vokabulo.com/en/blog/my-post'
      );
    });
  });

  describe('extractPathWithoutLocale', () => {
    test('should extract path from /en/', () => {
      assert.equal(extractPathWithoutLocale('/en/'), '/');
    });

    test('should extract path from /de/support', () => {
      assert.equal(extractPathWithoutLocale('/de/support'), '/support');
    });

    test('should extract path from /fr/blog/post', () => {
      assert.equal(extractPathWithoutLocale('/fr/blog/post'), '/blog/post');
    });

    test('should return as-is for root path', () => {
      assert.equal(extractPathWithoutLocale('/'), '/');
    });

    test('should handle /en without trailing slash', () => {
      assert.equal(extractPathWithoutLocale('/en'), '/');
    });
  });

  describe('buildHreflangAlternates', () => {
    test('should generate hreflang for all locales + x-default for home', () => {
      const alternates = buildHreflangAlternates(siteUrl, '/en/');
      
      // Should have 6 locales + x-default = 7 entries
      assert.equal(alternates.length, 7);
      
      // Check that all locales are present
      const langs = alternates.map(a => a.lang);
      assert.ok(langs.includes('en'));
      assert.ok(langs.includes('de'));
      assert.ok(langs.includes('fr'));
      assert.ok(langs.includes('it'));
      assert.ok(langs.includes('es'));
      assert.ok(langs.includes('pt'));
      assert.ok(langs.includes('x-default'));
      
      // Check x-default points to /en
      const xDefault = alternates.find(a => a.lang === 'x-default');
      assert.equal(xDefault.url, 'https://vokabulo.com/en');
    });

    test('should generate correct hreflang for /de/support', () => {
      const alternates = buildHreflangAlternates(siteUrl, '/de/support');
      
      // Check German alternate
      const de = alternates.find(a => a.lang === 'de');
      assert.equal(de.url, 'https://vokabulo.com/de/support');
      
      // Check English alternate
      const en = alternates.find(a => a.lang === 'en');
      assert.equal(en.url, 'https://vokabulo.com/en/support');
      
      // Check x-default points to /en/support
      const xDefault = alternates.find(a => a.lang === 'x-default');
      assert.equal(xDefault.url, 'https://vokabulo.com/en/support');
    });

    test('should generate correct hreflang for /en/blog/my-post', () => {
      const alternates = buildHreflangAlternates(siteUrl, '/en/blog/my-post');
      
      // Check French alternate
      const fr = alternates.find(a => a.lang === 'fr');
      assert.equal(fr.url, 'https://vokabulo.com/fr/blog/my-post');
      
      // Check x-default
      const xDefault = alternates.find(a => a.lang === 'x-default');
      assert.equal(xDefault.url, 'https://vokabulo.com/en/blog/my-post');
    });

    test('should handle root path correctly', () => {
      const alternates = buildHreflangAlternates(siteUrl, '/');
      
      // All should point to /{locale}/
      const en = alternates.find(a => a.lang === 'en');
      assert.equal(en.url, 'https://vokabulo.com/en');
      
      const xDefault = alternates.find(a => a.lang === 'x-default');
      assert.equal(xDefault.url, 'https://vokabulo.com/en');
    });
  });

  describe('generateFallbackDescription', () => {
    test('should extract first paragraph from markdown', () => {
      const markdown = `This is the first paragraph.

This is the second paragraph.`;
      const desc = generateFallbackDescription(markdown, 160);
      assert.equal(desc, 'This is the first paragraph.');
    });

    test('should remove markdown formatting', () => {
      const markdown = `**Bold text** and *italic text* with [a link](https://example.com) and \`code\`.`;
      const desc = generateFallbackDescription(markdown, 160);
      assert.equal(desc, 'Bold text and italic text with a link and code.');
    });

    test('should truncate long paragraphs', () => {
      const longText = 'a'.repeat(200);
      const markdown = `${longText}\n\nSecond paragraph.`;
      const desc = generateFallbackDescription(markdown, 160);
      assert.equal(desc.length, 163); // 160 chars + '...'
      assert.ok(desc.endsWith('...'));
    });

    test('should handle empty markdown', () => {
      const desc = generateFallbackDescription('', 160);
      assert.equal(desc, '');
    });

    test('should remove heading markers', () => {
      const markdown = `## Heading

This is content.`;
      const desc = generateFallbackDescription(markdown, 160);
      assert.equal(desc, 'Heading');
    });
  });
});
