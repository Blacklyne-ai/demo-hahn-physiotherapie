// Funktionstests gegen Live: Nav-Dropdown, Mobile-Menü, Cookie, Map, Count-up, Sprachschalter.
import { chromium } from 'playwright';
const BASE = process.env.QA_BASE || 'https://demo-wet-gmbh.pages.dev';
const b = await chromium.launch();
const out = [];
const ok = (n, v) => out.push((v ? 'PASS  ' : 'FAIL  ') + n);

// ---- Desktop ----
let p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto(BASE + '/', { waitUntil: 'networkidle' });
await p.locator('.nav-dd').first().hover();
await p.waitForTimeout(450);
ok('Desktop Nav-Dropdown öffnet bei Hover', await p.locator('.nav-dd-panel').first().evaluate(el => { const s = getComputedStyle(el); return s.visibility === 'visible' && parseFloat(s.opacity) > 0.5; }));
ok('Dropdown-Item ist verlinkt', await p.locator('.nav-dd-panel a[href="/badewasser"]').first().count() > 0);
ok('Sprachschalter EN deaktiviert', await p.locator('button[title="In Vorbereitung"]').first().evaluate(el => el.disabled).catch(() => false));
ok('Google-Maps-Iframe vorhanden', !!(await p.locator('iframe[src*="google.com/maps"]').first().getAttribute('src').catch(() => null)));
const stat = (await p.locator('[data-count]').first().textContent() || '').trim();
ok('StatBand echte Zahl statt 0 (=' + stat + ')', stat && stat !== '0');
ok('Skip-Link vorhanden', await p.locator('a.skip-link').count() > 0);
await p.close();

// ---- Mobile ----
p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto(BASE + '/', { waitUntil: 'networkidle' });
ok('Mobile-Menü initial verborgen', await p.locator('#mobile-menu').evaluate(el => el.classList.contains('hidden')));
await p.locator('#menu-toggle').click();
await p.waitForTimeout(350);
ok('Mobile-Menü öffnet bei Klick', await p.locator('#mobile-menu').evaluate(el => !el.classList.contains('hidden')));
ok('Burger animiert (open-Klasse)', await p.locator('#menu-toggle .hamburger').evaluate(el => el.classList.contains('open')));
await p.locator('#mobile-menu a[href="/service"]').first().click().catch(() => {});
await p.waitForTimeout(400);
ok('Floating-Mobile-Bar vorhanden', await p.locator('.floating-mobile').count() > 0);
// Cookie-Banner
ok('Cookie-Banner + OK-Button im DOM', (await p.locator('#cookie-banner').count() > 0) && (await p.locator('#cookie-ok').count() > 0));
await p.close();
await b.close();
console.log(out.join('\n'));
const fails = out.filter(o => o.startsWith('FAIL')).length;
console.log('\n=> ' + (fails ? fails + ' FAIL' : 'alle Funktionstests PASS'));
