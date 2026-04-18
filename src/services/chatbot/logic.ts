import { TOPIC_KEYWORDS, PERSONAL_KEYWORDS, AI_NATURE_KEYWORDS } from './constants'
import { Action, IntentionDetection, Message } from './types'
import { skillsExamples } from './trainingData/examples/skills'
import { projectsExamples } from './trainingData/examples/projects'
import { careerExamples } from './trainingData/examples/career'
import { contactExamples } from './trainingData/examples/contact'
import { generalExamples } from './trainingData/examples/general'
import { feedbackStorage } from './trainingData/feedback/storage'

// Combine all training examples
const allExamples = [
  ...skillsExamples,
  ...projectsExamples,
  ...careerExamples,
  ...contactExamples,
  ...generalExamples
]

export interface LocalResponseWithMetadata {
  response: string
  category: string
  confidence: number
  matchedKeywords: string[]
}

export const isOnTopic = (question: string): boolean => {
  const lowerQuestion = question.toLowerCase().trim()

  return TOPIC_KEYWORDS.some(keyword => {
    try {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`\\b${escaped}\\b`, 'i')
      return regex.test(lowerQuestion)
    } catch (e) {
      return lowerQuestion.includes(keyword)
    }
  })
}

export const isPersonalInfoRequest = (question: string): boolean => {
  const lowerQuestion = question.toLowerCase().trim()

  return PERSONAL_KEYWORDS.some(keyword => {
    try {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`\\b${escaped}\\b`, 'i')
      return regex.test(lowerQuestion)
    } catch (e) {
      return lowerQuestion.includes(keyword)
    }
  })
}

export const isAINatureQuestion = (question: string): boolean => {
  const lowerQuestion = question.toLowerCase().trim()

  return AI_NATURE_KEYWORDS.some(keyword => {
    try {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`\\b${escaped}\\b`, 'i')
      return regex.test(lowerQuestion)
    } catch (e) {
      return lowerQuestion.includes(keyword)
    }
  })
}

/**
 * Find local response using training examples with improved confidence scoring
 */
export const findLocalResponseWithMetadata = (
  userQuestion: string
): LocalResponseWithMetadata | null => {
  const question = userQuestion.toLowerCase().trim()
  let bestMatch: LocalResponseWithMetadata | null = null

  for (const example of allExamples) {
    const keywordList = example.keywords.split('|').map(k => k.trim())
    let matchedKeywords: string[] = []
    let matchCount = 0

    for (const keyword of keywordList) {
      try {
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'i')
        if (regex.test(question)) {
          matchedKeywords.push(keyword)
          matchCount++
        }
      } catch (e) {
        if (question.includes(keyword.toLowerCase())) {
          matchedKeywords.push(keyword)
          matchCount++
        }
      }
    }

    // Calculate adjusted confidence based on number of matches
    const matchConfidence = Math.min(example.confidence * (0.7 + matchCount * 0.15), 1)

    if (
      matchedKeywords.length > 0 &&
      (!bestMatch || matchConfidence > bestMatch.confidence)
    ) {
      bestMatch = {
        response: example.response,
        category: example.category,
        confidence: matchConfidence,
        matchedKeywords
      }
    }
  }

  return bestMatch
}

/**
 * Legacy function for backwards compatibility
 */
export const findLocalResponse = (
  userQuestion: string,
  kb: Record<string, string>
): string | null => {
  const metadata = findLocalResponseWithMetadata(userQuestion)
  return metadata?.response ?? null
}

/**
 * Detect intention with confidence scoring
 */
export const detectIntention = (question: string): IntentionDetection | null => {
  const metadata = findLocalResponseWithMetadata(question)
  if (!metadata) return null

  return {
    category: metadata.category,
    confidence: metadata.confidence,
    matchedKeywords: metadata.matchedKeywords
  }
}

/**
 * Get suggested topics if intention cannot be detected
 */
export const getSuggestedTopics = (): {
  label: string
  icon: string
  category: string
}[] => {
  const categories = Array.from(new Set(allExamples.map(e => e.category)))

  const categoryLabels: Record<string, string> = {
    frontend: '🎨 Frontend (Vue, TypeScript, etc)',
    backend: '⚙️ Backend (Laravel, Node, etc)',
    database: '💾 Bases de données',
    devops: '🚀 DevOps & CI/CD',
    mobile: '📱 Mobile Apps',
    projects: '📦 Mes projets',
    career: '💼 Mon parcours',
    contact: '📞 Me contacter',
    autres: '🔧 Autres sujets'
  }

  return categories.map(cat => ({
    label: categoryLabels[cat] || cat,
    icon: 'fa-solid fa-lightbulb',
    category: cat
  }))
}

