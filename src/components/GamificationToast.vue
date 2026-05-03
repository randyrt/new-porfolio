<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="fixed bottom-18 right-4 z-50 space-y-2">
      <div v-for="toast in toasts" :key="toast.id"
        class="backdrop-blur-md border border-white/30 rounded-xl shadow-xl p-4 min-w-[320px] transform transition-all cursor-pointer hover:scale-105 hover:shadow-2xl"
        :style="{ background: 'linear-gradient(135deg, var(--app-primary), var(--app-primary-hover))' }" :class="toast.type === 'level' ? 'border-purple-500/50 shadow-purple-500/20' :
          toast.type === 'badge' ? 'border-yellow-500/50 shadow-yellow-500/20' :
            'border-blue-500/50 shadow-blue-500/20'" @click="removeToast(toast.id)">
        <div class="flex items-center gap-3">
          <div class="text-3xl animate-bounce">
            {{ toast.icon }}
          </div>
          <div class="flex-1">
            <p class="font-bold !text-black text-sm drop-shadow-md">
              {{ toast.title }}
            </p>
            <!-- <p class="text-xs text-black/80 mt-0.5 drop-shadow-sm">
              {{ toast.message }}
            </p> -->
          </div>
          <button
            class="text-black/60 hover:text-black transition-colors backdrop-blur-sm bg-white/10 rounded-full w-5 h-5 flex items-center justify-center hover:bg-white/20">
            ✕
          </button>
        </div>


        <div class="mt-2 h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div class="h-full transition-all duration-[3000ms] linear rounded-full"
            :class="toast.type === 'level' ? 'bg-purple-500' : toast.type === 'badge' ? 'bg-yellow-500' : 'bg-gradient-to-r from-blue-400 to-cyan-400'"
            :style="{ width: '100%' }"></div>
        </div>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGamification } from '../composables/useGamification'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Toast {
  id: string
  type: 'level' | 'badge' | 'xp'
  title: string
  message: string
  icon: string
  duration: number
}


type XPSource = 'project_view' | 'article_read' | 'cv_download' | 'session_time' | 'chatbot_interaction' | 'contact_form'

interface XPGainedDetail {
  amount: number
  source: XPSource
  newLevel: number
  leveledUp: boolean
  metadata?: Record<string, any>
}

interface BadgeDetail {
  id: string
  name: string
  description: string
  icon?: string
  earnedAt?: Date
}

const toasts = ref<Toast[]>([])
const timeoutIds = ref<number[]>([])

const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = Math.random().toString(36).substring(7)
  const newToast = { ...toast, id }

  toasts.value.push(newToast)

  const timeoutId = window.setTimeout(() => {
    removeToast(id)
  }, toast.duration)

  timeoutIds.value.push(timeoutId)
}

const removeToast = (id: string) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}


const getMessageForSource = (source: XPSource, amount: number): string => {
  const messages: Record<XPSource, string> = {
    project_view: t('gamification.toast.project_view'),
    article_read: t('gamification.toast.article_read'),
    cv_download: t('gamification.toast.cv_download'),
    session_time: t('gamification.toast.session_time'),
    chatbot_interaction: t('gamification.toast.chatbot_interaction'),
    contact_form: t('gamification.toast.contact_form')
  }
  return `+${amount} XP • ${messages[source]}`
}


const handleXPGained = (event: Event) => {
  const customEvent = event as CustomEvent<XPGainedDetail>
  const { amount, source, newLevel, leveledUp } = customEvent.detail
  const gamification = useGamification()

  if (leveledUp) {
    addToast({
      type: 'level',
      title: `🎉 ${t('gamification.level')} ${newLevel} ${t('gamification.completed')}`,
      message: `${t('gamification.you_are_now')} ${gamification.getLevelTitle(newLevel)}`,
      icon: '🎯',
      duration: 5000
    })
  } else {
    addToast({
      type: 'xp',
      title: `✨ +${amount} XP`,
      message: getMessageForSource(source, amount),
      icon: '⭐',
      duration: 3000
    })
  }
}

const handleBadgeEarned = (event: Event) => {
  const customEvent = event as CustomEvent<BadgeDetail>
  const badge = customEvent.detail


  const badgeName = t(`gamification.badges.${badge.id}.name`, badge.name)
  const badgeDesc = t(`gamification.badges.${badge.id}.description`, badge.description)

  addToast({
    type: 'badge',
    title: badgeName,
    message: badgeDesc,
    icon: badge.icon || '🏅',
    duration: 4000
  })
}

onMounted(() => {
  window.addEventListener('gamification:xp-gained', handleXPGained as EventListener)
  window.addEventListener('gamification:badge-earned', handleBadgeEarned as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('gamification:xp-gained', handleXPGained as EventListener)
  window.removeEventListener('gamification:badge-earned', handleBadgeEarned as EventListener)
  timeoutIds.value.forEach(id => clearTimeout(id))
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 0.6s ease-in-out;
}
</style>