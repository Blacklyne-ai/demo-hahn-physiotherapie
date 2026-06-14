import { chromium } from 'playwright';
const BASE = 'http://localhost:4358';
const paths = ['/', '/leistungen', '/leistungen/sportphysiotherapie-nachwuchs', '/konzept', '/standorte', '/team', '/kontakt', '/impressum', '/datenschutz', '/404'];
const browser = await chromium.launch();
for (const w of [375, 768]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
  const page = await ctx.newPage();
  console.log(`\n=== width ${w} ===`);
  for (const p of paths) {
    await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 30000 });
    const r = await page.evaluate(() => {
      const sw = document.documentElement.scrollWidth, iw = window.innerWidth;
      const offenders = [];
      if (sw > iw + 1) {
        document.querySelectorAll('*').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > iw + 1 && r.width > 30 && el.offsetParent !== null) {
            offenders.push((el.tagName + '.' + (el.className?.toString().slice(0,30) || '')).slice(0,42) + ' →' + Math.round(r.right));
          }
        });
      }
      const h1 = document.querySelector('h1,h2');
      return { sw, iw, font: getComputedStyle(h1).fontFamily.split(',')[0], body: getComputedStyle(document.body).fontFamily.split(',')[0], offenders: [...new Set(offenders)].slice(0,4) };
    });
    const flag = r.sw > r.iw + 1 ? `OVERFLOW ${r.sw}>${r.iw} ${JSON.stringify(r.offenders)}` : 'ok';
    console.log(`${p.padEnd(46)} ${flag}`);
  }
  await ctx.close();
}
// font check once
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const fonts = await page.evaluate(() => ({ h1: getComputedStyle(document.querySelector('h1')).fontFamily, body: getComputedStyle(document.body).fontFamily }));
console.log('\nFONTS h1:', fonts.h1, '| body:', fonts.body);
await browser.close();
