import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

describe('Support page mobile navigation', () => {
  test('mobile dropdown nav markup exists (currently hidden in favor of FAB)', () => {
    const supportPath = new URL('../src/pages/[lang]/support.astro', import.meta.url);
    const content = readFileSync(supportPath, 'utf8');

    // Check for .help-nav-mobile class
    assert.ok(
      content.includes('class="help-nav-mobile'),
      'Expected .help-nav-mobile markup to exist'
    );
  });

  test('has floating button nav for mobile screens (<= 767px)', () => {
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

    // Check for mobile-screen media query
    assert.ok(
      content.includes('@media (max-width: 767px)'),
      'Expected media query for floating button on screens <= 767px'
    );

    // Check that FAB is hidden on >= 768px
    assert.ok(
      content.includes('@media (min-width: 768px)'),
      'Expected media query for hiding floating button on screens >= 768px'
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
