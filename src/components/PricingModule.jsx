import { useState } from 'react';
import { Eye } from 'lucide-react';
import PricingTable from './PricingTable.jsx';
import PriceSimulator from './PriceSimulator.jsx';
import Icon from './Icon.jsx';
import { site } from '../data/site.js';
import { isDev } from '../data/env.js';
import { included, conditions } from '../data/pricing.js';

/**
 * Module tarifs + simulateur.
 * Publié uniquement si site.features.publishPricing est vrai
 * (VITE_PUBLISH_PRICING=true). En développement local, un aperçu
 * clairement signalé est affiché pour validation.
 */
export default function PricingModule() {
  const [planId, setPlanId] = useState('regulier');
  const [housingId, setHousingId] = useState('2ch');
  const published = site.features.publishPricing;

  if (!published && !isDev) return null;

  return (
    <section className="section pricing-module" id="tarifs" aria-labelledby="tarifs-titre">
      <div className="container">
        {!published && (
          <div className="notice notice--preview" role="note">
            <Eye size={18} aria-hidden="true" />
            <p>
              <strong>Aperçu local, non publié.</strong> Cette grille n'apparaît pas sur le site en ligne tant que
              <code> VITE_PUBLISH_PRICING </code> n'est pas à <code>true</code> (validation de la direction requise).
            </p>
          </div>
        )}
        <div className="section-intro">
          <p className="eyebrow">Tarifs entretien résidentiel 2026</p>
          <h2 id="tarifs-titre">Choisissez votre rythme d'entretien</h2>
          <p>Un ménage ponctuel ou un forfait régulier sans engagement, pour l'entretien résidentiel standard.</p>
        </div>

        <PricingTable planId={planId} onPlanChange={setPlanId} />

        <ul className="included">
          {included.map((i) => (
            <li key={i.title}>
              <Icon name={i.icon} size={22} />
              <strong>{i.title}</strong>
              <span>{i.text}</span>
            </li>
          ))}
        </ul>

        <PriceSimulator housingId={housingId} planId={planId} onHousingChange={setHousingId} onPlanChange={setPlanId} />

        <div className="conditions">
          <h3>Conditions</h3>
          <ul>{conditions.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
