# 🔧 Fix CORS n8n - Solution Immédiate

## ⚠️ Problème actuel
```
Access to fetch at 'http://localhost:5678/webhook-test/...' 
from origin 'http://localhost:3001' has been blocked by CORS policy
```

## ✅ Solution appliquée

J'ai configuré un **proxy Vite** qui redirige automatiquement les requêtes pour éviter CORS.

### Ce qui a été modifié :

1. **`vite.config.ts`** - Proxy ajouté :
```typescript
proxy: {
  '/api/n8n': {
    target: 'http://localhost:5678',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/n8n/, ''),
  },
}
```

2. **`src/views/n8nTest.vue`** - URL modifiée :
```typescript
// AVANT (❌ causait CORS)
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook-test/...'

// APRÈS (✅ utilise le proxy)
const N8N_WEBHOOK_URL = '/api/n8n/webhook-test/43fc3e5f-fbd1-4caa-8aae-38a2aaddb7fd'
```

---

## 🚀 ÉTAPES À SUIVRE MAINTENANT

### 1️⃣ Redémarrer le serveur de développement

**C'est crucial !** Le proxy ne fonctionnera qu'après redémarrage.

```bash
# Dans votre terminal, arrêtez le serveur (Ctrl+C)
# Puis relancez :
npm run dev
```

### 2️⃣ Vérifier que n8n est en cours d'exécution

```bash
# Vérifier si n8n tourne sur le port 5678
curl http://localhost:5678

# Ou lancer n8n si ce n'est pas le cas
docker-compose -f docker-compose.n8n.yml up -d
# OU
npx n8n
```

### 3️⃣ Tester dans le navigateur

1. Ouvrir : `http://localhost:3001/n8n-test`
2. Écrire un message : "Bonjour, peux-tu me présenter ton portfolio ?"
3. Cliquer sur "Envoyer"
4. ✅ Ça devrait fonctionner maintenant !

---

## 🔍 Comment vérifier que ça fonctionne

### Dans la console du navigateur (F12) :

**AVANT (avec CORS) :**
```
❌ POST http://localhost:5678/webhook-test/... net::ERR_FAILED
```

**APRÈS (avec proxy) :**
```
✅ POST http://localhost:3001/api/n8n/webhook-test/... 200 OK
```

---

## 📋 Checklist de débogage

- [ ] Le serveur de dev a été redémarré (`npm run dev`)
- [ ] n8n tourne sur `localhost:5678`
- [ ] Le workflow n8n est activé
- [ ] L'URL du webhook dans n8nTest.vue est correcte
- [ ] Le navigateur a été rafraîchi (Ctrl+Shift+R)

---

## 🆘 Si ça ne fonctionne toujours pas

### Option A : Vérifier les logs du proxy Vite

Dans le terminal où tourne `npm run dev`, vous devriez voir :
```
➜  Local:   http://localhost:3001/
➜  Proxy:   /api/n8n -> http://localhost:5678
```

### Option B : Tester le webhook directement

```bash
# Test direct avec curl (pour vérifier que n8n fonctionne)
curl -X POST http://localhost:5678/webhook-test/43fc3e5f-fbd1-4caa-8aae-38a2aaddb7fd \
  -H "Content-Type: application/json" \
  -d '{"message":"test","timestamp":"2026-10-01T10:00:00Z","source":"test"}'
```

### Option C : Activer CORS dans n8n (alternative)

Si vous préférez ne pas utiliser le proxy, ajoutez dans votre configuration n8n :

**Docker Compose :**
```yaml
environment:
  - N8N_CORS_ENABLED=true
  - N8N_CORS_ORIGIN=http://localhost:3001
```

**Ou fichier .env de n8n :**
```env
N8N_CORS_ENABLED=true
N8N_CORS_ORIGIN=http://localhost:3001
```

Puis redémarrer n8n :
```bash
docker-compose restart n8n
```

---

## ✨ Résumé rapide

1. **Redémarrer le serveur** : `Ctrl+C` puis `npm run dev`
2. **Vérifier n8n** : `http://localhost:5678` doit répondre
3. **Tester** : Aller sur `/n8n-test` et envoyer un message
4. **Enjoy !** 🎉

---

## 📞 Besoin d'aide ?

Si le problème persiste après avoir suivi toutes ces étapes :
1. Partagez les logs du terminal (`npm run dev`)
2. Partagez les erreurs de la console navigateur (F12)
3. Vérifiez que le workflow n8n est bien activé
