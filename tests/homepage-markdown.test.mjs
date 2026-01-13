import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('Homepage markdown wiring', () => {
  test('content/pages/en/home/*.md exists (section-sliced copy)', () => {
    const base = join(process.cwd(), 'content', 'pages', 'en', 'home');
    const required = [
      'hero.md',
      'philosophy.md',
      'feature-blocks.md',
      'features.md',
      'testimonials.md',
      'faq.md',
      'cta.md',
    ];

    for (const file of required) {
      const content = readFileSync(join(base, file), 'utf-8');
      assert.ok(content.length > 0, `Expected ${file} to exist and be non-empty`);
    }
  });

  test('feature-blocks.md contains editable pills lists', () => {
    const filePath = join(process.cwd(), 'content', 'pages', 'en', 'home', 'feature-blocks.md');
    const content = readFileSync(filePath, 'utf-8');
    assert.ok(content.includes('pills:'), 'Expected feature-blocks.md to include pills: sections');
    assert.ok(content.match(/pills:\s*\n-\s+/), 'Expected pills: to be followed by bullet items');
  });

  test('src/pages/[lang]/index.astro uses loadHomeCopy() for section copy', () => {
    const pagePath = new URL('../src/pages/[lang]/index.astro', import.meta.url);
    const content = readFileSync(pagePath, 'utf8');

    assert.ok(content.includes(`loadHomeCopy`), 'Expected lang index to import/use loadHomeCopy');
    assert.ok(content.includes('<BaseLayout title={hero.title} description={hero.description}'), 'Expected lang index to pass markdown-backed title/description into BaseLayout');
    assert.ok(content.includes('set:html={hero.heroHeadingHtml}'), 'Expected lang index to render hero heading from markdown');
    assert.ok(content.includes('{featureBlocks.blocks[0]?.pills'), 'Expected lang index to render feature pills from markdown');
  });

  test('src/pages/index.astro uses loadHomeCopy("en") for section copy', () => {
    const pagePath = new URL('../src/pages/index.astro', import.meta.url);
    const content = readFileSync(pagePath, 'utf8');

    assert.ok(content.includes(`loadHomeCopy('en')`), 'Expected root index to load EN homepage copy');
    assert.ok(content.includes('<BaseLayout title={hero.title} description={hero.description}'), 'Expected root index to pass markdown-backed title/description into BaseLayout');
    assert.ok(content.includes('{featureBlocks.blocks[0]?.pills'), 'Expected root index to render feature pills from markdown');
  });
});

