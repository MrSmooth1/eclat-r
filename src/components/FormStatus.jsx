import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, Loader2 } from 'lucide-react';
import { site, whatsappLink } from '../data/site.js';

/** Récapitulatif texte d'une demande (copie, WhatsApp, e-mail). */
export const summaryText = (title, fields) =>
  [title, ...Object.entries(fields).filter(([, v]) => v).map(([k, v]) => `• ${k} : ${v}`)].join('\n');

/** Bandeau visible avant envoi lorsque l'envoi n'est pas configuré. */
export function DemoBanner({ configured }) {
  if (configured) return null;
  return (
    <div className="notice notice--demo" role="note">
      <Info size={18} aria-hidden="true" />
      <p>
        <strong>Mode démonstration.</strong> L'envoi de ce formulaire n'est pas encore configuré :
        aucune demande ne sera transmise à l'équipe.
      </p>
    </div>
  );
}

export default function FormStatus({ status, error, summary, successTitle, successText, children }) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status !== 'idle' && status !== 'submitting') ref.current?.focus();
    setCopied(false);
  }, [status]);

  if (status === 'idle') return null;

  if (status === 'submitting') {
    return (
      <div className="form-status form-status--loading" role="status">
        <Loader2 className="spin" size={18} aria-hidden="true" /> Envoi en cours…
      </div>
    );
  }

  const wa = summary ? whatsappLink(summary) : null;
  const mailto = summary && site.emailActive
    ? `mailto:${site.email}?subject=${encodeURIComponent('Demande depuis le site')}&body=${encodeURIComponent(summary)}`
    : null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="form-status form-status--success" role="status" tabIndex={-1} ref={ref}>
        <CheckCircle2 size={22} aria-hidden="true" />
        <div>
          <p className="form-status__title">{successTitle}</p>
          {successText}
          {children}
        </div>
      </div>
    );
  }

  const isDemo = status === 'unconfigured';
  return (
    <div className={`form-status ${isDemo ? 'form-status--demo' : 'form-status--error'}`} role="alert" tabIndex={-1} ref={ref}>
      <AlertTriangle size={22} aria-hidden="true" />
      <div>
        <p className="form-status__title">
          {isDemo ? 'Mode démonstration : aucune demande n’a été envoyée' : 'L’envoi a échoué'}
        </p>
        <p>
          {isDemo
            ? "L'envoi par e-mail n'est pas encore configuré sur ce site. Votre demande n'a pas été transmise et n'est pas enregistrée."
            : `${error} Votre demande n'a pas été transmise : vous pouvez réessayer.`}
        </p>
        {summary && (wa || mailto) && (
          <>
            <p>Vous pouvez aussi nous transmettre ce récapitulatif directement :</p>
            <div className="form-status__actions">
              {wa && <a className="btn btn--ghost" href={wa} target="_blank" rel="noopener noreferrer">Envoyer par WhatsApp</a>}
              {mailto && <a className="btn btn--ghost" href={mailto}>Envoyer par e-mail</a>}
              <button type="button" className="btn btn--ghost" onClick={copy}>{copied ? 'Copié ✓' : 'Copier le récapitulatif'}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
