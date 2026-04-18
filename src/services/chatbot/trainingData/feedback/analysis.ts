import { feedbackStorage, FeedbackRecord } from './storage'

export interface InsightData {
  mostCorrectedTopics: { topic: string; count: number }[]
  bestPerformingCategories: { category: string; accuracy: number }[]
  commonMisunderstandings: { question: string; count: number }[]
  improvementAreas: string[]
}

export class FeedbackAnalyzer {
  async analyzePatterns(): Promise<InsightData> {
    const stats = await feedbackStorage.getStats()
    const negativeFeedback = await feedbackStorage.getNegativeFeedback()

    // Extract topics from negative feedback
    const topicOccurrence: Record<string, number> = {}
    const commonQuestions: Record<string, number> = {}

    negativeFeedback.slice(0, 100).forEach((record) => {
      const category = record.category || 'unknown'
      topicOccurrence[category] = (topicOccurrence[category] || 0) + 1
      commonQuestions[record.userQuestion] = (commonQuestions[record.userQuestion] || 0) + 1
    })

    // Calculate best performing categories
    const categoryAccuracy = Object.entries(stats.byCategory).map(([category, data]) => {
      const total = data.positive + data.negative
      const accuracy = total > 0 ? (data.positive / total) * 100 : 0
      return { category, accuracy }
    })

    const insights: InsightData = {
      mostCorrectedTopics: Object.entries(topicOccurrence)
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),

      bestPerformingCategories: categoryAccuracy
        .sort((a, b) => b.accuracy - a.accuracy)
        .slice(0, 5),

      commonMisunderstandings: Object.entries(commonQuestions)
        .map(([question, count]) => ({ question, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),

      improvementAreas: this.identifyImprovementAreas(stats, categoryAccuracy)
    }

    return insights
  }

  private identifyImprovementAreas(
    stats: Awaited<ReturnType<typeof feedbackStorage.getStats>>,
    categoryAccuracy: { category: string; accuracy: number }[]
  ): string[] {
    const areas: string[] = []

    const overallAccuracy = stats.positiveCount / (stats.totalFeedback || 1)
    if (overallAccuracy < 0.7) {
      areas.push('Améliorer la compréhension générale des intentions utilisateur')
    }

    if (overallAccuracy < 0.5) {
      areas.push('Étendre la base d\'exemples d\'entraînement')
    }

    // Find categories with low accuracy
    categoryAccuracy.forEach(({ category, accuracy }) => {
      if (accuracy < 0.5) {
        areas.push(`Améliorer les réponses pour la catégorie: ${category}`)
      }
    })

    return areas
  }

  async getMostProblematicQuestions(limit: number = 10): Promise<FeedbackRecord[]> {
    const feedback = await feedbackStorage.getNegativeFeedback()
    return feedback.slice(0, limit)
  }

  async shouldRetrainModel(): Promise<boolean> {
    const stats = await feedbackStorage.getStats()

    // Trigger retraining if:
    // 1. Accuracy drops below 70%
    // 2. We have enough negative feedback to learn from (> 20 samples)
    const accuracy = stats.totalFeedback > 0 ? stats.positiveCount / stats.totalFeedback : 1
    return accuracy < 0.7 && stats.negativeCount > 20
  }

  async exportFeedbackForTraining(): Promise<{
    positive: FeedbackRecord[]
    negative: FeedbackRecord[]
  }> {
    const allFeedback = await feedbackStorage.getFeedback(10000)

    return {
      positive: allFeedback.filter((f) => f.rating === 'positive'),
      negative: allFeedback.filter((f) => f.rating === 'negative')
    }
  }
}

export const feedbackAnalyzer = new FeedbackAnalyzer()
