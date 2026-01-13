import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = () => {
  const isProduction = process.env.VERCEL_ENV === 'production';

  const robotsTxt = isProduction
    ? `# Production robots.txt
User-agent: *
Allow: /

Sitemap: https://vokabulo.com/sitemap-index.xml
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
