import { chromium } from 'playwright';
import fs from 'fs';

const BASE = 'http://localhost:4358';
const pages = [
  ['/', 'home'],
  ['/leistungen', 'leistungen'],
  ['/leistungen/sportphysiotherapie-nachwuchs', 'svc-sport'],
  ['/leistungen/therapie-ab-der-geburt', 'svc-paed'],
  ['/konzept', 'konzept'],
  ['/standorte', 'standorte'],
  ['/team', 'team'],
  ['/kontakt', 'kontakt'],
  ['/impressum', 'impressum'],
];
fs.mkdirSync('docs/qa', { recursive: true });
const browser = await chromium.launch();

async function shoot(width, tag, list) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [path, name] of list) {
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 });
      // trigger fade-ins + dismiss banner
      await page.evaluate(async () => {
        try { localStorage.setItem('hahn-cookie-notice','ok'); } catch {}
        const b = document.getElementById('cookie-banner'); if (b) b.remove();
        await new Promise((res) => { let y=0; const s=()=>{window.scrollBy(0,600);y+=600;if(y<document.body.scrollHeight)setTimeout(s,40);else res();}; s(); });
        document.querySelectorAll('.fade-in').forEach(e=>e.classList.add('is-visible'));
        window.scrollTo(0,0);
      });
      await page.waitForTimeout(500);
      await page.screenshot({ path: `docs/qa/${tag}-${name}.png`, fullPage: true });
      console.log(tag, name, 'OK');
    } catch(e) { console.log(tag, name, 'ERR', e.message.split('\n')[0]); }
  }
  await ctx.close();
}

await shoot(1440, 'd', pages);
await shoot(390, 'm', [['/', 'home'], ['/leistungen', 'leistungen'], ['/konzept', 'konzept'], ['/team', 'team'], ['/kontakt', 'kontakt']]);
await browser.close();
console.log('QA shots done');
