import { chromium } from 'playwright';
import fs from 'fs';

const base = 'https://sites.google.com/hahn-physiotherapie.com/hahn-physiotherapie';
const pages = [
  [base + '/mitarbeiter/püttlingen', 'puettlingen',
    ['Carsten Hahn', 'Franziska Strauß', 'Michaela Müller', 'Gertrud Speicher', 'Vera Haupt', 'Tarek Hijazi', 'Julia Kurz', 'Silke Schattle', 'Anke Glocker-Spaniol', 'Jennifer Lang']],
  [base + '/mitarbeiter/elversberg', 'elversberg',
    ['Carsten Hahn', 'Joel Lezius', 'Karin Bähr', 'Sylke Lotz', 'Melanie', 'Tarek Hijazi', 'Rohtraut Weisgerber', 'Kerstin Gottesleben', 'Christel Holzer', 'Jennifer Lang']],
];

fs.mkdirSync('docs/team-photos', { recursive: true });
const slug = (n) => n.toLowerCase().replace(/[äá]/g,'a').replace(/[öó]/g,'o').replace(/[üú]/g,'u').replace('ß','ss').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1300 }, deviceScaleFactor: 3 });
const page = await ctx.newPage();
const out = {};

for (const [url, loc, roster] of pages) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 35000 });
  await page.waitForTimeout(1200);
  await page.evaluate(async () => { await new Promise((r) => { let y=0; const s=()=>{scrollBy(0,700);y+=700;if(y<document.body.scrollHeight)setTimeout(s,90);else r();}; s(); }); window.scrollTo(0,0); });
  await page.waitForTimeout(700);

  const nameBoxes = await page.evaluate((roster) => {
    const res = [];
    for (const el of document.querySelectorAll('body *')) {
      if (el.children.length > 0) continue; // leaf text nodes only
      const t = (el.innerText || '').trim();
      if (!t || t.length > 30) continue;
      for (const name of roster) {
        if (t === name || t === name + ' (B.Sc.)' || t === name + ' (B.Sc)') {
          const r = el.getBoundingClientRect();
          if (r.width < 4 || r.height < 4) continue;
          res.push({ name, left: r.left, cy: r.top + r.height/2 });
        }
      }
    }
    return res;
  }, roster);

  const handles = await page.$$('img');
  const imgs = [];
  for (let i = 0; i < handles.length; i++) {
    const info = await handles[i].evaluate((el) => { const r = el.getBoundingClientRect(); return { w: el.naturalWidth, h: el.naturalHeight, left: r.left, right: r.right, cy: r.top + r.height/2, dw: r.width, dh: r.height }; });
    if (info.dw < 90 || info.dh < 90) continue;
    info.handle = handles[i]; imgs.push(info);
  }

  // candidate pairs (name to the RIGHT of image, vertically aligned)
  const pairs = [];
  imgs.forEach((img, ii) => nameBoxes.forEach((nb, ni) => {
    const dy = Math.abs(nb.cy - img.cy);
    const dx = nb.left - img.right;
    if (dy > img.dh * 0.55) return;       // vertically aligned with the photo
    if (dx < -img.dw * 0.3 || dx > 360) return; // name just to the right
    pairs.push({ ii, ni, d: Math.max(0, dx) + dy * 1.5 });
  }));
  pairs.sort((a, b) => a.d - b.d);
  const usedI = new Set(), usedN = new Set(), mapping = [];
  for (const p of pairs) {
    if (usedI.has(p.ii) || usedN.has(p.ni)) continue;
    usedI.add(p.ii); usedN.add(p.ni);
    mapping.push({ name: nameBoxes[p.ni].name, img: imgs[p.ii], nat: imgs[p.ii].w + 'x' + imgs[p.ii].h });
  }

  const result = [];
  for (const m of mapping) {
    const file = `docs/team-photos/${loc}-${slug(m.name)}.png`;
    try { await m.img.handle.screenshot({ path: file }); result.push({ name: m.name, file, nat: m.nat }); } catch(e) {}
  }
  out[loc] = result;
  const missing = roster.filter(n => !result.find(r => r.name === n));
  console.log(`${loc}: matched ${result.length}/${roster.length} | missing: ${missing.join(', ') || 'none'}`);
}

fs.writeFileSync('docs/team-photos/mapping.json', JSON.stringify(out, null, 2));
await browser.close();
console.log('DONE');
