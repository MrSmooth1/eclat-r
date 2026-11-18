import { useRef } from 'react';
import { housingTypes, plans } from '../data/pricing.js';
import { formatNumber, maxSavingPercent, quote } from '../services/pricing.js';

/** Grille tarifaire à onglets (une formule par onglet). */
export default function PricingTable({ planId, onPlanChange }) {
  const tabRefs = useRef([]);
  const plan = plans.find((p) => p.id === planId);

  const onKeyDown = (e, index) => {
    let next = null;
    if (e.key === 'ArrowRight') next = (index + 1) % plans.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + plans.length) % plans.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = plans.length - 1;
    if (next !== null) {
      e.preventDefault();
      onPlanChange(plans[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  const advantage =
    planId === 'ponctuel'
      ? 'Prix par intervention, sans abonnement'
      : `Jusqu'à ${formatNumber(maxSavingPercent(planId))} % d'économie vs ponctuel`;

  return (
    <div className="pricing">
      <div className="pill-tabs" role="tablist" aria-label="Choisir une fréquence">
        {plans.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => (tabRefs.current[i] = el)}
            type="button"
            role="tab"
            id={`tab-${p.id}`}
            aria-selected={p.id === planId}
            aria-controls="tarifs-panel"
            tabIndex={p.id === planId ? 0 : -1}
            onClick={() => onPlanChange(p.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {p.tab}
          </button>
        ))}
      </div>

      <div className="tariff" role="tabpanel" id="tarifs-panel" aria-labelledby={`tab-${planId}`}>
        <div className="tariff__head">
          <p className="tariff__title">{plan.id === 'ponctuel' ? 'Ménage ponctuel' : `Forfait ${plan.name}`}</p>
          <p className="tariff__meta">Votre rythme<strong>{plan.id === 'ponctuel' ? '1 intervention' : `${plan.interventions} ménages / 4 semaines`}</strong></p>
          <p className="tariff__meta tariff__meta--last">Avantage<strong>{advantage}</strong></p>
        </div>
        <table className="tariff__table">
          <caption className="sr-only">Tarifs {plan.name}, en FCFA</caption>
          <thead className="sr-only">
            <tr><th scope="col">Logement</th><th scope="col">Prix</th><th scope="col">Détail</th></tr>
          </thead>
          <tbody>
            {housingTypes.map((h) => {
              const q = quote(h.id, planId);
              return (
                <tr key={h.id}>
                  <th scope="row">
                    {h.label}
                    {planId !== 'ponctuel' && (
                      <span className="tariff__hint">soit {formatNumber(q.perIntervention)} FCFA par intervention</span>
                    )}
                  </th>
                  <td className="tariff__price">{formatNumber(q.total)} <span>FCFA</span></td>
                  <td className="tariff__save">
                    {q.saving > 0
                      ? `Vous économisez ${formatNumber(q.saving)} FCFA (${formatNumber(q.savingPercent)} %)`
                      : 'Tout inclus en zone standard'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="tariff__foot">
          {plan.note} Économies calculées par rapport au même nombre de ménages ponctuels. Tous les montants sont en FCFA.
        </p>
      </div>
    </div>
  );
}
