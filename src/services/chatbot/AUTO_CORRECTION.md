# 🚀 Système de Correction Automatique

## 📌 Vue d'ensemble

Quand un utilisateur clique sur le **pouce inversé 👎** (feedback négatif), le système lance automatiquement une **chaîne de correction intelligente** pour essayer de fournir une meilleure réponse.

---

## 🔄 Flux de Correction (4 Stratégies)

```
User clicks 👎 (bad feedback)
        ↓
AutoCorrector.attemptCorrection() starts
        ↓
┌─────────────────────────────────────────┐
│ Stratégie 1: searchAlternative          │
│ • Cherche des variations de la question │
│ • Si confidence > 70% → SUCCESS         │
└─────────────────────────────────────────┘
        ↓ (if not found)
┌─────────────────────────────────────────┐
│ Stratégie 2: reformulate                │
│ • Reformule la question naturellement   │
│ • Test: "Randy peut-il...", "À propos.."│
│ • Si confidence > 75% → SUCCESS         │
└─────────────────────────────────────────┘
        ↓ (if not found)
┌─────────────────────────────────────────┐
│ Stratégie 3: keywordVariants            │
│ • Génère des synonymes                  │
│ • Test: skill→expertise, tech→techno   │
│ • Si confidence > 72% → SUCCESS         │
└─────────────────────────────────────────┘
        ↓ (if not found)
┌─────────────────────────────────────────┐
│ Stratégie 4: findParentTopic            │
│ • Cherche un sujet parent/général       │
│ • Si catégorie connue → proposer réponse│
│ + disclaimer "infos générales"          │
└─────────────────────────────────────────┘
        ↓ (if all fail)
❌ CORRECTION ÉCHUE
→ Message d'aide + suggestions
```

---

## 🎯 Stratégies Détaillées

### 1️⃣ **Search Alternative**
```typescript
// Cherche une réponse différente
Input:  "Qu'est-ce que Laravel ?"
Vars:   ["Qu'est-ce que Laravel ?", "tu Qu'est-ce que Laravel ?", ...]
Output: "😊 Si confidence > 70%"
```

### 2️⃣ **Reformulate**
```typescript
// Reformule naturellement
Input:  "Peux-tu me parler Django ?"
Tests:  [
  "Randy peut-il m'aider avec: Peux-tu me parler Django ?",
  "À propos de Django",
  "Tes compétences en Django",
  "Tes projets avec Django"
]
If found with confidence > 75% → Return
```

### 3️⃣ **Keyword Variants**
```typescript
// Utilise des synonymes
Input:  "Tu sais faire du full-stack ?"
Main-keyword: "full-stack"
Synonyms: ["fullstack", "arsenal", "mes techno", ...]
If found with new variant → Return
```

### 4️⃣ **Parent Topic**
```typescript
// Cherche le sujet parent si trop spécifique
Input category: "backend"
Parents: ["laravel", "symfony", "nodejs", "python", "api"]
If found → Return + add disclaimer
"📌 Note: Je n'ai pas de réponse spécifique... voici des infos générales"
```

---

## 💡 Résultats Possibles

### ✅ Succès
```
Original Question: "Pourquoi Vue ?"
Original Response: [❌ Bad response]
        ↓
New Response: "✨ **Réponse corrigée** (Stratégie: reformulate)
              Vue.js est excellent pour..."
        ↓
Auto-feedback: Recorded as POSITIVE for the corrected response
```

### ❌ Échec
```
Aucune stratégie n'a trouvé de réponse
        ↓
Fallback Message: "Désolé je n'ai pas pu corriger...
Raison: [raison spécifique]

Options:
1. 🔄 Reformule ta question
2. 📧 Contact Randy directement
3. 💡 Essaie une question connexe"
```

---

## 🔍 Exemple Concret

