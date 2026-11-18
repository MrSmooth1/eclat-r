import { useEffect } from 'react';
import { pages } from '../data/seo.js';
import { site } from '../data/site.js';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Met à jour titre, description, Open Graph et URL canonique lors de la navigation. */
export function usePageMeta(path) {
  useEffect(() => {
    const meta = pages[path] ?? pages['404'];
    const url = `${site.url}${path === '404' ? '' : path === '/' ? '/' : path}`;
    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex' : 'index, follow');
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    if (path !== '404') setCanonical(url);
  }, [path]);
}
