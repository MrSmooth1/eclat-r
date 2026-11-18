// Pré-rendu statique : génère dist/<route>/index.html pour chaque page,
// avec titre, description, Open Graph, URL canonique et contenu HTML,
// ainsi que dist/404.html et dist/sitemap.xml.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, pages, site } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function head(route, meta) {
  const url = route === '404' ? site.url : `${site.url}${route === '/' ? '/' : route}`;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex' : 'index, follow'}" />`,
    route !== '404' && `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site.url}/og-image.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (route === '/') {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: site.name,
      slogan: site.slogan,
      url: site.url,
      image: `${site.url}/og-image.jpg`,
      logo: `${site.url}/logo-eclat-residences.png`,
      areaServed: 'Douala',
      address: { '@type': 'PostalAddress', addressLocality: 'Douala', addressCountry: 'CM' },
      ...(site.emailActive ? { email: site.email } : {}),
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(ld)}</script>`);
  }
  return tags.filter(Boolean).join('\n    ');
}

function page(route, url) {
  const meta = pages[route];
  return template
    .replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, head(route, meta))
    .replace('<!--app-html-->', render(url));
}

const routes = Object.keys(pages).filter((r) => r.startsWith('/'));
for (const route of routes) {
  const outDir = route === '/' ? dist : path.join(dist, route.slice(1));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, 'index.html'), page(route, route));
  console.log(`✓ ${route}`);
}
await fs.writeFile(path.join(dist, '404.html'), page('404', '/page-introuvable'));
console.log('✓ 404.html');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${site.url}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
console.log('✓ sitemap.xml, robots.txt');

await fs.rm(ssrDir, { recursive: true, force: true });
