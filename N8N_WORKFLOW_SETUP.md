# 🤖 Configuration du Workflow n8n pour Agent AI

## 📋 Structure du workflow attendue

Votre workflow n8n doit suivre cette structure :
```
Webhook → Agent Chat → AI Model (Gemini) → Response
```

---

## 🔧 Configuration détaillée

### 1️⃣ Nœud Webhook (Trigger)

**Configuration :**
- **Type** : Webhook
- **Method** : POST
- **Path** : `webhook-test` (ou votre chemin personnalisé)
- **Response Mode** : **"When Last Node Finishes"** ⚠️ (Important!)
- **Response Data** : "First Entry JSON"

**Pourquoi "When Last Node Finishes" ?**
Cela permet d'attendre que tout le workflow (incluant l'AI) soit terminé avant de renvoyer la réponse au frontend.

---

### 2️⃣ Nœud Agent Chat

**Configuration :**
- **Type** : AI Agent
- **Input** : `{{ $json.message }}` (depuis le webhook)
- **Session ID** : `{{ $json.timestamp }}` ou génération dynamique
- **Context** : Instructions pour l'agent (optionnel)

**Exemple d'instructions :**
```
Tu es un assistant AI pour le portfolio de Randy, un développeur Full Stack.
Tu dois présenter ses compétences, projets et expériences de manière professionnelle.
Réponds toujours en français, de manière claire et concise.
```

---

### 3️⃣ Nœud AI Model (Gemini/OpenAI/etc.)

**Configuration :**
- **Model** : Gemini 1.5 Pro / Flash (ou autre)
- **System Prompt** : Instructions globales
- **Temperature** : 0.7 (équilibre créativité/précision)
- **Max Tokens** : 1000-2000 selon les besoins

---

### 4️⃣ Nœud Response (Dernier nœud)

**Option A : Utiliser "Edit Fields (Set)"**

```json
{
  "output": "={{ $json.output }}",
  "message": "={{ $json.output }}",
  "response": "={{ $json.output }}",
  "success": true
}
```

**Option B : Utiliser "Code" (JavaScript)**

```javascript
// Extraire la réponse de l'AI
const aiResponse = $input.all()[0].json.output || 
                   $input.all()[0].json.message ||
                   $input.all()[0].json.text;

return {
  output: aiResponse,
  message: aiResponse,
  timestamp: new Date().toISOString(),
  source: 'n8n AI Agent'
};
```

---

## 🎯 Format de réponse attendu par le frontend

Le frontend peut gérer plusieurs formats :

### Format recommandé :
```json
{
  "output": "Voici la réponse de l'AI...",
  "success": true
}
```

### Formats alternatifs supportés :
```json
// Option 1
{ "response": "..." }

// Option 2
{ "message": "..." }

// Option 3
{ "text": "..." }

// Option 4 (fallback)
"Réponse directe en string"
```

Le frontend testera ces champs dans cet ordre : `output` → `response` → `message` → `text` → fallback JSON complet.

---

## 🧪 Tester le workflow

### Test 1 : Avec curl (direct)

```bash
curl -X POST http://localhost:5678/webhook-test/43fc3e5f-fbd1-4caa-8aae-38a2aaddb7fd \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Présente-moi Randy en quelques lignes",
    "timestamp": "2026-10-01T10:00:00Z",
    "source": "test"
  }'
```

**Réponse attendue :**
```json
{
  "output": "Randy est un développeur Full Stack avec X années d'expérience...",
  "success": true
}
```

### Test 2 : Depuis le portfolio

1. Aller sur `/n8n-test`
2. Entrer : "Présente-moi Randy"
3. Cliquer sur "Envoyer"
4. Attendre la réponse (peut prendre 3-10 secondes)

---

## ⚙️ Exemple de workflow complet n8n

```json
{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "webhook-test",
        "responseMode": "lastNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300]
    },
    {
      "parameters": {
        "agent": "conversationalAgent",
        "text": "={{ $json.message }}",
        "options": {
          "systemMessage": "Tu es l'assistant du portfolio de Randy..."
        }
      },
      "name": "AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "position": [450, 300]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "name": "output",
              "value": "={{ $json.output }}",
              "type": "string"
            },
            {
              "name": "success",
              "value": true,
              "type": "boolean"
            }
          ]
        },
        "options": {}
      },
      "name": "Format Response",
      "type": "n8n-nodes-base.set",
      "position": [650, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{ "node": "AI Agent", "type": "main", "index": 0 }]]
    },
    "AI Agent": {
      "main": [[{ "node": "Format Response", "type": "main", "index": 0 }]]
    }
  }
}
```

---

## 🐛 Débogage

### Problème : Réponse vide ou "Workflow was started"

**Cause** : Le webhook est en mode "Immediately" au lieu de "When Last Node Finishes"

**Solution** :
1. Ouvrir le nœud Webhook dans n8n
2. Settings → Response Mode
3. Changer de "Immediately" à **"When Last Node Finishes"**
4. Sauvegarder et réactiver le workflow

### Problème : Timeout ou longue attente

**Cause** : Le modèle AI prend trop de temps

**Solutions** :
- Réduire `max_tokens` dans la config du modèle
- Utiliser un modèle plus rapide (ex: Gemini Flash au lieu de Pro)
- Ajouter un timeout côté n8n (Settings → Execution Timeout)

### Problème : Réponse en JSON brut au lieu du texte

**Cause** : Le dernier nœud ne formate pas correctement

**Solution** :
Ajouter un nœud "Edit Fields (Set)" à la fin pour extraire `output`:
```
output = {{ $json.output }}
```

---

## 📚 Ressources

- [n8n Webhook Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [n8n AI Agent Documentation](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)
- [Google Gemini API](https://ai.google.dev/gemini-api/docs)

---

## ✅ Checklist finale

- [ ] Webhook en mode "When Last Node Finishes"
- [ ] Agent Chat configuré avec instructions claires
- [ ] Modèle AI connecté (Gemini/OpenAI/etc.)
- [ ] Dernier nœud formate la réponse avec `output`
- [ ] Workflow activé (bouton ON)
- [ ] Test avec curl réussi
- [ ] Test depuis `/n8n-test` réussi

Une fois ces étapes validées, votre agent AI devrait répondre correctement ! 🎉
