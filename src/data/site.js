// ─────────────────────────────────────────────────────────────
// Coordonnées et paramètres de l'entreprise.
// C'est ici (ou dans les variables d'environnement) que l'on
// modifie les informations affichées sur tout le site.
// ─────────────────────────────────────────────────────────────
import { readEnv, readBool } from './env.js';

export const site = {
  name: 'Éclat Résidences',
  slogan: 'La propreté qui valorise vos résidences',
  city: 'Douala',
  country: 'Cameroun',
  locale: 'fr-FR',
  timeZone: 'Africa/Douala',
  currency: 'XAF',
  currencyLabel: 'FCFA',

  // Domaine prévu (enregistrement à confirmer).
  url: readEnv('VITE_SITE_URL', 'https://www.eclatresidences.com').replace(/\/$/, ''),
  displayDomain: 'www.eclatresidences.com',

  // Adresse prévue. Ne l'afficher comme « active » qu'une fois la boîte créée.
  email: 'contact@eclatresidences.com',
  emailActive: readBool('VITE_CONTACT_EMAIL_ACTIVE', false),

  // Numéro WhatsApp : chiffres uniquement, indicatif inclus (ex. 2376XXXXXXXX).
  // Vide = tous les boutons WhatsApp sont masqués.
  whatsappNumber: readEnv('VITE_WHATSAPP_NUMBER', '').replace(/\D/g, ''),
  whatsappMessage: 'Bonjour Éclat Résidences, je souhaite obtenir des informations.',

  // Réseaux sociaux : laisser vide tant qu'ils n'existent pas.
  socials: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },

  // Horaires d'ouverture — non fournis : à compléter.
  openingHours: null, // ex. 'Du lundi au samedi, de 8 h à 18 h'

  // Zones couvertes — non fournies : à compléter.
  serviceAreas: [], // ex. ['Bonanjo', 'Akwa', 'Bonapriso', 'Makepe']
  serviceAreaFallback: 'Douala et ses environs (quartiers couverts à préciser lors de la demande)',

  features: {
    // Grille tarifaire et simulateur : publication soumise à validation.
    publishPricing: readBool('VITE_PUBLISH_PRICING', false),
    // Avis clients : désactivés tant qu'il n'existe pas de véritables avis autorisés.
    showReviews: false,
  },
};

export const whatsappLink = (message = site.whatsappMessage) =>
  site.whatsappNumber
    ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;
