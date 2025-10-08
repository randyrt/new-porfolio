<template>
    <div class="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <Loading v-if="loading" message="Me contacter..." class="z-10" />
        <h1 v-else class="text-white text-4xl font-bold z-10 relative text-center drop-shadow-lg">
            <Particles id="bubble-background" class="absolute inset-0 w-full h-full" :options="particlesOptions" />
            About Me
        </h1>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue"

const loading = ref(true)
onMounted(() => setTimeout(() => (loading.value = false), 1000))

const particlesOptions = {
    background: {
        color: { value: "transparent" }, 
    },
    fpsLimit: 60,
    particles: {
        number: { value: 50, density: { enable: true, area: 800 } },
        color: {
            value: [
                "#FFD700", // jaune (Gold)
                "#00FF7F", // vert (SpringGreen)
                "#FF69B4", // rose / pink (HotPink)
                "#87CEEB", // bleu ciel / sky (SkyBlue)
                "#9370DB", // violet (MediumPurple)
                "#FF4500", // orange vif (OrangeRed)
                "#00FFFF", // cyan / turquoise
            ],
        },
        shape: { type: "circle" },
        opacity: {
            value: 0.5,
            random: true,
        },
        size: {
            value: { min: 4, max: 12 },
            random: true,
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: "out",
        },
    },
    detectRetina: true,
}

</script>

<style scoped>
#bubble-background {
    z-index: 9999 !important;
}
</style>
