// Harvest + optimise the real W.E.T. plant/reference/team photos from the live
// site into /public/images as webp. Run from project root: node scripts/fetch-photos.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const B = 'https://www.wet-gmbh.com';
// [path, outName, width, mode]  mode: 'cover16x9' | 'inside' | 'og'
const JOBS = [
  // ── Engineering / hero ──
  ['/fileadmin/_processed_/2/8/csm_053_7ms8778.2_cfb4746f4f.png', 'uf-freibad', 1800, 'inside'],
  ['/fileadmin/_processed_/1/5/csm_202l7188_klein_d1b5ee6f7d.jpg', 'uf-anlage', 1800, 'inside'],
  ['/fileadmin/_processed_/d/8/csm_wet-montage-03_d3663a8176.jpg', 'montage', 1200, 'inside'],
  ['/fileadmin/_processed_/7/3/csm_modulanschluesse_b312023436.jpg', 'modulanschluesse', 1200, 'inside'],
  ['/fileadmin/_processed_/b/c/csm_202l7000__klein_04567b2fb4.jpg', 'plant-halle', 1400, 'inside'],
  // ── Kompetenzen ──
  ['/fileadmin/_processed_/4/9/csm_wp_20181017_12_34_09_pro_8008914a11.jpg', 'trinkwasser', 1200, 'inside'],
  ['/fileadmin/_processed_/6/6/csm_verfahren_enteisenung_c828df40d9.jpg', 'enteisenung', 1100, 'inside'],
  ['/fileadmin/_processed_/e/0/csm_202l6815_klein_fba12958e9.jpg', 'badewasser', 1200, 'inside'],
  ['/fileadmin/_processed_/b/4/csm_therme_-_bad-aibling_690d61ba6e.jpg', 'therme-aibling', 1100, 'inside'],
  ['/fileadmin/_processed_/9/2/csm_therapiebecken_e3378bddbd.jpg', 'therapiebecken', 1000, 'inside'],
  ['/fileadmin/_processed_/c/0/csm_hotels_01_0d98a3c802.jpg', 'hotels', 1000, 'inside'],
  ['/fileadmin/_processed_/3/2/csm_wetrecycle-title_1cc35fe9ef.jpg', 'wasserrecycling', 1200, 'inside'],
  // ── Service ──
  ['/fileadmin/_processed_/e/d/csm_202l6794_klein_4e2d0db413.jpg', 'service-1', 1200, 'inside'],
  ['/fileadmin/_processed_/b/1/csm_202l6860_klein_4d754488ff.jpg', 'service-2', 1100, 'inside'],
  // ── Referenzen ──
  ['/fileadmin/_processed_/7/8/csm_hero-kulmbach_7a6c32da54.png', 'ref-kulmbach', 1500, 'inside'],
  ['/fileadmin/_processed_/d/8/csm_brendlorenzen_33c1666383.jpg', 'ref-brendlorenzen', 1300, 'inside'],
  ['/fileadmin/_processed_/8/6/csm_p1060892-bearbeitet_7fa762487e.jpg', 'brendlorenzen-oxidator', 1100, 'inside'],
  ['/fileadmin/_processed_/f/5/csm_p1060861-bearbeitet_1fc26b82d0.jpg', 'brendlorenzen-uv', 1100, 'inside'],
  // ── Sonderprojekte ──
  ['/fileadmin/_processed_/a/3/csm_pinguinbecken-luebbenau_c59d69e25c.jpg', 'spreewelten', 1100, 'inside'],
  ['/fileadmin/_processed_/e/a/csm_0015342_0fafa0f5b0.jpg', 'zoo-zuerich', 1100, 'inside'],
  ['/fileadmin/_processed_/3/e/csm_130607_sondereinsatz__16__046b3428bf.jpg', 'zoo-kopenhagen', 1100, 'inside'],
  // ── Heritage ──
  ['/fileadmin/_processed_/d/c/csm_img_20220221_094222_819db3475e.jpg', 'neubau-2022', 1200, 'inside'],
  ['/fileadmin/_processed_/d/2/csm_img_0294_09110c2d89.jpg', 'einweihung-2003', 1000, 'inside'],
  ['/fileadmin/_processed_/6/1/csm_wet-messe-berlin-2003_c3ac6f6451.jpg', 'messe-2003', 1000, 'inside'],
  ['/fileadmin/_processed_/7/9/csm_p1010036_7704395629.jpg', 'einbau-2003', 1000, 'inside'],
  // ── Team ──
  ['/fileadmin/_processed_/5/1/csm_michael-otte-2_ea79f22bdf.jpg', 'otte', 560, 'inside'],
  ['/fileadmin/_processed_/7/5/csm_matthias-sesselmann_7b94fc5491.jpg', 'sesselmann', 560, 'inside'],
  // ── Diagramme (transparent PNG -> keep alpha) ──
  ['/fileadmin/_processed_/7/a/csm_erklaerung_umkehrosmose_-_d_zeichenflaeche_1_fdc2ba643d.png', 'diag-umkehrosmose', 1100, 'alpha'],
  ['/fileadmin/_processed_/9/0/csm_filtration_zeichenflaeche_1_9af07a10a2.png', 'diag-filtration', 1100, 'alpha'],
  ['/fileadmin/_processed_/e/1/csm_groessenvergleich_wasserkeime_-_d_zeichenflaeche_1_zeichenflaeche_1_26aa0b1fc0.png', 'diag-keime', 1100, 'alpha'],
];

async function get(url) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 30000);
  try {
    const r = await fetch(url, { signal: ac.signal, headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return Buffer.from(await r.arrayBuffer());
  } finally { clearTimeout(t); }
}

let ok = 0, fail = 0;
for (const [path, name, w, mode] of JOBS) {
  try {
    const buf = await get(B + path);
    let img = sharp(buf).resize({ width: w, withoutEnlargement: true });
    if (mode === 'alpha') {
      await img.webp({ quality: 86, alphaQuality: 100 }).toFile(`public/images/${name}.webp`);
    } else {
      await img.webp({ quality: 80 }).toFile(`public/images/${name}.webp`);
    }
    console.log('OK  ', name, `(${(buf.length / 1024).toFixed(0)}kb src)`);
    ok++;
  } catch (e) { console.log('FAIL', name, e.message); fail++; }
}

// OG image (1200x630) from the best engineering shot
try {
  const buf = await get(B + '/fileadmin/_processed_/1/5/csm_202l7188_klein_d1b5ee6f7d.jpg');
  await sharp(buf).resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82 }).toFile('public/images/og-image.jpg');
  console.log('OK   og-image.jpg');
} catch (e) { console.log('FAIL og-image', e.message); }

// Favicons from the brand favicon source
try {
  await sharp('public/favicon-src-192.png').resize(96, 96).png().toFile('public/favicon.png');
  await sharp('public/favicon-src-192.png').resize(180, 180).png().toFile('public/apple-touch-icon.png');
  console.log('OK   favicon.png + apple-touch-icon.png');
} catch (e) { console.log('FAIL favicon', e.message); }

console.log(`\nDONE  ${ok} ok, ${fail} failed`);
