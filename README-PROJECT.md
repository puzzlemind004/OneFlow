# OneFlow - Project Management Platform

OneFlow est une plateforme moderne de gestion de projet avec time tracking, intégration IA et gamification.

## 🏗️ Architecture

- **Frontend**: Angular 20+ avec Tailwind CSS
- **Backend**: AdonisJS 6 (API REST)
- **Base de données**: PostgreSQL avec Lucid ORM
- **Authentification**: JWT/Session based

## 📁 Structure du projet

```
OneFlow/
├── OneFlow-frontend/          # Application Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Composants UI
│   │   │   ├── services/      # Services Angular
│   │   │   └── ...
│   └── ...
├── OneFlow-backend/           # API AdonisJS
│   ├── app/
│   │   ├── controllers/       # Contrôleurs API
│   │   ├── models/           # Modèles Lucid
│   │   └── middleware/       # Middlewares
│   ├── database/
│   │   ├── migrations/       # Migrations DB
│   │   └── seeders/         # Données de test
│   └── ...
└── README.md
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

### Backend (AdonisJS)

1. Naviguez vers le dossier backend :
```bash
cd OneFlow-backend
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez la base de données dans `.env` :
```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_DATABASE=oneflow_dev
```

4. Exécutez les migrations :
```bash
node ace migration:run
```

5. (Optionnel) Ajoutez des données de test :
```bash
node ace db:seed
```

6. Démarrez le serveur de développement :
```bash
npm run dev
```

L'API sera disponible sur `http://localhost:3333`

### Frontend (Angular)

1. Naviguez vers le dossier frontend :
```bash
cd OneFlow-frontend
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur de développement :
```bash
npm start
```

L'application sera disponible sur `http://localhost:4200`

## 📋 Fonctionnalités principales

### ✅ Implémentées
- [x] Architecture de base (Angular + AdonisJS)
- [x] Authentification basique
- [x] Modèles de données (Users, Projects, Tasks, TimeEntries)
- [x] API REST pour les projets
- [x] Interface de connexion
- [x] Dashboard principal

### 🚧 À développer
Voir les [issues GitHub](https://github.com/puzzlemind004/OneFlow/issues) pour la roadmap complète.

## 🛠️ Développement

### Structure de la base de données

**Users**
- id, email, firstName, lastName, password, role, isActive

**Projects** 
- id, name, description, status, startDate, endDate, ownerId

**Tasks**
- id, title, description, status, priority, type, estimatedHours, dueDate, projectId, assignedToId, createdById

**TimeEntries**
- id, description, hours, date, userId, taskId

### API Endpoints

- `POST /api/v1/auth/register` - Inscription
- `POST /api/v1/auth/login` - Connexion
- `GET /api/v1/auth/profile` - Profil utilisateur
- `GET /api/v1/projects` - Liste des projets
- `POST /api/v1/projects` - Créer un projet
- `GET /api/v1/projects/:id` - Détails d'un projet
- `PUT /api/v1/projects/:id` - Mettre à jour un projet
- `DELETE /api/v1/projects/:id` - Supprimer un projet

## 📝 Contributing

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.