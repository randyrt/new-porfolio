<template>
  <Loading v-if="loading" :message="$t('webcup.loading')" />
  <div v-else class="p-4 w-full space-y-8 flex flex-col items-center justify-center">
    <AnimatedTitle :text="$t('webcup.quote')" aos="fade-down" />
  </div>

  <div class="flex justify-between p-8">
    <div class="min-h-screen p-8 space-y-16">
      <div class="w-full max-w-4xl mx-auto" data-aos="fade-right">
        <div class="card p-2 relative group">
          <div class="relative rounded-lg">
            <img src="/images/webcup24/webcup.jpg" alt="WebCup 2024" class="w-full transition-all duration-700 
               grayscale brightness-90 " loading="lazy" decoding="async" />

            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-3 px-4">
              <div class="text-center mb-2">
                <h3 class="text-white/80 text-sm sm:text-base font-semibold tracking-wider uppercase">
                  {{ $t('webcup.partner_title') }}
                </h3>
              </div>
              <div class="partners-scroll-container mx-auto">
                <div class="partners-track">
                  <div class="partners-logos">
                    <img src="/images/PO/Logo-Bocasay-2-1.webp" alt="Bocasay" class="partner-logo" loading="lazy" />
                    <img src="/images/PO/Vivetic-logo-1.webp" alt="Vivetic" class="partner-logo" loading="lazy" />
                    <img src="/images/PO/Yas-Madagascar-1.webp" alt="Yas Madagascar" class="partner-logo"
                      loading="lazy" />
                    <img src="/images/PO/Ingenosya-logo-1.webp" alt="Ingenosya" class="partner-logo" loading="lazy" />
                    <img src="/images/PO/Etech-1.webp" alt="Etech" class="partner-logo" loading="lazy" />
                    <img src="/images/PO/fulldigits-logo.webp" alt="FullDigits" class="partner-logo" loading="lazy" />
                  </div>
                  <div class="partners-logos">
                    <img src="/images/PO/Logo-Bocasay-2-1.webp" alt="Bocasay" class="partner-logo" loading="lazy" />
                    <img src="/images/PO/Vivetic-logo-1.webp" alt="Vivetic" class="partner-logo" loading="lazy" />
                    <img src="/images/PO/Yas-Madagascar-1.webp" alt="Yas Madagascar" class="partner-logo"
                      loading="lazy" />
                    <img src="/images/PO/Ingenosya-logo-1.webp" alt="Ingenosya" class="partner-logo" loading="lazy" />
                    <img src="/images/PO/Etech-1.webp" alt="Etech" class="partner-logo" loading="lazy" />
                    <img src="/images/PO/fulldigits-logo.webp" alt="FullDigits" class="partner-logo" loading="lazy" />
                  </div>
                </div>
              </div>
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

      <div class="w-full max-w-4xl flex justify-center p-4" data-aos="fade-left">
        <button class="btn-violet inline-block text-center decoration btn-effect-5" @click="webCup">
          {{ $t('webcup.more_info') }}
        </button>
      </div>
    </div>

    <div class="min-h-screen p-8 flex items-center" data-aos="fade-up">
      <div class="w-full max-w-4xl border card justify-center !p-8">
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
import { computed, ref, onMounted } from 'vue'
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
    colors: ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93", "#FF6B6B", "#F0A500", "#4ECDC4", "#C44D58", "#556270", "#C7F464", "#FF6B6B", "#C44D58", "#556270", "#C7F464"],
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
.partners-scroll-container {
  overflow: hidden;
  width: 70%;
  position: relative;
}

.partners-track {
  display: flex;
  animation: scrollPartners 20s linear infinite;
  gap: 2rem;
}

.partners-logos {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-shrink: 0;
}

.partner-logo {
  height: 40px;
  width: auto;
  max-width: 100px;
  object-fit: contain;
  opacity: 0.85;
  transition: all 0.3s ease;
  border-radius: 0.2rem;
}

.partner-logo:hover {
  opacity: 1;
  transform: scale(1.05);
}

@keyframes scrollPartners {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

/* Pause animation on hover */
.partners-scroll-container:hover .partners-track {
  animation-play-state: paused;
}

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

  .partner-logo {
    height: 25px;
    max-width: 60px;
  }

  .partners-logos {
    gap: 1rem;
  }
}
</style>