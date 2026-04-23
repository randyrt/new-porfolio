<template>
  <div class="current-activity min-h-16 w-xs py-1 px-4 rounded-lg border-1 border-emerald-200 mt-2 bg-transparent">
    <div class="flex items-center gap-2">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span class="text-xs font-medium text-emerald-600 dark:text-emerald-400">{{ $t('currentActivity.now') }}</span>
    </div>
    <p class="mt-1 text-xs !text-emerald-100 dark:text-gray-400">{{ currentActivity }}</p>
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