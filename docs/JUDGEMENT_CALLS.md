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

## Update - Team-Fotos integriert
Die Team-Fotos der Altseite wurden übernommen und den beiden Standorten zugeordnet.
Die Name↔Foto-Zuordnung ist **positions-verifiziert**: pro Foto wurde der direkt
rechts daneben stehende Name aus der alten Team-Seite ausgelesen (nicht geraten) und
gegen das Original-Layout gegengeprüft. Carsten ist je Seite oben „featured" (nicht im
Raster). **Jennifer Lang** hatte auf der Altseite kein Foto (leerer Platzhalter) → wird
als Initialen-Kachel gezeigt. Tarek Hijazi und Jennifer Lang arbeiten an beiden Standorten.
Die Fotos sind aus dem High-DPR-Render der Altseite gewonnen (Google-CDN sperrt Downloads).
→ **TODO:** Bei Gelegenheit Original-Fotos für maximale Schärfe nachreichen; Foto für
Jennifer Lang ergänzen, falls gewünscht.

## Update - Team-Positionen aus den Dropdowns
Die alte Team-Seite versteckte je Person die Position/Qualifikationen hinter einem
Klapp-Dropdown. Diese Inhalte wurden ausgelesen (Dropdowns programmatisch expandiert)
und jetzt direkt - ohne Klick - unter jedem Namen angezeigt (Rolle + Skills, z. B.
Vojtatherapie, Bobath, Man. Lymphdrainage, Dorn/Breuss, NLZ-Saar). Verbatim aus der
Altseite. Carsten-Foto: ausschließlich das neue Foto (kariertes Hemd); das alte
Hell-Hemd-Foto wurde entfernt.

## Update - Pillen-Menü, Karriere-Seite, Detailpass
- **Menü** als schwebende Pille umgesetzt (warm, dezent, Schatten verstärkt beim Scrollen);
  Präventionskurs ↗ und Karriere im Desktop-Menü, Kontakt = CTA, Telefon ab xl.
- **Karriere-Seite** (/karriere) mit den Eckdaten des Inhabers (verbatim): Voll-/Teilzeit,
  4.000 € (VZ) / 2.000 € (TZ), 30 Tage Urlaub, geförderte betriebliche Altersvorsorge,
  Firmenwagen möglich, Standort Püttlingen, Praxis oder reiner Außendienst. Bewerbung
  per E-Mail/WhatsApp/Telefon (kein Formular). JobPosting-Schema für Google for Jobs.
  → **TODO:** Gehalt-Bezugszeitraum bestätigen (monatl./jährl., brutto) - im Schema
  ist baseSalary bewusst ausgelassen, bis das geklärt ist. Carstens Einladungstext ist
  in seinem Ton formuliert, ohne erfundene Anforderungen/Zusatzleistungen.
- **A11y:** Breadcrumb-Kontrast site-weit auf AA gehoben; aktiver Menüpunkt mit aria-current.
  Lighthouse Desktop 100/100/100/100 (Start + Karriere), Mobile Perf 96, CLS 0.
