<template>
    <Loading v-if="loading" message="Témoignages..." />
    <div v-else>
        <div  class="p-4 w-full space-y-8 flex flex-col items-center justify-center">
            <AnimatedTitle text=" « Quelque témoignages venant de mes clients et employeurs » " aos="fade-down" />
        </div>

    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue'

const loading = ref<boolean>(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});

</script>