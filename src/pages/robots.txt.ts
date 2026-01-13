import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = () => {
  const isVercelPreview = process.env.VERCEL_ENV === 'preview';
  const isVercelDev = process.env.VERCEL_ENV === 'development';
  const isIndexable = import.meta.env.PROD && !isVercelPreview && !isVercelDev;

  const site = (import.meta.env.SITE || 'https://vokabulo.com').replace(/\/$/, '');

  const robotsTxt = isIndexable
    ? `# Production robots.txt
User-agent: *
Allow: /

Sitemap: ${site}/sitemap-index.xml
`
    : `# Preview/Development robots.txt
User-agent: *
Disallow: /
`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
