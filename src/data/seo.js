// Titres et descriptions propres à chaque page (utilisés à l'exécution
// et par le script de pré-rendu pour le référencement).
export const pages = {
  '/': {
    title: 'Éclat Résidences | Entretien ménager et suivi de résidences à Douala',
    description:
      'Entretien ménager résidentiel et commercial, suivi de résidences à distance à Douala. Demandez un devis ou une réservation, validée par notre équipe.',
  },
  '/a-propos': {
    title: 'À propos | Éclat Résidences',
    description:
      "Découvrez Éclat Résidences, sa mission et ses valeurs : qualité, transparence, discrétion et fiabilité, à Douala au Cameroun.",
  },
  '/services': {
    title: 'Nos services | Éclat Résidences',
    description:
      'Entretien ménager résidentiel, entretien commercial de bureaux et commerces, suivi de résidences pour propriétaires à distance à Douala.',
  },
  '/solutions': {
    title: 'Nos solutions | Éclat Résidences',
    description:
      'Entretien ponctuel, entretien régulier ou suivi à distance : des prestations adaptées à vos espaces, à votre rythme et à vos besoins.',
  },
  '/contact': {
    title: 'Contact et devis | Éclat Résidences',
    description:
      'Contactez Éclat Résidences à Douala pour une information ou un devis personnalisé en entretien ménager et suivi de résidences.',
  },
  '/reserver': {
    title: 'Demande de réservation | Éclat Résidences',
    description:
      "Choisissez un service, une date et une heure souhaitées. Votre demande est validée manuellement par l'équipe Éclat Résidences.",
  },
  '/mentions-legales': {
    title: 'Mentions légales | Éclat Résidences',
    description: 'Mentions légales du site Éclat Résidences.',
  },
  '/confidentialite': {
    title: 'Politique de confidentialité | Éclat Résidences',
    description: 'Comment Éclat Résidences traite les données transmises via les formulaires du site.',
  },
  '404': {
    title: 'Page introuvable | Éclat Résidences',
    description: "La page demandée n'existe pas ou a été déplacée.",
    noindex: true,
  },
};

export const indexedRoutes = Object.keys(pages).filter((p) => p.startsWith('/'));
