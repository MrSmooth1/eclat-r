# Éclat Résidences — site vitrine (React + Vite)

> « La propreté qui valorise vos résidences »

Site vitrine d'Éclat Résidences (Douala, Cameroun) : présentation de l'entreprise, des trois services, demande de devis et demande de réservation avec validation manuelle. Les formulaires sont envoyés **par e-mail** à l'entreprise via un service de formulaires (Web3Forms ou Formspree). **Aucun serveur ni base de données n'est nécessaire** pour cette phase.

---

## 1. Installation et lancement

Prérequis : Node.js 20.19 ou plus récent (22 recommandé).

```bash
npm install          # installe les dépendances
cp .env.example .env # puis complétez les valeurs (facultatif en local)
npm run dev          # site en local : http://localhost:5173
npm test             # tests : tarifs, dates (fuseau de Douala), validation
npm run build        # version de production dans dist/ (pages pré-rendues)
npm run preview      # aperçu local de la version de production
```

En local (`npm run dev`), la grille tarifaire s'affiche en **aperçu** sur la page *Nos solutions*, avec un bandeau « Aperçu local, non publié ».

## 2. Structure

```
src/
  assets/images/   visuels optimisés (WebP), extraits des fichiers fournis
  components/      Header, Footer, Button, ServiceCard, ContactForm, BookingForm,
                   PricingTable, PriceSimulator, PricingModule, WhatsAppButton, FormStatus…
  data/            ← CONTENU ET PARAMÈTRES : coordonnées, services, tarifs, horaires,
                   SEO, mentions légales, avis clients
  hooks/           usePageMeta (SEO), useFormSubmit (états d'envoi), useHydrated
  layouts/         MainLayout (en-tête, pied de page, bouton WhatsApp)
  pages/           Accueil, À propos, Services, Solutions, Contact, Réserver,
                   Mentions légales, Confidentialité, 404
  services/        formSubmission (Web3Forms/Formspree), pricing, dates, validation
  styles/          theme.css (couleurs, polices), base, layout, components, pages
scripts/           prerender.js (SEO + sitemap), generate-qrcode.js
tests/             tests unitaires (node --test)
```

| Route | Page |
|---|---|
| `/` | Accueil |
| `/a-propos` | À propos |
| `/services` | Nos services |
| `/solutions` | Nos solutions (+ tarifs si publiés) |
| `/contact` | Contact / demande de devis |
| `/reserver` | Demande de réservation (**URL stable pour le QR code**) |
| `/mentions-legales`, `/confidentialite` | Pages légales (provisoires) |
| autre | Page 404 |

## 3. Ce qui est fonctionnel, connecté ou en attente

| Élément | État |
|---|---|
| Pages, navigation, menu mobile, responsive | ✅ Fonctionnel |
| Grille tarifaire + simulateur | ✅ Fonctionnel — **masqué en ligne** tant que `VITE_PUBLISH_PRICING` ≠ `true` |
| Préremplissage du devis (services, simulateur) | ✅ Fonctionnel (via l'état de navigation, aucune donnée dans l'URL) |
| Dates au fuseau Africa/Douala, refus des dates passées / jours fermés | ✅ Fonctionnel |
| Formulaires contact et réservation → e-mail | ⏳ **En attente de configuration** (`VITE_FORM_PROVIDER`). Sans configuration : « Mode démonstration », rien n'est envoyé ni présenté comme envoyé |
| Bouton WhatsApp | ⏳ Masqué tant que `VITE_WHATSAPP_NUMBER` est vide |
| Adresse contact@eclatresidences.com | ⏳ Affichée « en cours d'activation » tant que `VITE_CONTACT_EMAIL_ACTIVE` ≠ `true` |
| Calendrier SimplyBook.me / Cal.com | ⏳ Facultatif : lien affiché sur /reserver si `VITE_BOOKING_URL` est renseigné |
| Administration, suivi des demandes, droits | ❌ Hors périmètre de cette phase (voir § 9) |
| Lien de paiement (CinetPay / Flutterwave) | ❌ Hors périmètre de cette phase (voir § 9) |
| Mentions légales / confidentialité | ⚠ Provisoires : champs `[À compléter]` dans `src/data/legal.js` |

## 4. Configurer l'envoi des formulaires par e-mail

Les formulaires envoient leurs données à un service tiers qui les transmet par e-mail. Deux fournisseurs sont pris en charge.

