import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const base = 'https://mikolajpiech.com';
const preview = process.argv[2];
const pages = [
  ['/', 'index.html', 'en'], ['/pl', 'pl.html', 'pl'],
  ['/portfolio', 'portfolio.html', 'en'], ['/pl/portfolio', 'pl/portfolio.html', 'pl'],
  ['/privacy-policy', 'privacy-policy.html', 'en'], ['/pl/polityka-prywatnosci', 'pl/polityka-prywatnosci.html', 'pl'],
];
for (const language of ['en', 'pl']) {
  for (const id of ['solvee', 'jedziemy', 'twojasiec']) {
    const prefix = language === 'pl' ? '/pl' : '';
    pages.push([`${prefix}/projects/${id}`, `${prefix ? 'pl/' : ''}projects/${id}.html`, language]);
  }
}
const read = (file) => readFile(resolve(root, 'dist', file), 'utf8');
const schema = (html) => JSON.parse(html.match(/<script id="page-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

for (const [route, file, language] of pages) {
  const html = await read(file);
  assert.ok(new RegExp(`<html\\b[^>]*\\blang="${language}"`).test(html), `${route}: HTML language`);
  assert.ok(html.includes(`<link rel="canonical" href="${base}${route}"`), `${route}: self canonical`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: single rendered H1`);
  assert.ok(html.includes('max-image-preview:large'), `${route}: image preview permission`);
  assert.ok(!html.includes('noindex'), `${route}: indexable`);
  const noscriptBlocks = [...html.matchAll(/<noscript>([\s\S]*?)<\/noscript>/g)];
  assert.ok(noscriptBlocks.every(([, content]) => !content.replace(/<(?:link|img)\b[^>]*>/g, '').replace(/<style>[\s\S]*?<\/style>/g, '').trim()), `${route}: noscript contains only CSS and image fallbacks`);
  assert.ok(!/style="[^"]*opacity:\s*0(?:;|")/.test(html), `${route}: initially visible content`);
  assert.ok(!html.includes('location.replace'), `${route}: no automatic language redirect`);
  assert.ok(!html.includes('Charmy Books'), `${route}: hidden project stays out of rendered HTML`);
  const graph = schema(html)['@graph'];
  assert.equal(graph.find((item) => item['@type'] === 'WebPage').url, `${base}${route}`);
  const person = graph.find((item) => item['@type'] === 'Person');
  const clevrApps = graph.find((item) => item['@type'] === 'Organization' && item.name === 'Clevr Apps');
  assert.equal(person.alternateName, 'Mikolaj Piech');
  assert.equal(person.worksFor['@id'], 'https://clevrapps.com/#organization');
  assert.equal(clevrApps.founder['@id'], `${base}/#person`);
  assert.ok(!graph.some((item) => item['@type'] === 'FAQPage'));
  if (route.endsWith('portfolio')) {
    const items = graph.find((item) => item['@id'] === `${base}${route}#projects`).itemListElement;
    assert.equal(items.length, 8);
    const jedziemy = items.find(({ item }) => item.name === 'Jedziemy').item;
    assert.ok(!jedziemy.publisher, `${route}: Jedziemy is not a Clevr Apps product`);
    assert.deepEqual(jedziemy.author.map((author) => author.name).filter(Boolean), ['Marcel Chudyba']);
    assert.ok(!items.some(({ item }) => item.name === 'Charmy Books'));
    assert.ok(items.some(({ item }) => item.name === 'Twoja Sieć'));
    const safeLabs = items.find(({ item }) => item.name === 'Safe Labs').item;
    assert.deepEqual(safeLabs.author.map((author) => author.name).filter(Boolean), ['Oskar Minor', 'Kamil Zdebski']);
    const clevrProjects = items.filter(({ item }) => item.publisher?.['@id'] === 'https://clevrapps.com/#organization');
    assert.deepEqual(clevrProjects.map(({ item }) => item.name), ['Solvee', 'Trailo', 'Doso', 'Subby', 'Twoja Sieć']);
    assert.ok(clevrProjects.every(({ item }) => item.sameAs.some((url) => url.startsWith('https://clevrapps.com/'))));
    const stories = graph.find((item) => item['@id'] === `${base}${route}#stories`).itemListElement;
    const storyIds = route.endsWith('portfolio') ? ['jedziemy', 'solvee', 'subby', 'twojasiec'] : ['jedziemy', 'solvee', 'subby'];
    assert.equal(stories.length, storyIds.length, `${route}: ${storyIds.length} selected stories`);
    assert.ok(stories.every(({ item }) => item['@type'] === 'Article' && item.url.includes('/projects/')));
    assert.ok(!html.includes('class="product-actions"'), `${route}: not a download directory`);
    for (const id of storyIds) assert.ok(html.includes(`href="${language === 'pl' ? '/pl' : ''}/projects/${id}"`));

  }
  if (route.includes('/projects/')) {
    const article = graph.find(item => item['@type'] === 'Article');
    assert.equal(article.url, `${base}${route}`);
    assert.equal(article.author['@id'], `${base}/#person`);
    assert.ok(html.includes('class="story-body"'));
    const opposite = route.startsWith('/pl/') ? route.slice(3) : `/pl${route}`;
    assert.ok(html.includes(`href="${base}${opposite}"`), `${route}: translated story alternate`);
    if (route.endsWith('/solvee')) {
      assert.ok(html.includes(language === 'pl' ? 'Byłem uczniem' : 'I was a student'));
      assert.ok(html.includes('25,000') || html.includes('25 tys.'));
      assert.ok(!/<a[^>]*href="https:\/\/(?:apps\.apple\.com|play\.google\.com)/.test(html), `${route}: acquired app has no download offer`);
    }
  }
  if (route === '/' || route === '/pl') {
    const preloads = html.match(/<link rel="preload" as="image"[^>]*>/g) ?? [];
    assert.equal(preloads.length, 0, `${route}: inline portrait needs no image preload`);
    assert.equal((html.match(/<img\b[^>]*src="data:image\/webp;base64,/g) ?? []).length, 1, `${route}: one inline portrait`);
    assert.ok(html.includes('property="og:image" content="https://mikolajpiech.com/mikolaj-profile.jpg"'));
    assert.ok(html.includes('href="mailto:hello@mikolajpiech.com"'), 'Email works without JS');
    assert.ok(html.includes('href="https://clevrapps.com/"'), `${route}: studio link`);
    assert.ok(html.includes(language === 'pl' ? 'Projektuję i tworzę aplikacje' : 'I design and build apps'), `${route}: clear homepage intro`);
    assert.ok(/<fieldset\b[^>]*\bdisabled(?:="")?[\s>]/.test(html), 'Form waits for hydration');
    assert.ok(html.includes('id="about"'), `${route}: personal introduction`);
    assert.ok(!html.includes('id="services"'), `${route}: no homepage sales section`);
  }
  for (const [, source] of html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)) {
    if (source.startsWith('/')) assert.ok((await stat(resolve(root, `dist${source}`))).size > 0, source);
  }
  if (preview) {
    const response = await fetch(`${preview}${route}`);
    assert.equal(response.status, 200, `${route}: HTTP 200`);
    assert.equal(await response.text(), html, `${route}: correct document over HTTP`);
  }
}

const portfolioGraph = schema(await read('portfolio.html'));
assert.deepEqual(JSON.parse(await read('schema.json')), portfolioGraph, 'External and inline portfolio metadata agree');
for (const file of ['llms.txt', 'llms-full.txt']) {
  assert.ok(!(await read(file)).includes('Charmy Books'), `${file}: hidden project stays out of AI guides`);
}
for (const file of ['404.html', 'pl/404.html']) {
  const html = await read(file);
  assert.ok(html.includes('noindex, follow'));
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!/<link\b[^>]*\bhreflang=/.test(html));
  assert.ok(!html.includes('id="page-schema"'));
}
const config = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf8'));
assert.equal(config.cleanUrls, true);
assert.ok(!config.rewrites?.some(({ source }) => source === '/:path*'));
if (preview) {
  for (const route of ['/missing-seo-check', '/pl/missing-seo-check']) {
    const response = await fetch(`${preview}${route}`);
    assert.equal(response.status, 404, `${route}: real HTTP 404`);
    assert.ok((await response.text()).includes('noindex, follow'));
  }
  for (const route of ['/crawl/portfolio', '/crawl/portfolio.html']) {
    const response = await fetch(`${preview}${route}`, { redirect: 'manual' });
    assert.equal(response.status, 308);
    assert.equal(response.headers.get('location'), '/portfolio');
  }
}

console.log(`SEO checks passed for ${pages.length} indexable documents, two error documents, schema consistency, assets, and${preview ? ' HTTP routing.' : ' build configuration.'}`);
