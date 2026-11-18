import PageHero from '../components/PageHero.jsx';
import { legal, fill } from '../data/legal.js';
import { site } from '../data/site.js';
import { getFormConfig } from '../services/formSubmission.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function Privacy() {
  usePageMeta('/confidentialite');
  const { provider } = getFormConfig();
  return (
    <>
      <PageHero title="Politique de confidentialité" />
      <section className="section container prose">
        <p className="notice notice--preview" role="note">
          Document provisoire, à faire valider (idéalement par un juriste) au regard de la loi n° 2024/017 du
          23 décembre 2024 relative à la protection des données à caractère personnel au Cameroun. Les éléments
          « [À compléter] » doivent être renseignés.
        </p>

        <h2>Responsable du traitement</h2>
        <p>{fill(legal.companyName)} ({site.name}), {fill(legal.headOffice)} — {site.email}.</p>

        <h2>Données collectées</h2>
        <p>Uniquement les informations que vous saisissez dans nos formulaires :</p>
        <ul>
          <li>Formulaire de contact / devis : nom, téléphone ou WhatsApp, courriel (facultatif), service souhaité, quartier ou adresse approximative, message.</li>
          <li>Demande de réservation : service, date et heure souhaitées, nom complet, téléphone ou WhatsApp, courriel (facultatif), quartier ou adresse, détails de la prestation.</li>
        </ul>
        <p>
          Aucune donnée de paiement n'est collectée sur ce site. Le site n'utilise ni cookie publicitaire ni outil de
          mesure d'audience à ce jour.
        </p>

        <h2>Finalités</h2>
        <p>
          Répondre à votre demande d'information ou de devis, étudier et valider votre demande de réservation, et
          vous recontacter à ce sujet. Base du traitement : votre consentement, exprimé en cochant la case prévue,
          et les mesures précontractuelles prises à votre demande.
        </p>

        <h2>Destinataires et prestataires</h2>
        <p>
          Les demandes sont transmises par e-mail à l'équipe d'Éclat Résidences au moyen d'un service d'envoi de
          formulaires{provider ? ` (${provider})` : ' [prestataire à préciser]'}, qui agit comme sous-traitant.
          Ce prestataire peut traiter les données hors du Cameroun : [À compléter — pays d'hébergement, garanties et,
          le cas échéant, formalités auprès de l'Autorité de protection des données à caractère personnel].
          Vos données ne sont ni vendues ni cédées.
        </p>

        <h2>Durée de conservation</h2>
        <p>{fill(legal.dataRetention)}</p>

        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l'accès à vos données, leur rectification, leur effacement ou vous opposer à leur
          traitement, et retirer votre consentement à tout moment, en écrivant à {site.email}
          {!site.emailActive && ' (adresse en cours d’activation)'}.
        </p>

        <h2>Sécurité</h2>
        <p>
          Le site est servi en HTTPS. Aucune donnée personnelle n'est placée dans les adresses des pages. Les
          formulaires comportent une protection anti-robots.
        </p>

        <p className="muted small">Dernière mise à jour : {fill(legal.lastUpdated)}</p>
      </section>
    </>
  );
}
