import { chromium } from 'playwright';
import fs from 'fs';
const BASE = 'http://localhost:4359';
fs.mkdirSync('docs/final', { recursive: true });
const b = await chromium.launch();
async function shoot(w, tag, list) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage();
  for (const [path, name] of list) {
    await p.goto(BASE + path, { waitUntil: 'networkidle' });
    await p.evaluate(() => { document.querySelectorAll('img').forEach(i => i.loading = 'eager'); const c = document.getElementById('cookie-banner'); if (c) c.remove(); const f = document.getElementById('floating-cta'); if (f) f.remove(); document.querySelectorAll('.fade-in').forEach(e => e.classList.add('is-visible')); });
    await p.evaluate(async () => { await new Promise(r => { let y = 0; const s = () => { scrollBy(0, 500); y += 500; if (y < document.body.scrollHeight) setTimeout(s, 60); else r(); }; s(); }); window.scrollTo(0, 0); });
    await p.waitForLoadState('networkidle'); await p.waitForTimeout(700);
    await p.screenshot({ path: `docs/final/${tag}-${name}.png`, fullPage: true });
    console.log(tag, name);
  }
  await ctx.close();
}
await shoot(1440, 'd', [['/', 'home'], ['/leistungen', 'leistungen'], ['/leistungen/chronischer-schmerz', 'svc-schmerz'], ['/konzept', 'konzept'], ['/standorte', 'standorte'], ['/team', 'team'], ['/kontakt', 'kontakt']]);
await shoot(390, 'm', [['/', 'home'], ['/leistungen', 'leistungen'], ['/standorte', 'standorte'], ['/kontakt', 'kontakt']]);
await b.close();
console.log('done');
