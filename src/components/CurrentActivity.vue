<template>
  <div class="current-activity p-2 mb-2 rounded-lg border-1 border-purple-200">
    <div class="flex items-center gap-2">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
      </span>
      <span class="text-xs font-medium text-purple-600 dark:text-purple-400">{{ $t('currentActivity.now') }}</span>
    </div>
    <p class="mt-1 text-xs !text-gray-400 dark:text-gray-400">{{ currentActivity }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
    
const activities = computed(() => [
  t('currentActivity.activities.0'),
  t('currentActivity.activities.1'),
  t('currentActivity.activities.2'),
  t('currentActivity.activities.3'),
  t('currentActivity.activities.4'),
  t('currentActivity.activities.5'),
  t('currentActivity.activities.6'),
  t('currentActivity.activities.7')
])

const currentActivity = ref(activities.value[0])
let index = 0

onMounted(() => {
  setInterval(() => {
    index = (index + 1) % activities.value.length
    currentActivity.value = activities.value[index]
  }, 10000) 
})
</script>