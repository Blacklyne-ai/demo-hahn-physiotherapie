# Style Guide — Hahn Physiotherapie

Ruhige, warme 2026-Website für eine Physiotherapie-Praxis mit zwei Standorten
im Saarland (Püttlingen + Spiesen-Elversberg). Inhaber: Carsten Hahn.
Kein Baukasten, keine Broschüren-Sprache, keine Auto-Kunden-Schablone.

Charakter: **persönlich · Leistungssport-Hintergrund · ehrlich · ruhig-modern · warm**.
Gesundheit ist sensibel — kein Heilversprechen, keine Superlative (HWG).

---

## Logo / Brand-Farben (pixel-extrahiert)

Original-Logo: "B.Sc. CARSTEN HAHN — PHYSIOTHERAPIE — Gesundheit & Prävention",
laufende Figur in einem Medizin-Kreuz. 1:1 übernommen (`/public/logo.png`,
aus dem Render transparent freigestellt, da Google-CDN Direkt-Downloads sperrt).

Pixel-Analyse des Logos (Weiß ausgeschlossen):
- **Blau** `#2888C0` (rgb 40 136 192) — "PHYSIOTHERAPIE" + Figur. Primärfarbe.
- **Grau** `#909898` (rgb 144 152 152) — "B.Sc. Carsten Hahn" + "Gesundheit & Prävention" + Kreuz.

## Farbpalette

| Element | Hex | Quelle / Zweck |
|---|---|---|
| Brand Blau | `#2888C0` | Logo-Pixel — Akzent, Icons, Borders, deko |
| Blau-Deep | `#1B6E99` | Buttons/Links/CTA — weiß lesbar (AA) |
| Blau-Ink | `#124E6E` | starke Link-/Akzent-Texte auf Hell (AAA) |
| Blau-Bright | `#5CB2E2` | Akzent auf dunklen Sektionen |
| Ink | `#1A2A32` | Headlines/Text — warmes Tiefslate (kein reines Schwarz) |
| Muted | `#54616A` | Fließtext (AA auf Paper ~6:1) |
| Muted-Light | `#66727A` | kleine Labels (AA ~4.6) |
| Paper | `#FAF7F2` | **warmes Off-White** — Haupt-BG, ruhig, nicht klinisch |
| Cream | `#F4EEE6` | warmes Sand — alternierende Sektionen |
| Sand | `#EDE5D9` | tieferer warmer Ton — Akzentblöcke |
| Surface | `#FFFFFF` | Karten |
| Border | `#E6DFD4` | warme Haarlinien |
| Dark | `#132F3A` | tiefes Petrol-Slate — nur CtaBand + Footer |
| Dark-Deep | `#0D242D` | tiefste Ebene (Footer-Basis) |
| Clay | `#BC6B43` | warmer Akzent (Leistungssport-Wärme) — sehr sparsam |
| Green | `#3F9D6C` | nur Live-"Jetzt geöffnet"-Status-Dot |

**Idee:** Die Wärme lebt in den *Neutralen* (warmes Paper/Sand statt kühlem Grau-Weiß),
der Verstand im *medizinischen Blau* des Logos. Ein einziger warmer Clay-Akzent
nickt dem Sportler-Hintergrund zu — sparsam, nie laut. Desaturiert statt grell:
Gesundheit, nicht Fitness-Studio.

## Schrift

Google Sites nutzte generische System-Fonts — keine echte Marken-Schrift zu erhalten,
also bewusst gewählt (Begründung verbindlich):

- **Display: Fraunces Variable** (opsz-Achse, self-hosted, `font-display:optional`).
  Warme, humane Serif mit Charakter und optischer Größenanpassung. Trägt Headlines
  und — zentral — **Carstens Ich-Stimme als Pull-Quotes**. Editorial-ruhig, menschlich.
- **Body/UI: Work Sans** (latin, @fontsource 400/500/600/700). Humanistische Sans,
  warm, sehr lesbar, freundlich. Paart sich klassisch mit Fraunces.

Kein Mono, kein dritter Font. Zwei-Font-System, diszipliniert. Eyebrows = Work Sans,
versal, leicht gesperrt (kein Mono-Tech-Look). CLS ~0 durch self-hosted opsz +
`font-display:optional` (Memory feedback_font_display_cls).

## VOICE (verbindlich)

Carsten spricht in **Ich-Form**, ruhig und direkt, wie zu einem Patienten.
Keine Werbe-Adjektive, keine Superlative, keine Heilversprechen. Sätze kurz.
Sein echter Ton:

> "Ich freue mich darauf, mit Ihnen gemeinsam Ziele zu erreichen."

So klingt die ganze Site. Wo seine echten Worte tragen, werden sie **als große
Aussage** gesetzt (ein Zitat kann eine Headline sein), nicht in Agentur-Floskeln
übersetzt. Sie-Form gegenüber den Besuchern. Die Pädiatrie-Seite spricht in der
Stimme von **Franziska Strauß** (sie hat den Text geschrieben) — diese Ich-Stimme
bleibt ebenfalls erhalten.

Verboten: "kompetenter Partner rund um", "Spezialist für", "X Bereiche — ein Konzept",
"Vier Gründe", "So einfach geht's", "herzlich willkommen auf unserer Website" (Füller).

## Layout-Haltung

Ruhig, type-led, viel Weißraum. Editorial-asymmetrisch (Text/Bild versetzt) erlaubt,
Karten-Sets aber immer symmetrisch (nie 4+3). Bewegung dezent: sanftes Einblenden
beim Scrollen, keine Counter, keine Marquees, keine Caustics/Ghost-Watermarks per
Reflex. Eyebrow-Kicker nur wo er der Sache dient, nicht über jeder Headline.
Eine echte Persönlichkeit, kein Template-Gefühl.

## Das Herzstück: L.I.G.H.T.

Carstens eigenes Konzept (verbatim von der Altseite) ist der echte Marken-Asset:
**L**anganhaltende · **I**ndividualisierte · **G**anzheitliche · **H**eil · **T**herapie,
mit vier Stufen (Analyse → Wissen/Plan → aktive Umsetzung → langfristiges Coaching).
Das trägt die Konzept-Sektion — echt, spezifisch, unverwechselbar.
