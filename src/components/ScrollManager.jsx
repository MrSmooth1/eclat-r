import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

/**
 * À chaque changement de page : remonte en haut (ou vers l'ancre #id demandée)
 * et place le focus sur le contenu principal pour les lecteurs d'écran.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        first.current = false;
        return;
      }
    }
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    document.getElementById('contenu')?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return null;
}
