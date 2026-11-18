import { Link } from 'react-router';
import { Mail, MapPin, Globe, MessageCircle } from 'lucide-react';
import Logo from './Logo.jsx';
import { navItems } from './Header.jsx';
import { site, whatsappLink } from '../data/site.js';

export default function Footer() {
  const wa = whatsappLink();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo dark />
          <p className="site-footer__intro">
            Entretien ménager résidentiel et commercial, suivi de résidences à distance.
          </p>
        </div>

        <nav aria-label="Pied de page">
          <h2 className="site-footer__title">Navigation</h2>
          <ul>
            {navItems.map((i) => <li key={i.to}><Link to={i.to}>{i.label}</Link></li>)}
            <li><Link to="/reserver">Demande de réservation</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__title">Coordonnées</h2>
          <ul className="site-footer__contact">
            <li>
              <Mail size={16} aria-hidden="true" />
              {site.emailActive
                ? <a href={`mailto:${site.email}`}>{site.email}</a>
                : <span>{site.email} <small>(en cours d'activation)</small></span>}
            </li>
            {wa && (
              <li>
                <MessageCircle size={16} aria-hidden="true" />
                <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </li>
            )}
            <li><MapPin size={16} aria-hidden="true" /><span>{site.city}, {site.country}</span></li>
            <li><Globe size={16} aria-hidden="true" /><span>{site.displayDomain}</span></li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© {year} {site.name} · {site.slogan}</p>
        <p>
          <Link to="/mentions-legales">Mentions légales</Link>
          <span aria-hidden="true"> · </span>
          <Link to="/confidentialite">Confidentialité</Link>
        </p>
        <p className="site-footer__disclaimer">
          <p className="site-footer__credit">
            Site conçu et développé par <strong>DevSp4ce inc.</strong>
          </p>
        </p>
      </div>
    </footer>
  );
}
