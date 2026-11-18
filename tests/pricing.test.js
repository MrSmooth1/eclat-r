import { test } from 'node:test';
import assert from 'node:assert/strict';
import { quote, getPrice, maxSavingPercent, formatFcfa } from '../src/services/pricing.js';

// Grille de référence : Tarifs_Clients_Eclat_Residences_2026.pdf
const grid = {
  studio: [14000, 104000, 144000],
  '1ch': [17000, 128000, 180000],
  '2ch': [22000, 160000, 228000],
  '3ch': [27000, 200000, 288000],
  '4ch': [35000, 264000, 372000],
};

test('les tarifs correspondent exactement à la grille 2026', () => {
  for (const [h, [p, r, s]] of Object.entries(grid)) {
    assert.equal(getPrice(h, 'ponctuel'), p);
    assert.equal(getPrice(h, 'regulier'), r);
    assert.equal(getPrice(h, 'serenite'), s);
  }
});

test('nombre d’interventions : 1, 8 (2×/sem) et 12 (3×/sem) sur 4 semaines', () => {
  assert.equal(quote('studio', 'ponctuel').interventions, 1);
  assert.equal(quote('studio', 'regulier').interventions, 8);
  assert.equal(quote('studio', 'serenite').interventions, 12);
});

test('économies calculées depuis les tarifs réels', () => {
  assert.equal(quote('studio', 'regulier').saving, 14000 * 8 - 104000); // 8 000
  assert.equal(quote('2ch', 'regulier').saving, 16000);
  assert.equal(quote('4ch', 'serenite').saving, 35000 * 12 - 372000); // 48 000
  assert.equal(quote('2ch', 'ponctuel').saving, 0);
  assert.equal(quote('2ch', 'regulier').savingPercent, 9.1);
});

test('la promesse « jusqu’à 8 % » du HTML de simulation est inexacte', () => {
  assert.equal(maxSavingPercent('regulier'), 9.1);
  assert.equal(maxSavingPercent('serenite'), 14.3);
});

test('prix moyen par intervention', () => {
  assert.equal(quote('2ch', 'regulier').perIntervention, 20000);
  assert.equal(quote('2ch', 'serenite').perIntervention, 19000);
});

test('format FCFA', () => {
  assert.equal(formatFcfa(160000), '160 000 FCFA');
});

test('valeurs inconnues → null', () => {
  assert.equal(quote('5ch', 'regulier'), null);
  assert.equal(quote('studio', 'mensuel'), null);
});
