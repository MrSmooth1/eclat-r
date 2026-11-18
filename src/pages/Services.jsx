import PageHero from '../components/PageHero.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Button from '../components/Button.jsx';
import { services } from '../data/services.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function Services() {
  usePageMeta('/services');
  return (
    <>
      <PageHero eyebrow="Prestations" title="Nos services">
        <p>Des solutions soignées et personnalisées pour vos espaces résidentiels, professionnels et vos biens à distance.</p>
      </PageHero>
      <section className="section container">
        <div className="grid-3">
          {services.map((s) => <ServiceCard key={s.id} service={s} variant="full" headingLevel={2} />)}
        </div>
      </section>
      <section className="darkband">
        <div className="container darkband__row">
          <div>
            <h2>Un besoin particulier ?</h2>
            <p>Décrivez votre logement ou votre local : nous vous proposerons une prestation adaptée.</p>
          </div>
          <div className="darkband__actions">
            <Button to="/contact" arrow>Demander un devis personnalisé</Button>
            <Button to="/solutions" variant="light-outline">Voir nos solutions</Button>
          </div>
        </div>
      </section>
    </>
  );
}
