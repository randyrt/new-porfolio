<template>
  <Loading v-if="loading" :message="$t('testimonials.loading')" />
  <div v-else>
    <div class="w-full flex flex-col items-center justify-center">
      <AnimatedTitle :text="$t('testimonials.quote')" aos="fade-down" />
    </div>
    <div class="text-center max-w-2xl mx-auto mb-10 px-4" data-aos="fade-up">
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
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          {{ $t('testimonials.t1_link') }}
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
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          {{ $t('testimonials.t2_link') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted } from 'vue'
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
  padding: 0.6rem 1.4rem;
  border-radius: 50px;
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 12px rgba(124, 58, 237, 0.3);
  letter-spacing: 0.3px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.testimonial-link:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 6px 24px rgba(124, 58, 237, 0.4);
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  border-color: rgba(255, 255, 255, 0.2);
}

.testimonial-link:active {
  transform: translateY(0px) scale(0.98);
}

.testimonial-link svg {
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.testimonial-link:hover svg {
  transform: scale(1.15) rotate(-2deg);
}

/* Responsive adjustments */
@media screen and (max-width: 748px) {
  .testimonials-container {
    flex-direction: column;
    padding: 1.5rem;
    gap: 2rem;
  }

  .testimonial-card {
    width: 100% !important;
    height: auto !important;
    padding: 1.5rem !important;
  }

  .testimonial-card p {
    font-size: 0.9rem;
  }

  .testimonial-card h6 {
    font-size: 0.8rem;
  }

  .testimonial-link {
    padding: 0.5rem 1.2rem;
    font-size: 0.75rem;
    width: auto;
    min-width: 140px;
  }

  .text-xs,
  p {
    font-size: 10px !important;
    padding: 20px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .testimonial-link {
    box-shadow: 0 2px 12px rgba(124, 58, 237, 0.2);
  }
  
  .testimonial-link:hover {
    box-shadow: 0 6px 24px rgba(124, 58, 237, 0.3);
  }
}

/* Small screens extra adjustments */
@media screen and (max-width: 480px) {
  .testimonial-link {
    padding: 0.4rem 1rem;
    font-size: 0.7rem;
    min-width: 120px;
  }
  
  .testimonial-link svg {
    width: 14px;
    height: 14px;
    margin-right: 0.4rem;
  }
}
</style>