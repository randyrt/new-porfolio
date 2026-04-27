<template>
  <div
    class="git-time-machine mt-12 mb-12 p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden relative"
    data-aos="zoom-in">
    <!-- Decorations -->
    <div class="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>

    <div class="relative z-10">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <font-awesome-icon icon="fa-solid fa-hourglass-half" class="text-white text-xl animate-spin-slow" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-purple-500">
              {{ $t('git_time_machine.title') }}
            </h2>
            <p class="text-indigo-300/80 text-sm italic">{{ $t('git_time_machine.subtitle') }}</p>
          </div>
        </div>
        <div class="text-right hidden md:block">
          <p class="text-xs text-white/40 uppercase tracking-widest font-bold">{{ $t('git_time_machine.scanning') }}</p>
          <p class="text-xs text-emerald-400 font-mono tracking-tighter">{{ $t('git_time_machine.commits_found', {
            count: commits.length
          }) }}</p>
        </div>
      </div>

      <!-- Emotional Heatmap -->
      <div class="relative bg-slate-950/50 rounded-xl p-6 border border-white/5 mb-8">
        <div class="flex items-end gap-1 h-32 overflow-hidden px-2">
          <div v-for="(dayCommits, day) in timeGroups" :key="day"
            class="flex-1 min-w-[4px] h-full group relative cursor-pointer flex items-end"
            @mouseenter="selectedDay = day">
            <div class="w-full rounded-t-sm transition-all duration-300 relative z-20" :class="[
              selectedDay === day
                ? 'bg-emerald-400'
                : getEmotionColor(getDominantEmotion(dayCommits))
            ]" :style="{ height: `${Math.min(dayCommits.length * 10, 100)}%` }">
            </div>
            <!-- Tooltip -->
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
              <div class="bg-slate-900 border border-white/20 p-2 rounded-lg shadow-xl min-w-[120px]">
                <p class="text-[10px] text-white/50">{{ day }}</p>
                <p class="text-[12px] font-bold text-white">{{ dayCommits.length }} commits</p>
                <p class="text-[10px] italic text-indigo-300 capitalize">{{ getDominantEmotion(dayCommits) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-2 text-[10px] text-emerald-500/50 font-mono uppercase tracking-widest">
          <span>{{ $t('git_time_machine.present') }}</span>
          <span>{{ $t('git_time_machine.the_beginning') }}</span>
        </div>
      </div>

      <!-- AI Commentator / Persona -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div
            class="bg-gradient-to-br from-emerald-500/10 to-purple-emerald/10 rounded-xl p-6 border border-white/10 flex items-start gap-4 min-h-[160px]">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <div @click="$router.push('/chatbot')"
                  class="robot-smile cursor-pointer w-16 h-16 bg-gradient-to-br from-green-600 to-sky-800 rounded-xl flex items-center justify-center shadow-lg relative">
                  <font-awesome-icon icon="fa-solid fa-robot" class=" text-green-300 text-4xl relative  icon-delay" />

                  <font-awesome-icon icon="fa-solid fa-bolt"
                    class="absolute text-green-300 text-sm top-1 left-1/2 transform -translate-x-1/2 icon-delay" />


                  <div
                    class="absolute top-6 right-4.5 w-3 h-3 bg-green-800 rounded-full flex items-center justify-center icon-delay">
                    <div class="w-2.5 h-0.5 bg-green-400 rotate-45 absolute"></div>
                    <div class="w-2.5 h-0.5 bg-green-400 -rotate-45 absolute"></div>
                    <div class="absolute w-0.5 h-1 bg-green-300 -top-0.5"></div>
                  </div>
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-[10px] font-mono font-black py-0.5 px-1.5 bg-emerald-500 text-white rounded w-fit mb-1">{{
                      $t('git_time_machine.ghost_ai') }}</span>
                  <span class="text-[10px] text-white/30 uppercase tracking-widest">{{
                    $t('git_time_machine.analyst_engine') }}</span>
                </div>
              </div>
              <p class="!text-emerald-50 text-sm leading-relaxed font-mono typewriter-cursor">
                {{ displayedSummary }}
              </p>
            </div>
          </div>

          <GitConstruction3D ref="constructionRef" v-if="commits.length > 0" :commits="commits" />
        </div>

        <!-- 3D Replay / Stats Widget -->
        <div class="bg-slate-950/40 rounded-xl p-6 border border-white/5 flex flex-col justify-center">
          <div class="mb-4">
            <div class="flex justify-between mb-1">
              <span class="text-[10px] text-white/40 uppercase tracking-widest">{{ $t('git_time_machine.total_anxiety')
                }}</span>
              <span class="text-xs text-red-400">{{ anxietyPercent }}%</span>
            </div>
            <div class="h-1 bg-white/5 rounded-full overflow-hidden">
              <div class="h-full bg-red-400 transition-all duration-1000" :style="{ width: `${anxietyPercent}%` }">
              </div>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-[10px] text-white/40 uppercase tracking-widest">{{ $t('git_time_machine.pure_flow')
                }}</span>
              <span class="text-xs text-emerald-400">{{ flowPercent }}%</span>
            </div>
            <div class="h-1 bg-white/5 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-400 transition-all duration-1000" :style="{ width: `${flowPercent}%` }">
              </div>
            </div>
          </div>
          <button @click="triggerReplay" class="mt-6 btn-violet btn-effect-5">
            <font-awesome-icon icon="fa-solid fa-play" />
            {{ $t('git_time_machine.replay_btn') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, tm, locale } = useI18n()
import { useGitTimeMachine, EmotionalState, AnalyzedCommit } from '../composables/useGitTimeMachine'
import GitConstruction3D from './GitConstruction3D.vue'

const { commits, loading, error, fetchHistory, timeGroups } = useGitTimeMachine()
const selectedDay = ref<string | null>(null)
const constructionRef = ref<any>(null)

const triggerReplay = () => {
  if (constructionRef.value) {
    constructionRef.value.togglePlay()
  }
}

const getDominantEmotion = (dayCommits: AnalyzedCommit[]): EmotionalState => {
  const counts: Record<string, number> = {}
  dayCommits.forEach(c => {
    counts[c.emotion] = (counts[c.emotion] || 0) + 1
  })
  return Object.entries(counts).sort(([, a], [, b]) => b - a)[0][0] as EmotionalState
}

const getEmotionColor = (emotion: EmotionalState): string => {
  const colors: Record<EmotionalState, string> = {
    flow: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]',
    anxiety: 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.3)]',
    satisfaction: 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.3)]',
    curiosity: 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)]',
    maintenance: 'bg-slate-400 shadow-[0_0_10px_rgba(148,163,184,0.3)]'
  }
  return colors[emotion] || 'bg-white'
}

