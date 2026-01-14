import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('Support page search', () => {
  const supportPagePath = join(process.cwd(), 'src', 'pages', '[lang]', 'support.astro');
  const content = readFileSync(supportPagePath, 'utf8');

  test('hides native type=search clear button to avoid duplicate (x) controls', () => {
    assert.ok(
      content.includes("::-webkit-search-cancel-button"),
      'Expected CSS to target ::-webkit-search-cancel-button'
    );
    assert.ok(
      content.includes("Hide browser-provided clear (x) on <input type=\"search\">"),
      'Expected a comment explaining why native clear is hidden'
    );
  });

  test('desktop search checks full text blocks (heading + following content)', () => {
    assert.ok(
      content.includes('getBlockTextForAnchor'),
      'Expected helper to compute block text for an anchor'
    );
    assert.ok(
      content.includes('nextElementSibling'),
      'Expected traversal using nextElementSibling to include following paragraphs/lists'
    );
  });
});

