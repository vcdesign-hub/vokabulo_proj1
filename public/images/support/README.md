# Support Screenshots Directory

Place your Support page screenshots in this directory for use in markdown files.

## 📁 This is `/public/images/support/`

Images here are **served directly** without optimization - perfect for markdown!

## Quick Start - Adding a Screenshot:

### Step 1: Add Your Image
Place your screenshot in this directory:
```
/public/images/support/
├── search-feature.png
├── mobile-navigation.png
└── clear-button.png
```

### Step 2: Reference in Markdown
In your Support markdown files (`/content/pages/*/support/*.md`):

```markdown
## Search Feature

Use the search box to find help articles:

![Search box with clear button](/images/support/search-feature.png)

The clear button (×) appears when you start typing.
```

**Note:** The path starts with `/images/` (not `/public/images/`)

## Recommended Sizes:

### Desktop Screenshots
- **Width**: 1500px
- **Format**: PNG or JPG
- **Compress first**: Use TinyPNG.com or similar (aim for < 200KB)

### Mobile Screenshots
- **Width**: 750px (2x retina) or 375px (1x)
- **Format**: PNG or JPG
- **Compress first**: Same as above

## File Naming:

Use descriptive, kebab-case names:
- ✅ `search-clear-button.png`
- ✅ `mobile-floating-nav.png`
- ✅ `desktop-sidebar-expanded.png`
- ❌ `Screenshot 2024-01-15.png`
- ❌ `IMG_1234.png`

## Important Notes:

### ❌ Images in `/public/` are NOT automatically optimized
- They are served exactly as-is
- **Compress them manually** before adding them
- Use tools like:
  - TinyPNG.com
  - Squoosh.app
  - ImageOptim (Mac)

### ✅ This is perfect for markdown workflow
- Simple syntax: `![Alt text](/images/support/image.png)`
- Works in all markdown files
- No imports needed
- Fast and easy

## Alternative: Optimized Images in Astro Components

If you need **automatic optimization** (responsive images, modern formats), use the `/src/images/support/` directory instead and import in `.astro` files.

See `IMAGE_GUIDE.md` in the project root for details.

## Example File Structure:

```
/public/images/support/
├── README.md (this file)
├── search-feature-desktop.png     (1500×900, compressed to ~150KB)
├── search-feature-mobile.png      (750×1334, compressed to ~80KB)
├── mobile-nav-closed.png          (750×1334, compressed to ~60KB)
├── mobile-nav-open.png            (750×1334, compressed to ~90KB)
└── sidebar-navigation.png         (1500×1000, compressed to ~120KB)
```

## Styling in Markdown:

### Basic Image:
```markdown
![Search feature](/images/support/search-feature.png)
```

### With HTML for Custom Styling:
```markdown
<img 
  src="/images/support/search-feature.png" 
  alt="Search feature" 
  style="max-width: 100%; border-radius: 12px; border: 1px solid #e2e6ef;"
/>
```

### Centered with Caption:
```markdown
<figure style="text-align: center; margin: 2rem 0;">
  <img src="/images/support/search-feature.png" alt="Search feature" style="max-width: 100%; border-radius: 12px;">
  <figcaption style="margin-top: 0.5rem; font-size: 14px; color: #6b7280; font-style: italic;">
    The search box includes a clear (×) button
  </figcaption>
</figure>
```

## Quick Checklist:

- [ ] Compress images before adding (< 200KB per image)
- [ ] Use descriptive file names
- [ ] Add meaningful alt text in markdown
- [ ] Test on both desktop and mobile
- [ ] Use consistent image sizes (1500px for desktop, 750px for mobile)

## Need Help?

See the main documentation:
- `IMAGE_SETUP_COMPLETE.md` - Overview
- `IMAGE_GUIDE.md` - Complete guide with optimization options
