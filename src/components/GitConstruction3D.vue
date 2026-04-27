<template>
  <div class="construction-3d h-64 bg-slate-950/80 rounded-xl border border-white/5 relative overflow-hidden group">
    <canvas ref="canvasRef" class="w-full h-full cursor-move"></canvas>

    <!-- Controls Overlay -->
    <div
      class="absolute bottom-4 left-4 right-4 flex items-center gap-4 bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
      <button @click="togglePlay"
        class="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all active:scale-95">
        <font-awesome-icon :icon="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'" />
      </button>

      <div class="flex-1 relative h-1.5 bg-white/10 rounded-full">
        <input type="range" v-model="playbackIndex" :max="commits.length - 1" min="0"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
        <div class="h-full bg-emerald-500 rounded-full transition-all"
          :style="{ width: `${(playbackIndex / (commits.length - 1)) * 100}%` }"></div>
      </div>

      <div class="text-[10px] font-mono text-white/60 tabular-nums">
        {{ playbackIndex + 1 }} / {{ commits.length }}
      </div>
    </div>

    <Transition name="fade">
      <div v-if="currentCommit" class="absolute top-4 right-4 text-right">
        <p class="text-[10px] text-white/40 uppercase tracking-widest mb-1">{{ $t('git_time_machine.current_mood') }}
        </p>
        <div class="flex items-center gap-2">
          <span class="text-xl">{{ getEmotionEmoji(currentCommit.emotion) }}</span>
          <span class="text-xs font-bold" :class="getEmotionTextColor(currentCommit.emotion)">{{
            currentCommit.emotion.toUpperCase() }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { AnalyzedCommit, EmotionalState } from '../composables/useGitTimeMachine'

const props = defineProps<{
  commits: AnalyzedCommit[]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const playbackIndex = ref(0)
const isPlaying = ref(false)
let animationId: number | null = null

const currentCommit = computed(() => props.commits[props.commits.length - 1 - playbackIndex.value])

// Canvas State
interface Particle {
  x: number
  y: number
  z: number
  targetX: number
  targetY: number
  targetZ: number
  color: string
  size: number
}

const particles = ref<Particle[]>([])

const getEmotionEmoji = (e: EmotionalState) => {
  if (e === 'flow') return '🎨'
  if (e === 'anxiety') return '⚡'
  if (e === 'satisfaction') return '💎'
  if (e === 'curiosity') return '🔭'
  return '🔧'
}

const getEmotionTextColor = (e: EmotionalState) => {
  if (e === 'flow') return 'text-emerald-400'
  if (e === 'anxiety') return 'text-red-400'
  if (e === 'satisfaction') return 'text-sky-400'
  if (e === 'curiosity') return 'text-amber-400'
  return 'text-slate-400'
}

const getEmotionColor = (e: EmotionalState) => {
  if (e === 'flow') return '#34d399'
  if (e === 'anxiety') return '#f87171'
  if (e === 'satisfaction') return '#38bdf8'
  if (e === 'curiosity') return '#fbbf24'
  return '#94a3b8'
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
  }
  window.addEventListener('resize', resize)
  resize()

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Isometric Projection Constants
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Sort particles by Z for depth
    const sortedParticles = [...particles.value].sort((a, b) => b.z - a.z)

    sortedParticles.forEach(p => {
      // Ease to target
      p.x += (p.targetX - p.x) * 0.1
      p.y += (p.targetY - p.y) * 0.1
      p.z += (p.targetZ - p.z) * 0.1

      // 3D to 2D
      const x2d = centerX + (p.x - p.y) * 0.8
      const y2d = centerY + (p.x + p.y) * 0.4 - p.z

      // Draw Block
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(x2d, y2d, p.size, 0, Math.PI * 2)
      ctx.fill()

      // Glow
      ctx.shadowBlur = 15
      ctx.shadowColor = p.color
    })

    animationId = requestAnimationFrame(render)
  }
  render()
}

const updateParticles = (index: number) => {
  const activeCommits = props.commits.slice(0, index + 1)

  // Match particles to commits
  particles.value = activeCommits.map((c, i) => {
    // Grid layout
    const rowSize = Math.ceil(Math.sqrt(activeCommits.length))
    const x = (i % rowSize) * 20 - (rowSize * 10)
    const y = Math.floor(i / rowSize) * 20 - (rowSize * 10)

    return {
      x: particles.value[i]?.x || 0,
      y: particles.value[i]?.y || 0,
      z: particles.value[i]?.z || 0,
      targetX: x,
      targetY: y,
      targetZ: c.emotion === 'anxiety' ? 50 : 10,
      color: getEmotionColor(c.emotion),
      size: c.emotion === 'satisfaction' ? 6 : 4
    }
  })
}

watch(playbackIndex, (newVal) => {
  updateParticles(newVal)
})

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) playLoop()
}

const playLoop = () => {
  if (!isPlaying.value) return
  if (playbackIndex.value < props.commits.length - 1) {
    playbackIndex.value++
    setTimeout(playLoop, 100)
  } else {
    isPlaying.value = false
  }
}

defineExpose({
  togglePlay
})

onMounted(() => {
  initCanvas()
  updateParticles(0)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
