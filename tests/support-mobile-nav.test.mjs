import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

describe('Support page mobile navigation', () => {
  test('has sticky mobile nav for phones 391px-767px', () => {
    const supportPath = new URL('../src/pages/[lang]/support.astro', import.meta.url);
    const content = readFileSync(supportPath, 'utf8');

    // Check for .help-nav-mobile class
    assert.ok(
      content.includes('class="help-nav-mobile'),
      'Expected .help-nav-mobile markup to exist'
    );

    // Check for sticky positioning
    assert.ok(
      content.includes('position: sticky'),
      'Expected position: sticky styling for mobile nav'
    );

    // Check for top offset (should be around 120px to clear the header)
    assert.ok(
      content.match(/top:\s*120px/),
      'Expected top: 120px offset for sticky mobile nav'
    );

    // Check for responsive breakpoint showing sticky nav on medium phones
    assert.ok(
      content.includes('@media (min-width: 391px) and (max-width: 767px)'),
      'Expected media query for sticky nav on phones 391px-767px'
    );
  });

  test('has floating button nav for very small screens (<= 390px)', () => {
    const supportPath = new URL('../src/pages/[lang]/support.astro', import.meta.url);
    const content = readFileSync(supportPath, 'utf8');

    // Check for .help-nav-fab class
    assert.ok(
      content.includes('class="help-nav-fab'),
      'Expected .help-nav-fab markup to exist'
    );

    // Check for fixed positioning
    assert.ok(
      content.includes('position: fixed'),
      'Expected position: fixed styling for floating button'
    );

    // Check for small-screen media query
    assert.ok(
      content.includes('@media (max-width: 390px)'),
      'Expected media query for floating button on screens <= 390px'
    );

    // Check that floating button contains "On this page" text
    assert.ok(
      content.match(/help-nav-fab[\s\S]*?On this page/),
      'Expected floating button to contain "On this page" text'
    );
  });

  test('both mobile nav variants render the same section links', () => {
    const supportPath = new URL('../src/pages/[lang]/support.astro', import.meta.url);
    const content = readFileSync(supportPath, 'utf8');

    // Both should map over sections and create links with #${s.id}
    const mobileNavPattern = /help-nav-mobile[\s\S]*?href=\{`#\$\{s\.id\}`\}/;
    const fabNavPattern = /help-nav-fab[\s\S]*?href=\{`#\$\{s\.id\}`\}/;

    assert.ok(
      mobileNavPattern.test(content),
      'Expected mobile nav to render section links'
    );

    assert.ok(
      fabNavPattern.test(content),
      'Expected floating button nav to render section links'
    );
  });

  test('desktop nav remains unchanged and visible on >= 768px', () => {
    const supportPath = new URL('../src/pages/[lang]/support.astro', import.meta.url);
    const content = readFileSync(supportPath, 'utf8');

    // Check that desktop nav still exists
    assert.ok(
      content.includes('class="help-nav"'),
      'Expected desktop .help-nav to still exist'
    );

    // Check that desktop nav becomes visible on tablets/desktop
    assert.ok(
      content.match(/@media \(min-width: 768px\)[\s\S]*?\.help-nav[\s\S]*?display: flex/),
      'Expected desktop nav to be visible on screens >= 768px'
    );
  });
});
