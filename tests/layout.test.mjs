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

  test('includes smooth navbar scroll reveal script', () => {
    const layoutPath = new URL('../src/layouts/BaseLayout.astro', import.meta.url);
    const content = readFileSync(layoutPath, 'utf8');

    // Verify smooth scroll implementation
    assert.ok(
      content.includes('--nav-bg-opacity'),
      'Expected CSS custom property --nav-bg-opacity'
    );
    assert.ok(
      content.includes('--nav-width-scale'),
      'Expected CSS custom property --nav-width-scale'
    );
    assert.ok(
      content.includes('requestAnimationFrame'),
      'Expected requestAnimationFrame for smooth 60fps updates'
    );
    assert.ok(
      content.includes('maxScroll = 100'),
      'Expected 100px scroll range for opacity ramp'
    );
    assert.ok(
      content.includes('matchMedia') && content.includes('768px'),
      'Expected desktop media query check (min-width: 768px)'
    );
    assert.ok(
      content.includes('Math.min(scrollY / maxScroll, 1)'),
      'Expected smooth opacity calculation'
    );
    assert.ok(
      content.includes('1 - (0.3359375 * opacity)'),
      'Expected width scale calculation (1280px → 850px)'
    );
  });

  test('renders footer in boxed shell style', () => {
    const layoutPath = new URL('../src/layouts/BaseLayout.astro', import.meta.url);
    const content = readFileSync(layoutPath, 'utf8');

    assert.ok(
      content.includes('class="site-footer'),
      'Expected BaseLayout footer to have .site-footer class'
    );
    assert.ok(
      content.includes('footer-shell'),
      'Expected BaseLayout footer to include .footer-shell wrapper'
    );
  });
});

describe('Navbar smooth transition styles', () => {
  test('includes CSS custom property for opacity control', () => {
    const stylesPath = new URL('../src/styles/styles.css', import.meta.url);
    const content = readFileSync(stylesPath, 'utf8');

    assert.ok(
      content.includes('--nav-bg-opacity'),
      'Expected --nav-bg-opacity CSS custom property'
    );
  });

  test('has smooth cubic-bezier transition', () => {
    const stylesPath = new URL('../src/styles/styles.css', import.meta.url);
    const content = readFileSync(stylesPath, 'utf8');

    assert.ok(
      content.includes('cubic-bezier(0.4, 0, 0.2, 1)'),
      'Expected cubic-bezier easing function'
    );
    assert.ok(
      content.includes('600ms'),
      'Expected 600ms transition duration'
    );
  });

  test('uses opacity-based background calculations', () => {
    const stylesPath = new URL('../src/styles/styles.css', import.meta.url);
    const content = readFileSync(stylesPath, 'utf8');

    // Check that background opacity is calculated based on --nav-bg-opacity
    assert.ok(
      content.includes('calc(') && content.includes('var(--nav-bg-opacity)'),
      'Expected calc() with var(--nav-bg-opacity) for smooth fade'
    );
  });

  test('includes transform scale for subtle grow effect', () => {
    const stylesPath = new URL('../src/styles/styles.css', import.meta.url);
    const content = readFileSync(stylesPath, 'utf8');

    assert.ok(
      content.includes('transform: scale'),
      'Expected transform scale for grow effect'
    );
  });

  test('mobile always has full opacity', () => {
    const stylesPath = new URL('../src/styles/styles.css', import.meta.url);
    const content = readFileSync(stylesPath, 'utf8');

    // Check that mobile has --nav-bg-opacity: 1
    assert.ok(
      content.includes('@media (max-width: 767px)') && 
      content.match(/--nav-bg-opacity:\s*1/),
      'Expected mobile to have --nav-bg-opacity: 1'
    );
  });

  test('includes width scale CSS custom property', () => {
    const stylesPath = new URL('../src/styles/styles.css', import.meta.url);
    const content = readFileSync(stylesPath, 'utf8');

    assert.ok(
      content.includes('--nav-width-scale'),
      'Expected --nav-width-scale CSS custom property'
    );
  });

  test('uses width scale in max-width calculation', () => {
    const stylesPath = new URL('../src/styles/styles.css', import.meta.url);
    const content = readFileSync(stylesPath, 'utf8');

    assert.ok(
      content.includes('max-width: calc(1280px * var(--nav-width-scale))'),
      'Expected max-width calculation with --nav-width-scale'
    );
  });

  test('includes max-width in will-change', () => {
    const stylesPath = new URL('../src/styles/styles.css', import.meta.url);
    const content = readFileSync(stylesPath, 'utf8');

    assert.ok(
      content.includes('will-change') && content.includes('max-width'),
      'Expected max-width in will-change property for performance'
    );
  });
});

