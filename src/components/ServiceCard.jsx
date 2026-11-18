import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import Icon from './Icon.jsx';
import Button from './Button.jsx';

/**
 * Carte de service.
 * - variant « teaser » : accueil (résumé + lien)
 * - variant « full »   : page services (description + devis + réservation)
 */
export default function ServiceCard({ service, variant = 'teaser', headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <article className={`service-card service-card--${variant}`} id={variant === 'full' ? service.id : undefined}>
      <div className="service-card__media">
        <img src={service.image} alt={service.imageAlt} width="700" height="470" loading="lazy" decoding="async" />
        <span className="service-card__icon"><Icon name={service.icon} size={26} /></span>
      </div>
      <div className="service-card__body">
        <H className="service-card__title">{variant === 'full' ? service.title : service.shortTitle}</H>
        <p>{variant === 'full' ? service.description : service.summary}</p>
        {variant === 'full' ? (
          <div className="service-card__actions">
            <Button to="/contact" state={{ service: service.id }} variant="ghost">Demander un devis</Button>
            <Button to="/reserver" state={{ service: service.id }} arrow>Réserver une prestation</Button>
          </div>
        ) : (
          <Link className="text-link" to={`/services#${service.id}`}>
            En savoir plus <ArrowRight size={15} aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
