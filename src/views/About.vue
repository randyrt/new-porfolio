<template>
  <Loading v-if="loading" :message="$t('about.loading')" />
  <div v-else class="p-4 w-full space-y-8 flex flex-col items-center justify-center">
    <AnimatedTitle :text="$t('about.quote')" aos="fade-down" />
  </div>
  <div class="p-4 w-full space-y-12 flex flex-col items-center justify-center max-w-4xl mx-auto">
    <section class="grid md:grid-cols-3 gap-6 mt-16" data-aos="fade-up">
      <div v-for="value in values" :key="value.title" class="text-center p-4">
        <div class="text-6xl mb-2">{{ value.icon }}</div>
        <h3 class="font-bold">{{ value.title }}</h3>
        <p class="text-sm text-gray-500">{{ value.description }}</p>
      </div>
    </section>
    <section class="stats-section flex flex-wrap justify-center gap-8 py-8">
      <div v-for="stat in stats" :key="stat.labelKey" class="text-center">
        <div class="text-6xl font-bold text-violet-600">
          {{ stat.displayValue }}{{ stat.suffix }}
        </div>
        <div class="text-sm text-gray-500">{{ $t(stat.labelKey) }}</div>
      </div>
    </section>

    <div class="card p-2">
      <div class="p-2">
        <div class="flex items-center justify-between gap-3">
          <p class="text-gray-700 text-sm flex-1">{{ $t('about.curious') }}
            <span class="font-medium text-gray-800">{{ $t('about.discover_arch') }}</span>
          </p>
          <button @click="perfomanceTest" class="btn-violet inline-block text-center btn-effect-5"
            :aria-label="$t('about.view_perf')">
            <font-awesome-icon :icon="['fas', 'chart-line']" />
            <span class="text-sm">{{ $t('about.explore') }}</span>
          </button>
        </div>
      </div>

      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showTechDetails"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            @click.self="showTechDetails = false">
            <div
              class="bg-white max-w-4xl w-full max-h-[80vh] rounded-overflow overflow-y-auto transition-all duration-300">
              <div class="sticky top-0 bg-white  border-b p-4 flex justify-between items-center">
                <h3 class="text-xl font-bold flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'tools']" class="text-violet-600" />
                  <span class="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    {{ $t('about.tech_stack') }}
                  </span>
                </h3>
                <button @click="showTechDetails = false"
                  class="text-white bg-violet-500 px-3 py-1 rounded hover:bg-violet-400 transition-colors">
                  {{ $t('about.close') }}
                </button>
              </div>

              <div class="p-6 space-y-6">
                <!-- Vue.js 3 -->
                <div class="border-l-4 border-green-500 pl-4">
                  <h4 class="font-bold text-lg flex items-center gap-2">
                    <font-awesome-icon :icon="['fab', 'vuejs']" class="text-green-600" />
                    <span>Vue.js 3 - Composition API</span>
                  </h4>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-center">
                    <span class="text-sm font-mono card rounded px-2 py-1">
                      <font-awesome-icon :icon="['fas', 'code']" class="mr-1 text-xs" /> ref() / reactive()
                    </span>
                    <span class="text-sm font-mono card rounded px-2 py-1">
                      <font-awesome-icon :icon="['fas', 'chart-line']" class="mr-1 text-xs" /> computed()
                    </span>
                    <span class="text-sm font-mono card rounded px-2 py-1">
                      <font-awesome-icon :icon="['fas', 'eye']" class="mr-1 text-xs" /> watch()
                    </span>
                    <span class="text-sm font-mono card rounded px-2 py-1">
                      <font-awesome-icon :icon="['fas', 'sync']" class="mr-1 text-xs" /> {{ $t('about.vue_lifecycle') }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mt-2">{{ $t('about.vue_desc') }}</p>
                </div>

                <!-- TypeScript -->
                <div class="border-l-4 border-blue-500 pl-4">
                  <h4 class="font-bold text-lg flex items-center gap-2">
                    <span class="text-xs text-blue-700 px-1">TS</span>
                    <span>{{ $t('about.ts_strict') }}</span>
                  </h4>
                  <div class="bg-gray-900 text-green-400 p-3 rounded-md text-xs font-mono mt-2">
                    <pre>type Event = {
  id: number
  title: string
  participants: number
  maxParticipants: number
  status: 'ouvert' | 'complet'
}

const registerToEvent = (event: Event): boolean => { ... }</pre>
                  </div>
                  <p class="text-sm text-gray-600 mt-2">{{ $t('about.ts_desc') }}</p>
                </div>

                <!-- Tests & Qualité -->
                <div class="border-l-4 border-purple-500 pl-4">
                  <h4 class="font-bold text-lg flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'vial']" class="text-purple-600" />
                    <span>{{ $t('about.tests_quality') }}</span>
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div class="card p-3 rounded-md flex items-start gap-2">
                      <font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-500 mt-0.5" />
                      <div>
                        <span class="font-mono text-sm font-medium">Vitest</span>
                        <p class="text-xs text-gray-600">{{ $t('about.tests_unit') }}</p>
                      </div>
                    </div>
                    <div class="card p-3 rounded-md flex items-start gap-2">
                      <font-awesome-icon :icon="['fas', 'flask']" class="text-purple-500 mt-0.5" />
                      <div>
                        <span class="font-mono text-sm font-medium">Vue Test Utils</span>
                        <p class="text-xs text-gray-600">{{ $t('about.tests_mount') }}</p>
                      </div>
                    </div>
                    <div class="card p-3 rounded-md flex items-start gap-2">
                      <font-awesome-icon :icon="['fas', 'chart-pie']" class="text-blue-500 mt-0.5" />
                      <div>
                        <span class="font-mono text-sm font-medium">Coverage</span>
                        <p class="text-xs text-gray-600">{{ $t('about.tests_coverage') }}</p>
                      </div>
                    </div>
                    <div class="card p-3 rounded-md flex items-start gap-2">
                      <font-awesome-icon :icon="['fas', 'shield-alt']" class="text-indigo-500 mt-0.5" />
                      <div>
                        <span class="font-mono text-sm font-medium">vue-tsc</span>
                        <p class="text-xs text-gray-600">{{ $t('about.tests_type') }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- CI/CD Pipeline -->
                <div class="border-l-4 border-black pl-4">
                  <h4 class="font-bold text-lg flex items-center gap-2">
                    <font-awesome-icon :icon="['fab', 'github']" class="text-gray-700" />
                    <span>{{ $t('about.ci_cd') }}</span>
                  </h4>
                  <div class="bg-gray-900 text-green-400 p-3 rounded-md text-xs font-mono mt-2">
                    <pre>name: Porfolio App
on: [push, pull_request]

jobs:
  build:
    steps:
       - type-check  # Vérification TypeScript
       - test        # Vitest (3 tests ✓)
       - build       # Build production
       - deploy      # Netlify auto-déploiement</pre>
                  </div>
                  <div class="flex flex-wrap gap-3 mt-2">
                    <span class="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Type-check ✓
                    </span>
                    <span class="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Tests ✓
                    </span>
                    <span class="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Build ✓
                    </span>
                    <span class="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Deploy ✓
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mt-2">{{ $t('about.ci_desc') }}</p>
                </div>

                <div class="relative pl-4">
                  <div class="absolute left-0 top-0 h-full w-1 custom-multi-gradient"></div>
                  <div class="card p-4 rounded-lg">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <font-awesome-icon :icon="['fas', 'check-double']" class="text-violet-600 text-xl mb-1" />
                        <div class="text-2xl font-bold text-violet-600">100%</div>
                        <div class="text-xs text-gray-600">{{ $t('about.ts_strict') }}</div>
                      </div>
                      <div>
                        <font-awesome-icon :icon="['fas', 'tachometer-alt']" class="text-violet-600 text-xl mb-1" />
                        <div class="text-2xl font-bold text-violet-600">&lt;2s</div>
                        <div class="text-xs text-gray-600">{{ $t('about.perf_time') }}</div>
                      </div>
                      <div>
                        <font-awesome-icon :icon="['fas', 'check-circle']" class="text-violet-600 text-xl mb-1" />
                        <div class="text-2xl font-bold text-violet-600">Push</div>
                        <div class="text-xs text-gray-600">{{ $t('about.pipeline') }}</div>
                      </div>
                      <div>
                        <font-awesome-icon :icon="['fas', 'cloud-upload-alt']" class="text-violet-600 text-xl mb-1" />
                        <div class="text-2xl font-bold text-violet-600">Auto</div>
                        <div class="text-xs text-gray-600">{{ $t('about.deploy') }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="text-center text-sm text-gray-500 border-t pt-4">
                  {{ $t('about.source_code') }}
                  <a href="https://github.com/randyrt/new-porfolio" target="_blank"
                    class="text-violet-600 hover:text-violet-400 transition-colors">{{ $t('about.view_github') }}</a>
                  <span class="text-violet-700">|</span>
                  {{ $t('about.web_quality') }} <a
                    href="https://pagespeed.web.dev/analysis/https-realporfolio-netlify-app/sc142ifq6r?form_factor=desktop"
                    target="_blank" class="text-violet-600 hover:text-violet-400 transition-colors">{{
                      $t('about.view_pagespeed') }}</a>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref, onMounted, onUnmounted, computed, watchEffect } from "vue"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

watchEffect(() => {
  useHead({
    title: t('about.meta_title'),
    meta: [
      {
        name: 'Conclusion',
        content: t('about.meta_desc')
      }
    ]
  })
})


const loading = ref(true)

const stats = ref([
  { value: 15, displayValue: 0, labelKey: "about.stats.projects", suffix: "+" },
  { value: 15, displayValue: 0, labelKey: "about.stats.clients", suffix: "+" },
  { value: 5, displayValue: 0, labelKey: "about.stats.years", suffix: "+" },
])

let animationFrame: number
let startTime: number | null = null
const duration = 2000

const values = computed(() => [
  { icon: "🚀", title: t('about.values.innovation_title'), description: t('about.values.innovation_desc') },
  { icon: "🤝", title: t('about.values.trust_title'), description: t('about.values.trust_desc') },
  { icon: "💡", title: t('about.values.creativity_title'), description: t('about.values.creativity_desc') }
])

const animateCounters = (timestamp: number) => {
  if (!startTime) startTime = timestamp
  const progress = Math.min((timestamp - startTime) / duration, 1)

  stats.value.forEach(stat => {
    stat.displayValue = Math.floor(progress * stat.value)
  })

  if (progress < 1) {
    animationFrame = requestAnimationFrame(animateCounters)
  } else {
    stats.value.forEach(stat => {
      stat.displayValue = stat.value
    })
  }
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    setTimeout(() => {
      animationFrame = requestAnimationFrame(animateCounters)
    }, 500)
  }, 1000)
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})



const showTechDetails = ref(false)

const perfomanceTest = () => {
  showTechDetails.value = true
}
</script>

<style scoped>
.rounded-overflow {
  border-radius: 0.5rem;
  overflow-y: auto;
  clip-path: inset(0 round 0.5rem);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95);
  opacity: 0;
}

.modal-enter-to .bg-white,
.modal-leave-from .bg-white {
  transform: scale(1);
  opacity: 1;
}

.custom-multi-gradient {
  background: linear-gradient(to bottom,
      #22c55e 0%,
      #22c55e 25%,
      #3b82f6 25%,
      #3b82f6 50%,
      #8b5cf6 50%,
      #8b5cf6 75%,
      #000000 75%,
      #000000 100%);
}
</style>