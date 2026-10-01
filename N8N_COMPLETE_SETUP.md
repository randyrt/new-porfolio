# 🎯 Configuration complète n8n avec mémoire contextuelle

## 📊 Architecture complète

```
┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND (Vue.js)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Page /n8n-test                                         │ │
│  │ • Génère sessionId unique : portfolio_123_abc          │ │
│  │ • Envoie : { message, sessionId, timestamp }           │ │
│  │ • Maintient historique local                           │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                           ↓ POST /api/n8n/webhook-test
┌──────────────────────────────────────────────────────────────┐
│                   PROXY VITE (Dev)                           │
│  /api/n8n/* → http://localhost:5678/*                       │
└──────────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────────┐
│                    N8N WORKFLOW                              │
│                                                              │
│  1️⃣ Webhook Node                                            │
│     • Reçoit POST avec { message, sessionId }               │
│     • Mode: "When Last Node Finishes"                       │
│                                                              │
│  2️⃣ Window Buffer Memory Node                               │
│     • Session ID: {{ $('Webhook').item.json.sessionId }}    │
│     • Context Window: 10 messages                           │
│     • Stocke l'historique de conversation                   │
│                                                              │
│  3️⃣ AI Agent Node (Conversational Agent)                    │
│     • Input: {{ $json.message }}                            │
│     • Memory: Connecté au Window Buffer Memory              │
│     • System Prompt: Instructions pour Randy's portfolio    │
│                                                              │
│  4️⃣ Google Gemini / OpenAI Chat Model                       │
│     • Model: gemini-1.5-pro / gpt-4                        │
│     • Temperature: 0.7                                      │
│     • Utilise le contexte stocké en mémoire                 │
│                                                              │
│  5️⃣ Edit Fields (Set) - Formater la réponse                │
│     • output: {{ $json.output }}                            │
│     • sessionId: {{ $('Webhook').item.json.sessionId }}     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                           ↓ Return JSON
┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND (Vue.js)                         │
│  • Reçoit : { output: "...", sessionId: "..." }             │
│  • Affiche la réponse dans l'historique                     │
│  • Maintient le même sessionId pour les prochains messages  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔧 Configuration détaillée

### 1️⃣ Webhook Node

```
┌─────────────────────────────────────┐
│ Webhook                             │
├─────────────────────────────────────┤
│ HTTP Method: POST                   │
│ Path: webhook-test                  │
│ Response Mode: ⚠️ When Last Node    │
│               Finishes              │
│ Response Data: First Entry JSON     │
└─────────────────────────────────────┘
```

**URL générée :**
```
http://localhost:5678/webhook-test/43fc3e5f-fbd1-4caa-8aae-38a2aaddb7fd
```

### 2️⃣ Window Buffer Memory Node

```
┌─────────────────────────────────────┐
│ Window Buffer Memory                │
├─────────────────────────────────────┤
│ Session ID: Define below            │
│                                     │
│ Session Key:                        │
│ {{ $('Webhook').item.json.sessionId }}  │
│                                     │
│ Context Window Length: 10           │
└─────────────────────────────────────┘
```

**⚠️ Important :** Ne PAS utiliser "From Previous Node" ou "Automatic"

### 3️⃣ AI Agent Node

```
┌─────────────────────────────────────┐
│ AI Agent (Conversational Agent)    │
├─────────────────────────────────────┤
│ Input Text:                         │
│ {{ $json.message }}                 │
│                                     │
│ Memory:                             │
│ ✅ Window Buffer Memory (selected)  │
│                                     │
│ System Message:                     │
│ Tu es un assistant AI pour le       │
│ portfolio de Randy...               │
└─────────────────────────────────────┘
```

### 4️⃣ Chat Model Node

```
┌─────────────────────────────────────┐
│ Google Gemini Chat Model            │
├─────────────────────────────────────┤
│ Credentials: Google Gemini API      │
│ Model: gemini-1.5-pro               │
│ Temperature: 0.7                    │
│ Max Output Tokens: 1000             │
└─────────────────────────────────────┘
```

### 5️⃣ Edit Fields (Set) Node

```
┌─────────────────────────────────────┐
│ Edit Fields (Set)                   │
├─────────────────────────────────────┤
│ Assignments:                        │
│                                     │
│ • output (String):                  │
│   {{ $json.output }}                │
│                                     │
│ • sessionId (String):               │
│   {{ $('Webhook').item.json.sessionId }} │
│                                     │
│ • success (Boolean):                │
│   true                              │
└─────────────────────────────────────┘
```

---

## 📦 Données échangées

### Frontend → n8n (Request)

```json
{
  "message": "Présente-moi Randy",
  "sessionId": "portfolio_1696234567890_abc123",
  "timestamp": "2026-10-01T10:30:00.000Z",
  "source": "Randy Portfolio"
}
```

### n8n → Frontend (Response)

```json
{
  "output": "Randy est un développeur Full Stack passionné par la création d'applications web modernes...",
  "sessionId": "portfolio_1696234567890_abc123",
  "success": true
}
```

---

## 🧠 Comportement de la mémoire

### Scénario 1 : Conversation continue (même sessionId)

```
User: Je m'appelle Jean
AI: Bonjour Jean ! Comment puis-je vous aider ?

