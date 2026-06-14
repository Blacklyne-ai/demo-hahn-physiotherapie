// ─────────────────────────────────────────────────────────────
// Hahn Physiotherapie — zentrale Site-Konfiguration.
// Jede Angabe stammt verbatim aus dem Scrape der Bestandsseite
// (docs/text-*.txt: kontakt, standorte, impressum). Nichts erfunden.
// Deutsch, Sie-Form. Carstens Ich-Stimme im Content. Siehe JUDGEMENT_CALLS.md.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Hahn Physiotherapie',
  owner: 'Carsten Hahn',
  ownerTitle: 'B.Sc. Carsten Hahn',
  legalName: 'Praxis für Physiotherapie, Gesundheit und Prävention',
  claim: 'Ihr Weg zu mehr Lebensqualität', // verbatim Altseite
  motto: 'Gemeinsam Ziele erreichen',       // verbatim Altseite
  description:
    'Physiotherapie in Püttlingen und Spiesen-Elversberg. Praxis von Carsten Hahn (B.Sc.) - mit dem L.I.G.H.T.-Konzept aus der Erfahrung des Leistungssports. Termine nach Vereinbarung.',
  url: 'https://demo-hahn-physiotherapie.pages.dev',

  email: 'info@hahn-physiotherapie.com',

  // Externer Präventionskurs — eigene Subdomain, bleibt unangetastet.
  praeventionUrl: 'https://praevention.hahn-physiotherapie.com/',

  // Social (verbatim aus Datenschutz)
  social: {
    facebook: 'https://www.facebook.com/physiopraxishahn',
    instagram: 'https://instagram.com/hahn-physio',
    linkedin: 'https://de.linkedin.com/in/hahn-carsten-790862146',
  },

  // Impressum (verbatim Scrape)
  legal: {
    name: 'Carsten Hahn',
    businessName: 'Praxis für Physiotherapie Gesundheit und Prävention B.Sc. Carsten Hahn',
    street: 'Völklinger Str. 5',
    postcode: '66346',
    city: 'Püttlingen',
    profession: 'Physiotherapeut',
    aufsicht: 'Ministerium für Arbeit, Soziales, Frauen und Gesundheit',
    aufsichtAddr: 'Franz-Josef-Röder-Straße 23, 66119 Saarbrücken',
    aufsichtUrl: 'https://www.saarland.de/masfg/DE/home/home_node.html',
    insurer: 'Rehr und Jost GbR, Generalvertretung Allianz Versicherung',
    insurerAddr: 'Vorderster Berg 1, 66333 Völklingen',
    insurerScope: 'Deutschland',
  },
};

// ── Zwei Standorte (verbatim aus kontakt.txt / standorte.txt / impressum) ──
export interface Standort {
  id: string;
  short: string;
  legalName: string;
  street: string;
  postcode: string;
  city: string;
  phoneDisplay: string;
  phoneIntl: string;
  mobileDisplay?: string;
  mobileIntl?: string;
  faxDisplay?: string;
  email: string;
  mapsEmbed: string;
  mapsUrl: string;
  team: string[];
}

export const standorte: Standort[] = [
  {
    id: 'puettlingen',
    short: 'Püttlingen',
    legalName: 'Praxis für Physiotherapie, Gesundheit und Prävention B.Sc. Carsten Hahn',
    street: 'Völklinger Straße 5',
    postcode: '66346',
    city: 'Püttlingen',
    phoneDisplay: '06898 - 62191',
    phoneIntl: '+49689862191',
    mobileDisplay: '0171 - 1765194',
    mobileIntl: '+491711765194',
    faxDisplay: '06898 - 689862',
    email: 'info@hahn-physiotherapie.com',
    mapsEmbed: 'https://www.google.com/maps?q=Völklinger+Straße+5,+66346+Püttlingen&z=16&output=embed',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hahn+Physiotherapie+Völklinger+Straße+5+66346+Püttlingen',
    // verbatim Reihenfolge mitarbeiter/püttlingen
    team: ['Carsten Hahn', 'Franziska Strauß', 'Michaela Müller', 'Gertrud Speicher', 'Vera Haupt', 'Tarek Hijazi', 'Julia Kurz', 'Silke Schattle', 'Anke Glocker-Spaniol', 'Jennifer Lang'],
  },
  {
    id: 'elversberg',
    short: 'Spiesen-Elversberg',
    legalName: 'Praxis für Physiotherapie, Gesundheit und Prävention by B.Sc. Carsten Hahn',
    street: 'St. Ingberter Straße 1',
    postcode: '66583',
    city: 'Spiesen-Elversberg',
    phoneDisplay: '06821 - 70300',
    phoneIntl: '+49682170300',
    email: 'info@hahn-physiotherapie.com',
    mapsEmbed: 'https://www.google.com/maps?q=St.+Ingberter+Straße+1,+66583+Spiesen-Elversberg&z=16&output=embed',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hahn+Physiotherapie+St.+Ingberter+Straße+1+66583+Spiesen-Elversberg',
    // verbatim Reihenfolge mitarbeiter/elversberg
    team: ['Carsten Hahn', 'Joel Lezius', 'Karin Bähr', 'Sylke Lotz', 'Melanie', 'Tarek Hijazi', 'Rohtraut Weisgerber', 'Kerstin Gottesleben', 'Christel Holzer', 'Jennifer Lang'],
  },
];

// ── Link-Helper ───────────────────────────────────────────────
export const mailLink = `mailto:${site.email}`;
export function mailFor(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}
// WhatsApp über die Mobilnummer (Püttlingen). TODO Operator: bestätigen, dass
// die Nummer WhatsApp-fähig ist (siehe JUDGEMENT_CALLS).
export const whatsappLink = 'https://wa.me/491711765194';

// ── Navigation (schlank, wie gebrieft) ────────────────────────
export interface NavChild { href: string; label: string }
export interface NavItem { href: string; label: string; external?: boolean; children?: NavChild[] }

export const leistungenLinks: NavChild[] = [
  { href: '/leistungen/therapie-ab-der-geburt', label: 'Therapie ab der Geburt' },
  { href: '/leistungen/sportphysiotherapie-nachwuchs', label: 'Sportphysiotherapie & Nachwuchs' },
  { href: '/leistungen/chronischer-schmerz', label: 'Chronischer Schmerz' },
  { href: '/leistungen/neurologischer-bereich', label: 'Neurologischer Bereich' },
  { href: '/leistungen/op-vermeidung', label: 'OP-Vermeidung' },
  { href: '/leistungen/zeit-nach-unfall-operation', label: 'Nach Unfall oder Operation' },
];

export const nav: NavItem[] = [
  { href: '/', label: 'Start' },
  { href: '/leistungen', label: 'Leistungen', children: leistungenLinks },
  { href: '/konzept', label: 'Konzept' },
  { href: site.praeventionUrl, label: 'Präventionskurs', external: true },
  { href: '/standorte', label: 'Standorte' },
  { href: '/team', label: 'Team' },
  { href: '/kontakt', label: 'Kontakt' },
];

export const footerNav = {
  praxis: [
    { href: '/konzept', label: 'Das L.I.G.H.T.-Konzept' },
    { href: '/team', label: 'Team' },
    { href: '/standorte', label: 'Standorte' },
    { href: '/kontakt', label: 'Termin vereinbaren' },
  ],
  leistungen: leistungenLinks,
};

export const legalNav = [
  { href: '/datenschutz', label: 'Datenschutz' },
  { href: '/impressum', label: 'Impressum' },
];
