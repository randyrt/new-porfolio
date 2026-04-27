export interface Badge {
  id: string
  name: string
  description: string
  icon?: string
  earnedAt?: Date
}

export interface XPTransaction {
  amount: number
  source: 'project_view' | 'article_read' | 'cv_download' | 'session_time' | 'chatbot_interaction' | 'contact_form'
  timestamp: number
  metadata?: Record<string, any>
}

export interface GamificationState {
  currentLevel: number
  currentXP: number
  badges: Badge[]
  viewedProjects: Set<string>
  readArticles: Set<string>
  cvDownloaded: boolean
  chatbotInteractions: number
  contactSubmitted: boolean
  timeBonusGiven: boolean
  visitorSessionStart: number | null
  xpHistory: XPTransaction[]
}

export interface LevelInfo {
  level: number
  xp: number
  nextLevelXP: number
  progress: number
  xpToNextLevel: number
}