export const detectActions = (text: string, t: any): Action[] => {
  const actions: Action[] = []
  const lowerText = text.toLowerCase()

  if (lowerText.includes('cv') || lowerText.includes('curriculum') || lowerText.includes('parcours')) {
    actions.push({
      label: t('nav.home'),
      type: 'route',
      target: '/',
      icon: 'fa-solid fa-home'
    })
    actions.push({
      label: t('nav.webcup'),
      type: 'route',
      target: '/webcup24',
      icon: 'fa-solid fa-trophy'
    })
    actions.push({
      label: t('home.download_cv'),
      type: 'download',
      target: '/images/cv/Randy_real_cv.pdf',
      icon: 'fa-solid fa-download'
    })
  }

  if (
    lowerText.includes('contact') ||
    lowerText.includes('whatsapp') ||
    lowerText.includes('joindre') ||
    lowerText.includes('écrire') ||
    lowerText.includes('message')
  ) {
    actions.push({
      label: t('nav.contact'),
      type: 'route',
      target: '/contact',
      icon: 'fa-solid fa-envelope'
    })
  }

  const projectMap: Record<string, string> = {
    'fid-connect|fidconnect': 'fid-connect',
    qcp: 'qcp',
    'echo-webline|echo webline': 'echo-webline',
    'afr-fan|afrfan': 'afr-fan',
    nurse: 'nurses'
  }

  for (const [pattern, id] of Object.entries(projectMap)) {
    const regex = new RegExp(`\\b(?:${pattern})\\b`, 'i')
    if (regex.test(lowerText)) {
      actions.push({
        label: `${t('chat.actions.view')} ${id.replace('-', ' ').toUpperCase()}`,
        type: 'route',
        target: `/projects#${id}`,
        icon: 'fa-solid fa-arrow-right'
      })
    }
  }

  const techMap: Record<string, string> = {
    laravel: 'laravel',
    'vue|nuxt': 'vue',
    docker: 'docker',
    'mobile|ionic|flutter': 'mobile',
    symfony: 'symfony',
    python: 'python',
    'cicd|ci/cd': 'cicd'
  }

  for (const [pattern, id] of Object.entries(techMap)) {
    const regex = new RegExp(`\\b(?:${pattern})\\b`, 'i')
    if (regex.test(lowerText)) {
      actions.push({
        label: `${t('chat.actions.details')} ${id.toUpperCase()}`,
        type: 'route',
        target: `/skills#${id}`,
        icon: 'fa-solid fa-microchip'
      })
    }
  }

  if (lowerText.includes('webcup')) {
    actions.push({
      label: `${t('chat.actions.details')} WEBCUP`,
      type: 'route',
      target: '/webcup24',
      icon: 'fa-solid fa-trophy'
    })
  }

  if (
    (lowerText.includes('projet') || lowerText.includes('project')) &&
    !actions.some(a => a.target.includes('/projects#'))
  ) {
    actions.push({
      label: t('nav.projects'),
      type: 'route',
      target: '/projects',
      icon: 'fa-solid fa-layer-group'
    })
  }

  if (
    (lowerText.includes('compétence') ||
      lowerText.includes('skill') ||
      lowerText.includes('techno')) &&
    !actions.some(a => a.target.includes('/skills#'))
  ) {
    actions.push({
      label: t('nav.skills'),
      type: 'route',
      target: '/skills',
      icon: 'fa-solid fa-code'
    })
  }

  if (
    lowerText.includes('expérience') ||
    lowerText.includes('career') ||
    lowerText.includes('parcours')
  ) {
    actions.push({
      label: t('nav.about'),
      type: 'route',
      target: '/about',
      icon: 'fa-solid fa-briefcase'
    })
  }

  return actions
}

/**
 * Record user feedback for continuous improvement
 */
export const recordFeedback = async (
  rating: 'positive' | 'negative',
  userQuestion: string,
  botResponse: string,
  category?: string,
  userCorrection?: string
): Promise<void> => {
  try {
    await feedbackStorage.init()
    await feedbackStorage.addFeedback({
      userQuestion,
      botResponse,
      rating,
      timestamp: Date.now(),
      category,
      userCorrection
    })
  } catch (error) {
    console.error('Error recording feedback:', error)
  }
}
