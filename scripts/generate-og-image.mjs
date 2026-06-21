import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const outPath = join(publicDir, 'og-image.jpg');
const profilePath = join(publicDir, 'mikolaj-profile.jpg');

const WIDTH = 1200;
const HEIGHT = 630;
const PROFILE_SIZE = 300;
const PROFILE_X = 810;
const PROFILE_Y = 165;
const PROFILE_CENTER = PROFILE_SIZE / 2;

const circleMask = Buffer.from(
  `<svg width="${PROFILE_SIZE}" height="${PROFILE_SIZE}">
    <circle cx="${PROFILE_CENTER}" cy="${PROFILE_CENTER}" r="${PROFILE_CENTER}" fill="white"/>
  </svg>`,
);

const profileCircle = await sharp(profilePath)
  .resize(PROFILE_SIZE, PROFILE_SIZE, { fit: 'cover', position: 'centre' })
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

const layoutSvg = Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1917"/>
      <stop offset="100%" stop-color="#121212"/>
    </linearGradient>
    <radialGradient id="glow" cx="82%" cy="48%" r="42%">
      <stop offset="0%" stop-color="#292524" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#1c1917" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <text x="72" y="132" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-style="italic" fill="#fafaf9">Mikołaj Piech</text>
  <text x="72" y="248" font-family="Georgia, 'Times New Roman', serif" font-size="92" font-weight="300" fill="#fafaf9">I build apps</text>
  <text x="72" y="342" font-family="Georgia, 'Times New Roman', serif" font-size="92" font-weight="300" font-style="italic" fill="#a8a29e">and ship them.</text>
  <text x="72" y="412" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="300" fill="#78716c">Founder &amp; Developer</text>

  <rect x="72" y="456" width="292" height="64" rx="32" fill="#fafaf9"/>
  <text x="218" y="497" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="#121212" text-anchor="middle">Get in touch →</text>

  <circle cx="${PROFILE_X + PROFILE_CENTER}" cy="${PROFILE_Y + PROFILE_CENTER}" r="${PROFILE_CENTER + 18}" fill="none" stroke="#292524" stroke-width="2"/>
  <circle cx="${PROFILE_X + PROFILE_CENTER}" cy="${PROFILE_Y + PROFILE_CENTER}" r="${PROFILE_CENTER + 10}" fill="none" stroke="#44403c" stroke-width="2"/>
</svg>`);

await sharp(layoutSvg)
  .resize(WIDTH, HEIGHT)
  .composite([{ input: profileCircle, left: PROFILE_X, top: PROFILE_Y }])
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(outPath);

const { width, height } = await sharp(outPath).metadata();
console.log(`Generated ${outPath} (${width}×${height})`);
