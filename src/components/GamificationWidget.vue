<template>
  <div class="fixed bottom-1 right-22 z-50 group">
    <div
      class="relative backdrop-blur-md bg-sky-500 border border-white/30 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 w-14 h-14 flex items-center justify-center cursor-pointer hover:scale-110"
      @click="showWidget = !showWidget">
      <font-awesome-icon icon="trophy" class="text-xl text-white drop-shadow-md" />
      <span v-if="levelInfo.level > 1"
        class="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg ring-2 ring-white/80">
        {{ levelInfo.level }}
      </span>
    </div>

    <Transition name="widget" enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0 scale-95 -translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0" leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-2">
      <div v-if="showWidget"
        class="absolute -top-45 right-20 backdrop-blur-md bg-gradient-to-r from-emerald-600 to-emerald-700 border border-white/30 rounded-xl shadow-xl p-4 min-w-[280px]">

        <button @click.stop="showWidget = false"
          class="absolute -top-3 -right-49 w-6 h-6 rounded  backdrop-blur-sm border border-white/50 text-white text-xs flex items-center justify-center  hover:scale-110 transition-all duration-200 shadow-lg z-10">
          ✕
        </button>

        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <span class="text-xl">🏆</span>
            </div>
            <div>
              <p class="text-xs !text-white/70">{{ t('gamification.widget.level') }} {{ levelInfo.level }}</p>
              <p class="text-xs font-bold !text-black">
                {{ t(`gamification.widget.level_titles.${levelInfo.level}`, getLevelTitle(levelInfo.level)) }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs !text-white/70">XP</p>
            <p class="text-xs font-bold !text-cyan-300">{{ levelInfo.xp }} / {{ levelInfo.nextLevelXP }}</p>
          </div>
        </div>

        <div class="relative h-2 bg-white/10 rounded-full overflow-hidden mb-2">
          <div
            class="absolute h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-500"
            :style="{ width: `${levelInfo.progress}%` }">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer">
            </div>
          </div>
        </div>

        <p class="text-xs !text-white/70 mb-3">
          ⚡ {{ levelInfo.xpToNextLevel }} {{ t('gamification.widget.xp_to_next') }} {{ levelInfo.level + 1 }}
        </p>

        <Transition name="badges" enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2">
          <div v-if="badges.length > 0" class="border-t border-white/20 pt-3">
            <p class="text-xs font-semibold !text-white/80 mb-2">🎖️ Badges ({{ badges.length }})</p>
            <div class="flex flex-wrap gap-1.5">
              <div v-for="badge in badges.slice(0, 5)" :key="badge.id" class="group relative">
                <div
                  class="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center text-xs border border-white/20 hover:border-white/50 transition-all cursor-help">
                  {{ getBadgeIcon(badge.name) }}
                </div>
                <!-- <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                  <div
                    class="backdrop-blur-md bg-sky-900/90 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap">
                    {{ t(`gamification.badges.${badge.id}.name`, badge.name) }}
                  </div>
                </div> -->
              </div>
              <div v-if="badges.length > 5" class="text-xs text-white/50 flex items-center">
                +{{ badges.length - 5 }}
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGamification } from '../composables/useGamification'
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