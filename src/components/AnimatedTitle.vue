<template>
  <div class="card w-full p-4 flex justify-center mb-4 this-div">
    <span 
      class="animated-gradient-text text-sm italic text-center font-semibold"
      :data-aos="aos"
    >
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  aos?: string   
}>()
</script>

<style scoped>
@media screen and (max-width: 748px) {
  span {
    font-size: 10px !important;
  }
}
</style>
