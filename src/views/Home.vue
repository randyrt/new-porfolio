<template>
  <Loading v-if="loading" :message="$t('home.loading')" />
  <div v-else class="p-4 flex flex-col">
    <AnimatedTitle :text="$t('home.quote')" aos="fade-down" />
    <div class="flex justify-around space-x-9 items-center flex-col md:flex-row min-h-screen ">
      <div class="relative group" data-aos="fade-down">
        <div class="absolute top-3.5 right-3 z-10">
          <div class="bg-sky-500 text-blue-500 text-xs px-2 py-1 rounded-lg shadow-lg animate-pulse">
            Code, Build, Deploy, Repeat.
          </div>
        </div>
        <div class="bg-white dark:bg-white rounded-lg p-2 shadow-lg">
          <img src="/images/me/me_working.png" alt="Randy's portrait" class="max-w-lg mx-auto" />
        </div>
      </div>
      <div class="md:text-sm lg:text-base max-w-3xl pad flex flex-col justify-between"
        data-aos="fade-up">
        <div class="mt-6">
          <h1 class="text-2xl font-bold mt-6 mb-2 !text-violet-800 transition-opacity duration-700" :class="{ 'opacity-100': contentVisible, 'opacity-0': !contentVisible }">{{ $t('home.welcome') }}<span
              class="text-5xl ml-2 text-sky-500 emoji"> 😎</span></h1>
          <p class="text-lg text-gray-700 mb-4 transition-all duration-700 delay-100" :class="{ 'opacity-100 translate-y-0': contentVisible, 'opacity-0 translate-y-3': !contentVisible }" v-html="$t('home.p1')"></p>
          <p class="text-lg text-gray-700 transition-all duration-700 delay-200" :class="{ 'opacity-100 translate-y-0': contentVisible, 'opacity-0 translate-y-3': !contentVisible }" v-html="$t('home.p2')"></p>
          <p class="text-lg text-gray-700 mt-4 transition-all duration-700 delay-300" :class="{ 'opacity-100 translate-y-0': contentVisible, 'opacity-0 translate-y-3': !contentVisible }">
            {{ $t('home.p3_1') }}<span class="text-sky-700 cursor-pointer underline" @click="goToContact">{{
              $t('home.p3_contact') }}</span>{{ $t('home.p3_2') }}
          </p>
        </div>
        <div class="flex justify-center space-x-4 mt-2 transition-all duration-700 delay-400" :class="{ 'opacity-100 translate-y-0': contentVisible, 'opacity-0 translate-y-3': !contentVisible }">
          <button class="btn-violet inline-block text-center btn-effect-5" @click="viewCV">
            {{ $t('home.view_cv') }}
          </button>
          <button class="btn-violet inline-block text-center btn-effect-5" @click="downloadCV">
            {{ $t('home.download_cv') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useGamification } from '../composables/useGamification'

const { t, locale } = useI18n()
const { trackCVDownload } = useGamification()

useHead({
  title: computed(() => t('home.meta_title')),
  meta: [
    {
      name: 'Bienvenu',
      content: computed(() => t('home.meta_desc'))
    }
  ]
})

const router = useRouter()
const loading = ref<boolean>(true)
const contentVisible = ref(false)

function downloadCV() {
  const link = document.createElement('a');
  link.href = "/images/cv/my_final_cv.pdf";
  link.download = "my_final_cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  trackCVDownload();
}

function viewCV() {
  window.open("/images/cv/my_final_cv.pdf", "_blank");
}

const goToContact = () => {
  router.push('/contact')
}


onMounted(() => {
  setTimeout(() => {
    loading.value = false
    setTimeout(() => {
      contentVisible.value = true
    }, 150)
  }, 1000);
});

</script>

<style scoped>
img {
  position: relative;
  width: 300px;
  height: 100%;
  object-fit: cover;
  width: 100%;
  border-radius: 10px;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* filter: grayscale(100%) brightness(0.9); */
}

@media screen and (max-width: 748px) {

  .flex {
    padding: 5px !important;
    width: 100%;
  }

  .pad {
    padding: 5px !important;
  }

  .decoration {
    font-size: 10px !important;
  }

  /* .box {
    margin-left: 40px;
    margin-bottom: 20px;
  } */

  p,
  span,
  boutton,
  h1 {
    font-size: 10px !important;
  }

  .click-me {
    animation: none;
  }
}
</style>
