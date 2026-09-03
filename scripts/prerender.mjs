import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = resolve(ROOT, 'dist');
const SITE_URL = 'https://mikolajpiech.com';
const [template, siteEnRaw, sitePlRaw] = await Promise.all([
  readFile(resolve(DIST, 'index.html'), 'utf8'),
  readFile(resolve(ROOT, 'content/site.json'), 'utf8'),
  readFile(resolve(ROOT, 'content/site.pl.json'), 'utf8'),
]);

const siteEn = JSON.parse(siteEnRaw);
const sitePl = JSON.parse(sitePlRaw);
const serverEntry = pathToFileURL(resolve(ROOT, 'dist-ssr/entry-server.js')).href;
const { render, getPageMeta } = await import(serverEntry);

const routes = [
  { page: 'home', language: 'en', url: '/', output: 'index.html' },
  { page: 'not_found', language: 'en', url: '/404', output: '404.html' },
  { page: 'not_found', language: 'pl', url: '/pl/404', output: 'pl/404.html' },
  { page: 'portfolio', language: 'en', url: '/portfolio', output: 'portfolio.html' },
  { page: 'privacy', language: 'en', url: '/privacy-policy', output: 'privacy-policy.html' },
  { page: 'home', language: 'pl', url: '/pl', output: 'pl.html' },
  { page: 'portfolio', language: 'pl', url: '/pl/portfolio', output: 'pl/portfolio.html' },
  { page: 'privacy', language: 'pl', url: '/pl/polityka-prywatnosci', output: 'pl/polityka-prywatnosci.html' },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function replaceNamedMeta(html, attribute, key, value) {
  const pattern = new RegExp(`<meta ${attribute}=["']${key.replaceAll(':', '\\:')}["'][^>]*>`, 'i');
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function updateHead(html, route, site) {
  const meta = getPageMeta(route.page, site, route.language);
  const socialDescription = meta.socialDescription;
  const canonical = `${SITE_URL}${route.url}`;
  const alternates = meta.alternatePaths;

  html = html.replace(/<html lang=["'][^"']+["']>/i, `<html lang="${route.language}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  html = replaceNamedMeta(html, 'name', 'description', meta.description);
  html = html.replace(/<link rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/\s*<link rel=["']alternate["'] hreflang=["'][^"']+["'][^>]*>/gi, '');
  const alternateTags = alternates ? [
    `<link rel="alternate" hreflang="en" href="${SITE_URL}${alternates.en}" />`,
    `<link rel="alternate" hreflang="pl" href="${SITE_URL}${alternates.pl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${alternates.en}" />`,
  ].join('\n    ') : '';
  html = html.replace(/(<link rel=["']canonical["'][^>]*>)/i, `$1\n    ${alternateTags}`);

  html = replaceNamedMeta(html, 'property', 'og:title', meta.title);
  html = replaceNamedMeta(html, 'property', 'og:description', socialDescription);
  html = replaceNamedMeta(html, 'property', 'og:url', canonical);
  html = replaceNamedMeta(html, 'property', 'og:locale', route.language === 'pl' ? 'pl_PL' : 'en_US');
  html = replaceNamedMeta(html, 'property', 'og:locale:alternate', route.language === 'pl' ? 'en_US' : 'pl_PL');
  html = replaceNamedMeta(html, 'name', 'twitter:title', meta.title);
  html = replaceNamedMeta(html, 'name', 'twitter:description', socialDescription);
  html = replaceNamedMeta(html, 'property', 'og:image', meta.image);
  html = replaceNamedMeta(html, 'property', 'og:image:width', meta.imageWidth);
  html = replaceNamedMeta(html, 'property', 'og:image:height', meta.imageHeight);
  html = replaceNamedMeta(html, 'name', 'twitter:image', meta.image);
  html = replaceNamedMeta(html, 'name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  if (meta.noindex) html = html.replace(/<link rel="canonical"[^>]*>/i, '');

  return html;
}

for (const route of routes) {
  const site = route.language === 'pl' ? sitePl : siteEn;
  let html = updateHead(template, route, site);
  html = html.replace('<div id="root"></div>', `<div id="root" data-prerendered-path="${route.url}">${render(route.url)}</div>`);
  const outputPath = resolve(DIST, route.output);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

console.log(`Prerendered ${routes.length} localized pages.`);
