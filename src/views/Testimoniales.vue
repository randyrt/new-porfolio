<template>
  <Loading v-if="loading" :message="$t('testimonials.loading')" />
  <div v-else>
    <div class="p-4 w-full space-y-8 flex flex-col items-center justify-center">
      <AnimatedTitle :text="$t('testimonials.quote')" aos="fade-down" />
    </div>
    <div class="text-center max-w-2xl mx-auto mb-10 px-4 mt-4" data-aos="fade-up">
      <p class="text-lg italic text-gray-700 dark:text-gray-300">
        <span class="text-violet-800 text-lg">«</span>
        {{ $t('testimonials.description') }}
        <span class="text-violet-800 text-lg">»</span>
      </p>
    </div>
    <div class="w-full flex justify-between items-center p-16 gap-16 testimonials-container" data-aos="fade-up">
      <div class="w-1/2 h-[200px] card p-4 flex flex-col justify-center items-center testimonial-card">
        <p class="mb-3 text-center">{{ $t('testimonials.t1_body') }}</p>
        <h6 class="text-xs italic">{{ $t('testimonials.t1_author') }} <em>{{ $t('testimonials.t1_role') }}</em></h6>
      </div>

      <div class="w-1/2 h-[200px] card p-4 flex flex-col justify-center items-center testimonial-card">
        <p class="mb-3 text-center">{{ $t('testimonials.t2_body') }}
        </p>
        <h6 class="text-xs italic">{{ $t('testimonials.t2_author') }} <em>{{ $t('testimonials.t2_role') }}</em></h6>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'


const { t } = useI18n()

useHead({
  title: computed(() => t('testimonials.meta_title')),
  meta: [
    {
      name: 'Satisfacation',
      content: computed(() => t('testimonials.meta_desc'))
    }
  ]
})



const loading = ref<boolean>(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

</script>

<style scoped>
@media screen and (max-width: 748px) {
  .testimonials-container {
    flex-direction: column;
  }

  .testimonial-card {
    width: 100% !important;
    height: auto !important;
  }

  .testimonial-card p {
    font-size: 0.9rem;
  }

  .testimonial-card h6 {
    font-size: 0.8rem;
  }

  .text-xs,
  p {
    font-size: 10px !important;
    padding: 20px;
  }
}
</style>