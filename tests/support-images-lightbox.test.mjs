import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('Support page images (spacing + lightbox)', () => {
  const supportPagePath = join(process.cwd(), 'src', 'pages', '[lang]', 'support.astro');
  const content = readFileSync(supportPagePath, 'utf8');

  test('adds spacing around article images (no frame)', () => {
    assert.ok(content.includes('.help-article img {'), 'Expected .help-article img CSS block');
    assert.ok(content.includes('margin: 18px auto;'), 'Expected default image margin');
    assert.ok(content.includes('margin: 24px auto;'), 'Expected desktop image margin');
  });

  test('includes lightbox dialog markup', () => {
    assert.ok(content.includes('id="image-lightbox"'), 'Expected lightbox dialog id');
    assert.ok(content.includes('id="image-lightbox-img"'), 'Expected lightbox img id');
    assert.ok(content.includes('class="image-lightbox-close"'), 'Expected lightbox close button');
  });

  test('includes lightbox click handler scoped to support article images', () => {
    assert.ok(
      content.includes("closest?.('.help-article img')"),
      'Expected click handler to target .help-article img'
    );
    assert.ok(content.includes('dialog.showModal'), 'Expected showModal usage');
  });
});

