import PageHero from '../components/PageHero.jsx';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import PricingModule from '../components/PricingModule.jsx';
import { solutions } from '../data/services.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function Solutions() {
  usePageMeta('/solutions');
  return (
    <>
      <PageHero eyebrow="Des services adaptés" title="Nos solutions">
        <p>Des prestations adaptées à vos espaces, à votre rythme et à vos besoins.</p>
      </PageHero>

      <section className="section container">
        <div className="grid-3">
          {solutions.map((s) => (
            <article key={s.id} className="card solution">
              <span className="solution__icon"><Icon name={s.icon} size={26} /></span>
              <span className="pill">{s.pill}</span>
              <h2 className="solution__title">{s.title}</h2>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
        <div className="center cta-line">
          <Button to="/contact" arrow>Demander un devis personnalisé</Button>
        </div>
      </section>

      <PricingModule />
    </>
  );
}
