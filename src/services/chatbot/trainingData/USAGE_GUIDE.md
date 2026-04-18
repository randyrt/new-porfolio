# 🎓 Guide d'Utilisation du Système d'Amélioration du ChatBot

Bienvenue ! Ce guide te montre comment utiliser, monitorer et améliorer ton ChatBot IA.

## 🚀 Quick Start

### Vue d'ensemble simple

```
User → ChatBot → responds from training data
           ↓
        👍 ou 👎 (feedback button)
           ↓
     Recorded to IndexedDB
           ↓
    You can analyze patterns
```

---

## 💾 Données de Feedback

### Où sont stockées les données ?

Les retours utilisateur sont sauvegardés **localement dans IndexedDB** (navigateur).

**Aucune donnée n'est envoyée** à un serveur externe ! 🔒

### Comment consulter le feedback par code

```typescript
import { feedbackStorage, feedbackAnalyzer } from '@/services/chatbot/trainingData'

// 1️⃣ Voir les statistiques globales
const stats = await feedbackStorage.getStats()
console.log(`Accuracy: ${(stats.positiveCount / stats.totalFeedback * 100).toFixed(2)}%`)

// 2️⃣ Voir les réponses mal notées
const negativeFeedback = await feedbackStorage.getNegativeFeedback()
negativeFeedback.forEach(record => {
  console.log(`❌ Q: ${record.userQuestion}`)
  console.log(`   A: ${record.botResponse}`)
  console.log(`   Category: ${record.category}`)
})

// 3️⃣ Obtenir les insights d'amélioration
const insights = await feedbackAnalyzer.analyzePatterns()
console.log('Topics à améliorer:', insights.improvementAreas)
```

### Lancer l'analyse depuis Vue DevTools

```typescript
// Dans la console du navigateur (browser DevTools)
const { feedbackAnalyzer } = await import('@/services/chatbot/trainingData')
await feedbackAnalyzer.analyzePatterns()
```

---

## ✏️ Améliorer les Réponses

### Étape 1 : Identifier un problème

Imagine qu'un utilisateur demande _"Quelle est ta stack full-stack ?"_ et reçoit une mauvaise réponse.

### Étape 2 : Analyser et corriger

**Option A : Améliorer une réponse existante**

```typescript
// Dans src/services/chatbot/trainingData/examples/skills.ts
{
  keywords: 'stack|full-stack|arsenal|technologies principales',
  response: 'Ma stack complète : Frontend Vue.js 3 + TypeScript, Backend Laravel 11, Database PostgreSQL, DevOps Docker & GitHub Actions...',
  category: 'autres',
  confidence: 0.92  // ← Augmenter si le feedback était bon
}
```

**Option B : Ajouter une nouvelle réponse**

```typescript
// Dans le même fichier
export const skillsExamples = [
  // ... réponses existantes ...
  {
    keywords: 'full stack|fullstack|peut tu faire|frontend et backend',
    response: 'Absolument ! Je suis spécialisé en fullstack. Je maîtrise Vue.js/Nuxt en frontend et Laravel en backend, avec Docker pour l\'infrastructure.',
    category: 'autres',
    confidence: 0.85
  }
]
```

### Étape 3 : Tester localement

```bash
# Redémarrer le serveur dev (le fichier sera recompilé)
npm run dev

# Puis tester dans le chatbot
```

---

## 📊 Dashboard Monitoring

### Script pour monitorer en temps réel

```typescript
// À insérer dans une route admin (futur)
import { feedbackAnalyzer, feedbackStorage } from '@/services/chatbot/trainingData'

export async function generateChatbotReport() {
  const stats = await feedbackStorage.getStats()
  const insights = await feedbackAnalyzer.analyzePatterns()
  
  return {
    overview: {
      totalInteractions: stats.totalFeedback,
      accuracy: `${(stats.positiveCount / stats.totalFeedback * 100).toFixed(2)}%`,
      positive: stats.positiveCount,
      negative: stats.negativeCount
    },
    topPerformers: insights.bestPerformingCategories,
    needsWork: insights.improvementAreas,
    commonIssues: insights.commonMisunderstandings
  }
}
```

---

## 🔄 Workflow d'Amélioration Continue

### Jour 1-7 : Collecte du feedback

- Mise en ligne du ChatBot avec les boutons 👍 / 👎
- Les utilisateurs interagissent et donnent du feedback
- Les données s'accumulent dans IndexedDB

### Jour 7+ : Première analyse

```typescript
const insights = await feedbackAnalyzer.analyzePatterns()

// Vérifier si retraining est nécessaire
const shouldRetrain = await feedbackAnalyzer.shouldRetrainModel()
if (shouldRetrain) {
  console.log('⚠️ Accuracy < 70%, amélioration recommandée')
}
```

### Actions selon les résultats

**Si accuracy > 80%** 🎉
→ Maintenir, bon travail !

