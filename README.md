# Affichage Dynamique Publicitaire - Les Pétillantes

Ce projet est une application [Next.js](https://nextjs.org) créée avec [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) et optimisée pour l’affichage dynamique publicitaire sur écrans TV.

**Démo en ligne :** [Voir la démonstration](https://les-p-tillantes.vercel.app)

---

## Installation et lancement

1. Assurez-vous d’avoir [Node.js](https://nodejs.org/) installé.
2. Installez les dépendances :

```bash
npm install
```

3. Lancez le serveur de développement :

```bash
npm run dev
```

4. Ouvrez `http://localhost:3000` dans votre navigateur.

---

## Modifier les visuels publicitaires

La mise à jour des affiches est simple et ne nécessite pas de modifier la logique de l’application.

1. Ajoutez vos images (`.jpg`, `.png`, `.webp`, etc.) dans le dossier `public/` à la racine du projet.
2. Ouvrez le fichier `app/data/mediaList.ts`.
3. Remplacez les noms de fichiers par ceux de vos nouveaux visuels :

```ts
export const mediaList = [
  { id: 1, src: "/votre-nouvelle-affiche.jpg" },
  { id: 2, src: "/promo-ete.webp" },
  // ...
];
```

Le système accepte autant d’images que nécessaire. Enregistrez le fichier, et la page se mettra à jour automatiquement.

---

## Configuration de la durée d’affichage

Vous pouvez ajuster le temps d’affichage des affiches depuis une page d’administration cachée.

1. Rendez-vous sur `http://localhost:3000/time`.
2. Saisissez la durée souhaitée en secondes (par exemple : `15`).
3. Cliquez sur **Sauvegarder**.
4. Au prochain rechargement de la page principale (`/`), le nouveau temps sera pris en compte.

> Note : l’animation du logo (entracte) inclut une pause de 1 seconde pour conserver un rythme dynamique. Pour modifier ce comportement, ajustez le paramètre `duration` dans `app/page.tsx`.

---

## Fonctionnement

Pour garantir une expérience fluide sur des écrans TV souvent limités, ce lecteur utilise plusieurs optimisations :

- **GSAP pour l’animation** : les transitions sont gérées avec GSAP pour un rendu fluide.
- **Architecture en 3 calques** : l’application superpose trois panneaux (image actuelle, logo, nouvelle image) pour une transition douce.
- **Préchargement agressif** : l’image suivante est chargée et décodée avant la transition pour éviter les sauts et les temps de latence.

---

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Tutoriel Learn Next.js](https://nextjs.org/learn)

```

```
