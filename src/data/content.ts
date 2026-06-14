// ─────────────────────────────────────────────────────────────
// Hahn Physiotherapie — Inhalts-Daten, verbatim aus dem Scrape der
// Bestandsseite (docs/text-*.txt). Nichts erfunden. Carstens Ich-Stimme
// bleibt; die Pädiatrie-Seite spricht in Franziska Strauß' Stimme (sie hat
// den Text geschrieben). Korrigiert wurde nur der offensichtliche Tippfehler
// "Physiotheraphy" -> "Physiotherapy" (sein eigener Studienabschluss).
// ─────────────────────────────────────────────────────────────

// ── Carsten Hahn — Story (verbatim, ohne den Füllsatz "ich heiße Sie willkommen") ──
export const carstenQuote =
  'Mein Interesse für Physiotherapie stammt aus meiner eigenen Zeit als Leistungssportler.';

export const carstenStory: string[] = [
  'Seit 2017 bin ich examinierter Physiotherapeut. Im Jahr 2018 habe ich zusätzlich meinen Bachelor of Science Physiotherapy in den Niederlanden abgeschlossen. 2018 und 2019 war ich für das Nachwuchsleistungszentrum-Saar der SV-Elversberg zuständig und hatte das Glück, die U19 bei ihrem Meistertitel in der Regionalliga Südwest zu unterstützen. Mein Interesse für Physiotherapie stammt aus meiner eigenen Zeit als Leistungssportler. Als Ringer war ich von 2003-2010 sowohl im Saarland als auch national aktiv und erfolgreich. Auch wenn es trotz vieler Mühen nicht bis zum Spitzensport gereicht hat, konnte ich in dieser Zeit viele Eindrücke sammeln. In den Jahren 2018-2020 war ich als Linebacker bei den Saarland Hurricanes aktiv und konnte dort 2019 die Vizemeisterschaft in der 2. Bundesliga feiern.',
  'In meiner heutigen Funktion als Physiotherapeut habe ich mit meinen Erfahrungen aus dem Leistungssport und den Erkenntnissen aus dem internationalen Studium ein Konzept entwickelt, mit dem wir versuchen die Lebensqualität eines jeden Menschen zu steigern oder zurückzuerlangen. Die Kernessenz dieses Konzeptes liegt in der individuellen ganzheitlichen Betrachtung des Problems und dem dazu entwickelten Lösungsansatz, der dem Patienten die Möglichkeit gibt sein Problem selbst zu lösen.',
];

export const carstenClosing = 'Ich freue mich darauf, mit Ihnen gemeinsam Ziele zu erreichen!';

// Quals verbatim aus mitarbeiter/püttlingen
export const carstenQuals = [
  'Staatl. gepr. Physiotherapeut',
  'Bachelor of Science Physiotherapy (NL)',
  'Sektoraler Heilpraktiker (Physiotherapie)',
  'Krankengymnastik am Gerät',
  'Sportphysiotherapie',
];

export interface VitaItem { years: string; title: string; detail: string }
export const sportVita: VitaItem[] = [
  { years: '2003 – 2010', title: 'Ringen', detail: 'im Saarland und national aktiv' },
  { years: '2018 / 2019', title: 'NLZ-Saar, SV Elversberg', detail: 'U19 – Meistertitel Regionalliga Südwest' },
  { years: '2018 – 2020', title: 'Saarland Hurricanes · Linebacker', detail: 'Vizemeister 2. Bundesliga 2019' },
];

// ── Kompetenzbereiche / Zulassungen (verbatim Labels aus leistungen.txt) ──
export interface Kompetenz { label: string; note: string; icon: string }
export const kompetenzen: Kompetenz[] = [
  { label: 'Neurologie', note: 'Schlaganfall, Parkinson, Multiple Sklerose u. a.', icon: 'Brain' },
  { label: 'Orthopädie', note: 'Beschwerden am Bewegungsapparat', icon: 'Bone' },
  { label: 'Chirurgie', note: 'Begleitung vor und nach Eingriffen', icon: 'Stethoscope' },
  { label: 'Pädiatrie', note: 'Therapie ab dem Säuglingsalter', icon: 'Baby' },
  { label: 'Chronische Schmerztherapie', note: 'inkl. Bewegungsangst (Kinesiophobie)', icon: 'Activity' },
  { label: 'Leistungssport', note: 'Profis und Nachwuchs', icon: 'Medal' },
];

