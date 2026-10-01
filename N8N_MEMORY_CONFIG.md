# 🧠 Configuration du Memory Node n8n

## 📋 Vue d'ensemble

Le Memory Node dans n8n permet de maintenir le contexte de conversation entre plusieurs interactions avec l'agent AI. C'est essentiel pour avoir des conversations cohérentes et contextuelles.

---

## 🔧 Configuration du Memory Node

### 1️⃣ Ajouter le nœud "Window Buffer Memory"

Dans votre workflow n8n :
```
Webhook → Window Buffer Memory → Agent Chat → AI Model → Response
```

### 2️⃣ Configuration du Session ID

**Dans le Memory Node :**

**Option 1 : Session ID depuis le webhook (Recommandé)**
```
Session ID: Define below
Session Key: {{ $('Webhook').item.json.sessionId }}
```

**Option 2 : Session ID depuis le nœud précédent**
```
Session ID: From Previous Node
Session Key: {{ $json.sessionId }}
```

### 3️⃣ Paramètres du Context Window

```
Context Window Length: 10
```
Ce paramètre définit combien de messages (paires question/réponse) seront conservés en mémoire.

- **5-10** : Pour des conversations courtes, économie de tokens
- **10-20** : Pour des conversations moyennes
- **20+** : Pour des conversations longues avec beaucoup de contexte

---

## 📦 Structure du workflow complet

### Workflow recommandé :

```
┌─────────────────────────────────────────────────────┐
│ 1. Webhook (POST)                                   │
│    - Reçoit : { message, sessionId, timestamp }     │
│    - Mode: "When Last Node Finishes"               │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 2. Window Buffer Memory                             │
│    - Session ID: {{ $('Webhook').item.json.sessionId }} │
│    - Context Window: 10                             │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 3. AI Agent (Conversational Agent)                  │
│    - Input: {{ $json.message }}                     │
│    - Memory: Connected to Window Buffer Memory      │
│    - System Message: Instructions pour l'agent      │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 4. Google Gemini / OpenAI Chat Model               │
│    - Model: gemini-1.5-pro / gpt-4                 │
│    - Temperature: 0.7                               │
│    - Max Tokens: 1000                               │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 5. Edit Fields (Set)                                │
│    - output: {{ $json.output }}                     │
│    - sessionId: {{ $('Webhook').item.json.sessionId }}  │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Configuration côté Frontend

Le frontend envoie automatiquement un `sessionId` unique :

```json
{
  "message": "Présente-moi Randy",
  "sessionId": "portfolio_1696234567890_abc123",
  "timestamp": "2026-10-01T10:30:00.000Z",
  "source": "Randy Portfolio"
}
```

### Format du sessionId
```
portfolio_{timestamp}_{random}
```

Exemple : `portfolio_1696234567890_abc123`

### Durée de vie de la session
- Une session = Une visite du visiteur sur la page `/n8n-test`
- Bouton "Nouvelle conversation" = Génère un nouveau sessionId
- Refresh de la page = Nouveau sessionId

---

## 🔍 Comment accéder au sessionId dans n8n

### Dans n'importe quel nœud après le Webhook :

```javascript
// Expression n8n
{{ $('Webhook').item.json.sessionId }}

// Ou si vous êtes dans le nœud juste après le webhook
{{ $json.sessionId }}
```

### Dans le Memory Node :

**Configuration correcte :**
```
┌─────────────────────────────────────┐
│ Window Buffer Memory                │
├─────────────────────────────────────┤
│ Session ID: Define below            │
│ Session Key:                        │
│ {{ $('Webhook').item.json.sessionId }}  │
│                                     │
│ Context Window Length: 10           │
└─────────────────────────────────────┘
```

---

## ⚠️ Erreurs courantes

### Erreur 1 : "undefined" dans le sessionId

**Cause :** Le Memory Node essaie d'accéder à `sessionId` avant que le webhook ne l'ait fourni.

**Solution :**
```
// ❌ Mauvais
{{ $json.sessionId }}

// ✅ Bon
{{ $('Webhook').item.json.sessionId }}
```

### Erreur 2 : Contexte perdu entre messages

**Cause :** Le Memory Node n'est pas correctement connecté à l'Agent.

**Solution :**
1. Dans l'Agent Chat Node
2. Section "Memory" → Sélectionner le Memory Node créé
3. Sauvegarder et réactiver le workflow

### Erreur 3 : "Session is automatically scoped..."

**Cause :** Session ID non défini explicitement.

**Solution :**
Changer "Session ID" de "Automatic" à **"Define below"** et entrer :
```
{{ $('Webhook').item.json.sessionId }}
```

---

## 🧪 Tester la mémoire

### Test 1 : Vérifier que le contexte est conservé

1. **Premier message :** "Je m'appelle Jean"
2. **Deuxième message :** "Quel est mon nom ?"
3. **Réponse attendue :** "Votre nom est Jean"

### Test 2 : Nouvelle conversation

1. Envoyer : "Je m'appelle Marie"
2. Cliquer sur "🔄 Nouvelle conversation"
3. Envoyer : "Quel est mon nom ?"
4. **Réponse attendue :** "Je ne connais pas votre nom" (contexte réinitialisé)

### Test 3 : Vérifier le sessionId dans les logs n8n

```bash
# Dans les logs n8n
docker logs -f n8n

# Vous devriez voir :
sessionId: portfolio_1696234567890_abc123
```

---

## 📊 Exemple de configuration JSON

```json
{
  "nodes": [
    {
      "parameters": {
        "sessionIdType": "customKey",
        "sessionKey": "={{ $('Webhook').item.json.sessionId }}",
        "contextWindowLength": 10
      },
      "name": "Window Buffer Memory",
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "position": [450, 300]
    }
  ]
}
```

---

## 🚀 Configuration en production

### Utiliser Redis pour la persistance (Recommandé)

Pour une utilisation en production avec plusieurs workers :

```yaml
# docker-compose.yml
services:
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
  
  n8n:
    image: n8nio/n8n
    environment:
      - QUEUE_BULL_REDIS_HOST=redis
      - QUEUE_BULL_REDIS_PORT=6379
```

Puis dans n8n, utiliser le nœud **"Redis Memory"** au lieu de "Window Buffer Memory".

---

## 📚 Formats de données

### Ce que le frontend envoie :
```json
{
  "message": "Présente-moi Randy",
  "sessionId": "portfolio_1696234567890_abc123",
  "timestamp": "2026-10-01T10:30:00.000Z",
  "source": "Randy Portfolio"
}
```

### Ce que n8n doit retourner :
```json
{
  "output": "Randy est un développeur Full Stack...",
  "sessionId": "portfolio_1696234567890_abc123",
  "success": true
}
```

---

## ✅ Checklist de configuration

- [ ] Nœud "Window Buffer Memory" ajouté au workflow
- [ ] Session ID configuré avec `{{ $('Webhook').item.json.sessionId }}`
- [ ] Context Window Length défini (recommandé : 10)
- [ ] Memory Node connecté à l'Agent Chat
- [ ] Webhook en mode "When Last Node Finishes"
- [ ] Test réalisé avec 2 messages successifs
- [ ] Contexte conservé entre les messages
- [ ] Bouton "Nouvelle conversation" génère un nouveau sessionId

---

## 🎓 En savoir plus

- [n8n Memory Nodes Documentation](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/)
- [n8n AI Agent Documentation](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)
- [Session Management Best Practices](https://docs.n8n.io/advanced-ai/examples/agent-memory/)

---

Avec cette configuration, votre agent AI se souviendra du contexte de conversation et pourra répondre de manière cohérente ! 🧠✨
