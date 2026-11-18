// Point d'entrée du pré-rendu (build) : génère le HTML statique de chaque page
// pour le référencement et un affichage immédiat, avant l'hydratation React.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App.jsx';

export { pages } from './data/seo.js';
export { site } from './data/site.js';

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