const displayedSummary = ref('')
let typingInterval: any = null

const startTyping = (text: string) => {
  if (typingInterval) clearInterval(typingInterval)
  displayedSummary.value = ''
  let i = 0
  typingInterval = setInterval(() => {
    if (i < text.length) {
      displayedSummary.value += text.charAt(i)
      i++
    } else {
      clearInterval(typingInterval)
    }
  }, 20)
}

const selectedDaySummary = computed(() => {
  if (!selectedDay.value) return null
  const dayCommits = timeGroups.value[selectedDay.value]
  if (!dayCommits) return null

  const emotion = getDominantEmotion(dayCommits)
  const count = dayCommits.length

  const emotionalSummaries = tm('git_time_machine.summaries') as Record<EmotionalState, string[]>
  const msgList = emotionalSummaries[emotion] || []
  const randomMsg = msgList[count % msgList.length] || ''

  const formattedDate = new Date(selectedDay.value).toLocaleDateString(locale.value, { day: '2-digit', month: 'short' })
  return `${formattedDate} : ${randomMsg} (${t('git_time_machine.commits_count', { count })})`
})

watch(selectedDaySummary, (newVal) => {
  if (newVal) {
    startTyping(`"${newVal}"`)
  } else {
    startTyping(`"${t('git_time_machine.hover_prompt')}"`)
  }
}, { immediate: true })

onUnmounted(() => {
  if (typingInterval) clearInterval(typingInterval)
})

const anxietyPercent = computed(() => {
  if (commits.value.length === 0) return 0
  const count = commits.value.filter(c => c.emotion === 'anxiety').length
  return Math.round((count / commits.value.length) * 100)
})

const flowPercent = computed(() => {
  if (commits.value.length === 0) return 0
  const count = commits.value.filter(c => c.emotion === 'flow').length
  return Math.round((count / commits.value.length) * 100)
})

const firstDate = computed(() => {
  if (commits.value.length === 0) return ''
  const date = new Date(Math.min(...commits.value.map(c => c.date.getTime())))
  return date.toLocaleDateString(locale.value, { day: '2-digit', month: 'short', year: 'numeric' })
})

const latestDate = computed(() => {
  if (commits.value.length === 0) return ''
  const date = new Date(Math.max(...commits.value.map(c => c.date.getTime())))
  return date.toLocaleDateString(locale.value, { day: '2-digit', month: 'short', year: 'numeric' })
})

onMounted(() => {
  fetchHistory()
})
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 3s linear infinite;
}

.typewriter-cursor::after {
  content: '|';
  animation: blink 1s step-end infinite;
}

@keyframes robot-smile {

  0%,
  100% {
    transform: scale(1);
    filter: brightness(1) drop-shadow(0 0 5px rgba(16, 185, 129, 0.4));
  }

  50% {
    transform: scale(1.05);
    filter: brightness(1.2) drop-shadow(0 0 15px rgba(16, 185, 129, 0.6));
  }
}

.robot-smile {
  animation: robot-smile 3s ease-in-out infinite;
}

@keyframes blink {

  from,
  to {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.git-time-machine {
  box-shadow: 0 0 50px -12px rgba(99, 102, 241, 0.25);
}

.glitch-text {
  animation: glitch 2s linear infinite;
  text-shadow: 2px 2px #ff00c1, -2px -2px #00fff9;
}

@keyframes glitch {
  0% {
    transform: translate(0);
  }

  20% {
    transform: translate(-2px, 2px);
  }

  40% {
    transform: translate(-2px, -2px);
  }

  60% {
    transform: translate(2px, 2px);
  }

  80% {
    transform: translate(2px, -2px);
  }

  100% {
    transform: translate(0);
  }
}

.icon-delay {
  animation: arcFall 1.3s cubic-bezier(0.5, 1.3, 0.4, 0.9) 0.3s forwards;
  opacity: 0;
}

@keyframes arcFall {
  0% {
    opacity: 0;
    transform: translate(-70px, -100px) rotate(-15deg) scale(0.5);
  }

  30% {
    opacity: 0.6;
    transform: translate(-45px, -70px) rotate(-5deg) scale(0.65);
  }

  55% {
    opacity: 0.85;
    transform: translate(-10px, -35px) rotate(10deg) scale(0.85);
  }

  75% {
    opacity: 0.95;
    transform: translate(15px, -5px) rotate(18deg) scale(1.0);
  }

  90% {
    transform: translate(5px, 3px) rotate(3deg) scale(1.03);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
}
</style>
