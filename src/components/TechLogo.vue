<template>
  <div class="tech-logo-wrapper card" @click="haha">
    <div class="tech-logo-inner card p-1">
      <img
        :src="logo"
        :alt="name"
        class="tech-logo-img card"
        loading="lazy"
      />
      <div class="tech-logo-tooltip">
        <p class="tech-name">{{ name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'

const toast = useToast()

function haha() {
  toast.info("✨ " + name + " - En constante évolution !");
}

defineProps<{
  logo: string;     
  name: string;     
}>();
</script>

<style scoped>
.tech-logo-wrapper {
  display: inline-flex;
  position: relative;
  cursor: pointer;
}

.tech-logo-inner {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tech-logo-img {
  width: 70px;
  height: 70px;
  object-fit: contain;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.tech-logo-img:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.tech-logo-tooltip {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tech-logo-inner:hover .tech-logo-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.tech-name {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .tech-logo-img {
    width: 50px;
    height: 50px;
  }
  
  .tech-logo-tooltip {
    bottom: -35px;
    font-size: 0.65rem;
    padding: 0.2rem 0.6rem;
  }
}

@media screen and (max-width: 480px) {
  .tech-logo-img {
    width: 40px;
    height: 40px;
  }
}
</style>