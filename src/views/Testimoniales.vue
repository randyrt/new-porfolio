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
      <div class="w-1/2 h-auto min-h-[240px] card p-4 flex flex-col justify-center items-center gap-3 testimonial-card">
        <img
          src="/images/temoins/olivier_le_grand.png"
          alt="Olivier Le Grand"
          class="h-16 w-16 rounded-full object-cover border-2 border-violet-300 shadow-sm"
        />
        <p class="mb-1 text-center">{{ $t('testimonials.t1_body') }}</p>
        <h6 class="text-xs italic">{{ $t('testimonials.t1_author') }} <em>{{ $t('testimonials.t1_role') }}</em></h6>
        <a
          href="https://www.linkedin.com/in/olivier-legrand-412249126/"
          target="_blank"
          rel="noopener noreferrer"
          class="testimonial-link"
        >
          LinkedIn de Olivier Le Grand ↗
        </a>
      </div>

      <div class="w-1/2 h-auto min-h-[240px] card p-4 flex flex-col justify-center items-center gap-3 testimonial-card">
        <img
          src="/images/temoins/jean-pierre.png"
          alt="Jean-Pierre"
          class="h-16 w-16 rounded-full object-cover border-2 border-violet-300 shadow-sm"
        />
        <p class="mb-1 text-center">{{ $t('testimonials.t2_body') }}</p>
        <h6 class="text-xs italic">{{ $t('testimonials.t2_author') }} <em>{{ $t('testimonials.t2_role') }}</em></h6>
        <a
          href="https://www.digitalwallonia.be/fr/cartographie/management-consultance-partenaire/"
          target="_blank"
          rel="noopener noreferrer"
          class="testimonial-link"
        >
          Page Digital Wallonia ↗
        </a>
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
.testimonial-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(124, 58, 237, 0.25);
  background: rgba(124, 58, 237, 0.08);
  color: #6d28d9;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.testimonial-link:hover {
  transform: translateY(-1px);
  background: rgba(124, 58, 237, 0.16);
  border-color: rgba(124, 58, 237, 0.4);
}

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