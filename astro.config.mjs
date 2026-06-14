// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// ─────────────────────────────────────────────────────────────
// Hahn Physiotherapie — STATIC build. No adapter, no SSR.
// Output: /dist with plain HTML files.
// Deploy target: Cloudflare PAGES
//   Framework preset: Astro · Build: npm run build · Output: dist
// Tailwind v3.4 via @astrojs/tailwind (v4 breaks Cloudflare Pages).
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://demo-hahn-physiotherapie.pages.dev',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    // noindex-Seiten (Impressum/Datenschutz) nicht in die Sitemap
    sitemap({ filter: (page) => !/\/(impressum|datenschutz)\/?$/.test(page) }),
  ],
  // /seite.html statt /seite/index.html → Cloudflare serviert die internen
  // No-Trailing-Slash-Links (/badewasser) direkt mit 200, ohne 308-Redirect-Hop.
  build: {
    format: 'file',
    // CSS inline (Memory feedback_corporate_scale): kein render-blockierender
    // Stylesheet-Roundtrip; Cloudflare-Brotli macht die HTML-Größe wett
    inlineStylesheets: 'always',
  },
});
