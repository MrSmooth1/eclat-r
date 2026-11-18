import residentiel from '../assets/images/service-residentiel.webp';
import commercial from '../assets/images/service-commercial.webp';
import suivi from '../assets/images/service-suivi.webp';

// Textes repris du cahier des charges (ne pas modifier sans validation).
export const services = [
  {
    id: 'residentiel',
    title: 'Entretien ménager résidentiel',
    shortTitle: 'Entretien résidentiel',
    summary: 'Des espaces propres et agréables pour votre confort au quotidien, y compris les logements meublés et locations saisonnières.',
    description:
      'Nettoyage et entretien de maisons, appartements meublés et locations saisonnières : interventions ponctuelles, régulières ou entre deux séjours.',
    image: residentiel,
    imageAlt: "Illustration : agente en polo noir préparant un lit (visuel d'illustration)",
    icon: 'Home',
  },
  {
    id: 'commercial',
    title: 'Entretien ménager commercial',
    shortTitle: 'Entretien commercial',
    summary: 'Des environnements professionnels propres, accueillants et adaptés à votre activité.',
    description:
      'Nettoyage de bureaux, commerces et locaux professionnels, selon les besoins, les horaires et la fréquence souhaités.',
    image: commercial,
    imageAlt: "Illustration : agent en polo noir nettoyant le sol d'un hall (visuel d'illustration)",
    icon: 'Building2',
  },
  {
    id: 'suivi',
    title: 'Suivi de résidences à distance',
    shortTitle: 'Suivi de résidences',
    summary: 'Un accompagnement sérieux pour les propriétaires qui gèrent leur bien à distance.',
    description:
      "Pour les propriétaires absents : supervision de l'entretien, contrôle de l'état des logements, coordination des interventions et comptes rendus selon la formule retenue.",
    image: suivi,
    imageAlt: "Illustration : agente consultant une tablette (visuel d'illustration)",
    icon: 'ClipboardCheck',
  },
];

export const serviceOptions = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: 'autre', label: 'Autre demande / je ne sais pas encore' },
];

export const serviceLabel = (id) =>
  serviceOptions.find((o) => o.value === id)?.label ?? '';

// Page « Nos solutions » — textes du cahier des charges.
export const solutions = [
  {
    id: 'ponctuel',
    pill: 'Ponctuel',
    title: 'Entretien ponctuel',
    text: 'Intervention selon une demande précise.',
    icon: 'Sparkles',
  },
  {
    id: 'regulier',
    pill: 'Régulier',
    title: 'Entretien régulier',
    text: 'Prestations planifiées selon une fréquence convenue.',
    icon: 'CalendarCheck',
  },
  {
    id: 'distance',
    pill: 'À distance',
    title: 'Suivi à distance',
    text: 'Accompagnement personnalisé des propriétaires.',
    icon: 'KeyRound',
  },
];

export const values = [
  {
    title: 'Qualité et rigueur',
    short: 'Qualité',
    caption: 'Un travail soigné',
    text: 'Une attention particulière aux détails pour des prestations soignées.',
    icon: 'Gem',
  },
  {
    title: 'Confiance et transparence',
    short: 'Confiance',
    caption: 'Une relation transparente',
    text: 'Une communication claire et un suivi sérieux, notamment pour les propriétaires à distance.',
    icon: 'Handshake',
  },
  {
    title: 'Respect et discrétion',
    short: 'Discrétion',
    caption: 'Le respect de vos espaces',
    text: 'Le respect des biens, des espaces et de la confidentialité.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Fiabilité et engagement',
    short: 'Fiabilité',
    caption: 'Le respect des engagements',
    text: 'Une organisation rigoureuse, la ponctualité et le respect des engagements.',
    icon: 'Clock',
  },
];
