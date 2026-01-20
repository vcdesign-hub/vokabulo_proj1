import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://vokabulo.com',
  output: 'static',
  // Local builds can hang in the Vercel adapter when it tries to rm -rf `.vercel/output`.
  // Vercel builds are fine, so only enable the adapter in the Vercel build environment.
  adapter: (process.env.VERCEL === '1' || process.env.VERCEL_ENV) ? vercel() : undefined,
  trailingSlash: 'never',
  integrations: [tailwind(), sitemap(), react()],
  image: {
    // Optimize images for responsive delivery
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Generate responsive image sizes
    remotePatterns: [],
  },
});