// ── L.I.G.H.T.-Konzept (verbatim aus konzept.txt) ──
export const light = {
  letters: [
    { l: 'L', word: 'Langanhaltende' },
    { l: 'I', word: 'Individualisierte' },
    { l: 'G', word: 'Ganzheitliche' },
    { l: 'H', word: 'Heil' },
    { l: 'T', word: 'Therapie' },
  ],
  intro:
    'Unser L.I.G.H.T-Konzept basiert auf der ganzheitlichen Betrachtung eines Problems, welches den Menschen in seiner Lebensqualität maßgeblich einschränkt. Hierbei spielt es keine Rolle, ob dies ein akutes oder ein chronisches Problem ist. Das Ziel der Therapie ist es, mit dem Patienten gemeinsam Lösungsstrategien zu entwickeln und aktiv umzusetzen, sodass er langfristig seine Lebensqualität steigert und diese auch selbstständig aufrecht erhalten kann.',
  stages: [
    {
      n: '01', title: 'Analyse des Problems',
      body: 'Um den optimalen Behandlungsplan erstellen zu können, ist es zu Beginn unabdingbar, ein genaues Bild der Problematik zu bekommen. Hierbei ist wichtig, dass es sich dabei nicht ausschließlich um die Struktur dreht. Es ist notwendig, das Problem ganzheitlich zu betrachten, um Zusammenhänge aus Umwelt, Persönlichkeit und Körper zu finden, welche in Summe das Problem kreieren.',
      goal: 'Die Bildung eines hochwertigen Behandlungsplans, den der Patient aktiv mitgestaltet.',
    },
    {
      n: '02', title: 'Vermittlung von Wissen und Planumsetzung',
      body: 'Diese Stufe beschreibt die Umsetzung des in Stufe 1 ausgearbeiteten Plans. Hierbei steht vor allem die theoretische wie auch praktische Schulung des Patienten im Vordergrund. Es gestaltet sich für jeden Menschen einfacher, sein Problem zu lösen und damit umzugehen, wenn er weiß, wieso und weshalb es existiert.',
      goal: 'Dem Patienten verständlich machen, was sein Problem für ihn bedeutet und wie er es aktiv lösen kann.',
    },
    {
      n: '03', title: 'Aktive Umsetzung',
      body: 'Die 3. Stufe steht ganz im Zeichen des aktiven Coachings. Durch den aktiven Austausch der Probleme, die sich bei der Umsetzung im privaten Umfeld ergeben, sowie passende Lösungsansätze in Zusammenarbeit mit unseren Therapeuten, wird eine langanhaltende Lösung erreichbar und auf andere Einschränkungen übertragbar.',
      goal: 'Das gesetzte Ziel durch aktive Mitarbeit erreichen - und das Selbstbewusstsein stärken, eigene Probleme eigenständig zu lösen.',
    },
    {
      n: '04', title: 'Langfristiges Coaching',
      body: 'In der 4. Stufe haben Sie das Ziel bereits erreicht. Daher geht es hier vor allem um Nachhaltigkeit. Vielleicht möchten Sie für die Zukunft einen kompetenten Partner an Ihrer Seite, um die neu gewonnene Lebensqualität zu sichern. Wir unterstützen Sie mit digitalen Übungsplänen sowie jederzeit buchbaren Beratungs- und Trainingsstunden.',
      goal: 'Sie wollen hoch hinaus und benötigen den richtigen Plan? Wir unterstützen Sie gerne bei größeren Zielen - sprechen Sie uns einfach darauf an.',
    },
  ],
  evaluation:
    'Um die bestmögliche Therapie zu gewährleisten, überprüfen wir gemeinsam mit dem Patienten während der Therapie, ob wir uns auf dem richtigen Weg befinden. Dafür werden objektive Fragebögen verwendet, mit denen die Reduktion der Beschwerden bis zur vollen Zielerreichung gemessen und beurteilt wird. Darüber hinaus stehen wir mit digitalen Datenbanken in Verbindung, um therapeutisch wie diagnostisch auf hohem Niveau für Sie da zu sein.',
};

