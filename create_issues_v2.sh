#!/bin/bash

# Script pour créer toutes les issues GitHub automatiquement
# Usage: ./create_issues_v2.sh OWNER REPO

if [ $# -ne 2 ]; then
    echo "Usage: $0 <OWNER> <REPO>"
    echo "Example: $0 myusername myrepo"
    exit 1
fi

# Charger les variables d'environnement depuis .env
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ Fichier .env non trouvé."
    exit 1
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN non défini dans le fichier .env"
    exit 1
fi

OWNER=$1
REPO=$2
API_URL="https://api.github.com/repos/${OWNER}/${REPO}/issues"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Fonction pour créer une issue en utilisant un fichier JSON temporaire
create_issue_with_file() {
    local title="$1"
    local body="$2"
    local labels="$3"
    
    echo -e "${YELLOW}Création: $title${NC}"
    
    # Créer un fichier JSON temporaire
    cat > issue_temp.json << EOF
{
  "title": "$title",
  "body": "$body",
  "labels": [$labels]
}
EOF
    
    # Appel API
    response=$(curl -s -w "%{http_code}" -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Content-Type: application/json" \
        -d @issue_temp.json \
        "$API_URL")
    
    http_code="${response: -3}"
    response_body="${response%???}"
    
    if [ "$http_code" -eq 201 ]; then
        issue_number=$(echo "$response_body" | grep -o '"number": [0-9]*' | cut -d' ' -f2)
        echo -e "${GREEN}✓ Issue #$issue_number créée${NC}"
    else
        echo -e "${RED}✗ Erreur (HTTP $http_code)${NC}"
        echo "$response_body"
    fi
    
    # Nettoyer le fichier temporaire
    rm -f issue_temp.json
    sleep 1
}

echo "=== Création des issues GitHub pour OneFlow ==="
echo

# 🏗️ Configuration & Infrastructure
create_issue_with_file "[SETUP-001] Configuration initiale du projet" \
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

create_issue_with_file "[SETUP-002] Configuration base de données" \
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

create_issue_with_file "[SETUP-003] Système d'authentification" \
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

create_issue_with_file "[PROJECT-001] CRUD Projets" \
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

create_issue_with_file "[PROJECT-002] CRUD Tâches avec liens" \
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

echo -e "${GREEN}✅ Repository créé: https://github.com/$OWNER/$REPO${NC}"
echo "Issues créées avec succès !"