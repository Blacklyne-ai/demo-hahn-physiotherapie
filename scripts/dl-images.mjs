import fs from 'fs';
import sharp from 'sharp';

const urls = fs.readFileSync('docs/image-urls.txt', 'utf8').split('\n').filter(Boolean);
fs.mkdirSync('docs/img-raw', { recursive: true });
const meta = [];

for (let i = 0; i < urls.length; i++) {
  const url = urls[i];
  const id = String(i).padStart(3, '0');
  const proxied = 'https://images.weserv.nl/?url=' + encodeURIComponent(url.replace(/^https?:\/\//, ''));
  try {
    const res = await fetch(proxied, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) { console.log(id, 'HTTP', res.status); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    const tmp = `docs/img-raw/${id}.bin`;
    fs.writeFileSync(tmp, buf);
    try {
      const m = await sharp(buf).metadata();
      const ext = m.format === 'jpeg' ? 'jpg' : m.format;
      const out = `docs/img-raw/${id}.${ext}`;
      fs.renameSync(tmp, out);
      meta.push({ id, file: out, w: m.width, h: m.height, fmt: m.format, kb: Math.round(buf.length/1024), ar: (m.width/m.height).toFixed(2) });
      console.log(id, `${m.width}x${m.height}`, m.format, Math.round(buf.length/1024)+'kb', 'ar='+(m.width/m.height).toFixed(2));
    } catch(e) {
      console.log(id, 'not-image', e.message.split('\n')[0]);
    }
  } catch(e) { console.log(id, 'ERR', e.message.split('\n')[0]); }
}
fs.writeFileSync('docs/img-meta.json', JSON.stringify(meta, null, 2));
console.log('\nTOTAL images:', meta.length);
