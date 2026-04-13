<template>
  <Loading v-if="loading" :message="$t('home.loading')" />
  <div v-else class="p-4 flex flex-col">
    <AnimatedTitle :text="$t('home.quote')" aos="fade-down" />
    <div class="flex justify-between items-center flex-col md:flex-row min-h-screen">
      <div class="box p-2 view" data-aos="fade-down">
        <span class="borderline"></span>
        <img src="/images/me/randy.jpg" alt="Photo de Randy">
      </div>
      <div class="md:text-sm lg:text-base max-w-3xl pad border  card flex flex-col justify-between min-h-[500px]"
        data-aos="fade-up">
        <div class="p-4">
          <h1 class="text-2xl font-bold mt-6 mb-2 !text-violet-800">{{ $t('home.welcome') }}<span
              class="text-5xl ml-2 emoji"> 😎</span></h1>
          <p class="text-lg text-gray-700 mb-4" v-html="$t('home.p1')"></p>
          <p class="text-lg text-gray-700" v-html="$t('home.p2')"></p>
          <p class="text-lg text-gray-700 mt-4">
            {{ $t('home.p3_1') }}<span class="text-sky-700 cursor-pointer underline" @click="goToContact">{{
              $t('home.p3_contact') }}</span>{{ $t('home.p3_2') }}
          </p>
        </div>
        <div class="flex justify-center space-x-4 mt-2">
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

const { t, locale } = useI18n()

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

function downloadCV() {
  const link = document.createElement('a');
  link.href = "/images/cv/Randy_real_cv.pdf";
  link.download = "Randy_real_cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function viewCV() {
  window.open("/images/cv/Randy_real_cv.pdf", "_blank");
}

const goToContact = () => {
  router.push('/contact')
}


onMounted(() => {
  setTimeout(() => {
    loading.value = false
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
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  filter: grayscale(100%) brightness(0.9);
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

  .box {
    margin-left: 40px;
    margin-bottom: 20px;
  }

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
