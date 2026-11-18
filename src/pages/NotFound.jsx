import Button from '../components/Button.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function NotFound() {
  usePageMeta('404');
  return (
    <section className="section container notfound">
      <p className="eyebrow">Erreur 404</p>
      <h1>Page introuvable</h1>
      <p>La page demandée n'existe pas ou a été déplacée.</p>
      <div className="hero__actions">
        <Button to="/" arrow>Retour à l'accueil</Button>
        <Button to="/contact" variant="ghost">Nous contacter</Button>
      </div>
    </section>
  );
}
