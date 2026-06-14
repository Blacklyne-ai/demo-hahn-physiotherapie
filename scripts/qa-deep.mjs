// Tiefes QA-Audit: Meta/SEO, Headings, Alt, IDs, Console-Errors, JSON-LD, OG.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = process.env.QA_BASE || 'https://demo-wet-gmbh.pages.dev';
const routes = [
  '/', '/unternehmen/geschichte', '/unternehmen/firmenphilosophie', '/unternehmen/technologie',
  '/unternehmen/dienstleistung', '/unternehmen/ansprechpartner', '/unternehmen/zertifikate',
  '/trinkwasser', '/badewasser', '/wasserrecycling', '/know-how',
  '/service', '/sonderprojekte', '/referenzen', '/referenzen/freibad-kulmbach',
  '/referenzen/wasserwerk-brendlorenzen', '/news', '/presse', '/downloads',
  '/kontakt', '/impressum', '/datenschutz',
];
const browser = await chromium.launch();
const report = { issues: [], pages: {} };
const titles = {}, descs = {};
const add = (sev, route, msg) => report.issues.push({ sev, route, msg });

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const cmsgs = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) cmsgs.push(m.type() + ': ' + m.text().slice(0, 140)); });
  page.on('pageerror', (e) => cmsgs.push('pageerror: ' + String(e).slice(0, 140)));
  let resp;
  try { resp = await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 45000 }); }
  catch (e) { add('ERR', route, 'load failed: ' + e.message.slice(0, 80)); await page.close(); continue; }

  const d = await page.evaluate(() => {
    const meta = (n) => document.querySelector(`meta[name="${n}"]`)?.content || document.querySelector(`meta[property="${n}"]`)?.content || null;
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
    const skips = []; for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) skips.push(hs[i - 1] + '->' + hs[i]);
    const imgs = [...document.images];
    const noAlt = imgs.filter((im) => im.getAttribute('alt') === null).map((im) => (im.currentSrc || im.src).split('/').pop());
    const broken = imgs.filter((im) => im.complete && im.naturalWidth === 0).map((im) => (im.currentSrc || im.src).split('/').pop());
    const idc = {}; document.querySelectorAll('[id]').forEach((e) => { idc[e.id] = (idc[e.id] || 0) + 1; });
    const dupIds = Object.entries(idc).filter(([, n]) => n > 1).map(([k, n]) => k + '×' + n);
    let jsonld = 'none'; const s = document.querySelector('script[type="application/ld+json"]');
    if (s) { try { JSON.parse(s.textContent); jsonld = 'valid'; } catch { jsonld = 'INVALID'; } }
    const extNoBlank = [...document.querySelectorAll('a[href^="http"]')].filter((a) => { try { return new URL(a.href).host !== location.host && a.target !== '_blank'; } catch { return false; } }).map((a) => a.getAttribute('href'));
    const emptyLinks = [...document.querySelectorAll('a[href]')].filter((a) => !a.textContent.trim() && !a.getAttribute('aria-label') && !a.querySelector('img[alt]:not([alt=""])')).length;
    return {
      title: document.title, titleLen: document.title.length, h1: document.querySelectorAll('h1').length,
      desc: meta('description'), descLen: (meta('description') || '').length,
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      ogTitle: meta('og:title'), ogImg: meta('og:image'), ogDesc: meta('og:description'), tw: meta('twitter:card'),
      lang: document.documentElement.lang, viewport: !!document.querySelector('meta[name="viewport"]'), theme: meta('theme-color'),
      robots: meta('robots'), skips, imgCount: imgs.length, noAlt, broken, dupIds, jsonld, extNoBlank, emptyLinks,
    };
  });

  if (resp && resp.status() >= 400) add('ERR', route, 'HTTP ' + resp.status());
  if (cmsgs.length) add('WARN', route, 'console: ' + cmsgs.join(' | '));
  if (d.h1 !== 1) add('ERR', route, 'h1 count=' + d.h1);
  if (!d.desc) add('ERR', route, 'fehlende meta description');
  else { if (d.descLen < 50 || d.descLen > 165) add('WARN', route, 'meta desc Länge ' + d.descLen); descs[route] = d.desc; }
  if (d.titleLen > 65) add('WARN', route, 'title Länge ' + d.titleLen);
  if (titles[d.title]) add('WARN', route, 'doppelter title mit ' + titles[d.title]); else titles[d.title] = route;
  if (d.skips.length) add('WARN', route, 'heading-Sprung: ' + d.skips.join(','));
  if (d.noAlt.length) add('ERR', route, 'img ohne alt: ' + d.noAlt.join(','));
  if (d.broken.length) add('ERR', route, 'broken img: ' + d.broken.join(','));
  if (d.dupIds.length) add('ERR', route, 'doppelte ids: ' + d.dupIds.join(','));
  if (d.emptyLinks) add('ERR', route, 'leere Links (kein Text/aria): ' + d.emptyLinks);
  if (d.jsonld !== 'valid') add('WARN', route, 'JSON-LD ' + d.jsonld);
  if (!d.canonical) add('WARN', route, 'kein canonical');
  if (!d.ogImg) add('WARN', route, 'kein og:image');
  if (!d.ogTitle) add('WARN', route, 'kein og:title');
  if (!d.tw) add('WARN', route, 'keine twitter card');
  if (d.lang !== 'de') add('WARN', route, 'lang=' + d.lang);
  if (!d.viewport) add('ERR', route, 'kein viewport meta');
  if (d.extNoBlank.length) add('WARN', route, 'ext-Link ohne _blank: ' + d.extNoBlank.join(' '));
  report.pages[route] = d;
  await page.close();
}
const dmap = {}; for (const r in descs) (dmap[descs[r]] = dmap[descs[r]] || []).push(r);
for (const dd in dmap) if (dmap[dd].length > 1) add('WARN', '(global)', 'doppelte meta description: ' + dmap[dd].join(', '));
await browser.close();
writeFileSync('docs/qa/qa-deep.json', JSON.stringify(report, null, 2));
const err = report.issues.filter((i) => i.sev === 'ERR'), warn = report.issues.filter((i) => i.sev === 'WARN');
console.log(`\n===== DEEP-AUDIT: ${err.length} ERR · ${warn.length} WARN =====`);
[...err, ...warn].forEach((i) => console.log(`[${i.sev}] ${i.route}: ${i.msg}`));
