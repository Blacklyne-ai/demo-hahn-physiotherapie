import sharp from 'sharp';
import fs from 'fs';
fs.mkdirSync('public/images', { recursive: true });

const SRC = 'docs/img-shot/home-00.png';

// 1) Trim white border, save white-bg logo
const trimmed = await sharp(SRC).trim({ threshold: 10 }).toBuffer();
const tmeta = await sharp(trimmed).metadata();
console.log('trimmed logo:', tmeta.width + 'x' + tmeta.height);

// 2) Chroma-key near-white -> transparent (logo art is blue+grey, bg is white)
const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const ch = info.channels;
for (let i = 0; i < data.length; i += ch) {
  const r = data[i], g = data[i+1], b = data[i+2];
  // distance from white
  const minc = Math.min(r,g,b);
  if (minc > 238) {
    // near-white -> fully transparent
    data[i+3] = 0;
  } else if (minc > 212) {
    // soft edge -> partial
    data[i+3] = Math.round(((238 - minc) / 26) * 255);
  }
}
await sharp(data, { raw: { width: info.width, height: info.height, channels: ch } })
  .png().toFile('public/logo.png');
console.log('wrote public/logo.png (transparent)');

// also keep a white-bg fallback (for chip use)
await sharp(trimmed).png().toFile('public/logo-onwhite.png');

// 3) Pixel histogram of the LOGO art (exclude white/near-white)
const hist = new Map();
for (let i = 0; i < data.length; i += ch) {
  const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
  if (a < 120) continue;
  if (Math.min(r,g,b) > 225) continue; // skip whites
  // quantize
  const q = (v) => (v >> 3) << 3;
  const hex = '#' + [q(r),q(g),q(b)].map(c=>c.toString(16).padStart(2,'0')).join('');
  hist.set(hex, (hist.get(hex)||0)+1);
}
const top = [...hist.entries()].sort((a,b)=>b[1]-a[1]).slice(0, 16);
console.log('\nTOP LOGO COLORS (quantized, white excluded):');
top.forEach(([h,n]) => console.log('  ', h, n));
