import { chromium } from 'playwright';
import fs from 'fs';
import sharp from 'sharp';

const urls = fs.readFileSync('docs/image-urls.txt', 'utf8').split('\n').filter(Boolean);
fs.mkdirSync('docs/img-raw', { recursive: true });
const meta = [];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  extraHTTPHeaders: { Referer: 'https://sites.google.com/' },
});
const page = await ctx.newPage();

for (let i = 0; i < urls.length; i++) {
  const url = urls[i];
  const id = String(i).padStart(3, '0');
  try {
    const resp = await page.goto(url, { timeout: 30000, waitUntil: 'commit' });
    if (!resp || !resp.ok()) { console.log(id, 'HTTP', resp && resp.status()); continue; }
    const buf = await resp.body();
    try {
      const m = await sharp(buf).metadata();
      const ext = m.format === 'jpeg' ? 'jpg' : m.format;
      const out = `docs/img-raw/${id}.${ext}`;
      fs.writeFileSync(out, buf);
      meta.push({ id, file: out, w: m.width, h: m.height, fmt: m.format, kb: Math.round(buf.length/1024), ar: +(m.width/m.height).toFixed(2) });
      console.log(id, `${m.width}x${m.height}`, m.format, Math.round(buf.length/1024)+'kb', 'ar='+(m.width/m.height).toFixed(2));
    } catch(e) { console.log(id, 'not-image'); }
  } catch(e) { console.log(id, 'ERR', e.message.split('\n')[0]); }
}
fs.writeFileSync('docs/img-meta.json', JSON.stringify(meta, null, 2));
console.log('\nTOTAL images:', meta.length);
await browser.close();