### Scénario 1: Succès via Reformulation
```
User: "Explique Vue"
Bot:  "Vue c'est un langage de programmation..." ❌ (Mauvaise réponse)
User: Click 👎
System: Launches AutoCorrector
  - Strategy 1: Pas de variation
  - Strategy 2: Reformule → "Tes compétences en Vue"
    → Trouve réponse confidence 0.92 ✅
Result: "✨ Réponse corrigée (Stratégie: reformulate)
         Je maîtrise Vue.js 3 avec la Composition API..."
```

### Scénario 2: Succès via Topic Parent
```
User: "Utilises-tu Webpack ?"
Bot:  "Je ne sais pas..." ❌
User: Click 👎
System: Launches AutoCorrector
  - Strategy 1,2,3: Non trouvées
  - Strategy 4: Catégorie frontend → trouve réponse général
Result: "✨ Réponse corrigée (Stratégie: parent_topic)
         Je travaille avec du build tooling moderne...
         📌 Note: Je n'ai pas de répon spécifique..."
```

### Scénario 3: Échec Complet
```
User: "Quel est le sens de la vie ?"
Bot:  "Philosophie..." ❌
User: Click 👎
System: Launches AutoCorrector
  - Toutes stratégies échouent
Result: "Désolé je n'ai pas pu corriger...
         Raison: Impossible de corriger avec données locales.
         Options: [suggestions]"
```

---

## ⚙️ Configuration & Paramètres

### Seuils de Confiance
```typescript
strategy_searchAlternative    : confidence > 0.70
strategy_reformulate          : confidence > 0.75
strategy_keywordVariants      : confidence > 0.72
strategy_findParentTopic      : confidence > 0.70
```

### Limite d'Attempts
```typescript
maxAttempts = 3  // Pas utilisé actuellement (fail-safe)
```

---

## 📊 KPIs à Tracker

Après déploiement, monitor:

```
1. Correction Success Rate (%)
   = corrected / negatives
   Target: > 60%

2. Strategy Distribution
   - reformulate: %
   - searchAlternative: %
   - keywordVariants: %
   - parentTopic: %

3. Post-Correction Feedback
   - Did user like the corrected answer?
   - Re-rating: + feedback sur correction

4. Fallback Rate (%)
   = failed_corrections / negatives
   Target: < 40%
```

---

## 🔧 Maintenance & Amélioration

### Comment analyser les performances

```typescript
// Depuis console navigateur
const { feedbackAnalyzer, feedbackStorage } = 
  await import('@/services/chatbot/trainingData')

const stats = await feedbackStorage.getStats()
const insights = await feedbackAnalyzer.analyzePatterns()

console.log('Accuracy par catégorie:', insights.bestPerformingCategories)
console.log('Topics à améliorer:', insights.improvementAreas)
```

### Quand décider d'ajouter des exemples

Si une même question revient avec échec:
1. Identifier le pattern
2. Ajouter à `trainingData/examples/[category].ts`
3. Tester localement
4. Déployer

Example:
```typescript
// Dans skills.ts - Ajouter pour les questions qui échouent
{
  keywords: 'webpack|bundling|build tools|bundler',
  response: 'Je travaille avec des build tools modernes...',
  category: 'autres',
  confidence: 0.85
}
```

---

## 🚀 Futures Améliorations

- [ ] Intégration Gemini retry si toutes stratégies échouent
- [ ] Learning from corrections: auto-add to trainingData
- [ ] A/B testing de stratégies ordre
- [ ] User satisfaction on corrected answers
- [ ] ML-based confidence calibration
- [ ] Multi-language support in synonyms

---

## 📝 Notes d'Implémentation

**Fichiers modifiés:**
- `autoCorrector.ts` - Nouveau (logique de correction)
- `ChatBot.vue` - `handleFeedback()` amélioré
- `trainingData/index.ts` - Export du système

**Performance:**
- AutoCorrection: < 100ms (local processing)
- Aucune requête API supplémentaire
- Pas d'impact sur UX

---

**Last Updated**: April 18, 2026  
**Status**: ✅ Production Ready
