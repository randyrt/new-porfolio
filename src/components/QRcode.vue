<template>
  <div class="flex flex-col items-center p-6">
    <h2 class="text-lg font-semibold mb-4">Contactez-moi sur <span class="text-green-500">WhatsApp</span> 📱</h2>
    <img
      v-if="qrDataUrl"
      :src="qrDataUrl"
      alt="QR Code WhatsApp"
      class="w-64 h-64 border rounded-xl shadow-md"
    />
    <p class="mt-4 text-gray-700">
      Scannez ce QR pour m’écrire sur WhatsApp mobile
    </p>
    <a
      :href="whatsappLink"
      target="_blank"
      class="mt-3 text-blue-600 underline"
    >
      Ou cliquez ici pour ouvrir directement WhatsApp web
    </a>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'

// Numéro WhatsApp (sans le +)
const phone = '261333026839'

// Lien WhatsApp au format wa.me
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

<style scoped>
body {
  background: #f9fafb;
}
</style>
