import fs from 'fs';
import sharp from 'sharp';

const groups = {
  treatment: [20860622,20860588,20860621,20860596,20860585,20860610,20860607,20860603,20860595,20860609,4506073,8312858],
  handsexer: [5793917,5888074,8219160,13185359,6111589,6094334,6111588,6111610,30483062,30483060,7339492,7298657],
  seniorped: [6815692,6974982,8899512,8939956,7322452,6671008,6671037,6671021,6340550,5889984,3875103,6340571],
  movement:  [6870414,7901501,4051518,3791607,6193551,4498158,6443520,9004779,29807423,6094057,4378850,9623526],
};

fs.mkdirSync('docs/stock/full', { recursive: true });

async function dl(id) {
  const out = `docs/stock/full/${id}.jpg`;
  if (fs.existsSync(out)) return out;
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!r.ok) { console.log('  miss', id, r.status); return null; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 8000) return null;
  await sharp(buf).jpeg({ quality: 84 }).toFile(out);
  return out;
}

const TW = 360, TH = 240, COLS = 4, PAD = 6;
for (const [name, ids] of Object.entries(groups)) {
  const thumbs = [];
  for (const id of ids) {
    const f = await dl(id);
    if (!f) continue;
    const label = Buffer.from(
      `<svg width="${TW}" height="${TH}"><rect x="0" y="${TH-26}" width="${TW}" height="26" fill="black" opacity="0.65"/><text x="8" y="${TH-8}" font-family="monospace" font-size="18" fill="white">${id}</text></svg>`
    );
    const t = await sharp(f).resize(TW, TH, { fit: 'cover' })
      .composite([{ input: label }]).toBuffer();
    thumbs.push(t);
  }
  const rows = Math.ceil(thumbs.length / COLS);
  const W = COLS * TW + (COLS + 1) * PAD, H = rows * TH + (rows + 1) * PAD;
  const comp = thumbs.map((t, i) => ({
    input: t, top: PAD + Math.floor(i / COLS) * (TH + PAD), left: PAD + (i % COLS) * (TW + PAD),
  }));
  await sharp({ create: { width: W, height: H, channels: 3, background: '#ddd' } })
    .composite(comp).png().toFile(`docs/stock/sheet-${name}.png`);
  console.log('sheet', name, thumbs.length);
}
console.log('DONE');
