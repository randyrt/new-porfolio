// stores/gamificationStore.ts
import { defineStore } from 'pinia'
import type { Badge, GamificationState, LevelInfo, XPTransaction } from '@/types/gamification.types'

interface LevelBadge {
  [key: number]: Badge | null
}

const LEVEL_BADGES: LevelBadge = {
  1: null,
  2: {
    id: 'curious_visitor',
    name: '👀 Visiteur Curieux',
    description: 'Niveau 2 atteint',
    earnedAt: new Date()
  },
  3: {
    id: 'frontend_expert',
    name: '⚛️ Expert Frontend',
    description: 'Niveau 3 - Expert Frontend',
    earnedAt: new Date()
  },
  5: {
    id: 'fullstack_master',
    name: '🚀 Master Fullstack',
    description: 'Niveau 5 - Maîtrise complète',
    earnedAt: new Date()
  },
  10: {
    id: 'architecture_guru',
    name: '🏗️ Guru Architecture',
    description: 'Niveau 10 - Légende du développement',
    earnedAt: new Date()
  }
}

export const useGamificationStore = defineStore('gamification', {
  state: (): GamificationState => ({
    currentLevel: 1,
    currentXP: 0,
    badges: [],
    viewedProjects: new Set<string>(),
    readArticles: new Set<string>(),
    cvDownloaded: false,
    chatbotInteractions: 0,
    contactSubmitted: false,
    timeBonusGiven: false,
    visitorSessionStart: null,
    xpHistory: []
  }),

  getters: {
    nextLevelXP(): number {
      // Formule: 1000 XP par niveau
      return this.currentLevel * 1000
    },

    previousLevelXP(): number {
      return (this.currentLevel - 1) * 1000
    },

    xpInCurrentLevel(): number {
      return this.currentXP - this.previousLevelXP
    },

    xpNeededForNextLevel(): number {
      return this.nextLevelXP - this.previousLevelXP
    },

    progressToNextLevel(): number {
      if (this.xpNeededForNextLevel === 0) return 100
      return (this.xpInCurrentLevel / this.xpNeededForNextLevel) * 100
    },

    levelInfo(): LevelInfo {
      return {
        level: this.currentLevel,
        xp: this.currentXP,
        nextLevelXP: this.nextLevelXP,
        progress: this.progressToNextLevel,
        xpToNextLevel: this.nextLevelXP - this.currentXP
      }
    },

    totalXPFromHistory(): number {
      return this.xpHistory.reduce((total, tx) => total + tx.amount, 0)
    },

    recentTransactions(): XPTransaction[] {
      return [...this.xpHistory].slice(-10).reverse()
    }
  },

  actions: {
    initSession(): void {
      const saved = localStorage.getItem('gamification_v2')
      if (saved) {
        try {
          const data = JSON.parse(saved)
          this.currentLevel = data.currentLevel ?? 1
          this.currentXP = data.currentXP ?? 0
          this.badges = data.badges ?? []
          this.viewedProjects = new Set(data.viewedProjects ?? [])
          this.readArticles = new Set(data.readArticles ?? [])
          this.cvDownloaded = data.cvDownloaded ?? false
          this.chatbotInteractions = data.chatbotInteractions ?? 0
          this.contactSubmitted = data.contactSubmitted ?? false
          this.xpHistory = data.xpHistory ?? []
        } catch (error) {
          console.error('Failed to load gamification data:', error)
        }
      }

      this.visitorSessionStart = Date.now()

      setTimeout(() => {
        if (!this.timeBonusGiven && this.visitorSessionStart) {
          this.addXP(100, 'session_time', { duration: 5 })
          this.timeBonusGiven = true
        }
      }, 5 * 60 * 1000)
    },

    addXP(amount: number, source: XPTransaction['source'], metadata?: Record<string, any>): { leveledUp: boolean; oldLevel: number; newLevel: number } {
      const oldLevel = this.currentLevel
      const oldXP = this.currentXP

      this.currentXP += amount

      this.xpHistory.push({
        amount,
        source,
        timestamp: Date.now(),
        metadata
      })

      if (this.xpHistory.length > 100) {
        this.xpHistory = this.xpHistory.slice(-100)
      }

      let leveledUp = false
      while (this.currentXP >= this.nextLevelXP) {
        this.currentLevel++
        this.onLevelUp(this.currentLevel)
        leveledUp = true
      }

      this.saveToLocalStorage()

      const event = new CustomEvent('gamification:xp-gained', {
        detail: { amount, source, newXP: this.currentXP, oldLevel, newLevel: this.currentLevel, leveledUp, metadata }
      })
      window.dispatchEvent(event)

      return { leveledUp, oldLevel, newLevel: this.currentLevel }
    },

    onLevelUp(newLevel: number): void {
      const badge = LEVEL_BADGES[newLevel]
      if (badge) {
        this.addBadge(badge)
      }

      const event = new CustomEvent('gamification:level-up', {
        detail: { level: newLevel, xp: this.currentXP }
      })
      window.dispatchEvent(event)
    },

    addBadge(badge: Badge): boolean {
      const exists = this.badges.find(b => b.id === badge.id)
      if (!exists) {
        const newBadge = { ...badge, earnedAt: new Date() }
        this.badges.push(newBadge)
        this.saveToLocalStorage()

        const event = new CustomEvent('gamification:badge-earned', {
          detail: newBadge
        })
        window.dispatchEvent(event)
        return true
      }
      return false
    },

    trackProjectView(projectId: string): boolean {
      if (!this.viewedProjects.has(projectId)) {
        this.viewedProjects.add(projectId)
        this.addXP(10, 'project_view', { projectId })
        
        if (this.viewedProjects.size === 5) {
          this.addBadge({
            id: 'project_explorer',
            name: '🗺️ Explorateur de Projets',
            description: '5 projets consultés'
          })
        }
        return true
      }
      return false
    },

    trackArticleRead(articleId: string): boolean {
      if (!this.readArticles.has(articleId)) {
        this.readArticles.add(articleId)
        this.addXP(25, 'article_read', { articleId })
        
        if (this.readArticles.size === 3) {
          this.addBadge({
            id: 'tech_reader',
            name: '📚 Lecteur Assidu',
            description: '3 articles techniques lus'
          })
        }
        return true
      }
      return false
    },

    trackCVDownload(): boolean {
      if (!this.cvDownloaded) {
        this.cvDownloaded = true
        this.addXP(50, 'cv_download')
        
        this.addBadge({
          id: 'cv_hunter',
          name: '📄 Chasseur de CV',
          description: 'CV téléchargé'
        })
        return true
      }
      return false
    },

    trackChatbotInteraction(): void {
      this.chatbotInteractions++
      // Give 20 XP for each interaction, but maybe cap it or reward for milestones
      this.addXP(20, 'chatbot_interaction', { count: this.chatbotInteractions })
      
      if (this.chatbotInteractions === 10) {
        this.addBadge({
          id: 'social_talker',
          name: '💬 Bavard',
          description: '10 messages échangés avec l\'IA'
        })
      }
    },

    trackContactForm(): void {
      if (!this.contactSubmitted) {
        this.contactSubmitted = true
        this.addXP(100, 'contact_form')
        
        this.addBadge({
          id: 'communicator',
          name: '✉️ Communicateur',
          description: 'Message envoyé via le formulaire de contact'
        })
      }
    },

    saveToLocalStorage(): void {
      localStorage.setItem('gamification_v2', JSON.stringify({
        currentLevel: this.currentLevel,
        currentXP: this.currentXP,
        badges: this.badges,
        viewedProjects: Array.from(this.viewedProjects),
        readArticles: Array.from(this.readArticles),
        cvDownloaded: this.cvDownloaded,
        chatbotInteractions: this.chatbotInteractions,
        contactSubmitted: this.contactSubmitted,
        xpHistory: this.xpHistory
      }))
    },

    resetProgress(): void {
      this.currentLevel = 1
      this.currentXP = 0
      this.badges = []
      this.viewedProjects.clear()
      this.readArticles.clear()
      this.cvDownloaded = false
      this.timeBonusGiven = false
      this.xpHistory = []
      this.saveToLocalStorage()
      
      window.dispatchEvent(new CustomEvent('gamification:reset'))
    }
  }
})