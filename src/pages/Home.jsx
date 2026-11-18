import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router';
import Button from '../components/Button.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import ValuesGrid from '../components/ValuesGrid.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import { services } from '../data/services.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import hero from '../assets/images/hero-agente.webp';
import hero480 from '../assets/images/hero-agente-480.webp';

export default function Home() {
  usePageMeta('/');
  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Entretien résidentiel et commercial · Douala</p>
          <h1>
            Des espaces propres, sains et <span className="gold">valorisés</span>
          </h1>
          <p className="hero__lead">
            Éclat Résidences vous accompagne dans l'entretien ménager résidentiel et commercial ainsi que dans le
            suivi de vos résidences à distance, à Douala. Nous privilégions la rigueur, la fiabilité et la qualité de
            chaque intervention.
          </p>
          <div className="hero__actions">
            <Button to="/reserver" icon={CalendarDays} arrow>Réserver un service</Button>
            <Button to="/services" variant="ghost">Découvrir nos services</Button>
          </div>
          <Link to="/contact" className="text-link hero__quote">
            Demander un devis <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <ul className="hero__benefits">
            <li>Qualité et rigueur</li>
            <li>Service discret</li>
            <li>Respect de vos espaces</li>
          </ul>
        </div>
        <div className="hero__media">
          <img
            src={hero}
            srcSet={`${hero480} 480w, ${hero} 815w`}
            sizes="(max-width: 950px) 100vw, 51vw"
            alt="Illustration : agente en polo noir au logo Éclat Résidences nettoyant un plan de travail"
            width="815"
            height="680"
            fetchPriority="high"
          />
          <p className="hero__tagline" aria-hidden="true">Un environnement propre,<br />un bien-être durable.</p>
        </div>
      </section>

      <section className="section container" aria-labelledby="services-titre">
        <div className="section-head">
          <h2 id="services-titre" className="h-line">Nos services</h2>
          <Link className="text-link" to="/services">Voir tous nos services <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
        <div className="grid-3">
          {services.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>

      <section className="section section--tight container about-row" aria-labelledby="apropos-titre">
        <div>
          <h2 id="apropos-titre" className="h-line">À propos d'Éclat Résidences</h2>
          <p>
            <strong>Éclat Résidences</strong> est une entreprise spécialisée dans l'entretien ménager résidentiel et
            commercial, ainsi que dans le suivi de résidences pour les propriétaires à distance.
          </p>
          <p>Nos services sont actuellement proposés principalement à Douala, au Cameroun.</p>
          <Button to="/a-propos" variant="ghost" arrow>En savoir plus</Button>
        </div>
        <div>
          <h3>Notre mission</h3>
          <p>
            Offrir des services d'entretien et de suivi de résidences fiables, professionnels et adaptés aux besoins
            de chaque client, afin de préserver la propreté, le confort et la valeur de leurs espaces.
          </p>
          <h3>Nos valeurs</h3>
          <ValuesGrid />
        </div>
      </section>

      <section className="satisfaction" aria-labelledby="satisfaction-titre">
        <div className="container">
          <span className="ornament" aria-hidden="true">✦</span>
          <h2 id="satisfaction-titre">Votre satisfaction, notre priorité</h2>
          <p>
            Chez Éclat Résidences, nous accordons une attention particulière à la qualité de nos prestations. Notre
            engagement : vous offrir un service professionnel, soigné et adapté à vos attentes. Votre satisfaction est
            au cœur de notre démarche d'amélioration continue.
          </p>
        </div>
      </section>

      <ReviewsSection />

      <section className="darkband" aria-labelledby="cta-titre">
        <div className="container darkband__row">
          <div>
            <h2 id="cta-titre">Confiez-nous l'entretien de vos espaces</h2>
            <p>Choisissez une date souhaitée : notre équipe vous confirmera la disponibilité et le devis.</p>
          </div>
          <div className="darkband__actions">
            <Button to="/reserver" arrow>Réserver une prestation</Button>
            <Button to="/contact" variant="light-outline">Demander un devis</Button>
          </div>
        </div>
      </section>
    </>
  );
}
