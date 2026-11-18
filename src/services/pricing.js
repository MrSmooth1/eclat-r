import { housingTypes, plans, prices } from '../data/pricing.js';

export const formatFcfa = (amount) =>
  `${new Intl.NumberFormat('fr-FR').format(amount).replace(/ | /g, ' ')} FCFA`;

export const formatNumber = (amount) =>
  new Intl.NumberFormat('fr-FR').format(amount).replace(/ | /g, ' ');

export const getPlan = (planId) => plans.find((p) => p.id === planId) ?? null;
export const getHousing = (housingId) => housingTypes.find((h) => h.id === housingId) ?? null;

export function getPrice(housingId, planId) {
  const row = prices[housingId];
  if (!row || row[planId] === undefined) return null;
  return row[planId];
}

/**
 * Calcule le détail d'une formule à partir des tarifs réels :
 * - prix total, nombre d'interventions, prix moyen par intervention ;
 * - économie par rapport au même nombre de ménages ponctuels.
 */
export function quote(housingId, planId) {
  const plan = getPlan(planId);
  const total = getPrice(housingId, planId);
  const unit = getPrice(housingId, 'ponctuel');
  if (!plan || total === null || unit === null) return null;

  const equivalent = unit * plan.interventions;
  const saving = Math.max(0, equivalent - total);
  return {
    housingId,
    planId,
    planName: plan.name,
    interventions: plan.interventions,
    total,
    perIntervention: Math.round(total / plan.interventions),
    equivalentPonctuel: equivalent,
    saving,
    savingPercent: equivalent > 0 ? Math.round((saving / equivalent) * 1000) / 10 : 0,
  };
}

/** Plus forte économie (en %) d'une formule, toutes tailles de logement confondues. */
export function maxSavingPercent(planId) {
  return Math.max(...housingTypes.map((h) => quote(h.id, planId)?.savingPercent ?? 0));
}
