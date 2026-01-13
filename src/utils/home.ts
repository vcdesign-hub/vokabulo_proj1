import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Language } from './i18n';
import { generateFallbackDescription } from './seo';

export type HomeSectionMeta = {
  kicker?: string;
  heading?: string;
  subheading?: string;
};

export type HomeHero = {
  title: string;
  description: string;
  heroHeadingHtml: string;
  heroSubheading: string;
  ctaText: string;
  ctaHref: string;
};

export type SimpleCard = { title: string; body: string };

export type FeatureBlock = {
  label: string;
  title: string;
  body: string;
  pills: string[];
};

export type Testimonial = { author: string; quote: string };
export type FaqItem = { question: string; answer: string };

export type HomeCta = {
  kicker: string;
  heading: string;
  subheading: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
};

export type HomeCopy = {
  isTranslated: boolean;
  hero: HomeHero;
  philosophy: HomeSectionMeta & { cards: SimpleCard[] };
  featureBlocks: HomeSectionMeta & { blocks: FeatureBlock[] };
  features: HomeSectionMeta & { cards: SimpleCard[] };
  testimonials: HomeSectionMeta & { items: Testimonial[] };
  faq: HomeSectionMeta & { items: FaqItem[] };
  cta: HomeCta;
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

  frontmatterText
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .forEach(line => {
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
  const cleaned = markdown
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#') && !l.startsWith('<'))
    .join('\n')
    .trim();

  return cleaned.split('\n\n')[0] || '';
}

function extractFirstLink(markdown: string): { text: string; href: string } | null {
  const htmlA = markdown.match(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
  if (htmlA) {
    return { href: htmlA[1].trim(), text: htmlA[2].replace(/<[^>]*>/g, '').trim() };
  }
  const mdA = markdown.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (mdA) {
    return { text: mdA[1].trim(), href: mdA[2].trim() };
  }
  return null;
}

export function loadHomeCopy(lang: Language): HomeCopy {
  const isTranslated = lang === 'en';

  // HERO
  const heroRaw =
    readLocalizedFile(lang, ['pages', ':lang', 'home', 'hero.md']) ??
    // Backward-compatible fallback to old single-file home.md
    readLocalizedFile(lang, ['pages', ':lang', 'home.md']) ??
    '';

  const heroParsed = parseFrontmatter(heroRaw);
  const heroH1 = heroParsed.markdown.match(/^#\s+(.+)\s*$/m)?.[1]?.trim();
  const heroHeadingHtml = heroH1 ? heroH1 : 'Every journey begins with the right words';
  const heroSubheading = extractFirstParagraph(heroParsed.markdown) || 'Language learning coming alive - AI-powered, community-inspired, pure magic';
  const heroLink = extractFirstLink(heroParsed.markdown);

  const heroTitle = heroParsed.frontmatter.title || 'Vokabulo – Smarter Learning';
  const heroDescription =
    heroParsed.frontmatter.description ||
    generateFallbackDescription(heroParsed.markdown, 160) ||
    '';

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
    return {
      label: chunk.heading,
      title: fields.title || '',
      body: fields.description || restWithoutPills || '',
      pills,
    } satisfies FeatureBlock;
  });

  // FEATURES
  const featuresRaw = readLocalizedFile(lang, ['pages', ':lang', 'home', 'features.md']) ?? '';
  const featuresParsed = parseFrontmatter(featuresRaw);
  const featuresChunks = splitByH2(featuresParsed.markdown).map(chunk => ({
    title: chunk.heading,
    body: chunk.body.trim(),
  }));

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
  const faqChunks = splitByH2(faqParsed.markdown).map(chunk => ({
    question: chunk.heading,
    answer: chunk.body.trim(),
  }));

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
      subheading:
        philosophyParsed.frontmatter.subheading ||
        'Language learning takes endurance, but momentum starts with the words you actually use.',
      cards:
        philosophyChunks.length > 0
          ? philosophyChunks.map(c => ({ title: c.heading, body: c.body.trim() }))
          : [
              {
                title: 'Context first',
                body: "Words matter most when they're tied to real moments and emotions.",
              },
              {
                title: 'Built around your life',
                body: 'Work, hobbies, everyday situations. No one-size-fits-all lists.',
              },
              {
                title: 'Learn together',
                body: 'Community Sets let you share and grow vocabulary with others.',
              },
            ],
    },
    featureBlocks: {
      kicker: featureBlocksParsed.frontmatter.kicker || 'The magic of Vokabulo',
      heading: featureBlocksParsed.frontmatter.heading || 'Built for real-time, focused learning.',
      subheading:
        featureBlocksParsed.frontmatter.subheading ||
        'Four essentials that keep you moving faster - across devices, lists, and daily sessions.',
      blocks:
        featureBlockChunks.length > 0
          ? featureBlockChunks
          : [
              {
                label: 'Words',
                title: 'A garden of vocabulary',
                body: 'A space where learning becomes lasting, and every word becomes yours.',
                pills: ['Full context', 'Pronunciation', 'Live sync'],
              },
              {
                label: 'Quiz',
                title: 'Turn practice into power',
                body: 'Where persistence becomes progress, and progress becomes mastery.',
                pills: ['Swiping', 'Keyword-focused', 'Memory optimized'],
              },
              {
                label: 'Situations',
                title: 'The right words. Right on time',
                body: 'Set the scene, and the right vocabulary will appear to help you.',
                pills: ['Personal', 'Made to be used', 'Proficiency-adjusted'],
              },
              {
                label: 'Community Sets',
                title: 'Words we share',
                body: 'A living library of vocabulary, curated by the community and waiting to be explored.',
                pills: ['Curated', 'Share your own', 'Collaborate with others'],
              },
            ],
    },
    features: {
      kicker: featuresParsed.frontmatter.kicker || 'Why Vokabulo',
      heading: featuresParsed.frontmatter.heading || 'Smart features that keep you on track.',
      subheading:
        featuresParsed.frontmatter.subheading ||
        'Every detail is built for clear progress. Spend less time, remember more, and always know where you stand.',
      cards:
        featuresChunks.length > 0
          ? featuresChunks
          : [
              {
                title: 'Spaced Repetition',
                body: 'Adaptive intervals surface each word exactly when your memory needs it.',
              },
              {
                title: 'Adjustable pronunciation',
                body: 'Select your voices, set the speed. Made to understand.',
              },
              {
                title: 'Built with magic',
                body: 'Uses the best AI tools to help you become a little better every day.',
              },
            ],
    },
    testimonials: {
      kicker: testimonialsParsed.frontmatter.kicker || 'Testimonials',
      heading: testimonialsParsed.frontmatter.heading || 'Learners love the focus.',
      subheading:
        testimonialsParsed.frontmatter.subheading ||
        'Vokabulo blends science and design—so you stay consistent and retain more.',
      items:
        testimonialsChunks.length > 0
          ? testimonialsChunks
          : [
              {
                author: 'Sophie, medical student',
                quote: '"I hit my daily goals in 15 minutes. Everything is structured, nothing distracts me."',
              },
              { author: 'Jonas, product manager', quote: '"Reviews are perfectly timed. My vocabulary grows without stress."' },
              { author: 'Mara, language coach', quote: '"Minimal yet powerful. Exactly the mix of design and pace I wanted."' },
            ],
    },
    faq: {
      kicker: faqParsed.frontmatter.kicker || 'FAQ',
      heading: faqParsed.frontmatter.heading || 'Answers to your questions.',
      subheading:
        faqParsed.frontmatter.subheading ||
        "If anything's missing, reach out anytime—we reply quickly and personally.",
      items:
        faqChunks.length > 0
          ? faqChunks
          : [
              {
                question: 'How does the review system work?',
                answer:
                  "Vokabulo calculates intervals based on your answers. Confident words appear less often; tricky ones show up more until they stick.",
              },
              { question: 'Does it work offline?', answer: "Yes. Your progress is cached and syncs automatically once you're back online." },
              { question: 'Can I import my own lists?', answer: 'Import CSV files or share existing lists with your team. Vokabulo handles duplicates and structure.' },
            ],
    },
    cta: {
      kicker: ctaParsed.frontmatter.kicker || 'Ready?',
      heading: ctaParsed.frontmatter.heading || 'Start today and stay on track every day.',
      subheading:
        ctaParsed.frontmatter.subheading ||
        'Secure your learning edge with clear sessions, smart reviews, and an interface that supports you rather than distracts you.',
      primaryCtaText: ctaParsed.frontmatter.primaryCtaText || 'Start free',
      primaryCtaHref: ctaParsed.frontmatter.primaryCtaHref || '#hero',
      secondaryCtaText: ctaParsed.frontmatter.secondaryCtaText || 'Get answers',
      secondaryCtaHref: ctaParsed.frontmatter.secondaryCtaHref || '#faq',
    },
  };
}

