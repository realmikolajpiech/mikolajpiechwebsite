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
const read = (file) => readFile(resolve(root, 'dist', file), 'utf8');
const schema = (html) => JSON.parse(html.match(/<script id="page-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

for (const [route, file, language] of pages) {
  const html = await read(file);
  assert.ok(html.includes(`<html lang="${language}">`), `${route}: HTML language`);
  assert.ok(html.includes(`<link rel="canonical" href="${base}${route}"`), `${route}: self canonical`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: single rendered H1`);
  assert.ok(html.includes('max-image-preview:large'), `${route}: image preview permission`);
  assert.ok(!html.includes('noindex'), `${route}: indexable`);
  assert.ok(!html.includes('<noscript>'), `${route}: one content representation`);
  assert.ok(!html.includes('opacity:0'), `${route}: initially visible content`);
  assert.ok(!html.includes('location.replace'), `${route}: no automatic language redirect`);
  const graph = schema(html)['@graph'];
  assert.equal(graph.find((item) => item['@type'] === 'WebPage').url, `${base}${route}`);
  assert.equal(graph.find((item) => item['@type'] === 'Person').alternateName, 'Mikolaj Piech');
  assert.ok(!graph.some((item) => item['@type'] === 'FAQPage'));
  if (route.endsWith('portfolio')) {
    const items = graph.find((item) => item['@type'] === 'ItemList').itemListElement;
    assert.equal(items.length, 8);
    assert.ok(items.some(({ item }) => item.name === 'Twoja Sieć'));
    assert.equal((html.match(/<details\b/g) ?? []).length, 8, `${route}: technology text exists without JS`);
    assert.ok(html.includes('Supabase PostgreSQL'));
  }
  if (route === '/' || route === '/pl') {
    const preloads = html.match(/<link rel="preload" as="image"[^>]*>/g) ?? [];
    assert.equal(preloads.length, 1, `${route}: only hero is preloaded`);
    assert.ok(preloads[0].includes('/mikolaj-profile.jpg'));
    assert.ok(html.includes('property="og:image" content="https://mikolajpiech.com/mikolaj-profile.jpg"'));
    assert.ok(html.includes('<fieldset disabled="">'), 'Form waits for hydration');
    assert.ok(html.includes('href="mailto:hello@mikolajpiech.com"'), 'Email fallback works without JS');
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
for (const file of ['404.html', 'pl/404.html']) {
  const html = await read(file);
  assert.ok(html.includes('noindex, follow'));
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!html.includes('hreflang='));
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
