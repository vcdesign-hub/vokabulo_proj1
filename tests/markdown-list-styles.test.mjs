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
    blogPostPage.includes('class="post-content md-content'),
    'Expected blog post content to opt into shared markdown styling via .md-content'
  );
  assert.ok(
    blogPostPage.includes('md-content--lg'),
    'Expected blog post content to use the large markdown typography variant'
  );

  const markdownStyles = read('src/styles/markdown.css');
  assert.ok(
    markdownStyles.includes('.md-content ul {\n  list-style: disc;'),
    'Expected shared markdown styles to explicitly enable unordered list markers'
  );
  assert.ok(
    markdownStyles.includes('.md-content ol {\n  list-style: decimal;'),
    'Expected shared markdown styles to explicitly enable ordered list markers'
  );

  const legalNoticePage = read('src/pages/[lang]/legal-notice.astro');
  assert.ok(
    legalNoticePage.includes('<main class="md-content">'),
    'Expected legal notice page to opt into shared markdown styling via .md-content'
  );

  const privacyPage = read('src/pages/[lang]/privacy.astro');
  assert.ok(
    privacyPage.includes('<main class="md-content">'),
    'Expected privacy page to opt into shared markdown styling via .md-content'
  );
});

