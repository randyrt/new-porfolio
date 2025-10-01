<template>
    <div class="flex flex-col items-center justify-center w-full p-4 mt-16">
        <h1 class="text-lg text-gray-400">{{ title }}</h1>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;     
}>();
</script>

<style scoped>

@media screen and (max-width: 748px) {
    h1 {
        font-size: 20px !important;
    }
}

</style>