import { site } from '../data/site.js';
import { reviews } from '../data/reviews.js';

/**
 * Emplacement réservé aux VÉRITABLES avis clients (avec autorisation).
 * Ne s'affiche que si site.features.showReviews est vrai ET qu'au moins un avis existe.
 */
export default function ReviewsSection() {
  if (!site.features.showReviews || reviews.length === 0) return null;
  return (
    <section className="section container" aria-labelledby="avis-titre">
      <h2 id="avis-titre">Ils nous ont fait confiance</h2>
      <ul className="reviews">
        {reviews.map((r) => (
          <li key={`${r.author}-${r.date}`} className="card">
            <blockquote><p>{r.text}</p></blockquote>
            <p className="reviews__meta">{r.author}{r.context ? ` · ${r.context}` : ''}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
