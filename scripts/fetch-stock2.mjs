import fs from 'fs';
import sharp from 'sharp';

const themes = {
  'hero':        'physiotherapy-treatment',
  'manual':      'manual-therapy',
  'movement':    'rehabilitation-exercise',
  'sport':       'sports-physiotherapy',
  'senior':      'senior-exercise',
  'pediatric':   'baby-hands',
  'training':    'physiotherapy',
  'room':        'clinic-interior',
  'running':     'trail-running-morning',
  'hands':       'massage-therapy',
};

fs.mkdirSync('docs/stock', { recursive: true });
const picks = [];

for (const [slug, term] of Object.entries(themes)) {
  try {
    const url = `https://unsplash.com/s/photos/${term}`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36' } });
    if (!res.ok) { console.log(slug, 'HTML HTTP', res.status); continue; }
    const html = await res.text();
    // extract unique photo IDs from images.unsplash.com/photo-<id>
    const ids = [...new Set([...html.matchAll(/images\.unsplash\.com\/photo-([0-9a-f]{13}-[0-9a-f]{12})/g)].map(m => m[1]))];
    let n = 0;
    for (const id of ids.slice(0, 5)) {
      const dl = `https://images.unsplash.com/photo-${id}?w=1700&q=80&fm=jpg&fit=crop`;
      try {
        const ir = await fetch(dl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!ir.ok) { continue; }
        const buf = Buffer.from(await ir.arrayBuffer());
        if (buf.length < 8000) continue;
        const file = `docs/stock/${slug}-${n}.jpg`;
        await sharp(buf).resize(1700, 1133, { fit: 'cover' }).jpeg({ quality: 82 }).toFile(file);
        picks.push({ slug, n, file, id });
        console.log(slug, n, id);
        n++;
      } catch(e) {}
    }
    if (n === 0) console.log(slug, 'no images, ids found:', ids.length);
  } catch(e) { console.log(slug, 'ERR', e.message.split('\n')[0]); }
}
fs.writeFileSync('docs/stock/picks.json', JSON.stringify(picks, null, 2));
console.log('\nDONE stock:', picks.length);
