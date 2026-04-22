import { findLocalResponseWithMetadata, detectIntention } from './logic'
import { feedbackStorage } from './trainingData/feedback/storage'

/**
 * Strategy pour corriger une réponse mal notée
 */
export interface CorrectionStrategy {
  type: 'alternative' | 'reformulate' | 'search_harder' | 'ask_gemini'
  description: string
  execute: () => Promise<string | null>
}

/**
 * Résultat de la correction
 */
export interface CorrectionResult {
  success: boolean
  newResponse: string | null
  strategy: string
  reason: string
}

/**
 * Gestionnaire de correction automatique
 */
export class AutoCorrector {
  private attempts = 0
  private maxAttempts = 3

  /**
   * Essayer de corriger une mauvaise réponse
   */
  async attemptCorrection(
    userQuestion: string,
    originalResponse: string,
    category?: string
  ): Promise<CorrectionResult> {
    this.attempts = 0


    // Stratégie 1: Chercher une réponse alternative plus spécifique
    const altResult = await this.strategy_searchAlternative(userQuestion)
    if (altResult) {
      return {
        success: true,
        newResponse: altResult,
        strategy: 'alternative',
        reason: 'Alternative response fondue avec confidence plus élevée'
      }
    }

    // Stratégie 2: Reformuler la question et réessayer
    const reformResult = await this.strategy_reformulate(userQuestion)
    if (reformResult) {
      return {
        success: true,
        newResponse: reformResult,
        strategy: 'reformulate',
        reason: 'Réponse trouvée après reformulation de la question'
      }
    }

    // Stratégie 3: Cherche avec des variantes de mots-clés
    const variantResult = await this.strategy_keywordVariants(userQuestion)
    if (variantResult) {
      return {
        success: true,
        newResponse: variantResult,
        strategy: 'keyword_variants',
        reason: 'Réponse trouvée avec variantes de mots-clés'
      }
    }

    // Stratégie 4: Chercher un sujet parent/général si question trop spécifique
    const parentResult = await this.strategy_findParentTopic(userQuestion, category)
    if (parentResult) {
      return {
        success: true,
        newResponse: parentResult,
        strategy: 'parent_topic',
        reason: 'Sujet parent identifié et réponse proposée'
      }
    }

    // Si aucune stratégie n'a fonctionné
    return {
      success: false,
      newResponse: null,
      strategy: 'none',
      reason: '🤖 Correction impossible pour le moment — je suis encore en version expérimentale. Randy travaille dessus !'
    }
  }

  /**
   * Stratégie 1: Chercher une réponse alternative différente
   */
  private async strategy_searchAlternative(userQuestion: string): Promise<string | null> {
    this.attempts++
    console.log(`   [Stratégie ${this.attempts}] Cherche une réponse alternative...`)

    // Essayer avec une légère variation de la question
    const variations = this.generateQuestionVariations(userQuestion)

    for (const variation of variations) {
      const result = findLocalResponseWithMetadata(variation)
      if (result && result.confidence > 0.7) {
        console.log(`   ✅ Alternative trouvée avec confidence: ${result.confidence}`)
        return result.response
      }
    }

    return null
  }

  /**
   * Stratégie 2: Reformuler la question
   */
  private async strategy_reformulate(userQuestion: string): Promise<string | null> {
    this.attempts++
    console.log(`   [Stratégie ${this.attempts}] Reformulation en cours...`)

    const reformulations = [
      `Randy peut-il m'aider avec: ${userQuestion}`,
      this.extractMainKeyword(userQuestion),
      `À propos de ${this.extractMainKeyword(userQuestion)}`,
      `Tes compétences en ${this.extractMainKeyword(userQuestion)}`,
      `Tes projets avec ${this.extractMainKeyword(userQuestion)}`
    ]

    for (const reformulated of reformulations) {
      if (reformulated) {
        const result = findLocalResponseWithMetadata(reformulated)
        if (result && result.confidence > 0.75) {
          console.log(`   ✅ Reformulation réussie: "${reformulated}"`)
          return result.response
        }
      }
    }

    console.log(`   ❌ Reformulation sans succès`)
    return null
  }

