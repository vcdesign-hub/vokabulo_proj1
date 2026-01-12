# Migration Guide

## What Changed

Your static HTML site has been migrated to Astro with internationalization support. Here's what's different:

### Before (Old Structure)
```
├── index.html
├── support.html
├── legal-notice.html
├── data-protection.html
├── styles.css
├── logo on white.svg
└── logo on dark.svg
```

### After (New Structure)
```
├── content/               # All editable content (Markdown)
│   ├── pages/{locale}/   # Page content per language
│   └── blog/en/          # Blog posts
├── src/                  # Code and templates
│   ├── layouts/          # Shared header/footer
│   ├── pages/            # Route handlers
│   ├── styles/           # CSS
│   └── utils/            # Helpers
├── public/               # Static assets
│   └── images/
└── dist/                 # Built site (auto-generated)
```

## Key Benefits

### 1. Content is Now Separate from Design
- **Before**: Changing copy required editing HTML files mixed with layout code
- **After**: Edit simple Markdown files in `content/pages/{locale}/`

### 2. Support Page Stays Together
- The support page is still one big scrollable document
- Content lives in `content/pages/en/support.md`
- All headings, anchors, and navigation work the same

### 3. Easy Localization
- Each language has its own folder: `content/pages/en/`, `content/pages/de/`, etc.
- URLs are clean: `/en/support`, `/de/support`, `/fr/support`
- Non-English locales currently show stubs with "Translation coming soon"

### 4. Built-in Blog
- English-only blog at `/en/blog`
- Add posts by creating `.md` files in `content/blog/en/`
- Automatic listing and individual post pages

### 5. Same Look and Feel
- All your existing CSS and design is preserved
- Theme toggle works the same
- Dark mode works the same

## How to Edit Content

### Edit a Page
1. Open `content/pages/en/{page}.md`
2. Edit the Markdown content
3. Save
4. Build: `npm run build`
5. Push to GitHub → auto-deploys to Vercel

### Add Images
1. Place image in `public/images/`
2. Reference in Markdown: `![Alt text](/images/my-image.jpg)`

### Add a Blog Post
1. Create `content/blog/en/my-post-slug.md`
2. Add frontmatter:
   ```markdown
   ---
   title: "My Post Title"
   date: "2026-01-15"
   excerpt: "Brief description"
   ---
   
   Post content here...
   ```
3. Build and deploy

### Translate a Page
1. Open `content/pages/de/support.md` (or any locale)
2. Replace the stub content with your German translation
3. Keep the frontmatter structure
4. Save and deploy

## Design Changes

When you want to change the design:
- **Layout/header/footer**: Edit `src/layouts/BaseLayout.astro`
- **Styles**: Edit `src/styles/styles.css`
- **Page-specific styles**: Edit the `<style>` section in the respective `.astro` file

The content in `content/` folders will **not be affected** by design changes.

## Local Development

```bash
# Start dev server (hot-reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

Your GitHub repo is connected to Vercel:
1. Commit your changes
2. Push to `main` branch
3. Vercel automatically builds and deploys

## Old Files

The original HTML files (`index.html`, `support.html`, etc.) are still in the root directory but are **not used** by the new site. You can:
- Keep them as reference
- Delete them after verifying the new site works
- Archive them in a `_old/` folder

## Next Steps

1. **Test locally**: Run `npm run dev` and visit `http://localhost:4321`
2. **Check all pages**: Visit `/`, `/en/support`, `/en/blog`, etc.
3. **Edit content**: Try editing a Markdown file and see the changes
4. **Deploy**: Push to GitHub and verify on Vercel
5. **Translate**: When ready, replace stub content in other locale folders

## Questions?

- Check `README.md` for detailed documentation
- Review the file structure in your project
- Test changes locally before deploying
