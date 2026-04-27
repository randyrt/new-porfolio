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
            <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
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
            <div class="w-full rounded-t-sm transition-all duration-300 relative z-20"
              :class="[
                selectedDay === day 
                  ? 'bg-emerald-400' 
                  : getEmotionColor(getDominantEmotion(dayCommits))
              ]"
              :style="{ height: `${Math.min(dayCommits.length * 10, 100)}%` }">
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
              <div class="flex items-center gap-2 mb-2">
                <font-awesome-icon icon="fa-solid fa-robot" class="text-emerald-500 text-xl" />
                <span class="text-[10px] font-mono font-black py-0.5 px-1.5 bg-emerald-500 text-white rounded">{{
                  $t('git_time_machine.ghost_ai') }}</span>
                <span class="text-[10px] text-white/30 uppercase tracking-widest">{{
                  $t('git_time_machine.analyst_engine') }}</span>
              </div>
              <p class="text-indigo-100/90 text-sm leading-relaxed" v-if="selectedDaySummary">
                "{{ selectedDaySummary }}"
              </p>
              <p class="text-indigo-100/50 text-sm italic leading-relaxed" v-else>
                "{{ $t('git_time_machine.hover_prompt') }}"
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
          <button @click="triggerReplay"
            class="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
            <font-awesome-icon icon="fa-solid fa-play" />
            {{ $t('git_time_machine.replay_btn') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
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

const selectedDaySummary = computed(() => {
  if (!selectedDay.value) return null
  const dayCommits = timeGroups.value[selectedDay.value]
  if (!dayCommits) return null

  const emotion = getDominantEmotion(dayCommits)
  const count = dayCommits.length

  const summaries: Record<EmotionalState, string[]> = {
    flow: [
      "Le code coulait tout seul ce jour-là. Une productivité impressionnante, presque artistique.",
      "C'était une journée de génie. Chaque commit était un coup de pinceau parfait.",
      "L'état de Flow était total. Vous étiez imbattable sur cette session."
    ],
    anxiety: [
      "Une session tardive marquée par une lutte intense. Entre corrections de bugs et fatigue, le combat était rude.",
      "Beaucoup de petits commits rapides... L'urgence se ressent dans l'historique.",
      "L'anxiété du bug récalcitrant. Vous n'avez rien lâché, même si l'heure était indue."
    ],
    curiosity: [
      "Exploration de nouvelles contrées. L'innovation était le moteur de cette journée.",
      "Découverte et implémentation. Un vent de fraîcheur sur le repository.",
      "Curiosité insatiable. Vous testiez de nouvelles approches avec succès."
    ],
    satisfaction: [
      "Le sentiment du devoir accompli. De gros pans de code enfin stabilisés.",
      "Victoire ! Les fonctionnalités majeures sont là. Une journée de célébration silencieuse.",
      "Satisfaction pure. Le projet a franchi une étape cruciale aujourd'hui."
    ],
    maintenance: [
      "Nettoyage et rigueur. Un travail de fond nécessaire pour la survie du projet.",
      "Petites touches de perfectionnement. Le diable est dans les détails, et vous l'avez dompté.",
      "Maintenance sereine. On ajuste, on polit, on prépare le terrain."
    ]
  }

  const randomMsg = summaries[emotion][count % summaries[emotion].length]
  return `${selectedDay.value} : ${randomMsg} (${count} commits)`
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

const { t, locale } = useI18n()

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
</style>
