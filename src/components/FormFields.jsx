import { Link } from 'react-router';

const describedBy = (id, error, hint) =>
  [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;

export function Field({ id, label, required, error, hint, as = 'input', children, className = '', ...props }) {
  const Cmp = as;
  return (
    <div className={`field${error ? ' field--error' : ''} ${className}`}>
      <label htmlFor={id}>
        {label} {required ? <span aria-hidden="true">*</span> : <span className="field__optional">(facultatif)</span>}
      </label>
      <Cmp
        id={id}
        name={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, error, hint)}
        aria-required={required || undefined}
        {...props}
      >
        {children}
      </Cmp>
      {hint && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

export function ConsentField({ id = 'consent', checked, onChange, error, purpose }) {
  return (
    <div className={`field field--check${error ? ' field--error' : ''}`}>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-required="true"
      />
      <label htmlFor={id}>
        J'accepte qu'Éclat Résidences utilise ces informations pour {purpose}, conformément à la{' '}
        <Link to="/confidentialite" target="_blank" rel="noopener">politique de confidentialité</Link>{' '}
        (s'ouvre dans un nouvel onglet). <span aria-hidden="true">*</span>
      </label>
      {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

/** Champ piège invisible pour les robots (non annoncé aux lecteurs d'écran). */
export function Honeypot({ value, onChange }) {
  return (
    <div className="hp" aria-hidden="true">
      <label htmlFor="website">Ne pas remplir</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
    </div>
  );
}