**Si accuracy 50-80%** ⚠️
→ Identifier les 2-3 catégories faibles et améliorer

**Si accuracy < 50%** 🔴
→ Ajouter beaucoup plus d'exemples d'entraînement

---

## 🛠️ Opérations Courantes

### Réinitialiser le feedback (tout nettoyer)

```typescript
import { feedbackStorage } from '@/services/chatbot/trainingData'

// ⚠️ ATTENTION: Ceci supprime TOUT le feedback!
// À utiliser seulement si tu veux recommencer à zéro
localStorage.clear() // Nettoie aussi l'historique chat
```

### Nettoyer les anciens données (>90 jours)

```typescript
const { feedbackStorage } = await import('@/services/chatbot/trainingData')
await feedbackStorage.clearOldFeedback(90) // Supprime les données > 90 jours
```

### Exporter le feedback pour analyse

```typescript
const { feedbackAnalyzer } = await import('@/services/chatbot/trainingData')
const data = await feedbackAnalyzer.exportFeedbackForTraining()

// data.positive : réponses bien notées
// data.negative : réponses mal notées

console.log(JSON.stringify(data, null, 2)) // Copier-coller pour traitement
```

---

## 📈 KPIs à Tracker

### 1. Accuracy Global
```
Positive Feedback / Total Feedback = Accuracy
```
**Target** : > 80%

### 2. Accuracy par Catégorie
```typescript
const stats = await feedbackStorage.getStats()
Object.entries(stats.byCategory).forEach(([category, data]) => {
  const acc = (data.positive / (data.positive + data.negative) * 100).toFixed(2)
  console.log(`${category}: ${acc}%`)
})
```
**Target** : > 75% par catégorie

### 3. Feedback Ratio
```
positive / negative
```
**Target** : > 3:1 (3 positifs pour 1 négatif)

---

## 🎯 Stratégies d'Amélioration

### Stratégie 1 : Ajouter plus d'exemples

Quand: Categorie < 60% accuracy

```typescript
// Dans le fichier de catégorie approprié
export const xxxExamples = [
  // ... 5-10 nouveaux exemples similaires à celui qui a échoué
]
```

### Stratégie 2 : Améliorer les mots-clés

Quand: Bonne réponse mais difficile à trouver

```typescript
// Avant
{ keywords: 'vue|vuejs', response: '...', ... }

// Après (ajouter synonymes)
{ keywords: 'vue|vuejs|vue.js|framework frontend|frontend js', response: '...', ... }
```

### Stratégie 3 : Affiner la confiance

```typescript
// Si la réponse est souvent bien notée, augmenter la confiance
{ keywords: '...', response: '...', category: 'frontend', confidence: 0.95 } // ↑ au lieu de 0.85
```

### Stratégie 4 : Créer des variantes

```typescript
// Au lieu d'une SEULE réponse longue
{ keywords: 'projects', response: 'Fid, QCP, Echo...' }

// Créer DEUX réponses spécifiques
{ keywords: 'fid|fid-connect|fidconnect', response: 'Fid-Connect est une plateforme...' }
{ keywords: 'qcp|crédit|credit', response: 'QCP est une solution de gestion...' }
```

---

## 🔐 Sécurité & Performance

### Données sensibles ?
❌ Non ! Le feedback ne contient que :
- Question de l'utilisateur
- Réponse du bot
- Timestamp
- Catégorie

### Limite de stockage ?
- IndexedDB peut contenir ~50MB par domaine
- À 1KB par feedback = ~50 000 interactions
- Nettoyage auto après 90 jours = pas de problème

### Performance ?
- Requêtes IndexedDB: **< 10ms**
- Analyse: **< 100ms**
- Aucun impact sur la réactivité

---

## ❓ FAQ

### Q: Où sont stockées les données de feedback ?
**A:** Dans IndexedDB du navigateur, **localement seulement**. Aucun serveur externe.

### Q: Puis-je voir qui dit quoi ?
**A:** Non, zéro données d'identification. Juste question + réponse, anonyme.

### Q: Les données persistent après fermeture ?
**A:** Oui, IndexedDB = persiste indéfiniment jusqu'à suppression.

### Q: Comment réinitialiser ?
**A:** `localStorage.clear()` + rechargement de la page.

### Q: Puis-je télécharger le feedback ?
**A:** Oui : `await feedbackAnalyzer.exportFeedbackForTraining()` + copier le JSON.

### Q: Comment intégrer avec une API externe plus tard ?
**A:** Les données sont déjà structurées, facile à envoyer à un serveur pour fine-tuning.

---

## 📚 Ressources

- 📖 [Training Data Documentation](./README.md)
- 💻 [Logic.ts Source](../logic.ts)
- 🎨 [ChatBot.vue](../../views/ChatBot.vue)

---

**Last Updated:** April 2026  
**Status:** ✅ Ready to use
