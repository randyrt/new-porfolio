<template>
  <Loading v-if="loading" :message="$t('webcup.loading')" />
  <div v-else class="p-4 w-full space-y-8 flex flex-col items-center justify-center">
    <AnimatedTitle :text="$t('webcup.quote')" aos="fade-down" />
  </div>

  <div class="flex justify-between p-8">
    <div class="min-h-screen p-8 space-y-16">
      <div class="w-full max-w-4xl mx-auto" data-aos="fade-right">
        <div class="card p-3 sm:p-4 relative group overflow-hidden">

          <div
            class="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-lg transition-all duration-300 pointer-events-none z-10">
          </div>
          <div class="relative overflow-hidden rounded-lg">
            <img src="/images/webcup24/webcup.jpg" alt="WebCup 2024" class="w-full transition-all duration-700 
               group-hover:scale-105 
               group-hover:grayscale-0 
               grayscale brightness-90" loading="lazy" decoding="async" />
            <div
              class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            </div>
          </div>
          <div class="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
            <div
              class="w-28 sm:w-32 md:w-36 lg:w-40 bg-white rounded-lg shadow-lg p-1 transform transition-transform duration-300 hover:scale-105">
              <img alt="WebCup Logo" class="w-full h-auto" src="/webCup_logo.png" loading="lazy" decoding="async" />
            </div>
          </div>

        </div>
      </div>
      <div class="w-full card p-4 flex justify-center" data-aos="fade-down">
        <p class="text-lg text-gray-700">
          {{ $t('webcup.award_by') }}
          <span class="ml-1" aria-label="https://www.fulldigits.com">
            <a href="https://www.fulldigits.com" class="fullDigits" target="_blank">FullDigits</a>
          </span>
        </p>
      </div>
      <div class="w-full max-w-4xl flex justify-center p-4 " data-aos="fade-left">
        <button class="btn-violet inline-block text-center decoration btn-effect-5" @click="webCup">
          {{ $t('webcup.more_info') }}
        </button>
      </div>
    </div>
    <div class="min-h-screen p-8 flex items-center">
      <div class=" w-full max-w-4xl border card justify-center !p-8">
        <h1 class="text-2xl font-bold mt-0 mb-2 !text-violet-800">{{ $t('webcup.title') }}<span
            class="text-5xl emoji">🏆</span></h1>
        <p class="text-lg text-gray-700 mb-4">
          {{ $t('webcup.p1') }}
        </p>
        <p class="text-lg text-gray-700 mb-4">
          {{ $t('webcup.p2') }}
        </p>
        <p class="text-lg text-gray-700 mb-4">
          {{ $t('webcup.p3') }}
        </p>
        <p class="text-lg text-gray-700 mb-4">
          {{ $t('webcup.p4') }}
        </p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted, watchEffect } from 'vue'
import confetti from "canvas-confetti"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: computed(() => t('webcup.meta_title')),
  meta: [
    {
      name: 'Défis',
      content: computed(() => t('webcup.meta_desc'))
    }
  ]
})


const loading = ref<boolean>(true)

const launchConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"]
  })
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    launchConfetti()
  }, 1000)
})


function webCup() {
  window.open("https://24h.webcup.fr/madagascar", "_blank")
}

</script>

<style scoped>
@media screen and (max-width: 748px) {

  .min-h-screen {
    padding: 0 !important;
  }

  .flex.justify-between {
    flex-direction: column;
    padding: 1rem;
  }

  .flex.justify-between>div {
    min-height: auto;
    width: 100%;
    padding: 1rem;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .card {
    margin-bottom: 1.5rem;
  }

  .click-me {
    animation: none !important;
  }

  p,
  h1,
  button,
  span {
    font-size: 10px;
  }
}
</style>