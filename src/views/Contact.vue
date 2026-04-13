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
      <div class="contact-form card p-8">
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
        <button
          :class="[sending ? 'cursor-not-allowed submit-btn btn-violet btn-effect-5' : 'submit-btn btn-violet btn-effect-5']"
          type="submit" :disabled="sending" @click="sendEmail">
          {{ sending ? $t('contact.sending') : $t('contact.send') }}
        </button>
      </div>
      <div class="card contact-form card p-8">
        <QRcode />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useToast } from 'vue-toastification'
import confetti from "canvas-confetti"
import emailjs from "@emailjs/browser"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

watchEffect(() => {
  useHead({
    title: t('contact.meta_title'),
    meta: [
      {
        name: 'Communication',
        content: t('contact.meta_desc')
      }
    ]
  })
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
    launchConfetti()
  }
};

</script>


<style scoped>
.contact-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
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