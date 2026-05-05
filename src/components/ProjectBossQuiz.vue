<template>
  <!--no-invert-modal-->
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-[5px]"
    :style="{ backgroundColor: 'color-mix(in srgb, var(--app-primary, #0f172a), transparent 90%)' }">
    <div class="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      data-aos="fade-in">

      <!-- Boss Header -->
      <div class="relative p-8 bg-gradient-to-br from-purple-900/50 to-slate-900 border border-white">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <div
              class="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center shadow-lg shadow-red-500/20">
              <font-awesome-icon icon="fa-solid fa-skull" class="text-white text-3xl animate-pulse" />
            </div>
            <div>
              <h2 class="text-3xl font-black text-white uppercase tracking-tighter">BOSS: {{ projectTitle }}</h2>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[10px] bg-red-500 text-white font-bold px-2 py-0.5 rounded uppercase">{{
                  $t('quiz.danger_level') }}</span>
                <span class="text-xs text-slate-400 font-mono">{{ $t('quiz.tech_trial') }}</span>
              </div>
            </div>
          </div>
          <button @click="close" class="p-2 hover:bg-white/5 rounded-full transition-colors">
            <font-awesome-icon icon="fa-solid fa-times" class="text-slate-400" />
          </button>
        </div>

        <!-- Progress / HP Bar -->
        <div class="space-y-2">
          <div class="flex justify-between text-[10px] font-mono text-white/60">
            <span>{{ $t('quiz.boss_hp') }}</span>
            <span>{{ hp }} / 100</span>
          </div>
          <div class="h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5 p-0.5">
            <div
              class="h-full bg-gradient-to-r from-red-600 via-purple-500 to-blue-400 transition-all duration-500 rounded-full"
              :style="{ width: `${hp}%` }"></div>
          </div>
        </div>
      </div>

      <!-- Quiz Content -->
      <div class="bg-gradient-to-r from-blue-100 to-white/90 p-8">
        <div v-if="!isCompleted" class="space-y-8">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-purple-400 font-bold border border-white/10">
                {{ currentQuestionIndex + 1 }}
              </span>
              <p class="text-xl !text-purple-500 font-medium leading-tight">
                {{ currentQuestion.question }}
              </p>
            </div>

            <div class="grid grid-cols-1 gap-3 mt-6">
              <button v-for="(option, idx) in currentQuestion.options" :key="idx" @click="checkAnswer(idx)"
                class="group text-emerald-100 relative flex items-center bg-white/25 p-4 rounded-xl border border-white/25  hover:bg-white/[0.05] hover:border-purple-500/50 transition-all text-left overflow-hidden">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 transition-all">
                </div>
                <span
                  class="w-6 h-6 rounded-md bg-white/50 flex items-center justify-center text-[10px] font-bold text-emerald-300 mr-4 group-hover:text-purple-400 group-hover:bg-purple-500/50 transition-colors">
                  {{ String.fromCharCode(65 + idx) }}
                </span>
                <span class="text-white group-hover:text-white transition-colors">{{ option }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Success/Failure Screen -->
        <div v-else class="text-center py-8 space-y-6 animate-in fade-in zoom-in duration-500">
          <div
            class="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
            <font-awesome-icon icon="fa-solid fa-trophy" class="text-emerald-400 text-4xl" />
          </div>
          <div>
            <h3 class="text-2xl font-bold !text-white mb-2">{{ $t('quiz.victory') }}</h3>
            <p class="!text-purple-400">{{ $t('quiz.boss_defeated_desc', { project: projectTitle }) }}</p>
          </div>
          <div class="flex items-center justify-center gap-4">
            <div class="text-center">
              <p class="text-[10px] !text-white/90 uppercase tracking-widest">{{ $t('quiz.reward') }}</p>
              <p class="!text-amber-500 font-bold">+200 XP</p>
            </div>
          </div>
          <button @click="finalize"
            class="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all">
            {{ $t('quiz.collect_rewards') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGamification } from '../composables/useGamification'
import { useToast } from 'vue-toastification'

const { t } = useI18n()
const toast = useToast()
const { defeatBoss } = useGamification()

const props = defineProps<{
  isOpen: boolean
  projectId: string
  projectTitle: string
  questions: Array<{
    question: string
    options: string[]
    answer: number
  }>
}>()

const emit = defineEmits(['close', 'defeated'])

const currentQuestionIndex = ref(0)
const hp = ref(100)
const isCompleted = ref(false)

const currentQuestion = computed(() => props.questions[currentQuestionIndex.value])

function checkAnswer(index: number) {
  if (index === props.questions[currentQuestionIndex.value].answer) {
    // Correct answer
    hp.value -= Math.ceil(100 / props.questions.length)
    if (hp.value <= 1) hp.value = 0

    if (currentQuestionIndex.value < props.questions.length - 1) {
      currentQuestionIndex.value++
      toast.success(t('quiz.correct'))
    } else {
      isCompleted.value = true
      toast.success(t('quiz.boss_slain'))
    }
  } else {
    // Wrong answer
    toast.error(t('quiz.wrong'))
    // Potentially reset or penalize
  }
}

function finalize() {
  defeatBoss(props.projectId)
  emit('defeated', props.projectId)
  close()
}

function close() {
  currentQuestionIndex.value = 0
  hp.value = 100
  isCompleted.value = false
  emit('close')
}
</script>

<style scoped>
/* Custom animations or non-Tailwind styles can go here */
</style>
