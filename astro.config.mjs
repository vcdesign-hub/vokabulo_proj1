import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://vokabulo.com',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  integrations: [tailwind(), sitemap()],
});
