#!/bin/bash

echo "🔄 Redémarrage du serveur de développement avec le proxy CORS..."
echo ""

# Tuer les processus Node.js sur le port 3001
echo "🔍 Recherche des processus sur le port 3001..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || echo "   Aucun processus trouvé sur le port 3001"

echo ""
echo "✅ Serveur arrêté"
echo ""
echo "🚀 Démarrage du nouveau serveur avec proxy..."
echo "   Le proxy redirige /api/n8n/* vers http://localhost:5678/*"
echo ""

# Démarrer le serveur
npm run dev
