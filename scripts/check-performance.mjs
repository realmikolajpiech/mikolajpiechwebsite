import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const read = (path) => readFile(resolve(dist, path), 'utf8');

// Suspended server renders would discard the prerendered page during hydration.
for (const file of await readdir(dist, { recursive: true })) {
  if (!file.endsWith('.html')) continue;
  const html = await read(file);
  assert.ok(!html.includes('<!--$!-->'), `${file}: no failed Suspense boundary`);
  assert.ok(!html.includes('fonts.googleapis.com'), `${file}: no blocking Google Fonts stylesheet`);
}

for (const file of ['index.html', 'pl.html']) {
  const html = await read(file);
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(([, src]) => src);
  const preloads = [...html.matchAll(/<link rel="modulepreload"[^>]*href="([^"]+)"/g)].map(([, src]) => src);
  const initialJs = [...new Set([...scripts, ...preloads])];
  assert.ok(initialJs.length > 0, `${file}: client entry exists`);
  let bytes = 0;
  for (const src of initialJs) {
    assert.ok(src.startsWith('/assets/'), `${file}: local initial JavaScript`);
    bytes += gzipSync(await read(src.slice(1))).length;
  }
  assert.ok(bytes < 130 * 1024, `${file}: initial JS budget exceeded (${bytes} bytes gzip)`);

  const fontPreloads = [...html.matchAll(/<link rel="preload"[^>]*href="([^"]+)"[^>]*as="font"/g)];
  assert.equal(fontPreloads.length, 2, `${file}: preload the main text and heading fonts`);
  for (const [, src] of fontPreloads) {
    assert.ok(src.startsWith('/assets/') && src.endsWith('.woff2'), `${file}: bundled WOFF2 font`);
    assert.ok((await readFile(resolve(dist, src.slice(1)))).length > 0, src);
  }
  console.log(`${file}: ${(bytes / 1024).toFixed(1)} KiB initial JavaScript gzip; local font preloads verified.`);
}

const manifest = JSON.parse(await readFile(resolve(root, 'data/image-manifest.json'), 'utf8'));
for (const [source, image] of Object.entries(manifest)) {
  if (image.width < 320 || /(?:logo|icon)\./.test(source)) continue;
  for (const width of [160, 240, 320]) {
    assert.ok(image.srcSet.includes(` ${width}w`), `${source}: ${width}px preview variant`);
  }
}
console.log('Performance checks passed: static rendering, initial JS budget, fonts, and small image variants.');
