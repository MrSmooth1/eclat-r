import { useLocation } from 'react-router';
import { Mail, MapPin, Globe, Clock } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import ContactForm from '../components/ContactForm.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import Button from '../components/Button.jsx';
import { site } from '../data/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function Contact() {
  usePageMeta('/contact');
  const { state, key } = useLocation();
  return (
    <>
      <PageHero eyebrow="Contact & demande de devis" title="Contactez-nous">
        <p>
          Vous souhaitez obtenir des informations ou un devis ? Décrivez-nous votre besoin et notre équipe vous
          répondra.
        </p>
      </PageHero>

      <section className="section container booking-row">
        <div className="contact-info">
          <h2 className="h-line">Parlons de votre besoin</h2>
          <p>Décrivez votre logement ou votre local, la prestation souhaitée et, si possible, la fréquence envisagée.</p>
          <ul className="contact-list">
            <li>
              <Mail size={20} aria-hidden="true" />
              <div>
                <strong>Courriel</strong>
                {site.emailActive
                  ? <a href={`mailto:${site.email}`}>{site.email}</a>
                  : <span>{site.email} <small className="muted">(adresse en cours d'activation)</small></span>}
              </div>
            </li>
            <li>
              <MapPin size={20} aria-hidden="true" />
              <div>
                <strong>Zone d'intervention</strong>
                <span>{site.serviceAreas.length ? `Douala : ${site.serviceAreas.join(', ')}` : site.serviceAreaFallback}</span>
              </div>
            </li>
            {site.openingHours && (
              <li><Clock size={20} aria-hidden="true" /><div><strong>Horaires</strong><span>{site.openingHours}</span></div></li>
            )}
            <li>
              <Globe size={20} aria-hidden="true" />
              <div><strong>Site internet</strong><span>{site.displayDomain}</span></div>
            </li>
          </ul>
          <div className="contact-actions">
            <WhatsAppButton />
            <Button to="/reserver" variant="ghost">Demander une réservation</Button>
          </div>
          <p className="info">
            Après validation du devis et de la date, un lien de paiement sécurisé pourra vous être envoyé séparément.
            Aucun paiement n'est demandé via ce formulaire.
          </p>
        </div>
        <ContactForm key={key} initial={state || {}} />
      </section>
    </>
  );
}