// Direktzugang / sektoraler Heilpraktiker (verbatim aus leistungen.txt)
export const direktzugang = {
  title: 'Beratung ohne ärztliche Verordnung',
  body: 'Physiotherapeutische Beratung ohne ärztliche Verordnung durch Direktzugang aufgrund sektoralem Heilpraktiker, beschränkt auf das Gebiet der Physiotherapie (Dauer 30 Min.).',
  light: 'Die L.I.G.H.T.-Konzepttherapie auf evidenzbasierter Basis nach GebüH, auf Grundlage des sektoralen Heilpraktikers (Physiotherapie) und des Bachelorstudiums an der Thim van der Laan Universität für Physiotherapie in Nieuwegein (Niederlande): beinhaltet Screening, Anamnese, Diagnostik, Beratung sowie Behandlungsplan, Behandlung und Evaluation (Dauer: je ca. 60 Min.).',
  note: 'Beratung und Auskunft zu den Preisen erhalten Sie vor Ort oder telefonisch.',
};

// ── Leistungen: Übersicht + 6 Detailseiten ──
export interface ServiceSection { heading?: string; paras?: string[]; list?: string[]; listLabel?: string }
export interface Service {
  slug: string;
  nav: string;          // verbatim Navigationsname
  title: string;        // Seitentitel
  eyebrow: string;
  icon: string;
  image: string;
  lead: string;
  author?: string;      // abweichende Stimme (z. B. Franziska Strauß)
  authorRole?: string;
  sections: ServiceSection[];
}

