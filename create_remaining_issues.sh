#!/bin/bash

# Charger les variables d'environnement
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

OWNER=puzzlemind004
REPO=OneFlow
API_URL="https://api.github.com/repos/${OWNER}/${REPO}/issues"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

create_issue_with_file() {
    local title="$1"
    local body="$2"
    local labels="$3"
    
    echo -e "${YELLOW}Création: $title${NC}"
    
    cat > issue_temp.json << EOF
{
  "title": "$title",
  "body": "$body",
  "labels": [$labels]
}
EOF
    
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
    fi
    
    rm -f issue_temp.json
    sleep 1
}

# Continuer avec les issues restantes
create_issue_with_file "[PROJECT-003] Vue calendrier/Timeline" \
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

create_issue_with_file "[PROJECT-004] Tableau de bord projet" \
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

create_issue_with_file "[TIME-001] Interface de saisie de temps" \
"## Description
- Formulaire simple de saisie temps sur tâches
- Timer intégré start/stop
- Saisie rétroactive avec sélection de date
- Validation des entrées

## Critères d'acceptation
- [ ] Formulaire de saisie
- [ ] Timer start/stop
- [ ] Saisie rétroactive
- [ ] Validation des données" \
'"feature", "time-tracking", "priority:high"'

create_issue_with_file "[TIME-002] Rappels automatiques de saisie" \
"## Description
- Notification quotidienne fin de journée
- Proposition des tâches en cours
- Option \"\"Autre\"\" pour créer nouvelle tâche
- Configuration personnalisée des rappels

## Critères d'acceptation
- [ ] Notifications quotidiennes
- [ ] Suggestion tâches actives
- [ ] Création rapide tâches
- [ ] Configuration personnalisée" \
'"feature", "automation", "notifications", "priority:medium"'

create_issue_with_file "[TIME-003] Rapports de temps" \
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

create_issue_with_file "[AI-001] Assistant chat basique" \
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

create_issue_with_file "[AI-002] Aide à la rédaction de tâches" \
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

create_issue_with_file "[UI-001] Design system" \
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

create_issue_with_file "[DEPLOY-001] Pipeline CI/CD" \
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

echo -e "${GREEN}✅ Toutes les issues principales ont été créées !${NC}"