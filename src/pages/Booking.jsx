import { useLocation } from 'react-router';
import { ExternalLink } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import BookingForm, { NOT_CONFIRMED } from '../components/BookingForm.jsx';
import { bookingProvider, providerLabel } from '../data/booking.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

const steps = [
  ['Votre demande', 'Service, date et heure souhaitées, coordonnées.'],
  ['Validation par l’équipe', 'Nous acceptons, ou vous proposons un autre créneau.'],
  ['Devis', 'Vous recevez et acceptez le devis.'],
  ['Lien de paiement', 'Envoyé séparément, par e-mail ou WhatsApp.'],
  ['Confirmation finale', 'Après vérification du règlement.'],
];

// Route stable /reserver : destinée au QR code des cartes de visite.
export default function Booking() {
  usePageMeta('/reserver');
  const { state, key } = useLocation();
  const external = bookingProvider.url && providerLabel[bookingProvider.type];

  return (
    <>
      <PageHero eyebrow="Demande de réservation" title="Réservez votre service">
        <p>Choisissez une date souhaitée. Votre demande sera examinée par notre équipe avant toute confirmation.</p>
      </PageHero>

      <section className="section container booking-row">
        <div>
          <h2 className="h-line">Comment ça se passe ?</h2>
          <ol className="steps">
            {steps.map(([t, d]) => (
              <li key={t}><strong>{t}</strong><span>{d}</span></li>
            ))}
          </ol>
          <p className="info info--strong">{NOT_CONFIRMED}</p>
          <p className="muted small">Toutes les dates et heures sont exprimées à l'heure de Douala (Cameroun, UTC+1).</p>
          {external && (
            <div className="card external-booking">
              <h3>Calendrier en ligne</h3>
              <p>Vous pouvez aussi déposer votre demande via notre calendrier {providerLabel[bookingProvider.type]}. Les demandes y restent soumises à validation.</p>
              <a className="btn btn--ghost" href={bookingProvider.url} target="_blank" rel="noopener noreferrer">
                <span>Ouvrir le calendrier</span><ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
        <BookingForm key={key} initialService={state?.service} />
      </section>
    </>
  );
}
