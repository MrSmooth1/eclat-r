// Tarifs clients 2026 — source : « Tarifs_Clients_Eclat_Residences_2026.pdf ».
// Montants en FCFA (XAF). Entretien résidentiel standard uniquement.
// Le commercial et le suivi à distance restent sur devis.

export const housingTypes = [
  { id: 'studio', label: 'Studio' },
  { id: '1ch', label: 'Appartement 1 chambre' },
  { id: '2ch', label: 'Appartement 2 chambres' },
  { id: '3ch', label: 'Appartement 3 chambres' },
  { id: '4ch', label: 'Appartement 4 chambres' },
];

export const plans = [
  {
    id: 'ponctuel',
    tab: 'Ménage ponctuel',
    name: 'Ponctuel',
    cadence: '1 intervention',
    interventions: 1,
    perWeek: null,
    note: 'Prix pour une intervention.',
  },
  {
    id: 'regulier',
    tab: '2 fois / semaine',
    name: 'Éclat Régulier',
    cadence: '2 fois par semaine · 8 ménages / 4 semaines',
    interventions: 8,
    perWeek: 2,
    note: 'Forfait de 8 interventions sur 4 semaines (28 jours).',
  },
  {
    id: 'serenite',
    tab: '3 fois / semaine',
    name: 'Éclat Sérénité',
    cadence: '3 fois par semaine · 12 ménages / 4 semaines',
    interventions: 12,
    perWeek: 3,
    note: 'Forfait de 12 interventions sur 4 semaines (28 jours).',
  },
];

// prices[housingId][planId]
export const prices = {
  studio: { ponctuel: 14000, regulier: 104000, serenite: 144000 },
  '1ch': { ponctuel: 17000, regulier: 128000, serenite: 180000 },
  '2ch': { ponctuel: 22000, regulier: 160000, serenite: 228000 },
  '3ch': { ponctuel: 27000, regulier: 200000, serenite: 288000 },
  '4ch': { ponctuel: 35000, regulier: 264000, serenite: 372000 },
};

export const included = [
  { title: "Main-d'œuvre", text: 'Comprise dans le tarif.', icon: 'Users' },
  { title: 'Produits de nettoyage', text: 'Fournis par notre équipe.', icon: 'SprayCan' },
  { title: "Déplacement de l'équipe", text: "Inclus dans la zone d'intervention standard.", icon: 'MapPin' },
  { title: 'Sans engagement', text: 'Planning convenu ensemble, renouvellement avec votre accord.', icon: 'CalendarCheck' },
];

export const conditions = [
  'Forfaits sans engagement, à tarif fixe pour 4 semaines (28 jours), avec un planning convenu avec le client.',
  'Paiement avant le début du cycle, après validation de la demande et du devis.',
  'Renouvellement avec accord du client.',
  'Grand ménage, prestations spéciales et déplacement hors zone standard : sur devis.',
  'Tout supplément est communiqué avant confirmation de la réservation.',
  "Ces prix concernent l'entretien résidentiel standard. L'entretien commercial et le suivi à distance sont sur devis.",
];
