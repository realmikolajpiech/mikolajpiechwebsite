// Generates public/og-image.jpg (1200×630) with the site's own fonts.
// SVG renderers cannot load the bundled WOFF2 fonts, so the card is drawn in a
// browser canvas (scripts/og-image.html) and posted back here to be saved.
// Usage: npm run og:generate, then open the printed address in any browser.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const outPath = resolve(root, 'public/og-image.jpg');
const port = Number(process.env.PORT ?? 4180);

const files = {
  '/': ['scripts/og-image.html', 'text/html; charset=utf-8'],
  '/portrait': ['public/mikolaj-profile.jpg', 'image/jpeg'],
  '/solvee-icon': ['assets/solvee-logo.png', 'image/png'],
  '/fonts/instrument-serif-normal.woff2': ['assets/fonts/instrument-serif-normal.woff2', 'font/woff2'],
  '/fonts/instrument-serif-italic.woff2': ['assets/fonts/instrument-serif-italic.woff2', 'font/woff2'],
  '/fonts/manrope-latin.woff2': ['assets/fonts/manrope-latin.woff2', 'font/woff2'],
  '/fonts/manrope-latin-ext.woff2': ['assets/fonts/manrope-latin-ext.woff2', 'font/woff2'],
};

const server = createServer(async (request, response) => {
  if (request.method === 'POST' && request.url === '/save') {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const dataUrl = Buffer.concat(chunks).toString('utf8');
    const png = Buffer.from(dataUrl.replace(/^data:image\/png;base64,/, ''), 'base64');
    await sharp(png).jpeg({ quality: 90, mozjpeg: true }).toFile(outPath);
    const { width, height } = await sharp(outPath).metadata();
    response.writeHead(200).end('ok');
    console.log(`Generated ${outPath} (${width}×${height})`);
    server.close();
    return;
  }
  const file = files[request.url];
  if (!file) return response.writeHead(404).end();
  response.writeHead(200, { 'content-type': file[1] }).end(await readFile(resolve(root, file[0])));
});

server.listen(port, '127.0.0.1', () => console.log(`Open http://127.0.0.1:${port}/ in a browser to render the OG image.`));
