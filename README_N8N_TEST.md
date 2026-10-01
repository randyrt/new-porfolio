# 🤖 Page de Test n8n avec Agent AI

## 📝 Vue d'ensemble

La page `/n8n-test` permet de tester votre workflow n8n qui intègre un agent AI (Gemini ou autre) directement depuis votre portfolio.

## ✨ Fonctionnalités

### 1. Interface de chat interactive
- Zone de texte pour saisir vos questions
- Envoi par bouton ou avec `Enter`
- Indicateur de chargement animé pendant le traitement AI
- Message d'info pendant l'attente de la réponse

### 2. Historique de conversation
- Affichage de tous les messages échangés
- Design différencié pour utilisateur (bleu) et AI (gris)
- Horodatage de chaque message
- Bouton pour effacer l'historique

### 3. Gestion intelligente des réponses
Le code supporte plusieurs formats de réponse n8n :
- `{ output: "..." }` ← Recommandé
- `{ response: "..." }`
- `{ message: "..." }`
- `{ text: "..." }`
- Chaîne de caractères directe
- Fallback : JSON complet affiché

### 4. Proxy CORS intégré
- Configuration Vite automatique
- Requêtes via `/api/n8n/*` → `localhost:5678/*`
- Pas besoin de configurer CORS dans n8n (en dev)

---

## 🏗️ Architecture

```
Frontend (Vue.js)
    ↓ POST /api/n8n/webhook-test/...
Proxy Vite (localhost:3001)
    ↓ Redirige vers localhost:5678
n8n Workflow
    ↓ Webhook reçoit le message
    ↓ Agent Chat traite la demande
    ↓ AI Model (Gemini) génère la réponse
    ↓ Response formatée
    ↑ Retour au frontend
Frontend affiche la réponse
```

---

## 🚀 Configuration requise

### Côté Frontend (Portfolio)

1. **Proxy Vite configuré** ✅ (déjà fait dans `vite.config.ts`)
2. **Serveur redémarré** ⚠️ (important après modification du proxy)
3. **Route `/n8n-test` accessible** ✅

### Côté n8n

1. **Workflow actif** avec structure :
   ```
   Webhook → Agent Chat → AI Model → Response
   ```

2. **Webhook configuré** :
   - Path: `webhook-test`
   - Method: POST
   - Response Mode: **"When Last Node Finishes"** (crucial!)

3. **Format de réponse** :
   Le dernier nœud doit retourner :
   ```json
   {
     "output": "Réponse de l'AI ici..."
   }
   ```

---

## 📖 Comment utiliser

### 1. Démarrer n8n

```bash
# Option A : Docker
docker-compose -f docker-compose.n8n.yml up -d

# Option B : npx
npx n8n
```

### 2. Créer/Activer le workflow

1. Créer un workflow avec : Webhook → Agent → AI → Response
2. Configurer votre modèle AI (Gemini, OpenAI, etc.)
3. Activer le workflow (bouton ON)
4. Copier l'URL du webhook

### 3. Mettre à jour l'URL du webhook (si nécessaire)

Dans `src/views/n8nTest.vue`, ligne ~125 :

```typescript
const N8N_WEBHOOK_URL = '/api/n8n/webhook-test/VOTRE-UUID-ICI'
```

### 4. Redémarrer le serveur de dev

```bash
# Arrêter (Ctrl+C) puis relancer :
npm run dev

# Ou utiliser le script :
./restart-dev.sh
```

### 5. Tester !

1. Aller sur `http://localhost:3001/n8n-test`
2. Saisir : "Présente-moi Randy"
3. Envoyer et attendre (3-10 secondes selon le modèle)
4. Voir la réponse s'afficher

---

## 🎨 Interface utilisateur

### Messages utilisateur (bleu)
```
👤 Vous                         10:30:45
Bonjour, peux-tu me présenter ton portfolio ?
```

### Réponses AI (vert/gris)
```
🤖 AI Agent                     10:30:52
Randy est un développeur Full Stack passionné...
```

### États visuels
- ✅ **Proxy actif** : Badge vert en haut
- ⏳ **En traitement** : Animation spinner + message d'attente
- 💚 **Réponse reçue** : Encadré vert avec réponse
- ❌ **Erreur** : Message d'erreur détaillé

---

## 🐛 Résolution de problèmes

### Erreur CORS persiste
1. Vérifier que `vite.config.ts` contient le proxy
2. **Redémarrer le serveur** (crucial!)
3. Vider le cache du navigateur (Ctrl+Shift+R)

### "Workflow was started" au lieu de la réponse
Le webhook est en mode "Immediately" au lieu de "When Last Node Finishes"
→ Changer dans les settings du nœud Webhook

### Timeout ou pas de réponse
- Le modèle AI prend trop de temps
- Vérifier que le workflow est activé
- Consulter les logs n8n : `docker logs -f n8n`

### Réponse vide ou JSON brut
Le dernier nœud ne formate pas correctement
→ Ajouter un nœud "Edit Fields (Set)" avec `output = {{ $json.output }}`

---

## 📂 Fichiers modifiés/créés

### Fichiers principaux
- ✅ `src/views/n8nTest.vue` - Composant Vue de la page
- ✅ `src/router/router.ts` - Route `/n8n-test`
- ✅ `vite.config.ts` - Configuration du proxy CORS
- ✅ `src/locales/fr.json` - Traductions françaises
- ✅ `src/locales/en.json` - Traductions anglaises

### Documentation
- 📄 `CORS_FIX.md` - Guide de résolution CORS
- 📄 `N8N_SETUP.md` - Configuration générale n8n
- 📄 `N8N_WORKFLOW_SETUP.md` - Configuration du workflow
- 📄 `docker-compose.n8n.example.yml` - Exemple Docker
- 📄 `README_N8N_TEST.md` - Ce fichier
- 🔧 `restart-dev.sh` - Script de redémarrage

---

## 🎯 Prochaines améliorations possibles

- [ ] Support du Markdown dans les réponses
- [ ] Mode streaming (réponse progressive)
- [ ] Upload de fichiers/images
- [ ] Sauvegarde de l'historique dans localStorage
- [ ] Thèmes de conversation prédéfinis
- [ ] Export de la conversation en PDF
- [ ] Mode multi-utilisateur avec sessions
- [ ] Intégration de la synthèse vocale (TTS)

---

## 📚 Documentation complète

- [CORS_FIX.md](./CORS_FIX.md) - Résoudre les problèmes CORS
- [N8N_WORKFLOW_SETUP.md](./N8N_WORKFLOW_SETUP.md) - Configurer le workflow n8n
- [N8N_SETUP.md](./N8N_SETUP.md) - Configuration générale n8n

---

## ✅ Checklist de vérification

Avant de tester :
- [ ] n8n tourne sur `localhost:5678`
- [ ] Workflow créé et activé
- [ ] Webhook en mode "When Last Node Finishes"
- [ ] Agent AI et modèle configurés
- [ ] Format de réponse avec `output`
- [ ] URL webhook à jour dans `n8nTest.vue`
- [ ] Serveur de dev redémarré
- [ ] Test avec `/n8n-test` réussi

---

Bon test avec votre agent AI ! 🚀🤖
