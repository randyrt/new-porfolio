<template>
  <div
    class="fixed bottom-1 left-76 z-[998] hidden md:flex items-center gap-3 group"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <!-- Discord Button -->
    <button
      @click="handleDiscordClick"
      class="discord-button relative w-14 h-14 bg-[#5865F2] hover:bg-[#4752C4] rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
      :aria-label="$t('discord.join_button')"
    >
      <font-awesome-icon 
        icon="fa-brands fa-discord" 
        class="text-white text-2xl"
      />
    </button>

    <!-- Tooltip (à droite du bouton) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-x-2"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-2"
    >
      <div
        v-if="showTooltip"
        class="px-4 py-2 bg-[#5865F2] text-white text-sm font-medium rounded-lg shadow-lg whitespace-nowrap"
      >
        {{ $t('discord.join_tooltip') }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

const { t } = useI18n()
const toast = useToast()
const showTooltip = ref(false)

const DISCORD_CHANNEL_URL = 'https://discord.com/channels/1418543850359754985/1554230864995426314'

const handleDiscordClick = () => {
  try {
    window.open(DISCORD_CHANNEL_URL, '_blank', 'noopener,noreferrer')
  } catch (error) {
    console.error('Erreur lors de l\'ouverture Discord/WhatsApp:', error)
    toast.error(t('discord.join_error'))
  }
}
</script>

<style scoped>
.discord-button {
  cursor: pointer;
  user-select: none;
}

.discord-button:active {
  transform: scale(0.95);
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Responsive */
@media (max-width: 768px) {
  .discord-button {
    display: none;
  }
}
</style>
