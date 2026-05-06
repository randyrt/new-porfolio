<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center p-2 backdrop-blur-[5px]"
    :style="{ backgroundColor: 'color-mix(in srgb, #0a0f1a, transparent 40%)' }"
    role="dialog" aria-modal="true">
    <div class="relative w-full max-w-3xl bg-slate-100 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      <div class="relative border border-white/10 rounded-2xl shadow-2xl w-full max-h-[85vh] overflow-y-auto custom-scrollbar"
        :style="{ backgroundColor: 'color-mix(in srgb, #0b1120, #1a2a3a 70%)' }">
        <div class="sticky top-0 backdrop-blur-md border-b border-white/10 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 z-50"
          :style="{ backgroundColor: 'color-mix(in srgb, #0a0f1a, #1e3a5f 100%)' }">
          <div>
            <h2 class="text-2xl font-black text-white uppercase tracking-tight">{{ t('tour.title') }}</h2>
            <p class="text-sm !text-amber-400 mt-2">{{ t('tour.description') }}</p>
          </div>
          <button type="button" class="px-4 py-2 rounded-xl border border-white/30 text-slate-200 bg-white/10 hover:bg-white/5 transition"
            @click="close">
            {{ t('tour.exit') }}
          </button>
        </div>

        <div class="p-4 space-y-8 bg-gradient-to-r from-blue-100 to-white/90">
          <div class="bg-white/5 border border-white/90 rounded-2xl transition-all  groupl p-6">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-white/95 text-xs font-semibold uppercase tracking-[0.2em]">
              {{ stepLabel }}
            </span>
            <p class="mt-4 !text-purple-500 leading-7">{{ currentMessage }}</p>
          </div>

          <div>
            <div class="flex justify-center items-center gap-2">
              <button v-for="(step, idx) in steps" :key="step.key"
                @click="goTo(idx)"
                :class="['min-w-[40px] min-h-[40px] rounded-full border transition-all duration-200', idx === currentStep ? 'bg-sky-400 border-transparent text-slate-950' : 'bg-slate-800 border-white/10 text-slate-200']">
                {{ idx + 1 }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { t } = useI18n()
const router = useRouter()
const currentStep = ref(0)

const steps = [
  { key: 'tour.steps.intro', path: '/' },
  { key: 'tour.steps.step1', path: '/' },
  { key: 'tour.steps.step2', path: '/skills' },
  { key: 'tour.steps.step3', path: '/projects' },
  { key: 'tour.steps.step4', path: '/contact' },
]

const currentMessage = computed(() => t(steps[currentStep.value].key))
const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value === steps.length - 1)
const stepLabel = computed(() => t('tour.stepIndicator', { step: currentStep.value + 1, total: steps.length }))
const nextLabel = computed(() => (isLastStep.value ? t('tour.exit') : t('nav.next')))

const navigateToCurrentStep = () => {
  const nextPath = steps[currentStep.value]?.path
  if (nextPath) {
    router.push(nextPath)
  }
}

const goTo = (idx: number) => {
  currentStep.value = idx
}

const prev = () => {
  if (!isFirstStep.value) {
    currentStep.value -= 1
  }
}

const next = () => {
  if (isLastStep.value) {
    close()
  } else {
    currentStep.value += 1
  }
}

const close = () => {
  emit('close')
}

watch(currentStep, () => {
  navigateToCurrentStep()
})

onMounted(() => {
  navigateToCurrentStep()
})
</script>
