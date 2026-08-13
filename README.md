# Atelier Nox

Atelier Nox est un concept fictif de site pour un barbier contemporain et studio de grooming. Il constitue le deuxième projet portfolio d’Enzo Da Silveira et démontre un parcours complet de prise de rendez-vous : prestation, professionnel, date, horaire, coordonnées, récapitulatif et acompte simulé.

> Atelier Nox n’est pas un établissement réel. Les professionnels, prestations, créneaux, coordonnées et informations juridiques sont des données de démonstration.

## Stack

- Next.js 16 avec App Router
- React 19
- TypeScript strict
- Tailwind CSS 4
- Lucide React
- Runtime Next.js Netlify explicite

Aucune base de données, aucun service de paiement et aucun backend de réservation ne sont connectés.

## Installation et lancement local

Prérequis : Node.js 20.9 ou plus récent et npm.

```bash
npm install
npm run dev
```

Le site est ensuite disponible à l’adresse affichée par Next.js, généralement `http://localhost:3000`.

Commandes de validation :

```bash
npm run lint
npm run typecheck
npm run build
git diff --check
```

`npm run typecheck` utilise `tsconfig.typecheck.json`. Cette configuration exclut `next-env.d.ts` et `.next` afin que le projet puisse être vérifié depuis une copie source propre, avant tout build Next.js.

## Structure

```text
app/                  Pages, layout, metadata et routes techniques
components/           Composants partagés
components/booking/   Parcours interactif de réservation
data/                 Données métier fictives et remplaçables
lib/                  Formatage partagé
public/images/        Photographies locales de démonstration
```

Les règles permanentes d’architecture, de sécurité, d’accessibilité et de validation sont définies dans `AGENTS.md`.

## Données du studio

`data/studio.ts` centralise :

- identité, activité, accroche et présentation ;
- fallback local de l’URL publique ;
- coordonnées et accès manifestement fictifs ;
- horaires ;
- placeholders juridiques ;
- textes de metadata ;
- clé du brouillon local de réservation ;
- crédits des images.

Tous les champs entre crochets doivent être remplacés avant une utilisation pour un vrai client.

## Prestations

`data/services.ts` contient les huit prestations : identifiant stable, nom, description, catégorie, durée, prix et acompte. Les pages et le parcours de réservation reconstruisent toujours leurs informations depuis cette source.

## Professionnels

`data/team.ts` contient les trois profils fictifs, leurs spécialités, biographies, photographies et identifiants de prestations compatibles.

Les noms Milo, Sami et Alex sont fictifs. Les photographies libres servent uniquement d’illustrations éditoriales et ne représentent pas les personnes décrites par les biographies.

## Disponibilités fictives

`data/availability.ts` définit des grilles hebdomadaires différentes pour chaque professionnel. Le navigateur calcule les quatorze prochains jours et retire certains créneaux de manière déterministe afin de simuler un agenda vivant.

Ces disponibilités ne sont pas réelles :

- aucun agenda externe n’est consulté ;
- aucun créneau n’est verrouillé ;
- plusieurs visiteurs peuvent sélectionner le même horaire ;
- aucune réservation n’est enregistrée.

## Fonctionnement de la réservation

Le parcours de `/reservation` comprend six étapes :

1. choix de la prestation ;
2. choix d’un professionnel compatible ou « Sans préférence » ;
3. sélection d’une date parmi quatorze jours ;
4. sélection d’un horaire ;
5. saisie et validation des coordonnées ;
6. récapitulatif et acompte simulé.

Les liens depuis `/prestations` et `/equipe` utilisent des paramètres d’URL pour présélectionner proprement une prestation ou un professionnel.

Le choix en cours est conservé dans `localStorage` sous forme d’identifiants, de date et d’horaire. Les coordonnées personnelles saisies ne sont pas persistées. Ce stockage améliore uniquement la démonstration sur un appareil ; il ne constitue jamais une source de vérité.

## Limites de la démonstration et futur backend

Un véritable système devrait confier au serveur :

