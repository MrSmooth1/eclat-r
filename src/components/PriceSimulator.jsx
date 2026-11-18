import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { housingTypes, plans } from '../data/pricing.js';
import { formatFcfa, formatNumber, quote } from '../services/pricing.js';

/** Simulateur : logement + fréquence → montant et nombre d'interventions. */
export default function PriceSimulator({ housingId, planId, onHousingChange, onPlanChange }) {
  const navigate = useNavigate();
  const q = quote(housingId, planId);

  return (
    <section className="estimate" aria-labelledby="simu-titre">
      <div>
        <p className="eyebrow">Votre estimation</p>
        <h2 id="simu-titre">Combien coûtera votre entretien ?</h2>
        <p>Sélectionnez votre logement et votre rythme : le montant s'affiche immédiatement.</p>
        <p className="estimate__disclaimer">
          Cette estimation ne constitue ni une réservation ni un devis définitif. Le devis final dépend de la
          localisation et de l'état du logement.
        </p>
      </div>
      <div className="estimate__form">
        <label htmlFor="sim-housing">Votre logement</label>
        <select id="sim-housing" value={housingId} onChange={(e) => onHousingChange(e.target.value)}>
          {housingTypes.map((h) => <option key={h.id} value={h.id}>{h.label}</option>)}
        </select>
        <label htmlFor="sim-plan">Fréquence</label>
        <select id="sim-plan" value={planId} onChange={(e) => onPlanChange(e.target.value)}>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.id === 'ponctuel' ? 'Ménage ponctuel' : `${p.name} — ${p.perWeek} fois / semaine`}
            </option>
          ))}
        </select>
        <div className="estimate__summary" aria-live="polite">
          <div>
            <span>Votre tarif estimé</span>
            <small>
              {q.interventions} intervention{q.interventions > 1 ? 's' : ''}
              {q.interventions > 1 ? ' sur 4 semaines (28 jours)' : ''}
              {q.saving > 0 ? ` · économie de ${formatNumber(q.saving)} FCFA` : ''}
            </small>
          </div>
          <strong>{formatFcfa(q.total)}</strong>
        </div>
        <button
          type="button"
          className="btn btn--gold btn--block"
          onClick={() => navigate('/contact', { state: { service: 'residentiel', housing: housingId, plan: planId } })}
        >
          <span>Demander un devis pour cette formule</span>
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
