# Vokabulo Landing Page

A modern, responsive landing page for Vokabulo built with Next.js 14, TypeScript, Tailwind CSS, and Keystatic for content management.

## Features

- 🎨 Modern, clean design with smooth animations
- 🌓 Dark mode support with theme toggle
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Built with Next.js 14 App Router for optimal performance
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS for styling
- ♿ Accessible components
- 🌍 Multi-language support with Keystatic CMS
- 📝 Visual content editor at `/keystatic`

## Pages

- **Home** (`/`) - Main landing page with features, testimonials, and FAQ
- **Support** (`/support`) - Comprehensive support documentation with expandable sections
- **Legal Notice** (`/legal-notice`) - Legal information and copyright
- **Privacy Policy** (`/data-protection`) - Data protection and privacy information
- **Keystatic Admin** (`/keystatic`) - Content management interface

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server will start at `http://localhost:3000` (or next available port).

## Content Management with Keystatic

Keystatic is integrated for managing all page content through a visual interface.

### Accessing the Admin UI

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/keystatic`
3. You'll see the Keystatic admin interface where you can edit all content

### Content Collections

The site uses the following Keystatic collections:

#### 1. Home Pages (`content/home/*`)
- **Purpose**: Manage home page content for different languages
- **Structure**: One entry per language (en, de, fr, es, it, pt)
- **Fields**:
  - Hero title, subtitle, and CTA button text
  - Philosophy section content
  - Features section content
  - Testimonials and FAQ content

#### 2. Support Articles (`content/support/**/*`)
- **Purpose**: Manage support documentation organized by language and section
- **Structure**: Multiple articles per language, organized by section
- **Fields**:
  - Language (locale)
  - Section (about, start, words, study, situations, community)
  - Title, description, and order
  - Markdoc content

#### 3. Legal Notices (`content/legal-notice/*`)
- **Purpose**: Legal information for each language
- **Structure**: One entry per language
- **Fields**: Company information, address, contact details, and legal content

#### 4. Privacy Policies (`content/privacy-policy/*`)
- **Purpose**: Privacy policy content for each language
- **Structure**: One entry per language
- **Fields**: Last updated date and Markdoc content

### Adding Content

1. Go to `/keystatic` in your browser
2. Select a collection (e.g., "Home Pages")
3. Click "Create entry" or edit an existing entry
4. Fill in the fields
5. Save - content is stored as files in the `content/` directory
6. Content is automatically available in your Next.js pages

### Multi-Language Setup

Currently supported languages:
- English (en) - default
- German (de)
- French (fr)
- Spanish (es)
- Italian (it)
- Portuguese (pt)

To add a new language:
1. In Keystatic admin, create entries with the new locale code
2. Update the locale options in `keystatic.config.ts` if adding a new language
3. Use the helper functions in `lib/keystatic.ts` to read content by locale

### Using Content in Pages

Use the helper functions in `lib/keystatic.ts`:

```typescript
import { getHomePage, getSupportArticles } from '@/lib/keystatic';

export default async function Page() {
  const homePage = await getHomePage('en'); // or 'de', 'fr', etc.
  const supportArticles = await getSupportArticles('en', 'about');
  
  return (
    <div>
      <h1>{homePage?.heroTitle}</h1>
      {/* render content */}
    </div>
  );
}
```

## Project Structure

```
vokabulo-landing/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with Header/Footer
│   ├── page.tsx                 # Home page
│   ├── keystatic/               # Keystatic admin UI
│   │   ├── [[...params]]/
│   │   ├── keystatic.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── keystatic/           # Keystatic API routes
│   ├── support/
│   ├── legal-notice/
│   └── data-protection/
├── components/                   # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   └── MobileMenu.tsx
├── lib/                          # Utilities and hooks
│   ├── theme.tsx                # Theme context
│   └── keystatic.ts             # Keystatic helper functions
├── content/                      # Keystatic content files
│   ├── home/                    # Home page content by locale
│   ├── support/                 # Support articles
│   ├── legal-notice/            # Legal notices by locale
│   └── privacy-policy/          # Privacy policies by locale
├── public/                       # Static assets
│   ├── logo on white.svg
│   └── logo on dark.svg
├── keystatic.config.ts          # Keystatic configuration
├── package.json
└── tsconfig.json
```

## Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

**Important**: For Keystatic to work in production:
- Use GitHub storage (configure in `keystatic.config.ts`)
- Set up GitHub OAuth for the admin UI
- Or use local storage for development only

### Configuring Keystatic for Production

To use GitHub storage in production, update `keystatic.config.ts`:

```typescript
storage: {
  kind: 'github',
  repo: {
    owner: 'your-username',
    name: 'your-repo',
  },
},
```

Then set up GitHub OAuth:
1. Create a GitHub OAuth App
2. Set environment variables:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET` (any random string)

## Development

### Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Keystatic** - Git-based CMS
- **Markdoc** - Markdown with superpowers

### Theme System

The site supports light and dark modes:
- Theme preference is saved to localStorage
- Respects system preference on first visit
- Smooth transitions between themes
- Theme toggle in header

### Styling

- Global styles in `app/globals.css`
- Page-specific styles using styled-jsx
- Tailwind utility classes for layout
- CSS variables for theming

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

All rights reserved. See Legal Notice page for details.

## Contact

For questions or support, visit the Support page or contact us at [contact email].
