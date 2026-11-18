// ─────────────────────────────────────────────────────────────
// Envoi des formulaires par e-mail via un service tiers
// (aucun serveur à maintenir pour le site vitrine).
//
//  • Web3Forms  : https://web3forms.com  (clé d'accès publique par conception)
//  • Formspree  : https://formspree.io   (identifiant de formulaire public)
//
// Sans fournisseur configuré, le site passe en MODE DÉMONSTRATION :
// rien n'est envoyé et l'interface le dit clairement.
// ─────────────────────────────────────────────────────────────
import { readEnv } from '../data/env.js';

const provider = readEnv('VITE_FORM_PROVIDER', '').toLowerCase();
const web3formsKey = readEnv('VITE_WEB3FORMS_ACCESS_KEY', '');
const formspreeId = readEnv('VITE_FORMSPREE_FORM_ID', '');

export function getFormConfig() {
  if (provider === 'web3forms' && web3formsKey) return { configured: true, provider: 'Web3Forms' };
  if (provider === 'formspree' && formspreeId) return { configured: true, provider: 'Formspree' };
  return { configured: false, provider: null };
}

export class FormNotConfiguredError extends Error {
  constructor() {
    super("L'envoi des formulaires n'est pas encore configuré.");
    this.name = 'FormNotConfiguredError';
  }
}

const TIMEOUT_MS = 15000;

async function postJson(url, body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    let data = null;
    try {
      data = await res.json();
    } catch {
      /* réponse non JSON */
    }
    return { res, data };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Envoie une demande.
 * @param {object} opts
 * @param {string} opts.subject  Objet de l'e-mail reçu par l'équipe
 * @param {object} opts.fields   Champs lisibles { 'Libellé': valeur }
 * @param {string} [opts.replyTo] E-mail du client (facultatif)
 * @param {string} [opts.fromName] Nom du client
 * @param {string} [opts.honeypot] Valeur du champ piège
 * @returns {Promise<{ ok: true }>}  Lève une erreur en cas d'échec.
 */
export async function submitForm({ subject, fields, replyTo, fromName, honeypot = '' }) {
  const config = getFormConfig();
  if (!config.configured) throw new FormNotConfiguredError();

  let result;
  try {
    if (provider === 'web3forms') {
      result = await postJson('https://api.web3forms.com/submit', {
        access_key: web3formsKey,
        subject,
        from_name: fromName ? `${fromName} via le site Éclat Résidences` : 'Site Éclat Résidences',
        ...(replyTo ? { replyto: replyTo } : {}),
        botcheck: honeypot,
        ...fields,
      });
      if (!result.res.ok || result.data?.success !== true) {
        throw new Error(result.data?.message || `Erreur ${result.res.status}`);
      }
    } else {
      result = await postJson(`https://formspree.io/f/${encodeURIComponent(formspreeId)}`, {
        _subject: subject,
        ...(replyTo ? { _replyto: replyTo, email: replyTo } : {}),
        _gotcha: honeypot,
        ...fields,
      });
      if (!result.res.ok) {
        const msg = result.data?.errors?.map((e) => e.message).join(' ') || `Erreur ${result.res.status}`;
        throw new Error(msg);
      }
    }
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Le service ne répond pas. Vérifiez votre connexion et réessayez.');
    if (err instanceof TypeError) throw new Error('Connexion impossible. Vérifiez votre connexion internet et réessayez.');
    throw err;
  }
  return { ok: true };
}
