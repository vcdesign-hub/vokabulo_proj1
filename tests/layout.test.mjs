import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

describe('BaseLayout', () => {
  test('does not include the under construction banner', () => {
    const layoutPath = new URL('../src/layouts/BaseLayout.astro', import.meta.url);
    const content = readFileSync(layoutPath, 'utf8');

    assert.ok(
      !content.includes('Under construction. All texts are placeholders.'),
      'Expected banner text to be removed from BaseLayout.astro'
    );
    assert.ok(
      !content.includes('class="construction-banner"'),
      'Expected construction banner container to be removed from BaseLayout.astro'
    );
  });

  test('does not use trailing slashes for locale root or locale anchors (trailingSlash: never)', () => {
    const layoutPath = new URL('../src/layouts/BaseLayout.astro', import.meta.url);
    const content = readFileSync(layoutPath, 'utf8');

    // When trailingSlash is "never", avoid generating /en/ and /en/#hash URLs.
    assert.ok(!content.includes('href={`/${currentLang}/`}'), 'Expected no /${currentLang}/ locale root link');
    assert.ok(!content.includes('href={`/${currentLang}/#'), 'Expected no /${currentLang}/# anchor links');
  });
});

