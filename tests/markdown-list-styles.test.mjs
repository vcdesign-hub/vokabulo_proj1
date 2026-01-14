import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function read(relPath) {
  return readFileSync(join(process.cwd(), relPath), 'utf-8');
}

test('Markdown list markers are explicitly enabled (Tailwind preflight compatibility)', () => {
  const blogPostPage = read('src/pages/[lang]/blog/[slug].astro');
  assert.ok(
    blogPostPage.includes('.post-content ul {\n      list-style: disc;'),
    'Expected blog post page to explicitly enable unordered list markers'
  );
  assert.ok(
    blogPostPage.includes('.post-content ol {\n      list-style: decimal;'),
    'Expected blog post page to explicitly enable ordered list markers'
  );

  const legalNoticePage = read('src/pages/[lang]/legal-notice.astro');
  assert.ok(
    legalNoticePage.includes('.page main ul {\n      list-style: disc;'),
    'Expected legal notice page to explicitly enable unordered list markers (scoped to main)'
  );
  assert.ok(
    legalNoticePage.includes('.page main ol {\n      list-style: decimal;'),
    'Expected legal notice page to explicitly enable ordered list markers (scoped to main)'
  );

  const privacyPage = read('src/pages/[lang]/privacy.astro');
  assert.ok(
    privacyPage.includes('.page main ul {\n      margin: 0 0 24px;'),
    'Expected privacy page to scope list styling to main content'
  );
  assert.ok(
    privacyPage.includes('.page main ol {\n      margin: 0 0 24px;'),
    'Expected privacy page to explicitly enable ordered list markers (scoped to main)'
  );
});

