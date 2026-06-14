// Sammelt alle in dist referenzierten Assets (img/srcset/fonts/og) für 200-Check.
import fs from 'node:fs';
import path from 'node:path';
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) files.push(p); } })('dist');
const assets = new Set();
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  for (const m of h.matchAll(/(?:src|href)="(\/[^"]+\.(?:webp|png|jpg|jpeg|svg|woff2))"/g)) assets.add(m[1]);
  for (const m of h.matchAll(/srcset="([^"]+)"/g)) for (const part of m[1].split(',')) { const u = part.trim().split(/\s+/)[0]; if (u.startsWith('/')) assets.add(u); }
  for (const m of h.matchAll(/content="(\/[^"]+\.(?:jpg|png|webp))"/g)) assets.add(m[1]);
}
fs.writeFileSync('/tmp/assets.txt', [...assets].sort().join('\n'));
console.log('referenzierte Assets:', assets.size);
