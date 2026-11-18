// Lecture centralisée des variables d'environnement publiques (VITE_*).
// Fonctionne aussi hors Vite (tests Node), où import.meta.env est absent.
const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};

export const readEnv = (key, fallback = '') => {
  const value = env[key];
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : fallback;
};

export const readBool = (key, fallback = false) => {
  const value = readEnv(key, '');
  if (value === '') return fallback;
  return value === 'true' || value === '1';
};

export const isDev = Boolean(env.DEV);
