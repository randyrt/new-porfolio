<template>
  <div class="h-screen loading-container">
    <div class="crystal-cube">
      <div class="crystal-cube">
        <!-- Face avant - Vue.js -->
        <div class="cube-face front">
          <font-awesome-icon icon="fab fa-vuejs" class="cube-icon vue-icon" />
        </div>

        <!-- Face arrière - Laravel -->
        <div class="cube-face back">
          <font-awesome-icon icon="fab fa-laravel" class="cube-icon laravel-icon" />
        </div>

        <!-- Face droite - TypeScript -->
        <div class="cube-face right">
          <font-awesome-icon :icon="['fab', 'js']" class="cube-icon typescript-icon" />
        </div>

        <!-- Face gauche - github -->
        <div class="cube-face left">
          <font-awesome-icon :icon="['fab', 'github']" class="cube-icon github-icon" />
        </div>

        <!-- Face haut - Docker -->
        <div class="cube-face top">
          <font-awesome-icon :icon="['fas', 'code']" class="cube-icon docker-icon" />
        </div>

        <!-- Face bas - MySQL -->
        <div class="cube-face bottom">
          <font-awesome-icon :icon="['fas', 'database']" class="cube-icon mysql-icon" />
        </div>
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
  width: 70px;
  height: 70px;
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
  animation: pulse-icon 2s ease-in-out infinite;
}

.vue-icon {
  color: rgba(65, 184, 131, 0.9); 
}

.typescript-icon {
  color: rgba(244, 248, 9, 0.9); 
}

.docker-icon {
  color: rgba(0, 147, 221, 0.9); 
}

.mysql-icon {
  color: rgba(0, 117, 143, 0.9); 
}

.laravel-icon {
  color: rgba(255, 56, 56, 0.9); 
}

.github-icon {
  color: rgba(19, 3, 3, 0.9); 
}


.front {
  transform: translateZ(40px);
}

.back {
  transform: translateZ(-40px) rotateY(180deg);
}

.right {
  transform: translateX(40px) rotateY(90deg);
}

.left {
  transform: translateX(-40px) rotateY(-90deg);
}

.top {
  transform: translateY(-40px) rotateX(90deg);
}

.bottom {
  transform: translateY(40px) rotateX(-90deg);
}

@keyframes rotate {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }

  25% {
    transform: rotateX(90deg) rotateY(90deg);
  }

  50% {
    transform: rotateX(180deg) rotateY(180deg);
  }

  75% {
    transform: rotateX(270deg) rotateY(270deg);
  }

  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

@keyframes pulse-icon {

  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}
</style>