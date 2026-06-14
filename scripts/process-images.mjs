import sharp from 'sharp';
import fs from 'fs';
fs.mkdirSync('public/images', { recursive: true });

const S = 'docs/stock/full';
// [source, outBase, width, height, quality]
const jobs = [
  [`${S}/6974982.jpg`, 'hero',            1500, 1250, 80],
  [`${S}/6974982.jpg`, 'hero-sm',          900,  750, 78],
  [`${S}/7339492.jpg`, 'konzept',         1200,  900, 80],
  [`${S}/6671021.jpg`, 'svc-paediatrie',  1200,  900, 80],
  [`${S}/20860621.jpg`,'svc-sport',       1200,  900, 80],
  [`${S}/3791607.jpg`, 'svc-schmerz',     1200,  900, 80],
  [`${S}/6815692.jpg`, 'svc-neuro',       1200,  900, 80],
  [`${S}/6870414.jpg`, 'svc-prevention',  1200,  900, 80],
  [`${S}/20860607.jpg`,'svc-nachop',      1200,  900, 80],
];

for (const [src, name, w, h, q] of jobs) {
  await sharp(src).resize(w, h, { fit: 'cover', position: 'attention' }).webp({ quality: q }).toFile(`public/images/${name}.webp`);
  console.log('img', name, `${w}x${h}`);
}

// Carsten portrait (his real photo) -> 4:5
await sharp('docs/img-shot/home-01.png').resize(780, 975, { fit: 'cover', position: 'top' }).webp({ quality: 84 }).toFile('public/images/carsten-hahn.webp');
console.log('img carsten-hahn');

// OG image 1200x630 from hero
await sharp(`${S}/6974982.jpg`).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82 }).toFile('public/images/og-image.jpg');
console.log('img og-image');

// ---- Favicon / touch icon from logo mark (crop left icon from trimmed logo) ----
const logo = await sharp('public/logo-onwhite.png').metadata();
// icon (figure+cross) is the left ~16.5% of the lockup
const iconW = Math.round(logo.width * 0.165);
const icon = await sharp('public/logo-onwhite.png')
  .extract({ left: 0, top: 0, width: iconW, height: logo.height })
  .trim({ threshold: 10 }).toBuffer();

// favicon: icon centered on transparent, square, padded
async function iconOn(bg, size, pad, out, fmt='png') {
  const inner = size - pad * 2;
  const fg = await sharp(icon).resize(inner, inner, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } }).toBuffer();
  let base = sharp({ create: { width: size, height: size, channels: 4, background: bg } });
  base = base.composite([{ input: fg, gravity: 'center' }]);
  if (fmt === 'png') await base.png().toFile(out); else await base.jpeg({ quality: 90 }).toFile(out);
}
await iconOn({ r:0,g:0,b:0,alpha:0 }, 256, 16, 'public/favicon.png');
await iconOn({ r:250,g:247,b:242,alpha:1 }, 180, 22, 'public/apple-touch-icon.png');
console.log('favicon + apple-touch done');

console.log('\nALL IMAGES DONE');
