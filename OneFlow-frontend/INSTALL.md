# OneFlow Frontend - Installation Guide

## Tailwind CSS Configuration

Ce projet utilise la dernière méthode recommandée pour intégrer Tailwind CSS avec Angular.

### Installation automatique

Les dépendances sont déjà configurées. Il suffit de lancer :

```bash
npm install
```

### Configuration manuelle (si nécessaire)

Si vous devez réinstaller Tailwind CSS :

1. **Installer les dépendances** :
```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```

2. **Créer le fichier PostCSS** (`.postcssrc.json`) :
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

3. **Importer Tailwind dans styles.scss** :
```scss
@use "tailwindcss";
```

### Vérification

Pour tester que Tailwind CSS fonctionne :

1. Démarrer le serveur de développement :
```bash
npm start
```

2. Aller sur `http://localhost:4200/test` pour voir le composant de test Tailwind

### Classes Tailwind utilisées dans le projet

Les composants utilisent des classes Tailwind comme :
- Layout : `flex`, `grid`, `max-w-*`, `mx-auto`
- Spacing : `p-*`, `m-*`, `space-x-*`
- Colors : `bg-*`, `text-*`, `border-*`
- Typography : `font-*`, `text-*`
- Effects : `shadow-*`, `rounded-*`, `hover:*`

### Résolution de problèmes

Si Tailwind ne fonctionne pas :

1. Vérifiez que `.postcssrc.json` existe à la racine
2. Vérifiez que `styles.scss` contient `@use "tailwindcss";`
3. Redémarrez le serveur de développement
4. Vérifiez la console pour d'éventuelles erreurs

### Documentation officielle

Cette configuration suit la documentation officielle :
https://tailwindcss.com/docs/installation/framework-guides/angular