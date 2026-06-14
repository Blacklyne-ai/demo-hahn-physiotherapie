// Vollständiger QA-Audit gegen den gebauten dist-Output.
// Links + Anchors + tel/mailto + Overflow (390/768/1440) + Full-Page-Screenshots.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = process.env.QA_BASE || 'http://localhost:4420';
const routes = [
  '/', '/unternehmen/geschichte', '/unternehmen/firmenphilosophie', '/unternehmen/technologie',
  '/unternehmen/dienstleistung', '/unternehmen/ansprechpartner', '/unternehmen/zertifikate',
  '/trinkwasser', '/badewasser', '/wasserrecycling', '/know-how',
  '/service', '/sonderprojekte', '/referenzen', '/referenzen/freibad-kulmbach',
  '/referenzen/wasserwerk-brendlorenzen', '/news', '/presse', '/downloads',
  '/kontakt', '/impressum', '/datenschutz', '/404',
];
const norm = (p) => { try { p = p.split('#')[0].split('?')[0]; } catch {} if (p.length > 1) p = p.replace(/\/$/, ''); return p || '/'; };
const known = new Set(routes.map(norm));
mkdirSync('docs/qa/pages', { recursive: true });

const browser = await chromium.launch();
const report = { brokenLinks: [], badAnchors: [], telMailto: [], external: new Set(), overflow: [], textClip: [], pageErrors: [] };
const widths = [{ w: 1440, h: 900, k: 'd' }, { w: 768, h: 1024, k: 't' }, { w: 390, h: 844, k: 'm' }];

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', (e) => report.pageErrors.push({ route, err: String(e).slice(0, 120) }));
  const url = BASE + route;
  let resp;
  try { resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }); }
  catch (e) { report.brokenLinks.push({ on: route, href: route, reason: 'load failed ' + e.message.slice(0, 60) }); await page.close(); continue; }
  if (resp && resp.status() >= 400 && route !== '/404') report.pageErrors.push({ route, status: resp.status() });

  // force-reveal fade-ins + drop the cookie banner for clean capture
  await page.evaluate(() => {
    document.querySelectorAll('.fade-in,.timeline').forEach(e => e.classList.add('is-visible'));
    document.getElementById('cookie-banner')?.remove();
  });
  await page.waitForTimeout(250);

  // ---- links ----
  const links = await page.$$eval('a[href]', (as) => as.map(a => ({ href: a.getAttribute('href'), target: a.getAttribute('target'), rel: a.getAttribute('rel'), text: (a.textContent || '').trim().slice(0, 30) })));
  for (const l of links) {
    const h = l.href;
    if (!h || h === '#') { report.badAnchors.push({ on: route, ...l, reason: 'empty/#' }); continue; }
    if (h.startsWith('tel:') || h.startsWith('mailto:')) {
      const val = h.replace(/^(tel|mailto):/, '');
      if (h.startsWith('tel:') && !/^\+?[0-9]+$/.test(val)) report.telMailto.push({ on: route, href: h, reason: 'tel not digits' });
      if (h.startsWith('mailto:') && !/^[^@\s]+@[^@\s]+\.[^@\s]+/.test(val)) report.telMailto.push({ on: route, href: h, reason: 'bad mail' });
      continue;
    }
    if (/^https?:\/\//.test(h)) { report.external.add(h.split('?')[0]); if (!l.target) report.external.add('NO_BLANK:' + h); continue; }
    if (h.startsWith('#')) { // same-page anchor
      const id = h.slice(1);
      const ok = await page.evaluate((i) => !!document.getElementById(i), id).catch(() => false);
      if (!ok) report.badAnchors.push({ on: route, href: h, reason: 'missing id' });
      continue;
    }
    if (h.startsWith('/')) {
      const target = norm(h);
      if (!known.has(target)) report.brokenLinks.push({ on: route, href: h, text: l.text, reason: 'unknown route' });
      // cross-page anchor existence checked separately (only #kompetenzen used)
    }
  }

  // ---- overflow + text clipping per width ----
  for (const { w, h, k } of widths) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(120);
    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const vw = de.clientWidth;
      const offenders = [];
      const clips = [];
      document.querySelectorAll('body *').forEach(el => {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') return;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        if (rect.right > vw + 1.5 && rect.left >= -1) {
          offenders.push((el.tagName.toLowerCase()) + '.' + (typeof el.className === 'string' ? el.className.split(' ').slice(0,3).join('.') : '') + ' w=' + Math.round(rect.width));
        }
        // text horizontally clipped inside its own box
        if (el.children.length === 0 && el.scrollWidth > el.clientWidth + 2 && cs.overflowX !== 'auto' && cs.overflowX !== 'scroll') {
          const t = (el.textContent || '').trim().slice(0, 24);
          if (t) clips.push(t + ' [' + el.tagName.toLowerCase() + ']');
        }
      });
      return { vw, overflowPx: de.scrollWidth - vw, offenders: [...new Set(offenders)].slice(0, 8), clips: [...new Set(clips)].slice(0, 8) };
    });
    if (r.overflowPx > 1) report.overflow.push({ route, width: w, overflowPx: r.overflowPx, offenders: r.offenders });
    if (r.clips.length) report.textClip.push({ route, width: w, clips: r.clips });
  }

  // ---- screenshots: desktop + mobile full page ----
  const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(150);
  await page.screenshot({ path: `docs/qa/pages/${slug}-d.png`, fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(150);
  await page.screenshot({ path: `docs/qa/pages/${slug}-m.png`, fullPage: true });
  await page.close();
  console.log('done', route);
}
await browser.close();
report.external = [...report.external];
writeFileSync('docs/qa/qa-report.json', JSON.stringify(report, null, 2));
console.log('\n===== QA SUMMARY =====');
console.log('broken internal links:', report.brokenLinks.length);
console.log('bad anchors:', report.badAnchors.length);
console.log('tel/mailto issues:', report.telMailto.length);
console.log('overflow hits:', report.overflow.length);
console.log('text-clip hits:', report.textClip.length);
console.log('page errors:', report.pageErrors.length);
console.log('external links:', report.external.filter(e=>!e.startsWith('NO_BLANK')).length, '| missing target=_blank:', report.external.filter(e=>e.startsWith('NO_BLANK')).length);
