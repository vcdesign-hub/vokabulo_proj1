# Vokabulo Landing Page

A multilingual landing page for Vokabulo, built with Astro and deployed on Vercel.

## Features

- **6 Locales**: English (default), German, French, Italian, Spanish, Portuguese
- **Clean URLs**: `/en/`, `/de/support`, etc.
- **Blog**: English-only blog at `/en/blog`
- **Markdown Content**: All content stored in easy-to-edit Markdown files
- **Static Site**: Fast, SEO-friendly static HTML output

## Project Structure

```
├── content/
│   ├── pages/
│   │   ├── en/           # English page content
│   │   │   ├── home.md
│   │   │   ├── support.md
│   │   │   ├── legal-notice.md
│   │   │   └── privacy.md
│   │   ├── de/           # German stubs (translate later)
│   │   ├── fr/           # French stubs
│   │   ├── it/           # Italian stubs
│   │   ├── es/           # Spanish stubs
│   │   └── pt/           # Portuguese stubs
│   └── blog/
│       └── en/           # English blog posts
│           └── welcome.md
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro   # Shared header/footer/theme
│   ├── pages/
│   │   ├── index.astro         # Root (renders English)
│   │   ├── [lang]/             # Localized routes
│   │   │   ├── index.astro
│   │   │   ├── support.astro
│   │   │   ├── legal-notice.astro
│   │   │   └── privacy.astro
│   │   └── en/blog/            # English-only blog
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── styles/
│   │   └── styles.css          # Shared styles
│   └── utils/
│       └── i18n.ts             # Locale utilities
└── public/
    └── images/                 # Static assets (logos, images)
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Content Editing

### Pages
Edit page content in `content/pages/{locale}/{page}.md`. Each file uses Markdown with frontmatter:

```markdown
---
title: "Page Title"
---

# Your content here
```

### Blog Posts
Add new blog posts to `content/blog/en/{slug}.md`:

```markdown
---
title: "Post Title"
date: "2026-01-12"
excerpt: "Short description"
---

# Post content here
```

### Images
Place images in `public/images/` and reference them in Markdown:

```markdown
![Alt text](/images/your-image.jpg)
```

## Adding Translations

To translate a page:
1. Open `content/pages/{locale}/{page}.md`
2. Replace the English content with translated text
3. Keep the frontmatter structure

The site will automatically show the translated content for that locale.

## Deployment

This site is configured for Vercel:
- Pushes to `main` branch auto-deploy
- Build command: `npm run build`
- Output directory: `dist/`

## URL Structure

- `/` → English homepage
- `/{locale}/` → Homepage in specific locale
- `/{locale}/support` → Support page
- `/{locale}/legal-notice` → Legal notice
- `/{locale}/privacy` → Privacy policy
- `/en/blog` → Blog index (English only)
- `/en/blog/{slug}` → Individual blog post

## Adding More Blog Posts

Create a new `.md` file in `content/blog/en/`:

```bash
content/blog/en/my-new-post.md
```

It will automatically appear in the blog list.
