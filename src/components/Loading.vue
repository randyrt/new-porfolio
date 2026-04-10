<template>
  <div class="h-screen loading-container">
    <div class="crystal-cube">
      <div class="cube-face front">
        <font-awesome-icon icon="fab fa-vuejs" class="cube-icon" />
      </div>
      <div class="cube-face back">
        <font-awesome-icon icon="fab fa-vuejs" class="cube-icon" />
      </div>
      <div class="cube-face right">
        <font-awesome-icon icon="fab fa-vuejs" class="cube-icon" />
      </div>
      <div class="cube-face left">
        <font-awesome-icon icon="fab fa-vuejs" class="cube-icon" />
      </div>
      <div class="cube-face top">
        <font-awesome-icon icon="fab fa-vuejs" class="cube-icon" />
      </div>
      <div class="cube-face bottom">
        <font-awesome-icon icon="fab fa-vuejs" class="cube-icon" />
      </div>
    </div>
    <p class="text-sm text-violet-400 font-semibold mt-6" v-if="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'Loading',
  props: {
    message: {
      type: String as PropType<string>,
      default: 'Chargement...'
    }
  }
});
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}

.crystal-cube {
  position: relative;
  width: 80px;
  height: 80px;
  transform-style: preserve-3d;
  animation: rotate 3s ease-in-out infinite;
}

.cube-face {
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(217, 70, 239, 0.2));
  border: 1.5px solid rgba(168, 85, 247, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.cube-icon {
  font-size: 32px;
  color: rgba(10, 240, 86, 0.979);
  animation: pulse-icon 2s ease-in-out infinite;
}

.front  { transform: translateZ(40px); }
.back   { transform: translateZ(-40px) rotateY(180deg); }
.right  { transform: translateX(40px) rotateY(90deg); }
.left   { transform: translateX(-40px) rotateY(-90deg); }
.top    { transform: translateY(-40px) rotateX(90deg); }
.bottom { transform: translateY(40px) rotateX(-90deg); }

@keyframes rotate {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  25% { transform: rotateX(90deg) rotateY(90deg); }
  50% { transform: rotateX(180deg) rotateY(180deg); }
  75% { transform: rotateX(270deg) rotateY(270deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

@keyframes pulse-icon {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
    color: rgba(10, 240, 86, 0.979);
  }
}
</style>