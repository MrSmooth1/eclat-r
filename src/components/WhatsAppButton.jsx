import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../data/site.js';

/** Masqué tant qu'aucun numéro WhatsApp n'est configuré. */
export default function WhatsAppButton({ floating = false, message, label = 'Écrire sur WhatsApp' }) {
  const href = whatsappLink(message);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={floating ? 'wa-float' : 'btn btn--ghost'}
      aria-label={floating ? `${label} (nouvelle fenêtre)` : undefined}
    >
      <MessageCircle size={floating ? 26 : 18} strokeWidth={1.7} aria-hidden="true" />
      {!floating && <span>{label}</span>}
    </a>
  );
}
