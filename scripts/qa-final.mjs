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
    await p.evaluate(async () => { document.querySelectorAll('img').forEach(i => i.loading = 'eager'); const c = document.getElementById('cookie-banner'); if (c) c.remove(); const f = document.getElementById('floating-cta'); if (f) f.remove(); await new Promise(r => { let y = 0; const s = () => { scrollBy(0, 500); y += 500; if (y < document.body.scrollHeight) setTimeout(s, 45); else r(); }; s(); }); document.querySelectorAll('.fade-in').forEach(e => e.classList.add('is-visible')); window.scrollTo(0, 0); });
    await p.waitForLoadState('networkidle'); await p.waitForTimeout(600);
    await p.screenshot({ path: `docs/final/${tag}-${name}.png`, fullPage: true });
    console.log(tag, name);
  }
  await ctx.close();
}
await shoot(1440, 'd', [['/', 'home'], ['/leistungen', 'leistungen'], ['/leistungen/neurologischer-bereich', 'svc-neuro'], ['/konzept', 'konzept'], ['/standorte', 'standorte'], ['/kontakt', 'kontakt'], ['/karriere', 'karriere']]);
await shoot(390, 'm', [['/', 'home'], ['/karriere', 'karriere']]);
await b.close();
console.log('done');