### Option A — Web3Forms (recommandée)
1. Créez d'abord la boîte **contact@eclatresidences.com** chez votre fournisseur de messagerie et vérifiez qu'elle reçoit les messages.
2. Sur <https://web3forms.com>, saisissez cette adresse : une **access key** vous est envoyée par e-mail.
3. Renseignez :
   ```
   VITE_FORM_PROVIDER=web3forms
   VITE_WEB3FORMS_ACCESS_KEY=votre-cle
   VITE_CONTACT_EMAIL_ACTIVE=true
   ```
4. Relancez le build / redéployez, puis envoyez un message de test depuis le site en ligne.

D'après la documentation de Web3Forms, l'access key est **publique par conception** : elle permet seulement d'envoyer des messages vers l'adresse associée, ce n'est pas une clé secrète. Offre gratuite annoncée : 250 envois par mois, avec filtrage anti-spam côté serveur. Vérifiez les conditions en vigueur au moment de l'inscription.

### Option B — Formspree
1. Créez un formulaire sur <https://formspree.io> lié à contact@eclatresidences.com.
2. Renseignez `VITE_FORM_PROVIDER=formspree` et `VITE_FORMSPREE_FORM_ID=` (la partie après `/f/`).
3. Dans le tableau de bord Formspree, vous pouvez activer reCAPTCHA / Turnstile et la restriction de domaine.

Offre gratuite plus limitée (environ 50 envois par mois selon les comparatifs consultés). À vérifier.

### Anti-spam
- Champ piège invisible (`botcheck` / `_gotcha`) : les robots qui le remplissent sont ignorés par le fournisseur.
- Délai minimal de 30 s entre deux envois depuis le même navigateur (confort uniquement : la vraie limitation se fait côté fournisseur).
- Validation des champs côté client. La validation côté serveur est assurée par le fournisseur (format, spam). Une validation métier complète côté serveur nécessitera le backend de la phase 2.

### Confirmation au client
Après un envoi réussi, le site affiche une confirmation à l'écran (et, pour une réservation, le récapitulatif avec le statut « Demande reçue — en attente de validation »). Un **e-mail automatique au client** (autoresponder) n'est pas inclus dans les offres gratuites des deux fournisseurs : à activer sur une offre payante si souhaité, après vérification. Quand le client indique son e-mail, il est placé en adresse de réponse (*reply-to*) : l'équipe lui répond directement depuis sa messagerie.

## 5. Modifier le numéro WhatsApp et les coordonnées

Toutes les coordonnées sont dans **`src/data/site.js`** (horaires, zones, réseaux sociaux…). Les valeurs susceptibles de changer souvent peuvent aussi être modifiées **sans toucher au code**, dans les variables d'environnement de l'hébergeur :

- Netlify : *Site configuration → Environment variables*, puis *Deploys → Trigger deploy*.
- Vercel : *Settings → Environment Variables*, puis *Redeploy*.

`VITE_WHATSAPP_NUMBER` : numéro au format international, **chiffres uniquement** (ex. `2376XXXXXXXX`). Tant qu'il est vide, tous les boutons WhatsApp sont masqués.

> Ce n'est pas une interface d'administration : c'est le moyen le plus simple de modifier ces valeurs sans serveur. Une vraie administration est prévue en phase 2.

## 6. Publier la grille tarifaire

Le cahier des charges demande une validation préalable. Après accord de la direction :
```
VITE_PUBLISH_PRICING=true
```
puis redéployez. Les tarifs sont dans `src/data/pricing.js` (grille 2026). Les économies affichées sont **calculées** à partir des tarifs réels (`npm test` vérifie la grille et les calculs).

## 7. Demande de réservation et calendrier externe

`/reserver` envoie la demande par e-mail, comme le contact. Les jours et heures proposés (`src/data/booking.js`) sont des **préférences** et sont présentés comme tels : **aucun créneau n'est garanti**. Horaires réels à fournir par l'entreprise.

Pour utiliser en plus un calendrier en ligne :

- **SimplyBook.me** : créez le compte et les services, puis activez l'approbation manuelle des réservations. Elle fait partie des fonctions optionnelles (« Approve booking ») et peut dépendre de l'offre. Copiez le lien public de la page de réservation.
- **Cal.com** : créez un type d'événement, puis activez *Advanced → Requires confirmation* pour que chaque réservation reste en attente de validation. Copiez le lien public.

