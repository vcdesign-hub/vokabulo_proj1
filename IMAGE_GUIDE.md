# Image Guide - Clarified

## Two Directories, Two Purposes:

### 1️⃣ `/public/images/support/` - **For Markdown** ✅ Recommended

**Use when:** Adding screenshots to markdown files

**Syntax:**
```markdown
![Search feature](/images/support/search-feature.png)
```

**Pros:**
- ✅ Simple markdown syntax
- ✅ Works immediately, no imports
- ✅ Perfect for Support page content

**Cons:**
- ❌ NOT automatically optimized
- ❌ NOT responsive (same image for all devices)
- ❌ NOT converted to modern formats

**Solution:** Manually compress images with TinyPNG.com before adding (reduce 2MB → 150KB)

---

### 2️⃣ `/src/images/support/` - **For Astro Components** ⚡ Advanced

**Use when:** You want full optimization and control

**Syntax:**
```astro
---
import { Image } from 'astro:assets';
import screenshot from '../../images/support/screenshot.png';
---

<Image src={screenshot} alt="Description" />
```

**Pros:**
- ✅ Automatic optimization
- ✅ Responsive (3 sizes: 375px, 750px, 1500px)
- ✅ Modern formats (AVIF, WebP with fallback)
- ✅ Lazy loading built-in

**Cons:**
- ❌ Can't use in markdown files
- ❌ Requires imports in .astro files
- ❌ More complex setup

---

## For Your Support Page:

Since your Support content is in **markdown files**, use:

### ✅ `/public/images/support/`

**Workflow:**
1. Take screenshot (any size)
2. Compress with TinyPNG.com (aim for ~150KB)
3. Save to `/public/images/support/`
4. Reference in markdown: `![Alt](/images/support/image.png)`

**Example:**
```markdown
## Search Feature

Use the search box to find help articles quickly:

![Support search box with clear button](/images/support/search-clear-button.png)

The × button appears when you start typing.
```

---

## Theme-aware screenshots (light/dark)

If you have two screenshots like:

- `foo-light.png`
- `foo-dark.png`

Put both in `/public/images/support/` and use this **HTML** in your markdown (recommended for Support):

```html
<img
  class="support-theme-image"
  src="/images/support/foo-light.png"
  data-light="/images/support/foo-light.png"
  data-dark="/images/support/foo-dark.png"
  alt="Feature screenshot"
  loading="lazy"
/>
```

This will automatically swap the screenshot when the site theme toggles (it watches the `.theme-dark` class on `<html>`).

---

## Recommended Sizes:

### Desktop Screenshots
- **Width:** 1500px
- **Height:** As needed (900-1200px typical)
- **After compression:** ~150KB

### Mobile Screenshots
- **Width:** 750px (2× retina quality)
- **Height:** 1334px (iPhone aspect) or 1624px (taller phones)
- **After compression:** ~80KB

---

## Quick Compression Guide:

### Online Tools:
1. **TinyPNG.com** - Drag & drop, 70% size reduction
2. **Squoosh.app** - Google tool, more control
3. **Compressor.io** - Another good option

### Desktop Apps:
- **ImageOptim** (Mac) - Batch processing
- **RIOT** (Windows) - Advanced compression

### Goal:
- Original: 2-3 MB
- After compression: 150KB (desktop), 80KB (mobile)

---

## Visual Example:

```
BEFORE Compression:
screenshot-desktop.png → 2.8 MB

AFTER Compression (TinyPNG):
screenshot-desktop.png → 156 KB (94% smaller!)
```

---

## When to Use Which Directory:

| Your Content Type | Directory to Use | Why |
|-------------------|------------------|-----|
| Markdown files (Support page) | `/public/images/support/` | Markdown can only reference /public/ |
| Astro component files | `/src/images/support/` | Gets full optimization |
| Logos, icons, SVGs | `/public/images/` | No optimization needed |

---

## The Bottom Line:

For your Support page markdown:
1. ✅ Use `/public/images/support/`
2. ✅ Compress images manually with TinyPNG
3. ✅ Use simple markdown syntax: `![Alt](/images/support/name.png)`
4. ✅ 1500px width for desktop, 750px for mobile

**This is the simplest and best approach for your use case!**
