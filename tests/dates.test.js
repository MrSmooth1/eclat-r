import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  todayInDouala, slotsForDate, validateBookingDate, addDays, weekdayOf, formatDateFr, isIsoDate,
} from '../src/services/dates.js';

const settings = { timeZone: 'Africa/Douala', openDays: [1, 2, 3, 4, 5, 6], timeSlots: ['08:00', '10:00', '12:00', '14:00', '16:00'], minLeadHours: 3, maxDaysAhead: 90 };

test('la date du jour suit Douala, pas le fuseau du visiteur', () => {
  // 23:30 UTC le 17 nov. = 00:30 le 18 nov. à Douala (UTC+1)
  assert.equal(todayInDouala(new Date('2026-11-17T23:30:00Z')), '2026-11-18');
  // 05:55 UTC (00:55 à New York) = 06:55 à Douala, même jour
  assert.equal(todayInDouala(new Date('2026-11-17T05:55:00Z')), '2026-11-17');
});

test('dates passées refusées', () => {
  const now = new Date('2026-11-17T09:00:00Z');
  assert.match(validateBookingDate('2026-11-16', undefined, now, settings), /passée/);
  assert.equal(validateBookingDate('2026-11-18', undefined, now, settings), null);
});

test('jours fermés refusés (dimanche)', () => {
  const now = new Date('2026-11-17T09:00:00Z');
  assert.equal(weekdayOf('2026-11-22'), 0);
  assert.match(validateBookingDate('2026-11-22', undefined, now, settings), /pas ce jour-là/);
  assert.deepEqual(slotsForDate('2026-11-22', now, settings), []);
});

test('le jour même, les créneaux trop proches sont retirés (délai 3 h, heure de Douala)', () => {
  // 09:00 UTC = 10:00 Douala → limite 13:00 → restent 14:00 et 16:00
  const now = new Date('2026-11-17T09:00:00Z');
  assert.deepEqual(slotsForDate('2026-11-17', now, settings), ['14:00', '16:00']);
  assert.match(validateBookingDate('2026-11-17', '10:00', now, settings), /plus proposée/);
  assert.equal(validateBookingDate('2026-11-17', '16:00', now, settings), null);
});

test('horizon maximal', () => {
  const now = new Date('2026-11-17T09:00:00Z');
  assert.match(validateBookingDate(addDays('2026-11-17', 120), undefined, now, settings), /jours à l'avance/);
});

test('utilitaires de date', () => {
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(isIsoDate('2026-02-30'), false);
  assert.equal(formatDateFr('2026-11-18'), 'mercredi 18 novembre 2026');
});
