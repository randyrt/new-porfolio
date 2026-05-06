<template>
     <div class="fixed bottom-1 right-3 z-50 flex items-end gap-3">
         <button @click="showTechDetails = !showTechDetails"
            class="relative backdrop-blur-md bg-sky-500 !border !border-amber-300 rounded-2xl  shadow-xl hover:shadow-2xl transition-all duration-300 w-13 h-14 flex items-center justify-center cursor-pointer hover:scale-110">
            <font-awesome-icon :icon="['fas', 'tools']" class="text-xl text-amber-500 drop-shadow-md" />
        </button>
         <Teleport to="body">
        <Transition name="modal">
          <div v-if="showTechDetails"
            class="fixed inset-0 backdrop-blur-[5px] flex items-center justify-center p-4 z-[200] "
            :style="{ backgroundColor: 'color-mix(in srgb, #0a0f1a, transparent 40%)' }"
            @click.self="showTechDetails = false">
            <div
              class="relative w-full max-w-3xl bg-slate-100 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              data-aos="fade-in">
              <div
                class="relative border border-white/10 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto custom-scrollbar"
                :style="{ backgroundColor: 'color-mix(in srgb, #0b1120, #1a2a3a 70%)' }">
                <div class="sticky top-0 backdrop-blur-md p-6 flex justify-between items-center z-50"
                  :style="{ backgroundColor: 'color-mix(in srgb, #0a0f1a, #1e3a5f 100%)' }">
                  <h3 class="text-2xl font-black flex items-center gap-3">
                    <font-awesome-icon :icon="['fas', 'tools']" class="text-sky-500" />
                    <span
                      class="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent uppercase tracking-tight">
                      {{ $t('about.tech_stack') }}
                    </span>
                  </h3>
                  <button @click="showTechDetails = false" class="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <font-awesome-icon :icon="['fas', 'times']" class="text-slate-400" />
                  </button>
                </div>

                <div class="p-8 space-y-8 bg-gradient-to-r from-blue-100 to-white/90">
                  <!-- Vue.js 3 -->
                  <div
                    class="bg-white/35 border border-white/10 p-6 rounded-2xl border-l-4 border-l-emerald-500 transition-all hover:bg-white/[0.07]">
                    <h4 class="font-black text-xl text-white flex items-center gap-3 mb-4">
                      <font-awesome-icon :icon="['fab', 'vuejs']" class="text-emerald-500" />
                      <span>Vue.js 3 - Composition API</span>
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                      <span
                        class="text-xs font-mono bg-slate-800/60 text-slate-300 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-center gap-2">
                        <font-awesome-icon :icon="['fas', 'code']" class="text-sky-500" /> ref()
                      </span>
                      <span
                        class="text-xs font-mono bg-slate-800/60 text-slate-300 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-center gap-2">
                        <font-awesome-icon :icon="['fas', 'chart-line']" class="text-sky-500" /> computed()
                      </span>
                      <span
                        class="text-xs font-mono bg-slate-800/60 text-slate-300 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-center gap-2">
                        <font-awesome-icon :icon="['fas', 'eye']" class="text-sky-500" /> watch()
                      </span>
                      <span
                        class="text-xs font-mono bg-slate-800/60 text-slate-300 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-center gap-2">
                        <font-awesome-icon :icon="['fas', 'sync']" class="text-sky-500" /> Lifecycle
                      </span>
                    </div>
                    <p class="text-sm !text-purple-500 mt-4 leading-relaxed">{{ $t('about.vue_desc') }}</p>
                  </div>

                  <!-- TypeScript -->
                  <div
                    class="bg-white/35 border border-white/10 p-6 rounded-2xl border-l-4 border-l-blue-600 transition-all hover:bg-white/[0.07]">
                    <h4 class="font-black text-xl text-white flex items-center gap-3 mb-4">
                      <div class="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-[10px] font-bold">TS
                      </div>
                      <span>{{ $t('about.ts_strict') }}</span>
                    </h4>
                    <div
                      class="bg-black border border-white/10 text-emerald-400 p-4 rounded-xl text-xs font-mono mt-4 overflow-x-auto shadow-inner">
                      <pre>type Project = {
  id: string
  title: string
  difficulty: 'normal' | 'hard' | 'boss'
  isConquered: boolean
}

