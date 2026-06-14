import { chromium } from 'playwright';
import fs from 'fs';

const base = 'https://sites.google.com/hahn-physiotherapie.com/hahn-physiotherapie';
const pages = [
  [base + '/startseite', 'home'],
  [base + '/leistungen', 'leistungen'],
  [base + '/leistungen/therapie-ab-der-geburt', 'therapie-geburt'],
  [base + '/leistungen/sportphysio-und-nachwuchs', 'sportphysio'],
  [base + '/leistungen/chronischer-schmerz', 'chronischer-schmerz'],
  [base + '/leistungen/neurologischer-bereich', 'neuro'],
  [base + '/leistungen/op-vermeidung', 'op-vermeidung'],
  [base + '/leistungen/die-zeit-nach-unfall-oder-operation', 'nach-op'],
  [base + '/leistungen/unser-konzept', 'konzept'],
  [base + '/standorte', 'standorte'],
  [base + '/mitarbeiter', 'mitarbeiter'],
  [base + '/mitarbeiter/püttlingen', 'team-puettlingen'],
  [base + '/mitarbeiter/elversberg', 'team-elversberg'],
  [base + '/kontakt', 'kontakt'],
  [base + '/kontakt/datenschutz', 'datenschutz'],
  [base + '/kontakt/impressum', 'impressum'],
  // Also try the bare base in case startseite differs
  [base, 'base'],
];

const imgUrls = new Set();

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  for (const [url, name] of pages) {
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 35000 });
      await page.waitForTimeout(1200);
      // scroll to bottom to trigger lazy images
      await page.evaluate(async () => {
        await new Promise((res) => {
          let y = 0; const step = () => {
            window.scrollBy(0, 800); y += 800;
            if (y < document.body.scrollHeight) setTimeout(step, 120); else res();
          }; step();
        });
      });
      await page.waitForTimeout(600);
      await page.screenshot({ path: 'docs/old-' + name + '.png', fullPage: true });
      const html = await page.content();
      fs.writeFileSync('docs/scrape-' + name + '.html', html);
      const text = await page.evaluate(() => document.body.innerText);
      fs.writeFileSync('docs/text-' + name + '.txt', text);
      // collect image urls
      const imgs = await page.evaluate(() =>
        Array.from(document.images).map((i) => i.currentSrc || i.src).filter(Boolean)
      );
      imgs.forEach((u) => imgUrls.add(u));
      // also CSS background images
      const bgs = await page.evaluate(() => {
        const out = [];
        document.querySelectorAll('*').forEach((el) => {
          const b = getComputedStyle(el).backgroundImage;
          if (b && b.includes('url(')) {
            const m = b.match(/url\(["']?(.*?)["']?\)/);
            if (m && m[1].startsWith('http')) out.push(m[1]);
          }
        });
        return out;
      });
      bgs.forEach((u) => imgUrls.add(u));
      console.log('OK:', name);
    } catch (e) {
      console.log('SKIP:', name, '-', e.message.split('\n')[0]);
    }
  }

  // Präventionskurs subdomain — screenshot only (orientation)
  try {
    await page.goto('https://praevention.hahn-physiotherapie.com/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: 'docs/praevention-extern.png', fullPage: true });
    console.log('OK: praevention (screenshot only)');
  } catch (e) { console.log('SKIP praevention'); }

  fs.writeFileSync('docs/image-urls.txt', [...imgUrls].join('\n'));
  console.log('\nIMAGE URLS:', imgUrls.size);

  await browser.close();
})();
