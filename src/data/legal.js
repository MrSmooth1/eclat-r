// Informations légales — À COMPLÉTER par l'entreprise.
// Tant qu'une valeur est vide, le site affiche « [À compléter] » à sa place.
export const legal = {
  companyName: '', // Raison sociale exacte
  legalForm: '', // ex. SARL, SA, Établissement…
  capital: '', // Capital social, le cas échéant
  rccm: '', // Numéro RCCM
  niu: '', // Numéro d'identifiant unique (NIU)
  headOffice: '', // Adresse du siège à Douala
  phone: '',
  publicationDirector: '', // Nom du directeur / de la directrice de la publication
  host: {
    name: '', // ex. Netlify, Inc. / Vercel Inc. / hébergeur local
    address: '',
    website: '',
  },
  dataRetention: '', // ex. « 12 mois après le dernier échange »
  lastUpdated: '', // date de dernière mise à jour validée
};

export const TODO = '[À compléter]';
export const fill = (value) => (value && String(value).trim() ? value : TODO);
