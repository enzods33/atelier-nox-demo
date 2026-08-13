# Règles permanentes — Atelier Nox

## Architecture et lisibilité

- Garder une architecture simple, explicite et compréhensible par une personne peu experte en Next.js.
- Ne créer aucune abstraction sans bénéfice concret et éviter les fichiers démesurés.
- Découper les composants seulement lorsque cela améliore réellement la lecture, les tests ou la réutilisation.
- Éviter les duplications et conserver une nomenclature cohérente.
- Séparer les données métier du studio des composants d’interface.
- Garder toutes les données propres au salon facilement remplaçables pour un futur client réel.
- Privilégier les Server Components ; réserver les Client Components aux interactions nécessaires.
- N’ajouter aucune dépendance sans nécessité démontrable.
- Documenter toute décision inhabituelle dans le README.

## TypeScript, sécurité et données

- Utiliser TypeScript en mode strict et éviter tout `any` qui peut raisonnablement être typé.
- Ne stocker aucun secret, token, identifiant sensible ou donnée bancaire dans le repository.
- Ne jamais présenter un backend fictif, une disponibilité locale ou un paiement simulé comme un service réel.
- Ne jamais considérer `localStorage` comme source de vérité d’une réservation réelle.
- Ne jamais accepter côté client un prix ou un créneau comme autorité dans une future implémentation réelle.
- Identifier clairement toutes les données fictives et tous les champs à remplacer avant une mise en production commerciale.

## Expérience et accessibilité

- Concevoir mobile-first et vérifier le responsive sans débordement horizontal.
- Utiliser un HTML sémantique, des boutons réels, des labels explicites et des états accessibles au clavier.
- Préserver des contrastes suffisants, des zones tactiles confortables et un focus visible.
- Ne pas dépendre uniquement de la couleur pour indiquer un état sélectionné, désactivé ou actif.
- Maintenir une identité sombre, urbaine, graphique et éditoriale propre à Atelier Nox.
- Éviter les effets gadgets, le glassmorphism, les interfaces SaaS génériques et les clichés visuels de barbier.

## Validation

- Avant livraison, exécuter obligatoirement `npm run lint`, `npm run typecheck`, `npm run build` et `git diff --check`.
- Le typecheck doit fonctionner depuis une copie source propre, sans dépendre d’un ancien dossier `.next`.
- Corriger les avertissements significatifs et rechercher les contenus génériques, TODO accidentels et secrets potentiels.
- Garder le projet fonctionnel après chaque étape importante.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
