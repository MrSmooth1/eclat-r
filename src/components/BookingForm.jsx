import { useMemo, useState } from 'react';
import { Clock3 } from 'lucide-react';
import { Field, ConsentField, Honeypot } from './FormFields.jsx';
import FormStatus, { DemoBanner, summaryText } from './FormStatus.jsx';
import { serviceOptions, serviceLabel } from '../data/services.js';
import { bookingSettings } from '../data/booking.js';
import { dateBounds, formatDateFr, openDaysLabel, slotsForDate, validateBookingDate } from '../services/dates.js';
import { LIMITS, isBot, validateEmail, validateName, validatePhone, validateRequired } from '../services/validation.js';
import { getFormConfig } from '../services/formSubmission.js';
import { useFormSubmit } from '../hooks/useFormSubmit.js';
import { useHydrated } from '../hooks/useHydrated.js';

const empty = { service: '', date: '', time: '', name: '', phone: '', email: '', area: '', details: '', consent: false, website: '' };

export const NOT_CONFIRMED =
  'Votre demande ne constitue pas une réservation confirmée. Notre équipe vous contactera pour valider la disponibilité et le devis.';

export default function BookingForm({ initialService }) {
  const [values, setValues] = useState(() => ({
    ...empty,
    service: serviceOptions.some((o) => o.value === initialService) ? initialService : '',
  }));
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const [summary, setSummary] = useState('');
  const { status, error, send, reset } = useFormSubmit();
  const { configured } = getFormConfig();
  const hydrated = useHydrated();

  const bounds = hydrated ? dateBounds() : { min: undefined, max: undefined };
  const slots = useMemo(() => (hydrated && values.date ? slotsForDate(values.date) : []), [hydrated, values.date]);
  const dateError = hydrated && values.date ? validateBookingDate(values.date) : null;

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => {
      const next = { ...v, [name]: type === 'checkbox' ? checked : value };
      if (name === 'date' && !slotsForDate(value).includes(v.time)) next.time = '';
      return next;
    });
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    if (status !== 'idle' && status !== 'submitting') reset();
  };

  const validate = () => {
    const dErr = validateBookingDate(values.date);
    const errs = {
      service: serviceOptions.some((o) => o.value === values.service) ? null : 'Choisissez un service.',
      date: dErr,
      time: dErr ? null : validateBookingDate(values.date, values.time),
      name: validateName(values.name),
      phone: validatePhone(values.phone),
      email: validateEmail(values.email),
      area: validateRequired(values.area, 'Indiquez votre quartier ou votre adresse.', LIMITS.area),
      details: (values.details || '').length > LIMITS.message ? `Maximum ${LIMITS.message} caractères.` : null,
      consent: values.consent ? null : 'Votre accord est nécessaire pour traiter la demande.',
    };
    return Object.fromEntries(Object.entries(errs).filter(([, v]) => v));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    const fields = {
      'Service souhaité': serviceLabel(values.service),
      'Date souhaitée': formatDateFr(values.date),
      'Heure souhaitée (heure de Douala)': values.time,
      'Nom complet': values.name.trim(),
      'Téléphone / WhatsApp': values.phone.trim(),
      'E-mail': values.email.trim(),
      'Quartier / adresse': values.area.trim(),
      'Détails': values.details.trim(),
      'Statut': 'Demande reçue — en attente de validation (aucun paiement demandé)',
    };
    const text = summaryText('Demande de réservation — Éclat Résidences', fields);
    setSummary(text);
    if (isBot(values)) return;
    const ok = await send({
      subject: `Demande de réservation — ${formatDateFr(values.date)} ${values.time} — ${values.name.trim()}`,
      fields,
      replyTo: values.email.trim() || undefined,
      fromName: values.name.trim(),
      honeypot: values.website,
    });
    if (ok) {
      setSent(fields);
      setValues({ ...empty });
    }
  };

  const busy = status === 'submitting';

  return (
    <form className="panel form" onSubmit={onSubmit} noValidate aria-labelledby="booking-form-title">
      <h2 id="booking-form-title" className="panel__title">Demander une réservation</h2>
      <p className="form__intro">Les champs marqués d'un astérisque (*) sont obligatoires.</p>
      <DemoBanner configured={configured} />

      <Field id="service" label="Service souhaité" required as="select" value={values.service} onChange={update} error={errors.service}>
        <option value="">Sélectionner un service</option>
        {serviceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </Field>

      <div className="form__grid">
        <Field
          id="date" label="Date souhaitée" required type="date"
          min={bounds.min} max={bounds.max}
          value={values.date} onChange={update}
          error={errors.date || dateError}
          hint={`Jours proposés : ${openDaysLabel()}.`}
        />
        <Field
          id="time" label="Heure souhaitée" required as="select"
          value={values.time} onChange={update} error={errors.time}
          disabled={!values.date || slots.length === 0}
          hint="Heure de Douala (UTC+1)."
        >
          <option value="">{!values.date ? 'Choisir d’abord une date' : slots.length ? 'Choisir une heure' : 'Aucun créneau ce jour-là'}</option>
          {slots.map((s) => <option key={s} value={s}>{s.replace(':', ' h ')}</option>)}
        </Field>
      </div>
      <p className="form__note">
        <Clock3 size={15} aria-hidden="true" /> Ces créneaux sont des préférences : ils ne garantissent pas une disponibilité.
      </p>

      <div className="form__grid">
        <Field id="name" label="Nom complet" required autoComplete="name" maxLength={LIMITS.name} value={values.name} onChange={update} error={errors.name} />
        <Field id="phone" label="Téléphone ou WhatsApp" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+237 …" maxLength={LIMITS.phone} value={values.phone} onChange={update} error={errors.phone} />
      </div>
      <Field id="email" label="Courriel" type="email" autoComplete="email" maxLength={LIMITS.email} value={values.email} onChange={update} error={errors.email} />
      <Field id="area" label="Quartier ou adresse" required placeholder="Ex. Douala, Akwa" maxLength={LIMITS.area} value={values.area} onChange={update} error={errors.area} />
      <Field id="details" label="Détails de la prestation" as="textarea" rows={4} maxLength={LIMITS.message} placeholder="Type de logement ou de local, superficie, fréquence souhaitée, accès…" value={values.details} onChange={update} error={errors.details} />
      <ConsentField checked={values.consent} onChange={update} error={errors.consent} purpose="traiter ma demande de réservation et me recontacter" />
      <Honeypot value={values.website} onChange={update} />

      <p className="form__warning">{NOT_CONFIRMED} Aucun paiement n'est demandé à cette étape.</p>

      <button type="submit" className="btn btn--gold btn--block" disabled={busy} aria-disabled={busy}>
        <span>{busy ? 'Envoi en cours…' : 'Envoyer ma demande'}</span>
      </button>

      <FormStatus
        status={status}
        error={error}
        summary={summary}
        successTitle="Demande reçue — en attente de validation"
        successText={<p>{NOT_CONFIRMED}</p>}
      >
        {sent && (
          <dl className="recap">
            {Object.entries(sent).filter(([k, v]) => v && k !== 'Statut').map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        )}
      </FormStatus>
      <p className="sr-only">Fuseau horaire utilisé : {bookingSettings.timeZone}.</p>
    </form>
  );
}
