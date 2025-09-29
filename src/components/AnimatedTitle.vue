<template>
  <m-motion
    :initial="{ opacity: 0, y: -30 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }"
    :while-hover="{ scale: 1.05 }"
    class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black text-center md:text-left"
  >
    <slot />
  </m-motion>
</template>


<script setup lang="ts">
import { Motion } from "motion-v";
defineExpose({ 'm-motion': Motion });
</script>

