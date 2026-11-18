import { Link } from 'react-router';
import PageHero from '../components/PageHero.jsx';
import { legal, fill } from '../data/legal.js';
import { site } from '../data/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function LegalNotice() {
  usePageMeta('/mentions-legales');
  return (
    <>
      <PageHero title="Mentions légales" />
      <section className="section container prose">
        <p className="notice notice--preview" role="note">
          Document provisoire : les informations marquées « [À compléter] » doivent être fournies par l'entreprise et
          le texte validé avant la mise en ligne.
        </p>

        <h2>Éditeur du site</h2>
        <dl className="legal-list">
          <div><dt>Raison sociale</dt><dd>{fill(legal.companyName)}</dd></div>
          <div><dt>Nom commercial</dt><dd>{site.name}</dd></div>
          <div><dt>Forme juridique</dt><dd>{fill(legal.legalForm)}</dd></div>
          <div><dt>Capital social</dt><dd>{fill(legal.capital)}</dd></div>
          <div><dt>RCCM</dt><dd>{fill(legal.rccm)}</dd></div>
          <div><dt>NIU</dt><dd>{fill(legal.niu)}</dd></div>
          <div><dt>Siège</dt><dd>{fill(legal.headOffice)}</dd></div>
          <div><dt>Téléphone</dt><dd>{fill(legal.phone)}</dd></div>
          <div><dt>Courriel</dt><dd>{site.email}{!site.emailActive && ' (en cours d’activation)'}</dd></div>
          <div><dt>Directeur·rice de la publication</dt><dd>{fill(legal.publicationDirector)}</dd></div>
        </dl>

        <h2>Hébergement</h2>
        <dl className="legal-list">
          <div><dt>Hébergeur</dt><dd>{fill(legal.host.name)}</dd></div>
          <div><dt>Adresse</dt><dd>{fill(legal.host.address)}</dd></div>
          <div><dt>Site</dt><dd>{fill(legal.host.website)}</dd></div>
        </dl>

        <h2>Propriété intellectuelle</h2>
        <p>
          Le nom, le logo et le slogan « {site.slogan} » sont la propriété de {site.name}. Toute reproduction sans
          autorisation est interdite. Les visuels de personnel présents sur le site sont des illustrations et ne
          représentent pas des membres réels de l'équipe ni des réalisations de l'entreprise.
        </p>

        <h2>Tarifs et demandes</h2>
        <p>
          Les montants éventuellement affichés sont indicatifs et exprimés en FCFA. Une demande de devis ou de
          réservation effectuée sur le site ne constitue ni un contrat ni une réservation confirmée : chaque demande est
          validée manuellement par l'équipe.
        </p>

        <h2>Données personnelles</h2>
        <p>Voir la <Link to="/confidentialite">politique de confidentialité</Link>.</p>
      </section>
    </>
  );
}
