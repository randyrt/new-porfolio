<template>
  <Loading v-if="loading" :message="$t('contact.loading')" />
  <div v-else>
    <AnimatedTitle :text="$t('contact.quote')" aos="fade-down" />
    <div class="text-center max-w-2xl mx-auto mb-10 px-4 mt-4" data-aos="fade-up">
      <p class="text-lg italic text-gray-700 dark:text-gray-300">
        <span class="text-violet-800 text-lg">«</span>
        {{ $t('contact.p') }}
        <span class="text-violet-800 text-lg">»</span>
      </p>
    </div>
    <div class="w-full flex justify-center items-center p-16 gap-16 testimonials-container" data-aos="fade-up">
      <div class="contact-form card p-8 h-auto">
        <div class="form-group">
          <input type="text" v-model="form.name" required />
          <label class="text-gray-500 !font-semibold">{{ $t('contact.form_name') }}</label>
        </div>
        <div class="form-group">
          <input type="email" v-model="form.email" required />
          <label class="text-gray-500 !font-semibold">{{ $t('contact.form_email') }}</label>
        </div>
        <div class="form-group">
          <textarea rows="6" v-model="form.message" required></textarea>
          <label class="text-gray-500 !font-semibold">{{ $t('contact.form_message') }}</label>
        </div>
        <div class="form-group mb-6">
          <div
            class="relative h-12 bg-slate-100 rounded-2xl bg-gradient-to-r from-blue-100 to-white/90 overflow-hidden flex items-center border border-amber-300 dark:border-white/70 select-none"
            ref="sliderTrack">
            
            <div class="absolute inset-0 flex items-center justify-center font-semibold text-sm transition-colors"
              :class="isVerified ? 'text-emerald-500' : 'text-slate-400'">
              {{ isVerified ? $t('contact.verified') : $t('contact.slide_to_verify') }}
            <font-awesome-icon icon="fa-solid fa-robot" class="ml-2 text-emerald-500"/>
            </div>
            <div class="absolute left-0 top-0 bottom-0 bg-emerald-400/20" :style="{ width: `${sliderProgress}%` }">
            </div>
            <div
              class="absolute left-1 top-1 bottom-1 w-10 dark:bg-amber-500 rounded-lg shadow flex items-center justify-center cursor-grab transition-transform z-10"
              :class="{ 'cursor-grabbing': isDragging }" :style="{ transform: `translateX(${thumbPosition}px)` }"
              @mousedown="startDrag" @touchstart.passive="startDrag">
              <font-awesome-icon :icon="isVerified ? 'fa-solid fa-check' : 'fa-solid fa-chevron-right'"
                :class="isVerified ? 'text-emerald-500' : 'text-emerald-400 dark:text-slate-200'" />
            </div>
          </div>
        </div>
        <button
          :class="[sending || !isVerified ? 'cursor-not-allowed submit-btn btn-violet btn-effect-5 opacity-50' : 'submit-btn btn-violet btn-effect-5']"
          type="submit" :disabled="sending || !isVerified" @click="sendEmail">
          {{ sending ? $t('contact.sending') : $t('contact.send') }}
        </button>
      </div>
      <div class="card contact-form card">
        <QRcode />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref, onMounted, computed, watchEffect, onUnmounted } from 'vue'
import { useToast } from 'vue-toastification'
import confetti from "canvas-confetti"
import emailjs from "@emailjs/browser"
import { useI18n } from 'vue-i18n'
import { useGamification } from '../composables/useGamification'

const { t } = useI18n()
const { trackContactForm } = useGamification()

useHead({
  title: computed(() => t('contact.meta_title')),
  meta: [
    {
      name: 'Communication',
      content: computed(() => t('contact.meta_desc'))
    }
  ]
})


const toast = useToast()
const loading = ref<boolean>(true)
const sending = ref<boolean>(false)


const launchConfetti = () => {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"]
  })
}

const form = ref({
  name: "",
  email: "",
  message: ""
});

const isVerified = ref(false)
const sliderTrack = ref<HTMLElement | null>(null)
const thumbPosition = ref(0)
const sliderProgress = ref(0)
const isDragging = ref(false)
let startX = 0
let maxTravel = 0

const startDrag = (e: MouseEvent | TouchEvent) => {
  if (isVerified.value) return
  isDragging.value = true
  startX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  if (sliderTrack.value) {
    maxTravel = sliderTrack.value.clientWidth - 48 // 40px thumb + 8px padding
  }

  window.addEventListener('mousemove', onDrag)
  window.addEventListener('touchmove', onDrag, { passive: false })
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchend', stopDrag)
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  if (e.cancelable) e.preventDefault()
  const currentX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  let delta = currentX - startX

  if (delta < 0) delta = 0
  if (delta > maxTravel) delta = maxTravel

  thumbPosition.value = delta
  sliderProgress.value = (delta / maxTravel) * 100

  if (delta >= maxTravel) {
    isVerified.value = true
    stopDrag()
  }
}

const stopDrag = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchend', stopDrag)

  if (!isVerified.value) {
    thumbPosition.value = 0
    sliderProgress.value = 0
  }
}

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchend', stopDrag)
})


onMounted(() => {
  emailjs.init("ZgI5TYSPYNESKjLKs")
  setTimeout(() => (loading.value = false), 1000)
})


const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(form.value.email)
})

const sendEmail = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    toast.warning(t('contact.toast_fill_all'))
    return
  }

  if (!isEmailValid.value) {
    toast.warning(t('contact.toast_invalid_email'))
    return;
  }

  sending.value = true

  try {
    await emailjs.send("service_higxj2g", "template_gnnec0j", {
      from_name: form.value.name,
      from_email: form.value.email,
      message: form.value.message
    })

    form.value = { name: "", email: "", message: "" }

  } catch (error) {
    toast.error(t('contact.toast_error'))
  } finally {
    sending.value = false
    toast.success(t('contact.toast_success'))
    trackContactForm()
    launchConfetti()
  }
};

</script>


<style scoped>
.contact-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 500px;       
  height: 100%;             
}


.testimonials-container {
  align-items: stretch;      
}

.card {
  height: auto;             
  display: flex;             
  flex-direction: column;   
}

:deep(.qrcode-container) {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-group {
  position: relative;
  margin: 1.5rem 0;
}

.form-group input,
.form-group textarea {
  width: 100%;
  border: none;
  border-bottom: 2px solid rgb(233, 211, 211);
  background: transparent;
  padding: 12px 0;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;
  outline: none;
}

.form-group label {
  position: absolute;
  top: 12px;
  left: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}


.form-group input:focus,
.form-group textarea:focus {
  border-color: #760ed6;
}


.form-group input:focus+label,
.form-group input:valid+label,
.form-group textarea:focus+label,
.form-group textarea:valid+label {
  top: -10px;
  font-size: 0.85rem;
  color: #989699;
}


.submit-btn {
  display: block;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  transition: 0.3s ease;
}


@media screen and (max-width: 748px) {
  .testimonials-container {
    flex-direction: column;
    padding: 0 !important;
    width: 100% !important;
    height: auto !important;
  }

  .contact-form {
    width: 100% !important;
    height: auto !important;
  }

  label {
    font-size: 10px !important;
  }

  .media {
    margin-top: 40px;
    padding: 5px !important;
  }
}
</style>