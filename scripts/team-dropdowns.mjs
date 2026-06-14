import { chromium } from 'playwright';
import fs from 'fs';

const base = 'https://sites.google.com/hahn-physiotherapie.com/hahn-physiotherapie';
const pages = [
  [base + '/mitarbeiter/püttlingen', 'puettlingen',
    ['Carsten Hahn', 'Franziska Strauß', 'Michaela Müller', 'Gertrud Speicher', 'Vera Haupt', 'Tarek Hijazi', 'Julia Kurz', 'Silke Schattle', 'Anke Glocker-Spaniol', 'Jennifer Lang']],
  [base + '/mitarbeiter/elversberg', 'elversberg',
    ['Carsten Hahn', 'Joel Lezius', 'Karin Bähr', 'Sylke Lotz', 'Melanie', 'Tarek Hijazi', 'Rohtraut Weisgerber', 'Kerstin Gottesleben', 'Christel Holzer', 'Jennifer Lang']],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1300 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const out = {};

for (const [url, loc, roster] of pages) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 35000 });
  await page.waitForTimeout(1200);
  await page.evaluate(async () => { await new Promise((r) => { let y=0; const s=()=>{scrollBy(0,700);y+=700;if(y<document.body.scrollHeight)setTimeout(s,90);else r();}; s(); }); window.scrollTo(0,0); });
  await page.waitForTimeout(600);

  // expand all collapsibles
  const toggles = await page.$$('[aria-expanded="false"]');
  for (const t of toggles) { try { await t.click({ timeout: 1500 }); await page.waitForTimeout(120); } catch(e) {} }
  await page.waitForTimeout(600);

  // capture FULL textContent (incl. now-expanded) and try to associate text after each name
  const data = await page.evaluate((roster) => {
    const bodyText = document.body.innerText;
    // also collect, per name, the text of the element right after the name within its card
    const res = { bodyText, perName: {} };
    for (const el of document.querySelectorAll('body *')) {
      if (el.children.length > 0) continue;
      const t = (el.innerText || '').trim();
      for (const name of roster) {
        if (t === name || t === name + ' (B.Sc.)') {
          // walk up to a card container, then grab all its text
          let c = el;
          for (let k = 0; k < 5 && c.parentElement; k++) c = c.parentElement;
          const full = (c.innerText || '').replace(/\s+/g, ' ').trim();
          if (!res.perName[name] || full.length > res.perName[name].length) res.perName[name] = full;
        }
      }
    }
    return res;
  }, roster);

  out[loc] = data.perName;
  fs.writeFileSync(`docs/team-photos/dropdown-${loc}.txt`, data.bodyText);
  await page.screenshot({ path: `docs/team-photos/_expanded-${loc}.png`, fullPage: true });
  console.log('=== ' + loc + ' ===');
  for (const n of roster) console.log(n, '::', (data.perName[n] || '(none)').slice(0, 110));
}

fs.writeFileSync('docs/team-photos/dropdowns.json', JSON.stringify(out, null, 2));
await browser.close();
console.log('\nDONE');
