// Gestion des dates au fuseau Africa/Douala, quel que soit le pays du visiteur.
// Les dates sont manipulées sous forme de chaînes « AAAA-MM-JJ » pour éviter
// toute conversion implicite vers le fuseau du navigateur.
import { bookingSettings } from '../data/booking.js';

const TZ = bookingSettings.timeZone;

function partsInZone(date, timeZone = TZ) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, minutes: Number(p.hour) * 60 + Number(p.minute) };
}

/** Date du jour à Douala (« AAAA-MM-JJ »). */
export const todayInDouala = (now = new Date()) => partsInZone(now).date;

/** Minutes écoulées depuis minuit, heure de Douala. */
export const minutesNowInDouala = (now = new Date()) => partsInZone(now).minutes;

const toUtcNoon = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
};

export const isIsoDate = (value) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) && toUtcNoon(value).toISOString().slice(0, 10) === value;

export function addDays(iso, days) {
  const d = toUtcNoon(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export const weekdayOf = (iso) => toUtcNoon(iso).getUTCDay();

const slotMinutes = (slot) => {
  const [h, m] = slot.split(':').map(Number);
  return h * 60 + m;
};

/** Créneaux proposables pour une date donnée (préférences, pas des disponibilités). */
export function slotsForDate(iso, now = new Date(), settings = bookingSettings) {
  if (!isIsoDate(iso)) return [];
  const today = todayInDouala(now);
  if (iso < today) return [];
  if (iso > addDays(today, settings.maxDaysAhead)) return [];
  if (!settings.openDays.includes(weekdayOf(iso))) return [];
  if (iso > today) return [...settings.timeSlots];
  const limit = minutesNowInDouala(now) + settings.minLeadHours * 60;
  return settings.timeSlots.filter((s) => slotMinutes(s) >= limit);
}

/** Bornes du sélecteur de date (min = aujourd'hui à Douala). */
export function dateBounds(now = new Date(), settings = bookingSettings) {
  const today = todayInDouala(now);
  return { min: today, max: addDays(today, settings.maxDaysAhead) };
}

/**
 * Vérifie une date souhaitée. Retourne un message d'erreur ou null.
 */
export function validateBookingDate(iso, time, now = new Date(), settings = bookingSettings) {
  if (!iso) return 'Choisissez une date souhaitée.';
  if (!isIsoDate(iso)) return 'Date invalide.';
  const today = todayInDouala(now);
  if (iso < today) return 'Cette date est déjà passée (heure de Douala).';
  if (iso > addDays(today, settings.maxDaysAhead))
    return `Les demandes sont possibles jusqu'à ${settings.maxDaysAhead} jours à l'avance.`;
  if (!settings.openDays.includes(weekdayOf(iso)))
    return "Nous n'intervenons pas ce jour-là. Choisissez un autre jour.";
  if (time !== undefined) {
    if (!time) return 'Choisissez une heure souhaitée.';
    if (!slotsForDate(iso, now, settings).includes(time))
      return "Cette heure n'est plus proposée pour cette date. Choisissez un autre créneau.";
  }
  return null;
}

export function formatDateFr(iso) {
  if (!isIsoDate(iso)) return '';
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(toUtcNoon(iso));
}

export const openDaysLabel = (settings = bookingSettings) => {
  const names = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  return settings.openDays.map((d) => names[d]).join(', ');
};
