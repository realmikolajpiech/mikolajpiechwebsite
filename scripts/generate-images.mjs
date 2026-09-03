import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const projectSource = await readFile(resolve(root, 'data/projects.ts'), 'utf8');
// Source paths stay in the manifest references so regeneration never uses a lossy derivative.
const paths = [...new Set(projectSource.match(/assets\/[\w/-]+\.(?:png|jpe?g|webp)/g))];
const manifest = {};
let originalBytes = 0;
let optimizedBytes = 0;

for (const path of paths) {
  const input = await readFile(resolve(root, path));
  const metadata = await sharp(input).metadata();
  const isIcon = /(?:logo|icon)\./.test(path);
  const maxWidth = isIcon ? 384 : 1280;
  const widths = [...new Set((isIcon ? [96, 192, 384] : [400, 800, 1280])
    .map((width) => Math.min(width, metadata.width, maxWidth)))];
  const variants = [];
  for (const width of widths) {
    const url = `/images/${path.slice(7, -extname(path).length)}-${width}.webp`;
    const output = resolve(root, `public${url}`);
    await mkdir(dirname(output), { recursive: true });
    const { data, info } = await sharp(input).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality: isIcon ? 90 : 84, effort: 6 }).toBuffer({ resolveWithObject: true });
    await writeFile(output, data);
    variants.push({ src: url, width: info.width, height: info.height, bytes: info.size });
  }
  const largest = variants.at(-1);
  manifest[path] = {
    src: largest.src, width: largest.width, height: largest.height,
    srcSet: variants.map(({ src, width }) => `${src} ${width}w`).join(', '),
  };
  originalBytes += input.length;
  optimizedBytes += largest.bytes;
}

await writeFile(resolve(root, 'data/image-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Optimized ${paths.length} images: ${(originalBytes / 1e6).toFixed(2)} MB → ${(optimizedBytes / 1e6).toFixed(2)} MB at largest sizes.`);