Renseignez ensuite `VITE_BOOKING_PROVIDER=simplybook` (ou `calcom`) et `VITE_BOOKING_URL=…`. Un bloc « Calendrier en ligne » apparaît sur /reserver. Les fonctions, limites et tarifs de ces services doivent être vérifiés au moment de l'inscription.

## 8. Déploiement

`npm run build` produit `dist/` : une page HTML pré-rendue par route (titre, description, Open Graph, contenu), `404.html`, `sitemap.xml` et `robots.txt`.

- **Netlify** : `netlify.toml` fourni. Reliez le dépôt et ajoutez les variables d'environnement.
- **Vercel** : `vercel.json` fourni.
- **Hébergement mutualisé Apache** : envoyez le contenu de `dist/` (`.htaccess` inclus : HTTPS, www, 404, en-têtes).

Puis : enregistrement du domaine **eclatresidences.com au nom de l'entreprise**, configuration DNS de `www.eclatresidences.com`, certificat HTTPS (automatique sur Netlify et Vercel), et mise à jour de `VITE_SITE_URL` si le domaine diffère. Déclarez ensuite le sitemap dans Google Search Console.

## 9. Phase 2 — backend (non livré ici, à la demande du client)

Pour l'administration sécurisée, le suivi des demandes (accepter, refuser, proposer un créneau), les devis, les droits direction/équipe et les **liens de paiement**, il faudra un backend (API + base de données + authentification), car une application React seule ne peut pas le faire de façon sécurisée. Points à respecter :
- autorisations vérifiées côté serveur ;
- paiement par lien hébergé (CinetPay Payment Links ou Flutterwave Payment Links, en XAF, avec Orange Money et MTN MoMo), **sous réserve de l'éligibilité du compte marchand**, des frais et des moyens réellement activés ;
- jamais de code PIN ni de données bancaires sur le site ; statut vérifié côté serveur auprès du prestataire ; signature des webhooks vérifiée, doublons traités ; états attente, échec, annulation et remboursement.

Les formulaires actuels passent tous par `src/services/formSubmission.js`. Il suffira de remplacer cet adaptateur par un appel à l'API, sans toucher aux composants.

## 10. QR code des cartes de visite

1. Attendez que `https://www.eclatresidences.com/reserver` s'ouvre correctement en HTTPS (domaine enregistré, site déployé).
2. Lancez `npm run qrcode` : vous obtenez `qrcode/qr-reserver.png` (1200 px) et `qrcode/qr-reserver.svg` (vectoriel, pour l'imprimeur).
3. Testez le QR code avec plusieurs téléphones avant impression. La route `/reserver` ne doit jamais être renommée : son contenu peut évoluer sans changer le QR code.

## 11. Limites connues

- Envoi par e-mail via un service tiers : pas d'historique centralisé des demandes sur le site (seulement dans la boîte e-mail et le tableau de bord du fournisseur).
- Ces fournisseurs traitent les données hors du Cameroun : vérifiez les obligations de la **loi n° 2024/017** (transferts hors du pays, formalités auprès de l'Autorité de protection des données). Un juriste doit valider la politique de confidentialité.
- Pré-rendu : le contenu est statique au build. Toute modification des fichiers `data/` nécessite un nouveau build.
- La publication des tarifs, les horaires, les zones couvertes, le numéro WhatsApp et les informations légales restent à fournir ou à valider.

## 12. Licences et origine des ressources

| Dépendance | Licence |
|---|---|
| react, react-dom 19 | MIT |
| react-router 7 | MIT |
| lucide-react (icônes) | ISC |
| vite 7, @vitejs/plugin-react | MIT |
| qrcode (génération QR, développement) | MIT |

Polices : Georgia (titres) et polices système (textes), sans fichier de police embarqué.

Visuels : le logo officiel, les illustrations de personnel en uniforme et les scènes de nettoyage proviennent des fichiers transmis par Éclat Résidences (modèle HTML choisi et cahier des charges). Selon le cahier des charges, ce sont des images générées / d'illustration : elles ne représentent pas des membres réels de l'équipe ni des résidences de clients, et le site l'indique. Deux visuels ont été recadrés pour retirer des textes parasites incrustés dans les images. Le logo a été détouré (fond transparent) sans modification du dessin. L'entreprise doit s'assurer de détenir les droits d'utilisation de ces visuels.

Le code du site est livré à Éclat Résidences, qui en a le libre usage. Les dépendances restent soumises à leurs licences respectives.
