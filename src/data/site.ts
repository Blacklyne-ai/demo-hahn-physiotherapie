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
  team: TeamMember[];
}
// Fotos verifiziert über Positions-Mapping (Name direkt rechts vom Foto) der
// alten Team-Seite. Jennifer Lang hatte dort kein Foto → kein photo-Feld.
export interface TeamMember { name: string; photo?: string }

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
    // verbatim Reihenfolge + Positionen aus den Dropdowns mitarbeiter/püttlingen
    team: [
      { name: 'Carsten Hahn' },
      { name: 'Franziska Strauß', photo: '/images/team/puettlingen-franziska-strauss.webp', role: 'Physiotherapeutin', quals: ['Vojtatherapie für Kinder', 'Man. Lymphdrainage'] },
      { name: 'Michaela Müller', photo: '/images/team/puettlingen-michaela-muller.webp', role: 'Physiotherapeutin', quals: ['Bobaththerapeutin für Erwachsene', 'Man. Lymphdrainage'] },
      { name: 'Gertrud Speicher', photo: '/images/team/puettlingen-gertrud-speicher.webp', role: 'Krankengymnastin', quals: ['Bobaththerapeutin für Erwachsene'] },
      { name: 'Vera Haupt', photo: '/images/team/puettlingen-vera-haupt.webp', role: 'Physiotherapeutin', quals: ['Man. Lymphdrainage', 'Wirbeltherapie nach Dorn', 'Breuss-Massage'] },
      { name: 'Tarek Hijazi', photo: '/images/team/puettlingen-tarek-hijazi.webp', role: 'Physiotherapeut', quals: ['Man. Lymphdrainage', 'Krankengymnastik am Gerät', 'Wirbeltherapie nach Dorn', 'Breuss-Massage', 'Nachwuchsleistungszentrum-Saar (seit 2021)'] },
      { name: 'Julia Kurz', photo: '/images/team/puettlingen-julia-kurz.webp', role: 'Physiotherapeutin', quals: ['Krankengymnastik am Gerät', 'Bobath für Erwachsene (ab 2024)'] },
      { name: 'Silke Schattle', photo: '/images/team/puettlingen-silke-schattle.webp', role: 'Frontoffice-Management' },
      { name: 'Anke Glocker-Spaniol', photo: '/images/team/puettlingen-anke-glocker-spaniol.webp', role: 'Frontoffice-Assistance' },
      { name: 'Jennifer Lang', role: 'Backoffice & Social Media' },
    ],
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
    // verbatim Reihenfolge + Positionen aus den Dropdowns mitarbeiter/elversberg
    team: [
      { name: 'Carsten Hahn' },
      { name: 'Joel Lezius', photo: '/images/team/elversberg-joel-lezius.webp', role: 'Physiotherapeut', quals: ['Manuelle Therapie', 'Man. Lymphdrainage'] },
      { name: 'Karin Bähr', photo: '/images/team/elversberg-karin-bahr.webp', role: 'Physiotherapeutin', quals: ['Manuelle Therapie', 'Man. Lymphdrainage', 'Bobath-Therapeutin'] },
      { name: 'Sylke Lotz', photo: '/images/team/elversberg-sylke-lotz.webp', role: 'Physiotherapeutin', quals: ['Man. Lymphdrainage'] },
      { name: 'Melanie', photo: '/images/team/elversberg-melanie.webp', role: 'Physiotherapeutin', quals: ['Manuelle Therapie', 'Man. Lymphdrainage'] },
      { name: 'Tarek Hijazi', photo: '/images/team/elversberg-tarek-hijazi.webp', role: 'Physiotherapeut', quals: ['Man. Lymphdrainage', 'Krankengymnastik am Gerät', 'Therapie nach Dorn', 'Nachwuchsleistungszentrum-Saar (seit 2021)'] },
      { name: 'Rohtraut Weisgerber', photo: '/images/team/elversberg-rohtraut-weisgerber.webp', role: 'Physiotherapeutin', quals: ['Man. Lymphdrainage'] },
      { name: 'Kerstin Gottesleben', photo: '/images/team/elversberg-kerstin-gottesleben.webp', role: 'Frontoffice-Management' },
      { name: 'Christel Holzer', photo: '/images/team/elversberg-christel-holzer.webp', role: 'Frontoffice-Assistance' },
      { name: 'Jennifer Lang', role: 'Backoffice & Social Media' },
    ],
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
  { href: '/karriere', label: 'Karriere' },
  { href: '/kontakt', label: 'Kontakt' },
];

export const careerMail = `mailto:${site.email}?subject=${encodeURIComponent('Bewerbung als Physiotherapeut:in')}`;

export const footerNav = {
  praxis: [
    { href: '/konzept', label: 'Das L.I.G.H.T.-Konzept' },
    { href: '/team', label: 'Team' },
    { href: '/karriere', label: 'Karriere' },
    { href: '/standorte', label: 'Standorte' },
    { href: '/kontakt', label: 'Termin vereinbaren' },
  ],
  leistungen: leistungenLinks,
};

export const legalNav = [
  { href: '/datenschutz', label: 'Datenschutz' },
  { href: '/impressum', label: 'Impressum' },
];
