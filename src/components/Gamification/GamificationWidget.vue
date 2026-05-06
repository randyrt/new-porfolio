<template>
  <div class="fixed bottom-1 right-42 z-50 group">
    <div
      class="relative backdrop-blur-md border border-white/30 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 w-14 h-14 flex items-center justify-center cursor-pointer hover:scale-110"
      :style="{ backgroundColor: 'var(--app-primary)' }" @click="showWidget = !showWidget">
      <font-awesome-icon icon="trophy" class="text-xl text-amber-500 drop-shadow-md" />
      <span v-if="levelInfo.level > 0"
        class="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg ring-2 ring-white/80">
        {{ levelInfo.level }}
      </span>
    </div>
  </div>

  <Transition name="modal" enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-200 ease-in">
    <div v-if="showWidget" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-[5px]"
      :style="{ backgroundColor: 'color-mix(in srgb, #0a0f1a, transparent 40%)' }"
      role="dialog" aria-modal="true" @click.self="showWidget = false">
      <div class="relative w-full max-w-3xl bg-slate-100 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div class="relative border border-white/10 rounded-2xl shadow-2xl w-full max-h-[85vh] overflow-y-auto custom-scrollbar"
          :style="{ backgroundColor: 'color-mix(in srgb, #0b1120, #1a2a3a 70%)' }">
          <div class="sticky top-0 backdrop-blur-md border-b border-white/10 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 z-50"
            :style="{ backgroundColor: 'color-mix(in srgb, #0a0f1a, #1e3a5f 100%)' }">
            <div>
              <h2 class="text-2xl font-black text-white uppercase tracking-tight">🏆 {{ t('gamification.widget.level') }} {{ levelInfo.level }}</h2>
              <p class="text-sm !text-white mt-2">
                {{ t(`gamification.widget.level_titles.${levelInfo.level}`, getLevelTitle(levelInfo.level)) }}
              </p>
            </div>
            <button type="button" class="px-4 py-2 rounded-xl border border-white/10 text-slate-200 hover:bg-white/5 transition"
              @click="showWidget = false">
             <font-awesome-icon icon="fa-solid fa-times" class="text-slate-400" />
            </button>
          </div>

          <div class="p-8 space-y-8 bg-gradient-to-r from-blue-100 to-white/90">
            <div class="bg-white/5 border border-white/90 rounded-2xl p-6 transition-all  group">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 rounded-full !bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  <span class="text-4xl">🏆</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm !text-white">{{ t('gamification.widget.xp') }}</p>
                  <p class="text-2xl font-bold text-white">{{ levelInfo.xp }} / {{ levelInfo.nextLevelXP }}</p>
                </div>
              </div>

              <div class="relative h-3 bg-white/40 rounded-full overflow-hidden">
                <div
                  class="absolute h-full bg-gradient-to-r from-blue-600 to-emerald-400 rounded-full transition-all duration-500"
                  :style="{ width: `${levelInfo.progress}%` }">
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer">
                  </div>
                </div>
              </div>

              <p class="text-xs !text-amber-500 mt-3">
                ⚡ {{ levelInfo.xpToNextLevel }} {{ t('gamification.widget.xp_to_next') }} {{ levelInfo.level + 1 }}
              </p>
            </div>

            <div v-if="badges.length > 0" class=" border border-white/90 rounded-2xl p-6 transition-all  group">
              <h3 class="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <font-awesome-icon icon="medal" class="!text-amber-400" />
                {{ t('gamification.widget.badges') }} ({{ badges.length }})
              </h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 ">
                <div v-for="badge in badges" :key="badge.id" class="bg-amber-50/30 rounded-xl border p-4 flex flex-col items-center  justify-center text-center border-amber-500/30  transition">
                  <span class="text-3xl text-emerald-100 mb-2">{{ getBadgeIcon(badge.name) }}</span>
                  <p class="text-xs !text-purple-500 font-semibold ">{{ badge.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGamification } from '../../composables/useGamification'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const showWidget = ref(false)
const { levelInfo, badges, getLevelTitle } = useGamification()

const getBadgeIcon = (badgeName: string) => {
  if (badgeName.includes('Curieux')) return '👀'
  if (badgeName.includes('Frontend')) return '⚛️'
  if (badgeName.includes('Explorateur')) return '🗺️'
  if (badgeName.includes('Lecteur')) return '📚'
  if (badgeName.includes('CV')) return '📄'
  if (badgeName.includes('Fullstack')) return '🚀'
  return '🏅'
}
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Animation pour le widget principal */
.widget-enter-active,
.widget-leave-active {
  transition: all 0.3s ease;
}

.widget-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.widget-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.widget-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.widget-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}


.badges-enter-active,
.badges-leave-active {
  transition: all 0.3s ease;
}

.badges-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.badges-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.badges-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.badges-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>