import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Pages pré-rendues au build : on « hydrate » le HTML existant.
// En développement (npm run dev), le conteneur est vide : rendu classique.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
