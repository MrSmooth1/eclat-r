import { Link } from 'react-router';
import monogram from '../assets/images/monogramme.webp';
import { site } from '../data/site.js';

/** Monogramme du logo officiel + nom + slogan exact. */
export default function Logo({ dark = false, onClick }) {
  return (
    <Link to="/" className={`brand${dark ? ' brand--dark' : ''}`} aria-label={`${site.name}, accueil`} onClick={onClick}>
      <span className="brand__mark">
        <img src={monogram} alt="" width="112" height="123" />
      </span>
      <span className="brand__text">
        <span className="brand__name">
          ÉCLAT <em>RÉSIDENCES</em>
        </span>
        <span className="brand__slogan">{site.slogan}</span>
      </span>
    </Link>
  );
}
