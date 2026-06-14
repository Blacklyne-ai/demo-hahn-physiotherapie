import { chromium } from 'playwright';
import fs from 'fs';
const base = 'https://sites.google.com/hahn-physiotherapie.com/hahn-physiotherapie';
const pages = [
  [base + '/mitarbeiter/püttlingen', 'puettlingen', ['Franziska Strauß','Michaela Müller','Gertrud Speicher','Vera Haupt','Tarek Hijazi','Julia Kurz','Silke Schattle','Anke Glocker-Spaniol','Jennifer Lang']],
  [base + '/mitarbeiter/elversberg', 'elversberg', ['Joel Lezius','Karin Bähr','Sylke Lotz','Melanie','Tarek Hijazi','Rohtraut Weisgerber','Kerstin Gottesleben','Christel Holzer','Jennifer Lang']],
];
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1300 } })).newPage();
for (const [url, loc, roster] of pages) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 35000 });
  await page.waitForTimeout(1500);
  // Expand every collapsible whose header contains a roster name, via the element that carries jsaction.
  const expanded = await page.evaluate(async (roster) => {
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    let count = 0;
    const leaves = [...document.querySelectorAll('body *')].filter(e => e.children.length === 0);
    for (const name of roster) {
      const el = leaves.find(e => (e.textContent||'').trim() === name);
      if (!el) continue;
      let c = el;
      for (let k = 0; k < 7 && c.parentElement; k++) {
        c = c.parentElement;
        if (c.hasAttribute('jsaction') || c.getAttribute('role') === 'button' || c.hasAttribute('aria-expanded')) {
          c.click(); count++; await sleep(80); break;
        }
      }
    }
    await sleep(400);
    return count;
  }, roster);
  await page.waitForTimeout(500);
  const text = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync(`docs/team-photos/expanded-${loc}.txt`, text);
  console.log(loc, '- toggled', expanded, '- url ok:', page.url().includes('mitarbeiter'));
}
await browser.close();