export const services: Service[] = [
  {
    slug: 'therapie-ab-der-geburt',
    nav: 'Therapie ab der Geburt',
    title: 'Physiotherapie ab dem Säuglingsalter',
    eyebrow: 'Pädiatrie',
    icon: 'Baby',
    image: '/images/svc-paediatrie.webp',
    lead: 'Je früher man beginnt, desto größer ist der spätere Erfolg - und je aktiver Eltern zu Hause mitüben, desto besser.',
    author: 'Franziska Strauß',
    authorRole: 'Physiotherapeutin mit Schwerpunkt Pädiatrie',
    sections: [
      {
        paras: [
          'Mein Name ist Franziska Strauß und ich bin seit 2016 examinierte Physiotherapeutin. Neben der Fortbildung zur manuellen Lymphtherapeutin habe ich im Mai 2022 meine Ausbildung zur Vojta-Therapeutin für Säuglinge, Kinder und Erwachsene abgeschlossen.',
          'Bevor ich mich entschieden habe, Kindertherapeutin zu werden, habe ich bereits mit großer Begeisterung in meiner Freizeit als Musikerin die Kinder- und Jugendarbeit geleitet. Deshalb ist es schön, mein Hobby in meinen Beruf integrieren zu können.',
        ],
      },
      {
        heading: 'Was bedeutet Pädiatrie?',
        paras: [
          'Die Pädiatrie umfasst die Erkrankungen vom extremen Frühchen bis zur Vollendung des 18. Lebensjahres. Leider gibt es bei Säuglingen oder Kleinkindern immer wieder Krankheitsbilder, die von Geburt an bestehen oder sich erst später zeigen und das motorische System des Kindes betreffen.',
        ],
        listLabel: 'Dazu gehören unter anderem:',
        list: ['Schiefhals', 'Knickfuß und weitere Fußfehlstellungen', 'allgemeine Asymmetrien', 'Koordinationsstörungen', 'verzögerte oder gestörte motorische Entwicklung'],
      },
      {
        paras: ['Diese Auffälligkeiten sollten bereits in den ersten Jahren behandelt werden, sodass im späteren Alter ein minimales Risiko für Folgeschäden besteht. Darüber hinaus gibt es schwerere Krankheitsbilder, bei denen eine dauerhafte Therapie notwendig sein kann.'],
        listLabel: 'Dazu zählen unter anderem:',
        list: ['jegliche Formen von Paresen (Lähmungen)', 'Spastiken', 'Skoliose (Verformung der Wirbelsäule)', 'Folgen durch Komplikationen vor, während oder nach der Geburt', 'Folgen einer Frühgeburt'],
      },
      {
        heading: 'Die Vojta-Therapie',
        paras: [
          'Die Vojta-Therapie besteht daraus, bestimmte Reflexzonen am Körper auszulösen, die neuronale Signale an das zentrale Nervensystem senden, um von dort in der Muskulatur ein idealmotorisches Bewegungsmuster anzubahnen. Diese Teilmuster - z. B. Greifen, Stützen, Kriechen, Krabbeln, Hinstellen oder Gehen - werden im Gehirn gespeichert, sodass das Kind sie jederzeit wieder abrufen kann.',
          'Jeder neue Input an die Muskulatur ist für Säuglinge, Kinder wie auch Erwachsene Anstrengung - vor allem, weil er nicht bewusst gesteuert wird - und kann daher wie eine „Sporteinheit" gesehen werden. Da die Kleinen ihre Überforderung genauso ausdrücken, als wären sie müde oder hätten Hunger, kann es in der Therapie oder beim Üben zu Hause durchaus auch mal laut werden.',
        ],
        listLabel: 'Zwei Grundregeln der Therapie:',
        list: ['Je früher man damit anfängt, desto größer ist der spätere Erfolg.', 'Je aktiver Eltern zu Hause mit ihren Kindern üben, desto größer ist der spätere Erfolg.'],
      },
    ],
  },
  {
    slug: 'sportphysiotherapie-nachwuchs',
    nav: 'Sportphysiotherapie & Nachwuchs',
    title: 'Sportphysiotherapie und Nachwuchs',
    eyebrow: 'Leistungssport',
    icon: 'Medal',
    image: '/images/svc-sport.webp',
    lead: 'Betreuung von Leistungssportlern - und von denen, die noch welche werden wollen. Aus eigener Erfahrung im Leistungssport, mit Zugang zu internationalen wissenschaftlichen Datenbanken.',
    sections: [
      {
        heading: 'Die 7 „O’s" im Leistungssport',
        paras: ['Aufgrund der individuellen Erfahrung und der stetigen Weiterbildung über den Zugang zu internationalen wissenschaftlichen Datenbanken - vor allem in den Bereichen Leistungsoptimierung, Regeneration und Prävention - haben sich für uns folgende Kernpunkte herauskristallisiert:'],
        list: ['Optimale Leistung', 'Optimale Regeneration', 'Optimale Rehabilitation', 'Optimale Prävention und Vorbereitung', 'Optimale Motivation', 'Optimale Kommunikation', 'Optimale interdisziplinäre Kooperation'],
      },
      {
        heading: 'Optimale Leistung',
        paras: [
          'Die physiotherapeutische Betreuung von Leistungssportlern spielt eine entscheidende Rolle bei der Maximierung ihrer Leistungsfähigkeit. Zum einen geht es um Verletzungsverhütung durch die Förderung der Regeneration sowie um die Betreuung während kräftezehrender Phasen einer Saison, Wettkampfvorbereitung oder Wettkampfphase.',
          'Darüber hinaus coachen wir den Sportler dabei, selbst die perfekten Bedingungen für seine Regeneration und Leistungsfähigkeit zu bilden und zu erhalten - körperlich wie mental. Dazu erstellen wir individuelle Trainingspläne, die per Video an den Sportler gesendet werden und ihn bei der Optimierung seiner Leistung oder bei der Rehabilitation nach einer Verletzung unterstützen.',
        ],
      },
      {
        heading: 'Optimale Regeneration',
        paras: [
          'Die Regeneration spielt eine übergeordnete Rolle. Wir betreuen unsere Sportler nach den Spielen individuell: Kryo-Manschetten für überlastete oder angeschlagene Gelenke und eine Kompressionstherapie bereits in der Kabine. Im Verlauf der Woche können die Sportler jederzeit zur passiven apparativen Regenerationsbehandlung in die Praxen kommen - und dabei weitere körperliche Themen besprechen und behandeln lassen.',
        ],
      },
      {
        heading: 'Optimale Rehabilitation',
        paras: [
          'Verletzungen gehören zum Leben eines Leistungssportlers. An erster Stelle steht für uns die interprofessionelle Kommunikation mit Ärzten, Sportwissenschaftlern, Trainern und vor allem dem Sportler selbst, um ein optimales Ergebnis zu erzielen und ihn zum richtigen Zeitpunkt wieder voll angreifen zu lassen.',
          'Wir arbeiten bereits in der Akutphase mit modernen Geräten und aktuellem wissenschaftlichem Wissen. In der aktiven Rehabilitation bereiten wir den Sportler bestmöglich auf den Wiedereinstieg ins Athletiktraining vor. Videogestützte Trainingspläne, die per Handy abrufbar sind, lassen ihn auch außerhalb der Therapie aktiv mitarbeiten.',
        ],
      },
      {
        heading: 'Optimale Prävention und Vorbereitung',
        paras: [
          'Prävention ist entscheidend, um Verletzungen zu vermeiden und die langfristige Leistungsfähigkeit zu sichern. In unseren Praxen wenden wir verschiedene Untersuchungsmethoden an, um funktionelle Risikofaktoren zu finden, und erarbeiten gemeinsam Lösungswege. Dazu gehören unter anderem der Functional-Movement-Screen, Haltungs- und Ganganalyse, Neuroathletik sowie Untersuchungen zu Kraft, Ausdauer und muskulärer Belastbarkeit.',
        ],
      },
      {
        heading: 'Optimale Motivation, Kommunikation und Kooperation',
        paras: [
          'Im Leistungssport ist Motivation der Schlüssel zum Erfolg: klare Ziele, Leidenschaft, ein unterstützendes Umfeld, Selbstmotivation und Resilienz, um aus Rückschlägen gestärkt hervorzugehen. Physiotherapeuten sind dabei oft wichtige Anlaufstationen - auch, wenn es einmal nicht um körperliche Themen geht.',
          'Ein effektiver Austausch von Informationen ist essenziell - innerhalb des Teams ebenso wie zwischen Sportlern, Trainern und dem erweiterten Staff. Die interdisziplinäre Zusammenarbeit von Sportmedizin, Physiotherapie, Ernährung, Psychologie und Training ermöglicht eine ganzheitliche Betreuung, die Verletzungen minimiert, die Erholung optimiert und die langfristige Leistungsfähigkeit steigert.',
        ],
      },
    ],
  },
  {
    slug: 'chronischer-schmerz',
    nav: 'Chronischer Schmerz',
    title: 'Therapie bei chronischem Schmerz',
    eyebrow: 'Chronische Schmerztherapie',
    icon: 'Activity',
    image: '/images/svc-schmerz.webp',
    lead: 'Chronische Schmerzen können das tägliche Leben erheblich beeinträchtigen. Physiotherapie hat sich als wirkungsvolle Methode zur Linderung erwiesen - wenn der Patient aktiv eingebunden ist.',
    sections: [
      {
        heading: 'Chronische Schmerzen',
        paras: ['Durch gezielte Übungen und Techniken können wir die Beweglichkeit verbessern, die Muskulatur stärken und den Schmerz reduzieren. Ein individueller Therapieplan, in Abstimmung mit dem behandelnden Arzt, kann helfen, die Lebensqualität nachhaltig zu steigern. Wichtig ist, dass Patienten aktiv in den Therapieprozess eingebunden werden und regelmäßig an den empfohlenen Übungen teilnehmen, um langfristige Erfolge zu erzielen.'],
      },
      {
        heading: 'Bewegungsangst (Kinesiophobie)',
        paras: ['Chronischer Schmerz kann von Bewegungsangst begleitet sein - Betroffene entwickeln eine Scheu vor körperlicher Aktivität. Das kann zu einem Teufelskreis führen: Die Vermeidung von Bewegung schwächt die Muskulatur und verstärkt die Schmerzen. Diesen Kreislauf zu durchbrechen, ist entscheidend. Ein schrittweiser, an die individuellen Bedürfnisse angepasster Ansatz hilft, Ängste abzubauen und die Lebensqualität trotz chronischer Schmerzen zu verbessern.'],
      },
      {
        heading: 'Therapieansätze',
        paras: ['Die kognitive funktionelle Therapie (CFT) ist ein vielversprechender Ansatz. Sie verbindet kognitive Verhaltenstherapie (CBT) mit funktionellen Techniken, um Patienten zu helfen, ihre Schmerzen besser zu verstehen und zu bewältigen. Ziel ist es, negative Denkmuster zu erkennen und zu verändern und gleichzeitig körperliche Aktivität und Funktion zu verbessern - damit Patienten ihre Schmerzen wirksamer managen können.'],
      },
    ],
  },
  {
    slug: 'neurologischer-bereich',
    nav: 'Neurologischer Bereich',
    title: 'Behandlung in der Neurologie',
    eyebrow: 'Neurologie',
    icon: 'Brain',
    image: '/images/svc-neuro.webp',
    lead: 'Physiotherapie verbessert oder erhält die Funktionsfähigkeit und Lebensqualität von Menschen mit neurologischen Erkrankungen - bei Schlaganfall, Parkinson, Multipler Sklerose und vielem mehr.',
    sections: [
      {
        paras: ['Durch gezielte Übungen und Techniken können wir Muskelverspannungen reduzieren, die Mobilität fördern und die Körperkontrolle verbessern. Wir arbeiten eng mit den Patienten zusammen, erstellen individuelle Therapiepläne und überwachen die Fortschritte - unter anderem mit Bewegungsübungen, Gleichgewichtstraining und Gangschulung.'],
      },
      {
        heading: 'Die Bobath-Therapie',
        paras: [
          'Heute wird die Bobath-Therapie als neurophysiologischer Ansatz bei allen Erkrankungen des zentralen Nervensystems angewendet. Ein zentraler Grundsatz: „Zeit ist Hirn." Je früher und intensiver man mit der Therapie beginnt, desto höher sind die Chancen, über die Neuroplastizität des Gehirns - seine Fähigkeit, sich neu zu strukturieren - verloren gegangene Funktionen wieder neu zu lernen.',
        ],
      },
      {
        heading: 'Einzeltherapie und gerätegestütztes Training',
        paras: ['In unserer Praxis verbinden wir die individuelle neurologische Behandlung mit gerätegestütztem Krafttraining. Ziel ist es, die isoliert wiedererlernten Bewegungen in komplexe Bewegungsmuster zu integrieren, sodass der Patient die funktionellen Grundbewegungen und Aufgaben des Alltags wieder ohne Hilfe ausführen kann.'],
        listLabel: 'Die Vorgehensweise in vier Schritten:',
        list: ['Analysieren - problematische Handlungen und ihren Einfluss auf den Alltag erkennen', 'Isolieren - die Handlung in durchführbare Subhandlungen zerlegen', 'Reinervieren - Subhandlungen mit Führungshilfen anbahnen und beüben', 'Reintegrieren - die Subhandlungen zur ursprünglichen Handlung zusammenführen'],
      },
      {
        heading: 'Mehr als Beweglichkeit',
        paras: ['Krafttraining verbessert Kraft, Beweglichkeit, Ausdauer, Schnelligkeit und Koordination, lindert Schmerzen und macht den Körper belastbarer und das mentale System resilienter. Im geschützten Rahmen der Einzeltherapie gewinnt der Patient neues Selbstbewusstsein; in der Trainingstherapie wird er progressiv an selbstständiges Arbeiten herangeführt - mit videogestützten Programmen für zu Hause und gezieltem Training zum Abbau von Sturzrisiko und Angst.'],
      },
    ],
  },
  {
    slug: 'op-vermeidung',
    nav: 'OP-Vermeidung',
    title: 'OP-Vermeidung',
    eyebrow: 'Prävention',
    icon: 'ShieldCheck',
    image: '/images/svc-prevention.webp',
    lead: 'Oft ist Vorbeugen der beste Weg. Physiotherapeuten wenden nicht-invasive Techniken an, um Schmerzen zu lindern und die Funktion wiederherzustellen - und können so die Notwendigkeit eines Eingriffs verringern.',
    sections: [
      {
        heading: 'Gesunde Praktiken, die zu langfristiger Gesundheit beitragen',
        list: ['Regelmäßige Gesundheitschecks und Vorsorgeuntersuchungen', 'Gesunde Lebensgewohnheiten - ausgewogene Ernährung, Bewegung, ausreichend Schlaf', 'Stressmanagement, etwa durch Entspannungsübungen', 'Verantwortungsbewusster Umgang mit Medikamenten', 'Vermeidung von Risikofaktoren wie Rauchen und übermäßigem Alkohol', 'Frühe Intervention bei auftretenden Symptomen'],
      },
      {
        paras: [
          'Bei auftretenden Symptomen sollte man nicht zögern, frühzeitig Hilfe in Anspruch zu nehmen - das kann oft helfen, schwerwiegendere Probleme zu verhindern. Durch gezielte Übungen und manuelle Therapie können muskuloskelettale Probleme behandelt werden, die andernfalls einen Eingriff erfordern könnten.',
          'Ein individuell angepasster physiotherapeutischer Ansatz kann nicht nur die Genesung unterstützen, sondern auch langfristige Vorteile bieten. Indem wir diese Praktiken in unseren Lebensstil integrieren, tragen wir proaktiv dazu bei, unsere Gesundheit zu erhalten.',
        ],
      },
    ],
  },
  {
    slug: 'zeit-nach-unfall-operation',
    nav: 'Nach Unfall oder Operation',
    title: 'Der Weg zurück nach Unfall oder Operation',
    eyebrow: 'Rehabilitation',
    icon: 'HeartPulse',
    image: '/images/svc-nachop.webp',
    lead: 'Eine Operation kann eine lange Genesungszeit mit sich bringen. Physiotherapie ist ein entscheidender Schritt zurück zu Unabhängigkeit, Mobilität und Lebensfreude.',
    sections: [
      {
        paras: ['Nach einer Operation stehen Patienten häufig vor körperlichen und emotionalen Herausforderungen: Schmerzen, Bewegungseinschränkungen, Muskelschwäche und das Gefühl der Abhängigkeit. Die Arbeit beginnt oft unmittelbar nach dem Eingriff - mit einem individuellen Behandlungsplan, der auf die Bedürfnisse und Ziele des Patienten zugeschnitten ist.'],
      },
      {
        heading: 'Worauf wir uns konzentrieren',
        list: [
          'Schmerzmanagement - mit manueller Therapie, Übungen und weiteren Methoden',
          'Wiederherstellung der Beweglichkeit der betroffenen Gelenke und Muskeln',
          'Muskelaufbau und Stärkung für mehr Mobilität und Selbstständigkeit',
          'Verbesserung der Funktion - Gehen, Treppensteigen, Ankleiden',
          'Prävention von Komplikationen wie Thrombosen',
          'Mentale Unterstützung und Ermutigung auf dem Weg zum Ziel',
        ],
      },
      {
        paras: ['Mit Geduld, Engagement und professioneller Unterstützung können Patienten den Weg zurück zu einem erfüllten und aktiven Leben finden.'],
      },
    ],
  },
];

export const servicesBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
