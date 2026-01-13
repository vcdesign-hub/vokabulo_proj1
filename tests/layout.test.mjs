import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

describe('BaseLayout', () => {
  test('shows the under construction banner below the nav', () => {
    const layoutPath = new URL('../src/layouts/BaseLayout.astro', import.meta.url);
    const content = readFileSync(layoutPath, 'utf8');

    assert.ok(
      content.includes('Under construction. All texts are placeholders.'),
      'Expected banner text to exist in BaseLayout.astro'
    );
    assert.ok(
      content.includes('class="construction-banner"'),
      'Expected construction banner container to exist in BaseLayout.astro'
    );
  });
});

