import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = resolve(ROOT, 'dist');
const SITE_URL = 'https://mikolajpiech.com';
const HOME_PROJECT_IDS = ['justmine', 'subby', 'trailo', 'solvee'];
const PORTFOLIO_PROJECT_IDS = ['justmine', 'safelabs', 'dragon', 'trailo', 'subby', 'doso', 'solvee'];

const [template, siteEnRaw, sitePlRaw] = await Promise.all([
  readFile(resolve(DIST, 'index.html'), 'utf8'),
  readFile(resolve(ROOT, 'content/site.json'), 'utf8'),
  readFile(resolve(ROOT, 'content/site.pl.json'), 'utf8'),
]);

const siteEn = JSON.parse(siteEnRaw);
const sitePl = JSON.parse(sitePlRaw);
const serverEntry = pathToFileURL(resolve(ROOT, 'dist-ssr/entry-server.js')).href;
const { render } = await import(serverEntry);

const routePairs = {
  home: { en: '/', pl: '/pl' },
  portfolio: { en: '/portfolio', pl: '/pl/portfolio' },
  privacy: { en: '/privacy-policy', pl: '/pl/polityka-prywatnosci' },
};

const routes = [
  { page: 'home', language: 'en', url: '/', output: 'index.html' },
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

function projectName(id) {
  if (id === 'justmine') return 'Charmy Books';
  if (id === 'safelabs') return 'Safe Labs';
  if (id === 'dragon') return 'UKS Dragon Mokrzyska';
  return id.charAt(0).toUpperCase() + id.slice(1);
}

function projectEntries(site, language, ids) {
  return ids.map((id, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': id === 'safelabs' || id === 'dragon' ? 'WebSite' : 'SoftwareApplication',
      name: projectName(id),
      description: site.projects[id].description,
      url: `${SITE_URL}${routePairs.portfolio[language]}#${id}`,
    },
  }));
}

function structuredData(page, language, site, canonical) {
  const inLanguage = language;
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Mikołaj Piech',
    url: SITE_URL,
    image: `${SITE_URL}/mikolaj-profile.jpg`,
    jobTitle: language === 'pl' ? 'Founder i Developer' : 'Founder & Developer',
    description: site.seo.person_description,
    sameAs: [
      'https://x.com/mikolajpiech',
      'https://www.linkedin.com/in/mikolajpiech/',
      'https://github.com/realmikolajpiech',
      'https://www.instagram.com/mikolajpiech',
    ],
  };
  const webPage = {
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: site.seo.pages[page].title,
    description: site.seo.pages[page].description,
    inLanguage,
    about: { '@id': `${SITE_URL}/#person` },
  };
  const graph = [webPage, person];

  if (page === 'home') {
    graph.unshift({
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.seo.site_name,
      description: site.seo.meta_description,
      inLanguage,
      publisher: { '@id': `${SITE_URL}/#person` },
    });
  }

  if (page === 'home' || page === 'portfolio') {
    const projectIds = page === 'home' ? HOME_PROJECT_IDS : PORTFOLIO_PROJECT_IDS;
    graph.push({
      '@type': 'ItemList',
      '@id': `${canonical}#projects`,
      name: language === 'pl' ? 'Projekty Mikołaja Piecha' : 'Projects by Mikołaj Piech',
      itemListElement: projectEntries(site, language, projectIds),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function noscriptContent(page, language, site) {
  const home = routePairs.home[language];
  const portfolio = routePairs.portfolio[language];
  const privacy = routePairs.privacy[language];
  const projects = page === 'home' ? HOME_PROJECT_IDS : PORTFOLIO_PROJECT_IDS;
  const nav = `<nav><a href="${home}">${language === 'pl' ? 'Strona główna' : 'Home'}</a> · <a href="${portfolio}">Portfolio</a> · <a href="${privacy}">${site.common.privacy_policy}</a></nav>`;
  let body = `<h1>${escapeHtml(site.seo.pages[page].title)}</h1><p>${escapeHtml(site.seo.pages[page].description)}</p>`;

  if (page === 'home') {
    body += `<h2>${escapeHtml(site.hero.headline_line1)} ${escapeHtml(site.hero.headline_line2)}</h2><p>${escapeHtml(site.hero.intro)}</p>${site.hero.description ? `<p>${escapeHtml(site.hero.description)}</p>` : ''}`;
  }
  if (page === 'home' || page === 'portfolio') {
    body += `<section><h2>${escapeHtml(site.projects.title)}</h2>${projects.map((id) => `<article><h3>${projectName(id)}</h3><p>${escapeHtml(site.projects[id].tagline)}</p><p>${escapeHtml(site.projects[id].description)}</p></article>`).join('')}</section>`;
  }
  body += `<footer><p>hello@mikolajpiech.com</p>${nav}</footer>`;
  return `<noscript><main>${nav}${body}</main></noscript>`;
}

function updateHead(html, route, site) {
  const meta = site.seo.pages[route.page];
  const socialDescription = meta.social_description ?? meta.description;
  const canonical = `${SITE_URL}${route.url}`;
  const alternates = routePairs[route.page];

  html = html.replace(/<html lang=["'][^"']+["']>/i, `<html lang="${route.language}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  html = replaceNamedMeta(html, 'name', 'description', meta.description);
  html = html.replace(/<link rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/\s*<link rel=["']alternate["'] hreflang=["'][^"']+["'][^>]*>/gi, '');
  const alternateTags = [
    `<link rel="alternate" hreflang="en" href="${SITE_URL}${alternates.en}" />`,
    `<link rel="alternate" hreflang="pl" href="${SITE_URL}${alternates.pl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${alternates.en}" />`,
  ].join('\n    ');
  html = html.replace(/(<link rel=["']canonical["'][^>]*>)/i, `$1\n    ${alternateTags}`);

  html = replaceNamedMeta(html, 'property', 'og:title', meta.title);
  html = replaceNamedMeta(html, 'property', 'og:description', socialDescription);
  html = replaceNamedMeta(html, 'property', 'og:url', canonical);
  html = replaceNamedMeta(html, 'property', 'og:locale', route.language === 'pl' ? 'pl_PL' : 'en_US');
  html = replaceNamedMeta(html, 'property', 'og:locale:alternate', route.language === 'pl' ? 'en_US' : 'pl_PL');
  html = replaceNamedMeta(html, 'name', 'twitter:title', meta.title);
  html = replaceNamedMeta(html, 'name', 'twitter:description', socialDescription);

  const schema = JSON.stringify(structuredData(route.page, route.language, site, canonical), null, 2).replaceAll('</script', '<\\/script');
  html = html.replace(
    /<!-- GENERATED:JSON-LD:START -->[\s\S]*?<!-- GENERATED:JSON-LD:END -->/,
    `<!-- GENERATED:JSON-LD:START -->\n    <script type="application/ld+json">\n${schema}\n    </script>\n    <!-- GENERATED:JSON-LD:END -->`,
  );
  return html;
}

for (const route of routes) {
  const site = route.language === 'pl' ? sitePl : siteEn;
  let html = updateHead(template, route, site);
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscriptContent(route.page, route.language, site));
  html = html.replace('<div id="root"></div>', `<div id="root">${render(route.url)}</div>`);
  const outputPath = resolve(DIST, route.output);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

console.log(`Prerendered ${routes.length} localized pages.`);