User: Quel est mon nom ?
AI: Vous vous appelez Jean.
                    ↑
            Contexte conservé ✅
```

### Scénario 2 : Nouvelle conversation (nouveau sessionId)

```
User: Je m'appelle Jean
AI: Bonjour Jean !

[Clic sur "🔄 Nouvelle conversation"]
→ Nouveau sessionId généré

User: Quel est mon nom ?
AI: Je ne connais pas votre nom, pourriez-vous me le dire ?
                    ↑
            Contexte réinitialisé ✅
```

---

## 🎯 System Prompt recommandé

```
Tu es un assistant AI intelligent pour le portfolio de Randy RAZAFIMANDIMBY.

CONTEXTE :
Randy est un développeur Full Stack Senior avec expertise en :
- Frontend : Vue.js, Nuxt.js, React.js, TypeScript, TailwindCSS
- Backend : PHP (Laravel, Symfony), Node.js
- DevOps : Docker, Git, CI/CD
- Databases : MySQL, PostgreSQL, Redis
- AI : Intégration d'APIs IA, n8n, automatisation

MISSION :
1. Présenter les compétences et projets de Randy de manière professionnelle
2. Répondre aux questions sur son expérience et ses réalisations
3. Guider les visiteurs vers les sections pertinentes du portfolio
4. Rester concis, précis et professionnel

STYLE :
- Ton professionnel mais accessible
- Réponses claires et structurées
- Toujours en français
- Éviter le jargon inutile

RÈGLES :
- Ne jamais inventer d'informations sur Randy
- Si tu ne sais pas, diriger vers la page Contact
- Encourager à explorer le portfolio complet
- Mettre en avant la qualité et l'expérience
```

---

## 🧪 Tests à effectuer

### Test 1 : Vérification du contexte
```bash
# Message 1
"Je suis intéressé par Vue.js"

# Message 2
"Quels projets Randy a-t-il fait avec cette techno ?"
# → L'AI doit comprendre que "cette techno" = Vue.js
```

### Test 2 : Nouvelle conversation
```bash
# Message 1
"Je m'appelle Sophie"

# Cliquer sur "Nouvelle conversation"

# Message 2
"Quel est mon nom ?"
# → L'AI ne doit PAS se souvenir de Sophie
```

### Test 3 : Limite de contexte (10 messages)
```bash
# Envoyer 12 messages
# Les 2 premiers doivent être oubliés
# Seuls les 10 derniers sont conservés en mémoire
```

---

## ⚙️ Variables d'environnement n8n

```env
# .env ou docker-compose.yml
N8N_CORS_ENABLED=true
N8N_CORS_ORIGIN=http://localhost:3001

# Pour production avec Redis (optionnel)
QUEUE_BULL_REDIS_HOST=redis
QUEUE_BULL_REDIS_PORT=6379

# Timeout pour les workflows longs
EXECUTIONS_TIMEOUT=300
EXECUTIONS_TIMEOUT_MAX=600
```

---

## 📊 Monitoring et débogage

### Vérifier les logs n8n

```bash
# Docker
docker logs -f n8n

# Rechercher les sessionId
docker logs n8n | grep "sessionId"

# Voir les erreurs
docker logs n8n | grep "ERROR"
```

### Dans la console du navigateur

```javascript
// Vérifier le sessionId actuel
console.log('Session ID:', sessionId.value)

// Vérifier l'historique
console.log('Historique:', conversationHistory.value)
```

---

## 🚀 Déploiement en production

### Étape 1 : Utiliser Redis pour la mémoire persistante

```yaml
services:
  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data
  
  n8n:
    environment:
      - QUEUE_BULL_REDIS_HOST=redis
```

### Étape 2 : Configurer CORS pour votre domaine

```env
N8N_CORS_ORIGIN=https://votre-domaine.com
```

### Étape 3 : Utiliser HTTPS pour les webhooks

```env
WEBHOOK_URL=https://n8n.votre-domaine.com/
```

### Étape 4 : Mettre à jour l'URL dans le frontend

```typescript
// En production
const N8N_WEBHOOK_URL = 'https://n8n.votre-domaine.com/webhook-test/...'
```

---

## ✅ Checklist finale

### Configuration n8n
- [ ] Workflow créé avec 5 nœuds
- [ ] Webhook en mode "When Last Node Finishes"
- [ ] Memory Node avec sessionId du webhook
- [ ] Agent connecté au Memory Node
- [ ] Modèle AI configuré
- [ ] Dernier nœud formate avec `output`
- [ ] Workflow activé

### Configuration Frontend
- [ ] SessionId généré automatiquement
- [ ] SessionId envoyé dans chaque requête
- [ ] Bouton "Nouvelle conversation" fonctionne
- [ ] Historique affiché correctement
- [ ] Proxy Vite configuré
- [ ] Serveur redémarré

### Tests
- [ ] Premier message envoyé avec succès
- [ ] Deuxième message conserve le contexte
- [ ] Nouvelle conversation réinitialise le contexte
- [ ] SessionId visible dans l'interface
- [ ] Pas d'erreur CORS

---

Votre agent AI avec mémoire contextuelle est maintenant prêt ! 🧠✨
