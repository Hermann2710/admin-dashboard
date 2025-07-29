# Admin Dashboard

Ce projet est un tableau de bord d’administration fullstack utilisant React, TypeScript, Vite pour le frontend, et Node.js/Express pour le backend.

## 🚀 Fonctionnalités principales

- Authentification (login, inscription, gestion des utilisateurs)
- Dashboard administrateur
- Gestion des utilisateurs
- Sécurité via middlewares
- Architecture modulaire

## 🗂️ Structure du projet

```
admin-dashboard/
  backend/      # API Express, logique métier, modèles, routes
  frontend/     # Application React, pages, composants, contextes
```

## ⚙️ Prérequis

- Node.js >= 16.x
- npm >= 8.x

## 🛠️ Installation

Clone le repo :

```bash
git clone <url-du-repo>
cd admin-dashboard
```

Installe les dépendances pour le backend et le frontend :

```bash
cd backend
npm install
cd ../frontend
npm install
```

## ▶️ Démarrage

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

L’application frontend sera accessible sur [http://localhost:5173](http://localhost:5173) (par défaut).

## 📝 Scripts utiles

Backend :

- `npm run dev` – Démarre le serveur en mode développement
- `npm run build` – Compile le projet

Frontend :

- `npm run dev` – Démarre le serveur de développement Vite
- `npm run build` – Build de production

## 📁 Détails des dossiers

- `backend/src/controllers` – Logique des routes
- `backend/src/models` – Modèles de données (Mongoose, etc.)
- `backend/src/routes` – Définition des routes API
- `frontend/src/pages` – Pages principales de l’interface
- `frontend/src/components` – Composants réutilisables
- `frontend/src/contexts` – Contextes React pour la gestion d’état

## 🤝 Contribution

Les contributions sont les bienvenues ! Ouvre une issue ou une pull request.
