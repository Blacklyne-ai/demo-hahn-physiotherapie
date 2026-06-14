# Hahn Physiotherapie — Website (2026 Redesign)

Ruhige, warme Website für die **Praxis für Physiotherapie, Gesundheit und Prävention**
von **Carsten Hahn (B.Sc.)** mit zwei Standorten im Saarland (Püttlingen &
Spiesen-Elversberg). Ersetzt die alte Google-Sites-Seite.

Herzstück ist Carstens persönliche Geschichte (Leistungssport-Hintergrund) und sein
eigenes **L.I.G.H.T.-Konzept** — type-led, ehrlich, ohne Heilversprechen.

## Stack
- **Astro 5** (statisch, kein SSR/Adapter) · **Tailwind v3.4** · **@lucide/astro**
- Fonts: **Fraunces** (Display, self-hosted) + **Work Sans** (Body, @fontsource)
- Bilder webp, CSS inline, `font-display:optional` (CLS ~0), Google Maps nur nach Consent

## Entwicklung
```bash
npm install
npm run dev       # http://localhost:4321 (oder per launch.json Port 4358)
npm run build     # -> /dist (statisches HTML)
npm run preview
```

## Deploy — Cloudflare Pages
- Framework-Preset: **Astro**
- Build-Command: `npm run build`
- Output: `dist`

## Struktur
- `src/data/site.ts` — Standorte, Kontakt, Navigation, Recht (verbatim Scrape)
- `src/data/content.ts` — Story, L.I.G.H.T.-Konzept, 6 Leistungen (verbatim)
- `src/pages/` — Start, Leistungen (+6 Detailseiten), Konzept, Standorte, Team, Kontakt, Recht
- `docs/STYLE-GUIDE.md` — Farben (Logo-Pixel), Schrift, Voice
- `docs/JUDGEMENT_CALLS.md` — Entscheidungen & offene Operator-TODOs

Der **Präventionskurs** liegt auf einer externen Subdomain und ist nur verlinkt.
