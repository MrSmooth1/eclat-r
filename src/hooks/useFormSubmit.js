import { useCallback, useRef, useState } from 'react';
import { FormNotConfiguredError, submitForm } from '../services/formSubmission.js';

const COOLDOWN_MS = 30000;

/**
 * États : idle | submitting | success | error | unconfigured
 * - success      : le fournisseur a confirmé la réception (réponse HTTP + JSON).
 * - unconfigured : aucun envoi n'a eu lieu (mode démonstration).
 */
export function useFormSubmit() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const lastSent = useRef(0);

  const send = useCallback(async (payload) => {
    if (Date.now() - lastSent.current < COOLDOWN_MS) {
      setStatus('error');
      setError('Une demande vient déjà d’être envoyée. Patientez quelques secondes avant de réessayer.');
      return false;
    }
    setStatus('submitting');
    setError('');
    try {
      await submitForm(payload);
      lastSent.current = Date.now();
      setStatus('success');
      return true;
    } catch (err) {
      if (err instanceof FormNotConfiguredError) {
        setStatus('unconfigured');
      } else {
        setStatus('error');
        setError(err.message || 'Une erreur est survenue.');
      }
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setError('');
  }, []);

  return { status, error, send, reset };
}
