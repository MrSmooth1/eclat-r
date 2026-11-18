// Paramètres de la demande de réservation.
// ⚠ Les jours et heures ci-dessous sont des PRÉFÉRENCES proposées au client,
//   pas des disponibilités réelles. Horaires définitifs à fournir par l'entreprise.
import { readEnv } from './env.js';

export const bookingSettings = {
  timeZone: 'Africa/Douala',
  // 0 = dimanche, 1 = lundi … 6 = samedi
  openDays: [1, 2, 3, 4, 5, 6],
  timeSlots: ['08:00', '10:00', '12:00', '14:00', '16:00'],
  // Délai minimal entre maintenant (heure de Douala) et le créneau souhaité.
  minLeadHours: 3,
  // Horizon maximal de la demande.
  maxDaysAhead: 90,
};

// Calendrier externe facultatif (SimplyBook.me ou Cal.com).
export const bookingProvider = {
  type: readEnv('VITE_BOOKING_PROVIDER', ''), // 'simplybook' | 'calcom' | ''
  url: readEnv('VITE_BOOKING_URL', ''),
};

export const providerLabel = { simplybook: 'SimplyBook.me', calcom: 'Cal.com' };
