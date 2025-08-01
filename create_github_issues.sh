#!/bin/bash

# Script pour créer toutes les issues GitHub automatiquement
# Usage: ./create_github_issues.sh OWNER REPO
# Le token GitHub sera lu depuis le fichier .env

# Vérifier les arguments
if [ $# -ne 2 ]; then
    echo "Usage: $0 <OWNER> <REPO>"
    echo "Example: $0 myusername myrepo"
    echo "Note: Le token GitHub doit être défini dans le fichier .env (GITHUB_TOKEN=ghp_xxxx)"
    exit 1
fi

# Charger les variables d'environnement depuis .env
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ Fichier .env non trouvé. Créez un fichier .env avec:"
    echo "GITHUB_TOKEN=ghp_votre_token_ici"
    exit 1
fi

# Vérifier que le token est défini
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN non défini dans le fichier .env"
    echo "Ajoutez cette ligne dans votre fichier .env:"
    echo "GITHUB_TOKEN=ghp_votre_token_ici"
    exit 1
fi

OWNER=$1
REPO=$2
API_URL="https://api.github.com/repos/${OWNER}/${REPO}/issues"

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour créer une issue
create_issue() {
    local title="$1"
    local body="$2"
    local labels="$3"
    
    echo -e "${YELLOW}Création de l'issue: $title${NC}"
    
    # Préparer le JSON
    local json_data=$(cat <<EOF
{
  "title": "$title",
  "body": "$body",
  "labels": [$labels]
}
EOF
)
    
    # Appel API
    response=$(curl -s -w "%{http_code}" -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Content-Type: application/json" \
        -d "$json_data" \
        "$API_URL")
    
    http_code="${response: -3}"
    response_body="${response%???}"
    
    if [ "$http_code" -eq 201 ]; then
        issue_number=$(echo "$response_body" | grep -o '"number": [0-9]*' | cut -d' ' -f2)
        echo -e "${GREEN}✓ Issue #$issue_number créée avec succès${NC}"
    else
        echo -e "${RED}✗ Erreur lors de la création de l'issue (HTTP $http_code)${NC}"
        echo "$response_body"
    fi
    
    # Pause pour éviter le rate limiting
    sleep 1
}

echo "=== Création des issues GitHub pour OneFlow ==="
echo "Repository: $OWNER/$REPO"
echo

# 🏗️ Configuration & Infrastructure
create_issue "[SETUP-001] Configuration initiale du projet" \
"## Description
- Initialiser Next.js 14 avec TypeScript
- Configuration Tailwind CSS  
- Structure des dossiers (components, pages, lib, types)
- Configuration ESLint + Prettier
- Setup des variables d'environnement

## Critères d'acceptation
- [ ] Next.js 14 installé et configuré
- [ ] TypeScript configuré
- [ ] Tailwind CSS opérationnel
- [ ] Structure de dossiers cohérente
- [ ] Linting et formatting automatiques" \
'"setup", "priority:high"'

create_issue "[SETUP-002] Configuration base de données" \
"## Description  
- Configuration PostgreSQL
- Schema initial (users, projects, tasks, time_entries)
- Configuration Prisma ORM
- Migrations initiales
- Seed data pour développement

## Critères d'acceptation
- [ ] PostgreSQL configuré
- [ ] Schema complet défini
- [ ] Prisma configuré et fonctionnel
- [ ] Migrations appliquées
- [ ] Données de test disponibles" \
'"setup", "database", "priority:high"'

create_issue "[SETUP-003] Système d'authentification" \
"## Description
- Configuration NextAuth.js
- Stratégies de connexion (email/password, Google, GitHub)
- Middleware de protection des routes
- Gestion des rôles (admin, chef de projet, développeur)

## Critères d'acceptation
- [ ] NextAuth.js configuré
- [ ] Connexion email/password fonctionnelle
- [ ] OAuth Google/GitHub configurés
- [ ] Routes protégées
- [ ] Système de rôles opérationnel" \
'"auth", "security", "priority:high"'

# 📋 Module Gestion de Projet
create_issue "[PROJECT-001] CRUD Projets" \
"## Description
- Création/édition/suppression de projets
- Interface liste des projets avec filtres
- Assignation d'équipes aux projets
- Gestion des statuts projet (draft, active, completed, archived)

## Critères d'acceptation
- [ ] CRUD complet des projets
- [ ] Interface liste avec filtres
- [ ] Assignation d'équipes
- [ ] Gestion des statuts" \
'"feature", "project-management", "priority:high"'

create_issue "[PROJECT-002] CRUD Tâches avec liens" \
"## Description
- Création/édition/suppression de tâches
- Système de dépendances entre tâches (bloquant/bloqué par)
- Types de tâches (feature, bug, task, epic)
- Priorités et estimations
- Assignation utilisateurs

## Critères d'acceptation
- [ ] CRUD complet des tâches
- [ ] Système de dépendances
- [ ] Types et priorités
- [ ] Estimations temps
- [ ] Assignation utilisateurs" \
'"feature", "task-management", "priority:high"'

create_issue "[PROJECT-003] Vue calendrier/Timeline" \
"## Description
- Vue calendrier des tâches avec dates début/fin
- Interface drag & drop pour déplacer les tâches
- Vue Gantt simplifiée
- Gestion des conflits de planning
- Export calendrier (iCal)

## Critères d'acceptation
- [ ] Calendrier interactif
- [ ] Drag & drop fonctionnel
- [ ] Vue Gantt
- [ ] Détection conflits
- [ ] Export iCal" \
'"feature", "ui", "calendar", "priority:high"'

create_issue "[PROJECT-004] Tableau de bord projet" \
"## Description
- Vue d'ensemble progression projet
- Graphiques burndown/burnup
- Répartition des tâches par statut/assigné
- Métriques vélocité équipe
- Alertes deadlines

## Critères d'acceptation
- [ ] Dashboard complet
- [ ] Graphiques de progression
- [ ] Répartition des tâches
- [ ] Métriques équipe
- [ ] Système d'alertes" \
'"feature", "dashboard", "analytics", "priority:medium"'

# ⏱️ Time Tracking
create_issue "[TIME-001] Interface de saisie de temps" \
"## Description
- Formulaire simple de saisie temps sur tâches
- Timer intégré start/stop
- Saisie rétroactive avec sélection de date
- Validation des entrées (pas de temps négatif, etc.)

## Critères d'acceptation
- [ ] Formulaire de saisie
- [ ] Timer start/stop
- [ ] Saisie rétroactive
- [ ] Validation des données" \
'"feature", "time-tracking", "priority:high"'

create_issue "[TIME-002] Rappels automatiques de saisie" \
"## Description
- Notification quotidienne fin de journée
- Proposition des tâches en cours
- Option \"Autre\" pour créer nouvelle tâche
- Configuration personnalisée des rappels

## Critères d'acceptation
- [ ] Notifications quotidiennes
- [ ] Suggestion tâches actives
- [ ] Création rapide tâches
- [ ] Configuration personnalisée" \
'"feature", "automation", "notifications", "priority:medium"'

create_issue "[TIME-003] Rapports de temps" \
"## Description
- Rapport individuel temps passé par projet/tâche
- Export Excel/CSV des timesheet
- Vue manageur : temps équipe
- Facturation basée sur le temps (optionnel)

## Critères d'acceptation
- [ ] Rapports individuels
- [ ] Export Excel/CSV
- [ ] Vue manageur
- [ ] Module facturation" \
'"feature", "reporting", "analytics", "priority:medium"'

# 🤖 Intégration IA
create_issue "[AI-001] Assistant chat basique" \
"## Description
- Interface chat intégrée
- Connexion API OpenAI/Anthropic
- Contexte projet/tâches dans les conversations
- Historique des conversations

## Critères d'acceptation
- [ ] Interface chat
- [ ] API IA configurée
- [ ] Contexte projet intégré
- [ ] Historique sauvegardé" \
'"feature", "ai", "priority:medium"'

create_issue "[AI-002] Aide à la rédaction de tâches" \
"## Description
- Suggestion d'amélioration description tâches
- Auto-complétion tags et labels
- Estimation automatique complexité/temps
- Templates de tâches intelligents

## Critères d'acceptation
- [ ] Suggestions d'amélioration
- [ ] Auto-complétion
- [ ] Estimations automatiques
- [ ] Templates intelligents" \
'"feature", "ai", "productivity", "priority:medium"'

create_issue "[AI-003] Assistant planification réunions" \
"## Description
- Analyse disponibilités équipe
- Suggestion créneaux optimaux
- Génération automatique invitations
- Préparation agenda basé sur le contexte

## Critères d'acceptation
- [ ] Analyse disponibilités
- [ ] Suggestions créneaux
- [ ] Génération invitations
- [ ] Préparation agenda" \
'"feature", "ai", "calendar", "priority:low"'

# 🏆 Gamification
create_issue "[GAME-001] Système de points" \
"## Description
- Points pour complétion tâches à temps
- Bonus qualité (validation sans retours)
- Pénalités retards
- Calcul score individuel et équipe

## Critères d'acceptation
- [ ] Système de points
- [ ] Bonus qualité
- [ ] Pénalités retards
- [ ] Scores équipe" \
'"feature", "gamification", "priority:low"'

create_issue "[GAME-002] Badges et achievements" \
"## Description
- Système badges (premier commit, 100 tâches, etc.)
- Profil utilisateur avec achievements
- Tableau des scores équipe
- Notifications nouvelles récompenses

## Critères d'acceptation
- [ ] Système de badges
- [ ] Profils utilisateur
- [ ] Tableau des scores
- [ ] Notifications récompenses" \
'"feature", "gamification", "ui", "priority:low"'

# 📊 Analytics et Estimation
create_issue "[ANALYTICS-001] Calcul vélocité équipe" \
"## Description
- Calcul points vélocité par sprint/semaine
- Historique performance équipe
- Prédiction capacité future
- Ajustement automatique estimations

## Critères d'acceptation
- [ ] Calcul vélocité
- [ ] Historique performance
- [ ] Prédictions capacité
- [ ] Ajustements automatiques" \
'"feature", "analytics", "priority:medium"'

create_issue "[ANALYTICS-002] Prédictions IA planning" \
"## Description
- Prédiction dates de fin projet
- Identification des goulots d'étranglement
- Suggestions réallocation ressources
- Alertes dérapages planning

## Critères d'acceptation
- [ ] Prédictions dates fin
- [ ] Identification goulots
- [ ] Suggestions réallocation
- [ ] Alertes dérapages" \
'"feature", "ai", "analytics", "priority:low"'

# 🔧 Améliorer UX/UI
create_issue "[UI-001] Design system" \
"## Description
- Création composants réutilisables
- Guide de style et couleurs
- Documentation Storybook
- Accessibilité (WCAG)

## Critères d'acceptation
- [ ] Composants réutilisables
- [ ] Guide de style
- [ ] Documentation Storybook
- [ ] Conformité WCAG" \
'"ui", "design-system", "priority:medium"'

create_issue "[UI-002] Interface responsive" \
"## Description
- Adaptation mobile/tablette
- PWA pour utilisation offline
- Optimisation performance
- Tests cross-browser

## Critères d'acceptation
- [ ] Design responsive
- [ ] PWA fonctionnelle
- [ ] Performance optimisée
- [ ] Tests cross-browser" \
'"ui", "mobile", "priority:medium"'

# 🚀 Déploiement
create_issue "[DEPLOY-001] Pipeline CI/CD" \
"## Description
- Configuration GitHub Actions
- Tests automatisés (unit, e2e)
- Déploiement automatique staging/prod
- Monitoring et alertes

## Critères d'acceptation
- [ ] GitHub Actions configuré
- [ ] Tests automatisés
- [ ] Déploiement automatique
- [ ] Monitoring opérationnel" \
'"devops", "ci-cd", "priority:medium"'

create_issue "[DEPLOY-002] Infrastructure production" \
"## Description
- Configuration serveurs (Vercel/Railway/AWS)
- Base de données production
- CDN pour assets statiques
- Backup automatiques
- SSL et sécurité

## Critères d'acceptation
- [ ] Serveurs configurés
- [ ] BDD production
- [ ] CDN configuré
- [ ] Backups automatiques
- [ ] SSL et sécurité" \
'"devops", "infrastructure", "priority:medium"'

echo
echo -e "${GREEN}=== Toutes les issues ont été créées ! ===${NC}"
echo "Vérifiez votre repository GitHub pour voir les nouvelles issues."