# Judgement Calls & Operator-TODOs — Hahn Physiotherapie

Neubau der Google-Sites-Seite als ruhige, warme Astro-5-Site. Inhalte verbatim
aus dem Scrape (docs/text-*.txt). Nichts erfunden - offene Punkte hier dokumentiert.

## Design-Entscheidungen
- **Stil:** Ruhig, warm, type-led - bewusst NICHT die Auto-Kunden-Schablone.
  Warmes Off-White (Paper #FAF7F2) + medizinisches Logo-Blau (#2888C0) +
  ein sparsamer warmer Clay-Akzent (Sportler-Wärme). Siehe STYLE-GUIDE.md.
- **Schrift:** Fraunces (Display, warme Serif - trägt Carstens Stimme als Zitat) +
  Work Sans (Body). Google Sites hatte keine eigene Marken-Schrift zu erhalten.
- **L.I.G.H.T.-Konzept** als Herzstück herausgearbeitet (echter Marken-Asset der
  Altseite): Langanhaltende · Individualisierte · Ganzheitliche Heil-Therapie + 4 Stufen.

## Marke / Assets
- **Logo:** Original 1:1 übernommen. Google-CDN sperrt Direkt-Downloads (403),
  daher aus dem High-DPR-Render rekonstruiert und der weiße Hintergrund
  freigestellt (`public/logo.png`, dazu `logo-light.png` weiß für den Footer).
  Optisch identisch. → **TODO:** Falls Original-Vektor/PNG vorhanden, ersetzen
  (schärfer für Retina/Druck).
- **Farben:** pixel-extrahiert aus dem Logo (Blau #2888C0, Grau #909898) und in
  `tailwind.config.mjs` / `global.css :root` hardcoded.
- **Carsten-Portrait:** echtes Foto der Altseite (`carsten-hahn.webp`).
- **Übrige Fotos:** ruhige, warme Stockfotos von Pexels (lizenzfrei, kommerziell ok).
  → **TODO:** Bei Gelegenheit durch echte Praxisfotos ersetzen (authentischer).

## Inhalt (verbatim + Korrekturen)
- Carsten-Story, L.I.G.H.T.-Konzept + 4 Stufen, alle 6 Leistungstexte, beide
  Adressen, Telefon/Fax/E-Mail, Impressum - **verbatim** aus dem Scrape.
- Der Füllsatz „ich heiße Sie herzlich willkommen auf unserer Website" wurde
  wie gebrieft gestrichen; Carstens Story sonst unverändert.
- **Korrigierte offensichtliche Tippfehler:**
  - „Physiotheraphy" → „Physiotherapy" (sein eigener Studienabschluss).
  - „Vöklinger Str." → „Völklinger Str." (Impressum).
  - Datenschutz-Altseite nannte als Verantwortlichen-E-Mail `info@pmax-hydraulik.de`
    (klarer Copy-Paste-Fehler einer fremden Firma) → korrigiert auf
    `info@hahn-physiotherapie.com`.
- **Pädiatrie-Seite** spricht in der Ich-Stimme von **Franziska Strauß** (sie hat
  den Text geschrieben) - als Byline kenntlich gemacht, Stimme erhalten.

## Bewusst NICHT gemacht (kein Erfinden)
- **Keine Google-Reviews:** Die Altseite hatte ein Reviews-Widget, aber ohne
  Place-ID/API-Key liegen keine verifizierten Review-Texte vor. Bei Gesundheit
  werden Reviews **nie erfunden** → Sektion weggelassen.
  → **TODO:** Place-IDs beider Standorte liefern, dann echte Reviews ergänzen.
- **Keine Öffnungszeiten / kein Live-Status-Bar:** Auf der Altseite standen keine
  Zeiten. Statt zu erfinden: „Termine nach Vereinbarung".
  → **TODO:** Öffnungszeiten je Standort liefern → optional Live-„geöffnet"-Anzeige.
- **Keine Kassen-/§20-/Preis-Aussagen** über das hinaus, was belegt ist
  (Direktzugang / sektoraler Heilpraktiker / GebüH - verbatim).
- **Keine Heilversprechen** (HWG) - Texte beschreibend, ohne Superlative.

## Team
- Beide Roster verbatim (Reihenfolge wie Altseite). Es liegen je 9 quadratische
  Porträtfotos vor, aber **ohne verlässliche Name↔Foto-Zuordnung** (alt-Texte leer).
  Um niemanden falsch zu beschriften, ist das Team als Namens-Kacheln mit
  Initialen + belegten Rollen umgesetzt (Carsten-Foto verifiziert).
  → **TODO:** Foto-Zuordnung bestätigen, dann Porträts einsetzen
  (`docs/img-shot/team-*.png` vorhanden).

## Kontakt
- **Kein Kontaktformular** (Wunsch/DSGVO): WhatsApp + E-Mail + Telefon als Tiles.
- **WhatsApp** verlinkt auf die Mobilnummer Püttlingen (0171-1765194).
  → **TODO:** Bestätigen, dass die Nummer WhatsApp-fähig und für Patientenkontakt
  gewünscht ist (sonst Tile entfernen).
- Internationale Telefonnummern aus den Anzeige-Nummern abgeleitet → bitte prüfen.

## Präventionskurs
- Externe Subdomain `praevention.hahn-physiotherapie.com` - nur als externer Link
  (neuer Tab, rel=noopener) eingebunden, NICHT nachgebaut/migriert. Keine
  erfundenen Inhalte (Kasse/§20/Termine/Preise).

## Recht / Technik
- **Datenschutzerklärung** neu für den echten Stack geschrieben (statisch,
  Cloudflare Pages, kein Formular, Maps nur nach Klick/Consent, lokale Fonts).
  → **TODO:** Vor Go-Live anwaltlich prüfen lassen (Gesundheit/HWG sensibel);
  bei anderem Hosting §3 anpassen.
- **Google Maps** lädt erst nach aktivem Klick (Consent) - DSGVO-konform.
- Static (Astro 5, kein SSR/Adapter), Tailwind v3.4, CSS inline, Fonts self-hosted
  mit `font-display:optional` (CLS ~0), Bilder webp + preload für LCP.
