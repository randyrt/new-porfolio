<template>
  <Loading v-if="loading" :message="$t('github.loading')" />
  <div v-else class="min-h-screen py-8 px-4">
    <div>
      <AnimatedTitle :text="$t('github.page_quote')" />
      <div class="text-center max-w-2xl mx-auto px-4 mt-4 mb-10" data-aos="fade-up">
        <p class="text-lg italic text-gray-700 dark:text-gray-300">
          <span class="text-violet-800 text-lg">«</span> {{ $t('github.page_description') }} <span
            class="text-violet-800 text-lg">»</span>
        </p>
      </div>

      <div data-aos="fade-up">
        <GitHubStats />
      </div>

      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up" data-aos-delay="200">
        <div class="card p-8 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold  mb-4 text-purple-800">
            {{ $t('github.about_title') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ $t('github.about_description') }}
          </p>
          <div class="flex items-center space-x-4 ">
            <a href="https://github.com/randyrt" target="_blank" class="btn-violet btn-effect-5 !no-underline">
              <font-awesome-icon :icon="['fab', 'github']" class="mr-2" />
              {{ $t('github.view_profile') }}
            </a>
          </div>
        </div>

        <div class="card p-8 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold  mb-4 text-purple-800">
            {{ $t('github.stats_info_title') }}
          </h3>
          <ul class="space-y-2">
            <li class="flex items-center">
              <font-awesome-icon icon="fa-solid fa-code-branch" class="text-blue-500 mr-2" />
              {{ $t('github.stats_info_repos') }}
            </li>
            <li class="flex items-center">
              <font-awesome-icon icon="fa-solid fa-users" class="text-green-500 mr-2" />
              {{ $t('github.stats_info_followers') }}
            </li>
            <li class="flex items-center">
              <font-awesome-icon icon="fa-solid fa-chart-line" class="text-purple-500 mr-2" />
              {{ $t('github.stats_info_languages') }}
            </li>
            <li class="flex items-center">
              <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-orange-500 mr-2" />
              {{ $t('github.stats_info_contributions') }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedTitle from '../components/AnimatedTitle.vue'
import Loading from '../components/Loading.vue'
import GitHubStats from '../components/GitHubStats.vue'

const { t } = useI18n()
const loading = ref(true)

useHead({
  title: computed(() => t('github.page_title')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('github.page_description'))
    }
  ]
})

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000);
})
</script>

<style scoped>
/* Additional styles if needed */
</style>