## À propos

Ce projet a été créé avec [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

L'application utilise une base de données MongoDB hébergée sur [MongoDB Atlas](https://www.mongodb.com/atlas). Elle inclut plusieurs modèles, tels qu'un modèle pour les recettes et un autre pour les utilisateurs. L'API est hébergée sur [Render](https://render.com) à l'adresse [apifinaldev3](https://apifinaldev3.onrender.com).

# Lancer le projet en local

### 1. Cloner le dépôt Git

Il faut cloner le dépot sur la machine local

### 2. Lancer en dévéloppement avec "npm run dev" à la racine du projet

## Scripts disponibles

### `npm run dev`

Lance le serveur en mode développement.

### `npm test`

Exécute tous les tests unitaires avec rechargement à chaud.

### `npm test -- --testFile="nom du fichier de test" (ex. --testFile=Users).`

Exécute un test unitaire spécifique.

### `npm run test:no-reloading`

Exécute tous les tests unitaires sans rechargement à chaud.

### `npm run lint`

Vérifie les erreurs de linting.

### `npm run build`

Construit le projet pour la production.

### `npm start`

Lance la version de production (doit être construite au préalable).

### `npm start -- --env="nom du fichier d'environnement" (par défaut : production).`

Lance la version de production avec un fichier d'environnement spécifique.

## Base de données

Cette application utilise une base de données MongoDB hébergée sur **MongoDB Atlas**. Elle inclut les modèles suivants :

1. **Modèle Utilisateur** :
   - Gère l'authentification, les rôles, et les données spécifiques aux utilisateurs.

2. **Modèle Recette** :
   - Stocke les informations sur les recettes, y compris les ingrédients, les étapes et les métadonnées.

## Hébergement

L'API est déployée et accessible via **Render**.

## Notes supplémentaires

- Si `npm run dev` pose problème avec bcrypt sur macOS, vous devrez peut-être exécuter : `npm rebuild bcrypt --build-from-source`.
- Assurez-vous que vos variables d'environnement sont correctement configurées pour se connecter à MongoDB Atlas et permettre à Render d'accéder aux informations nécessaires.
