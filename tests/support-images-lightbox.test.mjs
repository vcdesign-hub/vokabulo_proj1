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
    assert.ok(content.includes('perspective('), 'Expected 3D perspective transform for images');
    assert.ok(content.includes('box-shadow'), 'Expected shadow for 3D effect');
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

  test('supports theme-aware screenshots via data-light / data-dark', () => {
    assert.ok(
      content.includes("img.support-theme-image"),
      'Expected support theme screenshot selector'
    );
    assert.ok(
      content.includes('img.dataset.dark') || content.includes('img.dataset.light'),
      'Expected use of data-dark/data-light attributes'
    );
    assert.ok(
      content.includes("root.classList.contains('theme-dark')"),
      'Expected to read theme from .theme-dark class'
    );
    assert.ok(
      content.includes('new MutationObserver'),
      'Expected MutationObserver to react to theme changes'
    );
    assert.ok(
      content.includes('darkMissing'),
      'Expected fallback marker for missing dark screenshots'
    );
  });
});

