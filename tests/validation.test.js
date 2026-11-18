import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, validatePhone, validateEmail, isBot } from '../src/services/validation.js';

const ok = { name: 'Awa N.', phone: '+237 6 99 00 00 00', email: '', service: 'residentiel', area: 'Bonapriso', message: 'Ménage pour un 2 chambres', consent: true };
const services = ['residentiel', 'commercial', 'suivi', 'autre'];

test('formulaire valide', () => assert.deepEqual(validateContact(ok, services), {}));
test('consentement obligatoire', () => assert.ok(validateContact({ ...ok, consent: false }, services).consent));
test('courriel facultatif mais vérifié', () => {
  assert.equal(validateEmail(''), null);
  assert.ok(validateEmail('abc@'));
});
test('téléphone', () => {
  assert.equal(validatePhone('+237 699 000 000'), null);
  assert.ok(validatePhone('12'));
  assert.ok(validatePhone('abc'));
});
test('service inconnu refusé', () => assert.ok(validateContact({ ...ok, service: 'x' }, services).service));
test('champ piège', () => {
  assert.equal(isBot({ website: '' }), false);
  assert.equal(isBot({ website: 'http://spam' }), true);
});
