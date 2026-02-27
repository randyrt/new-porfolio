<template>
  <Loading v-if="loading" message="À propos" />
  
  <div v-else class="p-4 w-full space-y-12 flex flex-col items-center justify-center max-w-4xl mx-auto">
     <AnimatedTitle text=" « Rien d'autre à dire, à part ceci » " aos="fade-down" />

    <section class="grid md:grid-cols-3 gap-6 mt-16" data-aos="fade-up">
      <div v-for="value in values" :key="value.title" class="text-center p-4">
        <div class="text-4xl mb-2">{{ value.icon }}</div>
        <h3 class="font-bold">{{ value.title }}</h3>
        <p class="text-sm text-gray-500">{{ value.description }}</p>
      </div>
    </section>

    <section class="stats-section flex flex-wrap justify-center gap-8 py-8">
      <div v-for="stat in stats" :key="stat.label" class="text-center">
        <div class="text-4xl font-bold text-violet-600">
          {{ stat.displayValue }}{{ stat.suffix }}
        </div>
        <div class="text-sm text-gray-500">{{ stat.label }}</div>
      </div>
    </section>
    
    <div class="card media p-4 w-max flex justify-center gap-6 mx-auto h-auto bg-white shadow-md rounded-lg"
      data-aos="fade-up">
      <font-awesome-icon :icon="['fab', 'github']" class="font-awesome cursor-pointer hover:text-violet-600 transition-colors" @click="openGithub" />
      <font-awesome-icon :icon="['fab', 'linkedin']" class="font-awesome cursor-pointer hover:text-violet-600 transition-colors" @click="openLinkeden" />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const loading = ref(true)


const stats = ref([
  { value: 15, displayValue: 0, label: "Projets réalisés", suffix: "+" },
  { value: 15, displayValue: 0, label: "Clients satisfaits", suffix: "+" },
  { value: 5, displayValue: 0, label: "Années d'expérience", suffix: "+" },
])

let animationFrame: number
let startTime: number | null = null
const duration = 2000


const values = [
  { icon: "🚀", title: "Innovation", description: "Toujours à la pointe de la technologie" },
  { icon: "🤝", title: "Confiance", description: "Relation transparente avec les clients" },
  { icon: "💡", title: "Créativité", description: "Des solutions uniques pour chaque projet" }
]

const animateCounters = (timestamp: number) => {
  if (!startTime) startTime = timestamp
  const progress = Math.min((timestamp - startTime) / duration, 1)
  
  stats.value.forEach(stat => {
    stat.displayValue = Math.floor(progress * stat.value)
  })
  
  if (progress < 1) {
    animationFrame = requestAnimationFrame(animateCounters)
  } else {
    stats.value.forEach(stat => {
      stat.displayValue = stat.value
    })
  }
}

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    setTimeout(() => {
      animationFrame = requestAnimationFrame(animateCounters)
    }, 500)
    
  }, 1000)
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

function openGithub() {
  window.open("https://github.com/randyrt", "_blank")
}

function openLinkeden() {
  window.open("https://www.linkedin.com/in/randy-andriantsiory-3a935828a", "_blank")
}
</script>

<style scoped>

</style>
