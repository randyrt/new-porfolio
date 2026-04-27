// composables/useGamification.ts
import { useGamificationStore } from '../stores/gamification.types'
import { storeToRefs } from 'pinia'

export function useGamification() {
  const store = useGamificationStore()
  
  const {
    currentLevel,
    currentXP,
    badges,
    levelInfo,
    progressToNextLevel,
    recentTransactions
  } = storeToRefs(store)
  
  return {
    // State
    level: currentLevel,
    xp: currentXP,
    badges,
    levelInfo,
    progress: progressToNextLevel,
    recentTransactions,
    
    trackProjectView: (projectId: string) => store.trackProjectView(projectId),
    trackArticleRead: (articleId: string) => store.trackArticleRead(articleId),
    trackCVDownload: () => store.trackCVDownload(),
    trackChatbotInteraction: () => store.trackChatbotInteraction(),
    trackContactForm: () => store.trackContactForm(),
    initSession: () => store.initSession(),
    
    getLevelTitle: (level: number) => {
      const titles = {
        1: 'Découvreur',
        2: 'Curieux',
        3: 'Expert Frontend ⚛️',
        4: 'Ninja du Code',
        5: 'Master Fullstack 🚀',
        6: 'Architecte en Herbe',
        7: 'Tech Lead',
        8: 'Visionnaire',
        9: 'Légende',
        10: 'Dieu du Code 👑'
      }
      return titles[level as keyof typeof titles] || 'Grand Maître'
    }
  }
}