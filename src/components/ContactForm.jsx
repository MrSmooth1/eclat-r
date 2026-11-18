import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { Field, ConsentField, Honeypot } from './FormFields.jsx';
import FormStatus, { DemoBanner, summaryText } from './FormStatus.jsx';
import { serviceOptions, serviceLabel } from '../data/services.js';
import { getHousing, getPlan, quote, formatFcfa } from '../services/pricing.js';
import { LIMITS, isBot, validateContact } from '../services/validation.js';
import { getFormConfig } from '../services/formSubmission.js';
import { useFormSubmit } from '../hooks/useFormSubmit.js';

const empty = { name: '', phone: '', email: '', service: '', area: '', message: '', consent: false, website: '' };

/**
 * Formulaire de contact / demande de devis.
 * `initial` peut contenir { service, housing, plan } (transmis depuis les
 * pages Services ou le simulateur, via l'état de navigation — jamais dans l'URL).
 */
export default function ContactForm({ initial = {} }) {
  const formula = useMemo(() => {
    if (!initial.housing || !initial.plan) return null;
    const q = quote(initial.housing, initial.plan);
    if (!q) return null;
    return {
      ...q,
      housingLabel: getHousing(initial.housing).label,
      cadence: getPlan(initial.plan).cadence,
    };
  }, [initial.housing, initial.plan]);

  const [values, setValues] = useState(() => ({
    ...empty,
    service: serviceOptions.some((o) => o.value === initial.service) ? initial.service : formula ? 'residentiel' : '',
    message: formula
      ? `Bonjour, je souhaite un devis pour la formule ${formula.planName} (${formula.cadence}) pour un ${formula.housingLabel.toLowerCase()}.`
      : '',
  }));
  const [withFormula, setWithFormula] = useState(Boolean(formula));
  const [errors, setErrors] = useState({});
  const [sentSummary, setSentSummary] = useState('');
  const { status, error, send, reset } = useFormSubmit();
  const { configured } = getFormConfig();

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    if (status !== 'idle' && status !== 'submitting') reset();
  };

  const fields = () => ({
    'Nom': values.name.trim(),
    'Téléphone / WhatsApp': values.phone.trim(),
    'E-mail': values.email.trim(),
    'Service souhaité': serviceLabel(values.service),
    'Quartier / adresse approximative': values.area.trim(),
    ...(withFormula && formula
      ? {
          'Formule indiquée': `${formula.planName} — ${formula.cadence}`,
          'Logement': formula.housingLabel,
          'Tarif indicatif (grille 2026)': formatFcfa(formula.total),
        }
      : {}),
    'Message': values.message.trim(),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validateContact(values, serviceOptions.map((o) => o.value));
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    const f = fields();
    const summary = summaryText('Demande de devis — Éclat Résidences', f);
    setSentSummary(summary);
    if (isBot(values)) return; // ignoré silencieusement
    const ok = await send({
      subject: `Demande de devis — ${f['Service souhaité']} — ${f['Nom']}`,
      fields: f,
      replyTo: values.email.trim() || undefined,
      fromName: values.name.trim(),
      honeypot: values.website,
    });
    if (ok) setValues({ ...empty });
  };

  const busy = status === 'submitting';

  return (
    <form className="panel form" onSubmit={onSubmit} noValidate aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" className="panel__title">Demander un devis</h2>
      <p className="form__intro">Les champs marqués d'un astérisque (*) sont obligatoires.</p>
      <DemoBanner configured={configured} />

      {formula && withFormula && (
        <div className="formula-chip">
          <div>
            <span className="eyebrow">Formule sélectionnée</span>
            <p>
              <strong>{formula.planName}</strong> · {formula.housingLabel} · {formula.interventions}{' '}
              intervention{formula.interventions > 1 ? 's' : ''} · <strong>{formatFcfa(formula.total)}</strong>
            </p>
            <p className="formula-chip__note">Tarif indicatif : le devis final dépend de la localisation et de l'état du logement.</p>
          </div>
          <button type="button" className="icon-btn" onClick={() => setWithFormula(false)} aria-label="Retirer la formule sélectionnée">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="form__grid">
        <Field id="name" label="Nom" required autoComplete="name" maxLength={LIMITS.name} value={values.name} onChange={update} error={errors.name} />
        <Field id="phone" label="Téléphone ou WhatsApp" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+237 …" maxLength={LIMITS.phone} value={values.phone} onChange={update} error={errors.phone} />
      </div>
      <Field id="email" label="Courriel" type="email" autoComplete="email" maxLength={LIMITS.email} value={values.email} onChange={update} error={errors.email} hint="Pour recevoir notre réponse par e-mail." />
      <div className="form__grid">
        <Field id="service" label="Service souhaité" required as="select" value={values.service} onChange={update} error={errors.service}>
          <option value="">Sélectionner un service</option>
          {serviceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Field>
        <Field id="area" label="Quartier ou adresse approximative" required autoComplete="address-level3" placeholder="Ex. Douala, Bonapriso" maxLength={LIMITS.area} value={values.area} onChange={update} error={errors.area} />
      </div>
      <Field id="message" label="Message" required as="textarea" rows={5} maxLength={LIMITS.message} placeholder="Type de logement ou de local, superficie, fréquence souhaitée…" value={values.message} onChange={update} error={errors.message} />
      <ConsentField checked={values.consent} onChange={update} error={errors.consent} purpose="répondre à ma demande de devis ou d'information" />
      <Honeypot value={values.website} onChange={update} />

      <button type="submit" className="btn btn--gold btn--block" disabled={busy} aria-disabled={busy}>
        <span>{busy ? 'Envoi en cours…' : 'Envoyer ma demande'}</span>
      </button>

      <FormStatus
        status={status}
        error={error}
        summary={sentSummary}
        successTitle="Merci, votre message a bien été transmis à notre équipe."
        successText={<p>Nous vous répondrons dans les meilleurs délais, par téléphone, WhatsApp ou e-mail.</p>}
      />
    </form>
  );
}
