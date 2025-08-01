# OneFlow Backend

Backend API développé avec Express.js pour la phase de prototypage rapide.

## 🚀 Démarrage rapide

### Installation
```bash
npm install
```

### Démarrage du serveur de développement
```bash
npm run dev
```

Le serveur sera disponible sur : `http://localhost:3333`

## 📍 Endpoints disponibles

### Health Check
- `GET /` - Message de bienvenue
- `GET /health` - Status de santé du serveur

### Authentification
- `POST /api/v1/auth/login` - Connexion utilisateur
- `POST /api/v1/auth/register` - Inscription utilisateur

### Projets
- `GET /api/v1/projects` - Liste des projets

## 🔧 Configuration

### Environnement
Créez un fichier `.env` avec :
```env
PORT=3333
NODE_ENV=development
```

### CORS
Le serveur est configuré pour accepter les requêtes depuis :
- `http://localhost:4200` (Angular frontend)

## 📋 Exemple d'utilisation

### Test de connexion
```bash
curl -X POST http://localhost:3333/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test des projets
```bash
curl http://localhost:3333/api/v1/projects
```

## 🛠️ Développement

### Scripts disponibles
- `npm run dev` - Serveur de développement avec hot reload
- `npm run build` - Compilation TypeScript
- `npm run start` - Serveur de production

### Structure temporaire
```
OneFlow-backend/
├── bin/
│   └── server.ts          # Point d'entrée Express
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 Notes

- **Version actuelle** : Serveur Express simplifié pour le développement rapide
- **Migration prévue** : Vers AdonisJS complet avec ORM, authentification JWT, etc.
- **Données** : Actuellement en dur, seront remplacées par une vraie base de données

## 🔄 Migration vers AdonisJS

Cette implémentation Express temporaire sera progressivement remplacée par :
1. Configuration complète d'AdonisJS 6
2. Base de données PostgreSQL avec Lucid ORM
3. Système d'authentification JWT
4. Validation des données avec Vine
5. Middleware de sécurité
6. Tests automatisés