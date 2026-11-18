import Icon from './Icon.jsx';
import { values } from '../data/services.js';

/** compact : aperçu (accueil) · détaillé : page À propos */
export default function ValuesGrid({ detailed = false }) {
  return (
    <ul className={`values${detailed ? ' values--detailed' : ''}`}>
      {values.map((v) => (
        <li key={v.title}>
          <span className="values__icon"><Icon name={v.icon} size={detailed ? 26 : 24} /></span>
          <strong>{detailed ? v.title : v.short}</strong>
          <span className="values__text">{detailed ? v.text : v.caption}</span>
        </li>
      ))}
    </ul>
  );
}