1. la lecture des agendas et indisponibilités ;
2. la vérification des durées et compatibilités ;
3. le verrouillage temporaire d’un créneau ;
4. la création atomique du rendez-vous dans une base de données ;
5. la protection contre les doubles réservations ;
6. la confirmation, l’annulation et les notifications ;
7. la journalisation et la gestion des données personnelles.

Le serveur devrait recalculer prix, acompte, durée, professionnel et disponibilité depuis ses propres données, sans faire confiance aux valeurs envoyées par le navigateur.

## Intégrer Stripe Checkout plus tard

Le bouton « Payer l’acompte et confirmer » affiche volontairement un message de démonstration. Il ne demande aucune donnée bancaire.

Une future intégration pourrait :

1. demander au serveur de créer une intention de réservation et de revérifier le créneau ;
2. calculer l’acompte depuis la source tarifaire serveur ;
3. créer une session Stripe Checkout côté serveur avec une clé secrète ;
4. rediriger le navigateur vers Stripe ;
5. confirmer le rendez-vous uniquement après réception d’un webhook Stripe signé ;
6. libérer le créneau si le paiement expire ou échoue.

Ne jamais placer une clé Stripe secrète dans un composant client, une variable `NEXT_PUBLIC_` ou le repository.

## Images

Photographies utilisées sous licence Unsplash :

- [Mitchell Orr — coupe en barbershop](https://unsplash.com/photos/pL6-dYFSGWI)
- [Taylor Smith — geste de coupe éditorial](https://unsplash.com/photos/XeRfuWMvfyY)
- [Barney Goodman — intérieur de barbershop](https://unsplash.com/photos/AXurvQTtO3Y)
- [JC Gellidon — portrait en barbershop](https://unsplash.com/photos/Q9OUH8WDHBg)
- [Ahmed Warraich — portrait de barbier](https://unsplash.com/photos/1L-rg-6Ux5I)
- [Wylkon Cardoso — barbershop](https://unsplash.com/photos/lCtgUXYrqCo)

`public/og.png` est une création originale générée pour la carte sociale du concept Atelier Nox avec l’outil de génération d’images OpenAI. Prompt final : carte éditoriale sombre, grille architecturale, détail de ciseaux, palette charbon/béton/blanc cassé/cuivre, textes exacts « ATELIER NOX » et « LA COUPE JUSTE. LE GESTE PRÉCIS. ».

## Netlify

`@netlify/plugin-nextjs` est installé en devDependency et `netlify.toml` force explicitement le runtime Next.js :

```toml
[build]
command = "npm run build"
publish = ".next"

[[plugins]]
package = "@netlify/plugin-nextjs"
```

Pendant un build Netlify, `app/layout.tsx` utilise la variable serveur `process.env.URL` pour définir `metadataBase`. En local, `studio.siteUrl` conserve le fallback réservé `https://atelier-nox.invalid`.

### Procédure GitHub → Netlify

1. vérifier les quatre commandes de validation ;
2. créer les commits locaux souhaités ;
3. créer un dépôt GitHub puis ajouter son remote manuellement ;
4. pousser la branche principale ;
5. dans Netlify, créer un projet à partir du dépôt GitHub ;
6. conserver les réglages issus de `netlify.toml` ;
7. lancer le premier déploiement.

Aucun remote GitHub n’est configuré par ce projet.

## Fichiers à ne jamais versionner

Le `.gitignore` exclut notamment :

- `node_modules` ;
- `.next` ;
- `.netlify` ;
- `out` et `build` ;
- les fichiers `.env*` ;
- `next-env.d.ts` ;
- les fichiers `*.tsbuildinfo`.

## Politique noindex

La démonstration reste accessible avec son URL directe, mais elle ne doit pas être indexée :

- metadata globales `noindex`, `nofollow`, `noarchive` et `nosnippet` ;
- metadata dédiées à Googlebot ;
- en-tête HTTP global `X-Robots-Tag` dans `next.config.ts` ;
- `robots.txt` lisible afin que les robots puissent constater les directives `noindex` ;
- aucun sitemap ;
- aucune donnée structurée `LocalBusiness`.

Avant de transformer le projet pour un véritable client, cette politique devra être revue avec les coordonnées, metadata, conditions de réservation et obligations légales réelles.
