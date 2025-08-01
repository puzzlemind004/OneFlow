# Commandes pour créer le projet GitHub

## 1. Installer GitHub CLI (si pas déjà fait)
```bash
# Windows (avec winget)
winget install --id GitHub.cli

# Ou télécharger depuis https://cli.github.com/
```

## 2. Authentification GitHub
```bash
gh auth login
```

## 3. Créer le repository
```bash
gh repo create oneflow-saas --public --description "Plateforme SaaS intégrée pour entreprises - Gestion de projet avec IA, communication et outils collaboratifs"
```

## 4. Ajouter les fichiers et premier commit
```bash
git add .
git commit -m "Initial commit: project structure and documentation"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/oneflow-saas.git
git push -u origin main
```

## 5. Créer les issues (exemples prioritaires)

### Configuration initiale
```bash
gh issue create --title "[SETUP-001] Configuration initiale du projet" --body "**Labels**: setup, priority:high

**Description**: 
- Initialiser Next.js 14 avec TypeScript
- Configuration Tailwind CSS
- Structure des dossiers (components, pages, lib, types)
- Configuration ESLint + Prettier
- Setup des variables d'environnement

**Critères d'acceptance**:
- [ ] Projet Next.js 14 fonctionnel
- [ ] TypeScript configuré
- [ ] Tailwind CSS intégré
- [ ] Structure dossiers organisée
- [ ] Linting et formatting automatiques" --label "setup,priority:high"
```

### Base de données
```bash
gh issue create --title "[SETUP-002] Configuration base de données" --body "**Description**:
- Configuration PostgreSQL
- Schema initial (users, projects, tasks, time_entries)
- Configuration Prisma ORM
- Migrations initiales
- Seed data pour développement

**Critères d'acceptance**:
- [ ] PostgreSQL configuré
- [ ] Schema Prisma défini
- [ ] Migrations créées
- [ ] Seed data fonctionnel" --label "setup,database,priority:high"
```

### Authentification
```bash
gh issue create --title "[SETUP-003] Système d'authentification" --body "**Description**:
- Configuration NextAuth.js
- Stratégies de connexion (email/password, Google)
- Middleware de protection des routes
- Gestion des rôles (admin, chef de projet, développeur)

**Critères d'acceptance**:
- [ ] NextAuth.js configuré
- [ ] Connexion email/password
- [ ] Protection des routes
- [ ] Système de rôles" --label "auth,security,priority:high"
```

### CRUD Projets
```bash
gh issue create --title "[PROJECT-001] CRUD Projets" --body "**Description**:
- Création/édition/suppression de projets
- Interface liste des projets avec filtres
- Assignation d'équipes aux projets
- Gestion des statuts projet

**Critères d'acceptance**:
- [ ] API CRUD projets
- [ ] Interface utilisateur
- [ ] Filtres et recherche
- [ ] Gestion statuts" --label "feature,project-management,priority:high"
```

### CRUD Tâches
```bash
gh issue create --title "[PROJECT-002] CRUD Tâches avec liens" --body "**Description**:
- Création/édition/suppression de tâches
- Système de dépendances entre tâches
- Types de tâches (feature, bug, task, epic)
- Assignation utilisateurs

**Critères d'acceptance**:
- [ ] API CRUD tâches
- [ ] Système dépendances
- [ ] Types et priorités
- [ ] Interface assignation" --label "feature,task-management,priority:high"
```

## 6. Créer les labels du projet
```bash
gh label create "setup" --description "Configuration et initialisation" --color "0052cc"
gh label create "feature" --description "Nouvelle fonctionnalité" --color "0e8a16"
gh label create "priority:high" --description "Priorité haute" --color "d93f0b"
gh label create "priority:medium" --description "Priorité moyenne" --color "fbca04"
gh label create "priority:low" --description "Priorité basse" --color "c2e0c6"
gh label create "project-management" --description "Gestion de projet" --color "5319e7"
gh label create "task-management" --description "Gestion des tâches" --color "0052cc"
gh label create "ai" --description "Intelligence artificielle" --color "f9d0c4"
gh label create "database" --description "Base de données" --color "d4c5f9"
gh label create "auth" --description "Authentification" --color "c5def5"
gh label create "ui" --description "Interface utilisateur" --color "bfdadc"
```

## 7. Créer un milestone V1
```bash
gh api repos/:owner/:repo/milestones --method POST --field title="V1 - MVP" --field description="Version 1 - Minimum Viable Product avec gestion de projet et IA intégrée" --field due_on="2024-06-01T00:00:00Z"
```

Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub avant d'exécuter les commandes.