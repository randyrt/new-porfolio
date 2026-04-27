import { ref, computed } from 'vue'
import axios from 'axios'

export type EmotionalState = 'flow' | 'anxiety' | 'satisfaction' | 'curiosity' | 'maintenance'

export interface AnalyzedCommit {
  id: string
  message: string
  date: Date
  author: string
  emotion: EmotionalState
  score: number // Intensity of the emotion
}

export interface TimeSnippet {
  period: string
  summary: string
  dominantEmotion: EmotionalState
  intensity: number
  commitCount: number
}

export function useGitTimeMachine() {
  const commits = ref<AnalyzedCommit[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

  const analyzeEmotion = (message: string, date: Date): { emotion: EmotionalState; score: number } => {
    const hour = date.getUTCHours()
    const msg = message.toLowerCase()

    // Priority 1: Key architectural improvement (FLOW)
    if (msg.includes('refactor') || msg.includes('clean') || msg.includes('improve') || msg.includes('optimize') || msg.includes('shaking') || msg.includes('polish')) {
      return { emotion: 'flow', score: 0.9 }
    }

    // Priority 2: Creative & UI Work (also part of FLOW)
    if (msg.includes('ui') || msg.includes('style') || msg.includes('css') || msg.includes('design') || msg.includes('layout') || msg.includes('animation') || msg.includes('responsive')) {
      return { emotion: 'flow', score: 0.8 }
    }

    // Priority 3: Night logic (ANXIETY or DEEP WORK)
    if (hour >= 22 || hour <= 4) {
      if (msg.includes('fix') || msg.includes('bug') || msg.includes('error') || msg.includes('hotfix') || msg.includes('emergency')) {
        return { emotion: 'anxiety', score: 0.9 }
      }
      // If it's night but no "fix" keywords, it's a mix of anxiety/dedication
      return { emotion: 'anxiety', score: 0.4 }
    }

    // Priority 4: Features (CURIOSITY)
    if (msg.includes('feat') || msg.includes('add') || msg.includes('new') || msg.includes('implement')) {
      return { emotion: 'curiosity', score: 0.7 }
    }

    // Priority 5: Completion (SATISFACTION)
    if (msg.includes('merge') || msg.includes('done') || msg.includes('stable') || msg.includes('release') || msg.includes('final')) {
      return { emotion: 'satisfaction', score: 1.0 }
    }

    return { emotion: 'maintenance', score: 0.4 }
  }

  const fetchHistory = async (username: string = 'randyrt', repo: string = 'New-porfolio') => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/commits?per_page=100`, {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}
      })

      const analyzed = response.data.map((c: any) => {
        const date = new Date(c.commit.author.date)
        const { emotion, score } = analyzeEmotion(c.commit.message, date)
        return {
          id: c.sha,
          message: c.commit.message,
          date,
          author: c.commit.author.name,
          emotion,
          score
        }
      })
      commits.value = analyzed

      // Save mood stats to localStorage for FrankAIstein in ChatBot
      const total = analyzed.length
      const flowCount = analyzed.filter((c: AnalyzedCommit) => c.emotion === 'flow').length
      const anxietyCount = analyzed.filter((c: AnalyzedCommit) => c.emotion === 'anxiety').length

      const stats = {
        total,
        flowPercent: Math.round((flowCount / total) * 100),
        anxietyPercent: Math.round((anxietyCount / total) * 100),
        lastUpdate: new Date().toISOString()
      }
      localStorage.setItem('git_mood_stats', JSON.stringify(stats))

    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching git history:', err)
    } finally {
      loading.value = false
    }
  }

  const timeGroups = computed(() => {
    // Group commits by day or week for the time machine
    const groups: Record<string, AnalyzedCommit[]> = {}
    commits.value.forEach(c => {
      const day = c.date.toISOString().split('T')[0]
      if (!groups[day]) groups[day] = []
      groups[day].push(c)
    })
    return groups
  })

  return {
    commits,
    loading,
    error,
    fetchHistory,
    timeGroups,
    analyzeEmotion
  }
}
