```vue
<template>
  <Loading v-if="loading" :message="$t('n8nTest.loading')" />

  <div v-else class="p-4 flex flex-col min-h-screen">
    <AnimatedTitle :text="$t('n8nTest.title')" aos="fade-down" />

    <div class="max-w-4xl mx-auto w-full mt-8" data-aos="fade-up">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">

        <h2 class="text-2xl font-bold mb-4 text-violet-800 dark:text-violet-400">
          {{ $t('n8nTest.subtitle') }}
        </h2>

        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
          {{ $t('n8nTest.description') }}
        </p>

        <!-- Chat n8n -->
        <div
          class="bg-gradient-to-r from-blue-50 to-purple-50
                 dark:from-blue-900/20 dark:to-purple-900/20
                 rounded-lg p-6 border-l-4 border-blue-500"
        >

          <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Test n8n + Gemini
          </h3>

          <!-- Info sur le proxy CORS -->
          <div class="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-3 mb-4">
            <p class="text-sm text-green-800 dark:text-green-200">
              ✅ <strong>Proxy activé :</strong> Les requêtes passent par <code class="bg-green-200 dark:bg-green-800 px-1 rounded">/api/n8n/*</code> pour éviter les problèmes CORS.
            </p>
            <p class="text-xs text-green-700 dark:text-green-300 mt-1">
              🔑 Session ID : <code class="bg-green-200 dark:bg-green-800 px-1 rounded text-xs">{{ sessionId }}</code>
            </p>
          </div>

          <div class="space-y-4">

            <div>
              <label
                class="block text-sm font-medium text-gray-700
                       dark:text-gray-300 mb-2"
              >
                Message
              </label>

              <textarea
                v-model="testMessage"
                rows="4"
                class="w-full px-4 py-2 rounded-lg border
                       border-gray-300 dark:border-gray-600
                       dark:bg-gray-700 dark:text-white
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500"
                placeholder="Écrivez votre message..."
                @keydown.enter.exact.prevent="sendTestRequest"
              ></textarea>
            </div>

            <button
              @click="sendTestRequest"
              :disabled="isSending || !testMessage.trim()"
              class="btn-violet inline-block text-center
                     btn-effect-5 disabled:opacity-50
                     disabled:cursor-not-allowed"
            >
              <span v-if="isSending" class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>IA en réflexion...</span>
              </span>
              <span v-else>Envoyer</span>
            </button>

            <!-- Message d'info pendant le traitement -->
            <div v-if="isSending" class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg">
              <p class="text-sm text-blue-800 dark:text-blue-200">
                ⏳ Le workflow n8n traite votre demande avec l'agent AI... Cela peut prendre quelques secondes.
              </p>
            </div>

          </div>

          <!-- Réponse n8n - Dernière seulement -->
          <div
            v-if="response"
            class="mt-6 p-4 rounded-lg
                   bg-gradient-to-br from-green-50 to-blue-50 
                   dark:from-green-900/20 dark:to-blue-900/20
                   border border-green-300 dark:border-green-600
                   shadow-md"
          >
            <div class="flex items-center gap-2 mb-3">
              <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h4 class="font-semibold text-gray-800 dark:text-gray-200">
                Dernière réponse de l'Agent AI :
              </h4>
            </div>

            <div class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
              {{ response }}
            </div>
          </div>

          <!-- Historique de conversation -->
          <div v-if="conversationHistory.length > 0" class="mt-6">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-semibold text-gray-800 dark:text-gray-200">
                Historique de conversation
              </h4>
              <div class="flex gap-2">
                <button 
                  @click="resetConversation" 
                  class="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  🔄 Nouvelle conversation
                </button>
                <button 
                  @click="conversationHistory = []" 
                  class="text-xs px-3 py-1 text-red-600 dark:text-red-400 hover:underline"
                >
                  🗑️ Effacer
                </button>
              </div>
            </div>
            
            <div class="space-y-3 max-h-96 overflow-y-auto pr-2">
              <div 
                v-for="(msg, index) in conversationHistory" 
                :key="index"
                :class="[
                  'p-3 rounded-lg',
                  msg.role === 'user' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 ml-8' 
                    : 'bg-gray-100 dark:bg-gray-800/50 mr-8'
                ]"
              >
                <div class="flex items-center gap-2 mb-1">
                  <span 
                    :class="[
                      'text-xs font-semibold',
                      msg.role === 'user' 
                        ? 'text-blue-700 dark:text-blue-300' 
                        : 'text-green-700 dark:text-green-300'
                    ]"
                  >
                    {{ msg.role === 'user' ? '👤 Vous' : '🤖 AI Agent' }}
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ new Date(msg.timestamp).toLocaleTimeString('fr-FR') }}
                  </span>
                </div>
                <div class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {{ msg.content }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: computed(() => t('n8nTest.meta_title')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('n8nTest.meta_desc'))
    }
  ]
})

const loading = ref(true)
const isSending = ref(false)

const testMessage = ref('Bonjour, peux-tu me présenter ton portfolio ?')
const response = ref<string | null>(null)

// Session ID pour maintenir le contexte de conversation dans n8n
const sessionId = ref<string>('')

// Historique des conversations
interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const conversationHistory = ref<Message[]>([])

// Générer un sessionId unique au montage du composant
const generateSessionId = () => {
  // Format: portfolio_timestamp_random
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  return `portfolio_${timestamp}_${random}`
}

/**
 * Webhook n8n
 *
 * On utilise le proxy Vite pour éviter les problèmes CORS.
 * Le proxy est configuré dans vite.config.ts pour rediriger
 * /api/n8n/* vers http://localhost:5678/*
 */
const N8N_WEBHOOK_URL = '/api/n8n/webhook-test/43fc3e5f-fbd1-4caa-8aae-38a2aaddb7fd'

const sendTestRequest = async () => {
  const message = testMessage.value.trim()

  if (!message || isSending.value) {
    return
  }

  // Ajouter le message de l'utilisateur à l'historique
  conversationHistory.value.push({
    role: 'user',
    content: message,
    timestamp: new Date().toISOString()
  })

  isSending.value = true
  response.value = null

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        sessionId: sessionId.value, // Envoyer le sessionId pour maintenir le contexte
        timestamp: new Date().toISOString(),
        source: 'Randy Portfolio'
      })
    })

    if (!res.ok) {
      throw new Error(`Erreur HTTP ${res.status}`)
    }

    const data = await res.json()

    /**
     * Le workflow n8n retourne la réponse complète de l'agent chat
     * Structure attendue : { output: "...", message: "...", response: "..." }
     * On essaie différents champs possibles pour trouver la réponse
     */
    let aiResponse = ''
    
    if (typeof data === 'string') {
      aiResponse = data
    } else if (data.output) {
      aiResponse = data.output
    } else if (data.response) {
      aiResponse = data.response
    } else if (data.message) {
      aiResponse = data.message
    } else if (data.text) {
      aiResponse = data.text
    } else {
      aiResponse = JSON.stringify(data, null, 2)
    }

    response.value = aiResponse
    
    // Ajouter la réponse de l'assistant à l'historique
    conversationHistory.value.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString()
    })
    
    // Vider le champ de saisie après envoi réussi
    testMessage.value = ''

  } catch (error) {
    console.error('Erreur n8n:', error)

    const errorMessage = error instanceof Error
        ? `Erreur : ${error.message}\n\nAssurez-vous que :\n- Le serveur de dev a été redémarré\n- n8n tourne sur localhost:5678\n- Le workflow est activé`
        : 'Une erreur est survenue.'
    
    response.value = errorMessage
    
    // Ajouter l'erreur à l'historique
    conversationHistory.value.push({
      role: 'assistant',
      content: errorMessage,
      timestamp: new Date().toISOString()
    })
  } finally {
    isSending.value = false
  }
}

// Fonction pour réinitialiser la conversation
const resetConversation = () => {
  conversationHistory.value = []
  response.value = null
  sessionId.value = generateSessionId()
  testMessage.value = ''
}

onMounted(() => {
  // Générer un sessionId unique au chargement de la page
  sessionId.value = generateSessionId()
  console.log('Session ID généré:', sessionId.value)
  
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<style scoped>
@media screen and (max-width: 748px) {
  .p-4 {
    padding: 1rem !important;
  }

  h2,
  h3 {
    font-size: 1.25rem !important;
  }

  p {
    font-size: 0.875rem !important;
  }
}
</style>
```
