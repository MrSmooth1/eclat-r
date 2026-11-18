import { useEffect, useState } from 'react';

/**
 * Faux pendant le pré-rendu et le premier rendu client, vrai ensuite.
 * Sert aux éléments qui dépendent de l'heure courante (dates minimales…),
 * pour éviter tout écart entre la page pré-rendue et le navigateur.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
