import fs from 'fs';
import sharp from 'sharp';

// Unsplash public (napi) search — no key, same endpoint the website uses.
// Calm, warm, human physiotherapy/movement imagery. We download generously,
// then pick the best by eye. License: Unsplash (free, commercial OK).
const queries = {
  'hero-care':       'physiotherapy treatment hands back',
  'manual-therapy':  'physiotherapist manual therapy shoulder',
  'movement':        'physiotherapy exercise rehabilitation patient',
  'sport-rehab':     'athlete physiotherapy knee sports',
  'senior':          'senior physiotherapy walking balance',
  'pediatric':       'mother baby infant hands care',
  'training':        'physiotherapy gym training resistance',
  'calm-room':       'bright physiotherapy treatment room interior',
  'running':         'runner trail morning light warm',
  'hands-detail':    'hands therapy massage close',
};

fs.mkdirSync('docs/stock', { recursive: true });
const picks = [];

for (const [slug, q] of Object.entries(queries)) {
  try {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=8&orientation=landscape`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' } });
    if (!res.ok) { console.log(slug, 'search HTTP', res.status); continue; }
    const json = await res.json();
    const results = (json.results || []).slice(0, 4);
    let n = 0;
    for (const r of results) {
      const raw = r.urls?.raw;
      if (!raw) continue;
      const dl = raw + '&w=1700&q=80&fm=jpg&fit=crop';
      try {
        const ir = await fetch(dl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!ir.ok) continue;
        const buf = Buffer.from(await ir.arrayBuffer());
        const file = `docs/stock/${slug}-${n}.jpg`;
        await sharp(buf).resize(1700, 1133, { fit: 'cover' }).jpeg({ quality: 82 }).toFile(file);
        picks.push({ slug, n, file, id: r.id, desc: r.alt_description || r.description || '', by: r.user?.name, link: r.links?.html });
        console.log(slug, n, '-', (r.alt_description||'').slice(0,60));
        n++;
      } catch(e) {}
    }
  } catch(e) { console.log(slug, 'ERR', e.message.split('\n')[0]); }
}
fs.writeFileSync('docs/stock/picks.json', JSON.stringify(picks, null, 2));
console.log('\nDONE stock:', picks.length);
