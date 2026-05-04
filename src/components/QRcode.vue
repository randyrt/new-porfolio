<template>
  <div class="flex flex-col items-center p-6 my-auto">
    <h2 class="text-lg font-semibold mb-4">{{ $t('contact.whatsapp.title') }} <span class="text-green-500">WhatsApp</span> 📱</h2>
    <img v-if="qrDataUrl" :src="qrDataUrl" :alt="$t('contact.whatsapp.qr_alt')" class="w-64 h-64 border rounded-xl shadow-md" />
    <p class="mt-4 text-gray-700">
      {{ $t('contact.whatsapp.scan_message') }}
    </p>
    <a :href="whatsappLink" target="_blank" class="mt-3 text-blue-600 underline">
      {{ $t('contact.whatsapp.click_link') }}
    </a>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'


const phone = '261333026839'

const whatsappLink = `https://wa.me/${phone}`

const qrDataUrl = ref<string>('')

onMounted(async () => {
  try {
    qrDataUrl.value = await QRCode.toDataURL(whatsappLink, {
      width: 256,
      margin: 2,
    })
  } catch (err) {
    console.error('Erreur de génération QR :', err)
  }
})
</script>

<style scoped></style>
