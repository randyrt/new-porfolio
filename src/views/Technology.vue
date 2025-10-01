<template>
    <Loading v-if="loading" message="Technologies utilisées..." />
    <div v-else>
        <div class="card w-full p-4 flex justify-center">
            <span class="animated-gradient-text text-sm italic text-center font-semibold" data-aos="fade-right">
                « Explorons maintenant les technologies que j’utilise quotidiennement »
            </span>
        </div>

        <div class="flex gap-8 justify-center mt-6">
            <TechLogo logo="/src/assets/images/tecnos/css.png" name="GitHub" command="git status" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue';
import TechLogo from '../components/TechLogo.vue';

const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});

</script>

<style scoped></style>