import { chromium } from 'playwright';
import fs from 'fs';

const base = 'https://sites.google.com/hahn-physiotherapie.com/hahn-physiotherapie';
const targets = [
  [base + '/startseite', 'home'],
  [base + '/mitarbeiter/püttlingen', 'team-puettlingen'],
  [base + '/mitarbeiter/elversberg', 'team-elversberg'],
  [base + '/leistungen/therapie-ab-der-geburt', 'paediatrie'],
  [base + '/leistungen/neurologischer-bereich', 'neuro'],
  [base + '/leistungen/sportphysio-und-nachwuchs', 'sport'],
  [base + '/standorte', 'standorte'],
  [base + '/leistungen/unser-konzept', 'konzept'],
];

fs.mkdirSync('docs/img-shot', { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 4 });
const page = await ctx.newPage();
const index = [];

for (const [url, name] of targets) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 35000 });
    await page.waitForTimeout(1500);
    await page.evaluate(async () => {
      await new Promise((res) => { let y=0; const s=()=>{window.scrollBy(0,700);y+=700;if(y<document.body.scrollHeight)setTimeout(s,100);else res();}; s(); });
    });
    await page.waitForTimeout(800);
    const imgs = await page.$$('img');
    let n = 0;
    for (const img of imgs) {
      const info = await img.evaluate((el) => ({ w: el.naturalWidth, h: el.naturalHeight, alt: el.alt, dw: el.clientWidth, dh: el.clientHeight }));
      if (info.dw < 60 || info.dh < 40) continue; // skip tiny icons
      const file = `docs/img-shot/${name}-${String(n).padStart(2,'0')}.png`;
      try {
        await img.screenshot({ path: file });
        index.push({ page: name, file, ...info });
        n++;
      } catch(e) {}
    }
    console.log('OK', name, n, 'imgs');
  } catch(e) { console.log('SKIP', name, e.message.split('\n')[0]); }
}
fs.writeFileSync('docs/img-shot/index.json', JSON.stringify(index, null, 2));
await browser.close();
console.log('\nDONE -', index.length, 'images captured');
