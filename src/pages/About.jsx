import PageHero from '../components/PageHero.jsx';
import ValuesGrid from '../components/ValuesGrid.jsx';
import Button from '../components/Button.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import logo from '../assets/images/logo-eclat-residences.webp';
import face from '../assets/images/uniforme-face.webp';
import dos from '../assets/images/uniforme-dos.webp';

export default function About() {
  usePageMeta('/a-propos');
  return (
    <>
      <PageHero eyebrow="Qui sommes-nous ?" title="À propos d'Éclat Résidences">
        <p>Un service d'entretien et de suivi de résidences fondé sur le professionnalisme, la discrétion et la confiance.</p>
      </PageHero>

      <section className="section container about-row">
        <div>
          <div className="logo-panel">
            <img src={logo} alt="Logo officiel Éclat Résidences" width="549" height="394" loading="lazy" />
          </div>
          <p>
            Éclat Résidences est une entreprise spécialisée dans l'entretien ménager résidentiel et commercial, ainsi
            que dans le suivi de résidences pour les propriétaires à distance. Nos services sont actuellement proposés
            principalement à Douala, au Cameroun. Nous accompagnons particuliers, professionnels et propriétaires avec
            une attention particulière portée à la qualité, à la discrétion et au respect des lieux.
          </p>
          <h2 className="h-line about-mission">Notre mission</h2>
          <p>
            Offrir des services d'entretien et de suivi de résidences fiables, professionnels et adaptés aux besoins
            de chaque client, afin de préserver la propreté, le confort et la valeur de leurs espaces.
          </p>
        </div>
        <figure className="uniform">
          <div className="uniform__pair">
            <img src={face} alt="Illustration : agente en polo et tablier noirs portant le logo doré, vue de face" width="576" height="865" loading="lazy" />
            <img src={dos} alt="Illustration : polo noir portant le logo et le slogan dorés, vue de dos" width="492" height="865" loading="lazy" />
          </div>
          <figcaption>Tenue officielle — visuels d'illustration, ne représentant pas des membres réels de l'équipe.</figcaption>
        </figure>
      </section>

      <section className="section section--cream" aria-labelledby="valeurs-titre">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Ce qui nous guide</p>
            <h2 id="valeurs-titre">Nos valeurs</h2>
          </div>
          <ValuesGrid detailed />
          <p className="info">
            Par respect pour la confidentialité de nos clients, aucune photographie de leurs résidences privées n'est
            publiée.
          </p>
          <div className="center">
            <Button to="/contact" arrow>Demander un devis</Button>
          </div>
        </div>
      </section>
    </>
  );
}
