// Validation côté client (confort de saisie). Le fournisseur de formulaires
// applique ses propres contrôles anti-spam côté serveur ; une validation
// serveur complète nécessitera le backend prévu en phase 2.

export const LIMITS = { name: 80, phone: 25, email: 120, area: 120, message: 2000 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validatePhone(value) {
  const v = (value || '').trim();
  if (!v) return 'Indiquez un numéro de téléphone ou WhatsApp.';
  if (!/^[+\d\s().-]+$/.test(v)) return 'Utilisez uniquement des chiffres, espaces et « + ».';
  const digits = v.replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 15) return 'Numéro incomplet ou trop long.';
  return null;
}

export function validateEmail(value, { required = false } = {}) {
  const v = (value || '').trim();
  if (!v) return required ? 'Indiquez votre adresse e-mail.' : null;
  if (v.length > LIMITS.email || !EMAIL_RE.test(v)) return 'Adresse e-mail invalide.';
  return null;
}

export function validateName(value) {
  const v = (value || '').trim();
  if (v.length < 2) return 'Indiquez votre nom.';
  if (v.length > LIMITS.name) return 'Nom trop long.';
  return null;
}

export function validateRequired(value, message, max) {
  const v = (value || '').trim();
  if (!v) return message;
  if (max && v.length > max) return `Maximum ${max} caractères.`;
  return null;
}

export function validateContact(values, allowedServices) {
  const errors = {
    name: validateName(values.name),
    phone: validatePhone(values.phone),
    email: validateEmail(values.email),
    service: allowedServices.includes(values.service) ? null : 'Choisissez un service.',
    area: validateRequired(values.area, 'Indiquez votre quartier ou une adresse approximative.', LIMITS.area),
    message:
      (values.message || '').trim().length < 10
        ? 'Décrivez votre besoin en quelques mots (10 caractères minimum).'
        : validateRequired(values.message, '', LIMITS.message),
    consent: values.consent ? null : 'Votre accord est nécessaire pour traiter la demande.',
  };
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => v));
}

/** Champ piège anti-robots : rempli = soumission ignorée. */
export const isBot = (values) => Boolean(values.website && String(values.website).trim());
