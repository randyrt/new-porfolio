# Configuration n8n pour le Portfolio

## 🚀 Résolution du problème CORS

Le problème CORS que vous rencontrez est normal lors du développement. Voici les solutions :

## ✅ Solution 1 : Utiliser le Proxy Vite (Déjà configuré)

Le proxy Vite a été configuré automatiquement dans `vite.config.ts` :

```typescript
proxy: {
  '/api/n8n': {
    target: 'http://localhost:5678',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/n8n/, ''),
  },
}
```

### Comment l'utiliser :
1. Entrez votre URL webhook n8n : `http://localhost:5678/webhook-test/43fc3e5f-fbd1-4caa-8aae-38a2aaddb7fd`
2. Le code détectera automatiquement `localhost:5678` et utilisera le proxy
3. La requête sera transformée en : `/api/n8n/webhook-test/43fc3e5f-fbd1-4caa-8aae-38a2aaddb7fd`

**⚠️ Important :** Après modification de `vite.config.ts`, vous devez **redémarrer le serveur de développement** :

```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer :
npm run dev
```

---

## ✅ Solution 2 : Configurer CORS dans n8n (Recommandé pour production)

Si vous avez accès à la configuration n8n, ajoutez les headers CORS :

### Dans n8n (docker-compose.yml ou .env) :

```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=false
      - WEBHOOK_URL=http://localhost:5678/
      - N8N_CORS_ENABLED=true
      - N8N_CORS_ORIGIN=http://localhost:3001
```

Ou dans le fichier `.env` de n8n :

```env
N8N_CORS_ENABLED=true
N8N_CORS_ORIGIN=http://localhost:3001
```

---

## ✅ Solution 3 : Extension Chrome CORS (Développement uniquement)

Pour des tests rapides, vous pouvez installer une extension Chrome :
- [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)

**⚠️ Ne pas utiliser en production !**

---

## 📝 Test du webhook n8n

### Exemple de workflow n8n :

1. **Créer un nouveau workflow dans n8n**
2. **Ajouter un nœud "Webhook"**
   - Method: POST
   - Path: webhook-test
   - Response Mode: Last Node
   
3. **Ajouter un nœud de traitement** (optionnel)
   - Par exemple : "Function" ou "Set" pour manipuler les données

4. **Activer le workflow**

5. **Copier l'URL du webhook** et la coller dans votre page `/n8n-test`

### Exemple de réponse attendue :

```json
{
  "message": "Hello from Randy's Portfolio!",
  "timestamp": "2026-10-01T10:30:00.000Z",
  "source": "Randy Portfolio n8n Test",
  "status": "success"
}
```

---

## 🔍 Débogage

### Si ça ne fonctionne toujours pas :

1. **Vérifiez que le serveur de dev est redémarré**
   ```bash
   npm run dev
   ```

2. **Vérifiez la console du navigateur**
   - Ouvrez les DevTools (F12)
   - Onglet "Network" pour voir les requêtes

3. **Testez le webhook directement avec curl**
   ```bash
   curl -X POST http://localhost:5678/webhook-test/43fc3e5f-fbd1-4caa-8aae-38a2aaddb7fd \
     -H "Content-Type: application/json" \
     -d '{"message":"test","timestamp":"2026-10-01T10:30:00.000Z","source":"curl"}'
   ```

4. **Vérifiez les logs de n8n**
   ```bash
   docker logs -f <n8n-container-name>
   ```

---

## 📚 Ressources

- [Documentation n8n CORS](https://docs.n8n.io/hosting/configuration/environment-variables/)
- [Vite Proxy Configuration](https://vitejs.dev/config/server-options.html#server-proxy)
- [MDN - CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS)

---

## 🎯 En production

En production, vous devrez :
1. Configurer correctement CORS dans n8n avec votre domaine réel
2. Utiliser HTTPS pour les webhooks
3. Ajouter une authentification si nécessaire
4. Vérifier que les headers CORS sont correctement configurés

```env
N8N_CORS_ENABLED=true
N8N_CORS_ORIGIN=https://votre-domaine.com
```