  /**
   * Stratégie 3: Chercher avec des variantes de mots-clés
   */
  private async strategy_keywordVariants(userQuestion: string): Promise<string | null> {
    this.attempts++
    console.log(`   [Stratégie ${this.attempts}] Variantes de mots-clés...`)

    const keywords = this.extractKeywords(userQuestion)
    console.log(`   Mots-clés extraits: ${keywords.join(', ')}`)

    const synonyms: Record<string, string[]> = {
      skill: ['compétence', 'expertise', 'savoir', 'maîtrise', 'capacité'],
      project: ['projet', 'réalisation', 'développement', 'création', 'travail'],
      technology: ['technologie', 'techno', 'stack', 'outil', 'framework'],
      experience: ['expérience', 'parcours', 'carrière', 'histoire', 'background'],
      help: ['aider', 'assister', 'conseiller', 'recommander', 'suggérer'],
      code: ['code', 'développer', 'coder', 'programmer', 'implémenter'],
      frontend: ['frontend', 'interface', 'ui', 'vue', 'design'],
      backend: ['backend', 'serveur', 'api', 'database', 'laravel'],
      mobile: ['mobile', 'app', 'ionic', 'flutter', 'cross-platform']
    }

    // Créer des variations avec synonymes
    for (const keyword of keywords) {
      const synList = Object.values(synonyms).flat()
      if (synList.includes(keyword.toLowerCase())) {
        for (const syn of synList) {
          const varied = userQuestion.toLowerCase().replace(keyword.toLowerCase(), syn)
          const result = findLocalResponseWithMetadata(varied)
          if (result && result.confidence > 0.72) {
            console.log(`   ✅ Variante trouvée: "${varied}"`)
            return result.response
          }
        }
      }
    }

    return null
  }

  /**
   * Stratégie 4: Trouver le sujet parent si question trop spécifique
   */
  private async strategy_findParentTopic(
    userQuestion: string,
    category?: string
  ): Promise<string | null> {
    this.attempts++
    console.log(`   [Stratégie ${this.attempts}] Recherche du sujet parent...`)

    const parentTopics: Record<string, string[]> = {
      frontend: ['compétence', 'skill', 'vue', 'react', 'typescript'],
      backend: ['laravel', 'symfony', 'nodejs', 'python', 'api'],
      devops: ['docker', 'cicd', 'github', 'deployment'],
      projects: ['projet', 'fid', 'qcp', 'echo', 'nurse'],
      career: ['parcours', 'expérience', 'travail', 'freelance']
    }

    // Si catégorie connue, chercher une réponse générale de cette catégorie
    if (category && parentTopics[category]) {
      for (const topic of parentTopics[category]) {
        const result = findLocalResponseWithMetadata(topic)
        if (result && result.confidence > 0.7) {
          console.log(`   ✅ Sujet parent trouvé: ${category} > ${topic}`)
          return (
            result.response +
            `\n\n📌 Note: Je n'ai pas de réponse spécifique à ta question initiale, mais voici des infos générales sur ce sujet.`
          )
        }
      }
    }
    return null
  }

  /**
   * Générer des variations de question
   */
  private generateQuestionVariations(question: string): string[] {
    const base = question.toLowerCase()
    return [
      base,
      base + '?',
      base.replace('?', ''),
      `tu ${base}`,
      `peux-tu ${base}`,
      `parle-moi de ${this.extractMainKeyword(question)}`,
      `explique ${this.extractMainKeyword(question)}`
    ].filter(Boolean)
  }

  /**
   * Extraire le mot-clé principal
   */
  private extractMainKeyword(text: string): string {
    const stopwords = ['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'si', 'que', 'quoi']
    const words = text.toLowerCase().split(/\s+/).filter(w => !stopwords.includes(w) && w.length > 3)
    return words[0] || text.toLowerCase().split(/\s+/)[0]
  }

  /**
   * Extraire tous les mots-clés
   */
  private extractKeywords(text: string): string[] {
    const stopwords = ['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'si', 'que', 'quoi', 'peux', 'tu', 'me', 'lui', 'peut']
    return text
      .toLowerCase()
      .split(/\s+/)
      .filter(w => !stopwords.includes(w) && w.length > 3)
      .slice(0, 5)
  }

  /**
   * Générer un prompt pour Gemini (si API disponible)
   */
  generateGeminiRetryPrompt(
    userQuestion: string,
    failedResponse: string,
    category?: string
  ): string {
    return `
L'utilisateur a marqué cette réponse comme MAUVAISE/INUTILE:

**Question**: ${userQuestion}
**Réponse rejetée**: ${failedResponse}
**Catégorie**: ${category || 'inconnue'}

TASK: Fournis une réponse COMPLÈTEMENT DIFFÉRENTE et meilleure.
- Sois plus CONCIS si l'ancienne était trop longue
- Sois plus DÉTAILLÉ si l'ancienne était trop générale
- Sois plus PERTINENT en te recentrant sur la question exacte
- Évite les mêmes phrases

Réponds directement SANS préambule.
    `.trim()
  }
}

export const autoCorrector = new AutoCorrector()
