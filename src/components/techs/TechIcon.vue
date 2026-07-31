<template>
  <div class="tech-icon-item">
    <font-awesome-icon 
      :icon="icon" 
      class="tech-icon"
      :style="{ color: color }"
    />
    <span class="tech-name">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string | string[]
  name: string
  color?: string
}>()
</script>

<style scoped>
.tech-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  transition: all 0.3s ease;
  cursor: default;
}

.tech-icon-item:hover {
  transform: translateY(-3px) scale(1.05);
}

.tech-icon {
  font-size: 2.5rem;
  transition: all 0.3s ease;
}

.tech-icon-item:hover .tech-icon {
  transform: scale(1.1);
}

.tech-name {
  font-size: 0.7rem;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.05em;
}

.dark .tech-name {
  color: #d1d5db;
}
</style>