const defeatBoss = (id: string): void => { ... }</pre>
                    </div>
                    <p class="text-sm !text-purple-500 mt-4 leading-relaxed">{{ $t('about.ts_desc') }}</p>
                  </div>

                  <!-- Tests & Qualité -->
                  <div
                    class="bg-white/35 border border-white/10 p-6 rounded-2xl border-l-4 border-l-purple-500 transition-all hover:bg-white/[0.07]">
                    <h4 class="font-black text-xl text-white flex items-center gap-3 mb-4">
                      <font-awesome-icon :icon="['fas', 'vial']" class="text-purple-500" />
                      <span>{{ $t('about.tests_quality') }}</span>
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div
                        class="bg-slate-800/60 border border-white/10 p-4 rounded-xl flex items-start gap-4 group hover:border-purple-500/30 transition-colors">
                        <div class="p-2 bg-purple-500/10 rounded-lg">
                          <font-awesome-icon :icon="['fas', 'check-circle']" class="text-purple-400" />
                        </div>
                        <div>
                          <span class="font-bold text-slate-100 block">Vitest</span>
                          <p class="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{{ $t('about.tests_unit')
                          }}
                          </p>
                        </div>
                      </div>
                      <div
                        class="bg-slate-800/60 border border-white/10 p-4 rounded-xl flex items-start gap-4 group hover:border-blue-500/30 transition-colors">
                        <div class="p-2 bg-blue-500/10 rounded-lg">
                          <font-awesome-icon :icon="['fas', 'flask']" class="text-blue-400" />
                        </div>
                        <div>
                          <span class="font-bold text-slate-100 block">Vue Test Utils</span>
                          <p class="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{{ $t('about.tests_mount')
                          }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- CI/CD Pipeline -->
                  <div
                    class="bg-white/35 border border-white/10 p-6 rounded-2xl border-l-4 border-l-slate-500 transition-all hover:bg-white/[0.07]">
                    <h4 class="font-black text-xl text-white flex items-center gap-3 mb-4">
                      <font-awesome-icon :icon="['fab', 'github']" class="text-black" />
                      <span>{{ $t('about.ci_cd') }}</span>
                    </h4>
                    <div
                      class="bg-black  border border-white/10 !text-emerald-100 p-4 rounded-xl text-xs font-mono mt-4 shadow-inner">
                      <pre><span class="text-purple-400">jobs:</span>
  <span class="text-blue-400">deploy:</span>
    <span class="text-slate-500">steps:</span>
      - type-check <span class="text-emerald-500">✓</span>
      - unit-tests <span class="text-emerald-500">✓</span>
      - lighthouse <span class="text-emerald-500">✓</span>
      - netlify-push <span class="text-emerald-500">✓</span></pre>
                    </div>
                    <p class="text-sm !text-purple-500 mt-4 leading-relaxed">{{ $t('about.ci_desc') }}</p>
                  </div>

                  <!-- Summary Stats -->
                  <div
                    class="relative overflow-hidden p-6 rounded-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div class="absolute top-0 right-0 p-8 opacity-5">
                      <font-awesome-icon :icon="['fas', 'shield-virus']" class="text-8xl text-white" />
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
                      <div>
                        <div class="text-4xl font-black text-sky-400 mb-1">100%</div>
                        <div class="text-[10px] text-slate-500 uppercase tracking-widest">{{ $t('about.ts_strict') }}
                        </div>
                      </div>
                      <div>
                        <div class="text-4xl font-black text-blue-400 mb-1">&lt;2s</div>
                        <div class="text-[10px] text-slate-500 uppercase tracking-widest">{{ $t('about.perf_time') }}
                        </div>
                      </div>
                      <div>
                        <div class="text-4xl font-black text-emerald-400 mb-1">Push</div>
                        <div class="text-[10px] text-slate-500 uppercase tracking-widest">{{ $t('about.pipeline') }}
                        </div>
                      </div>
                      <div>
                        <div class="text-4xl font-black text-orange-400 mb-1">Auto</div>
                        <div class="text-[10px] text-slate-500 uppercase tracking-widest">{{ $t('about.deploy') }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="text-center text-xs text-slate-500 border-t border-white/80 pt-8 space-y-2">
                    <p>{{ $t('about.source_code') }}</p>
                    <div class="flex items-center justify-center gap-4">
                      <a href="https://github.com/randyrt/new-porfolio" target="_blank"
                        class="text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-2">
                        <font-awesome-icon :icon="['fab', 'github']" /> GitHub
                      </a>
                      <span class="text-white/10">|</span>
                      <a href="https://pagespeed.web.dev/analysis/https-realporfolio-netlify-app/sc142ifq6r?form_factor=desktop"
                        target="_blank"
                        class="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2">
                        <font-awesome-icon :icon="['fas', 'tachometer-alt']" /> PageSpeed
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const showDashboard = ref(false)
const showTechDetails = ref(false)
</script>