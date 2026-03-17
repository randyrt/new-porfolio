<!-- ChatBot.vue -->
<template>
  <Loading v-if="loading" message="Discutons..." />
  <div v-else class="p-4 w-full space-y-8 flex flex-col items-center justify-center">
    <AnimatedTitle text=" « Posez des questions sur moi » " aos="fade-down" />
  </div>
  <div class="chat-container card">
    <div class="conversation-area">
      <div v-for="(msg, index) in conversation" :key="index"
        :class="['message', msg.sender === 'Vous' ? 'user-message' : 'ia-message']">
        <strong>{{ msg.sender }}:</strong> {{ msg.text }}
      </div>

      <div v-if="isLoading" class="typing-indicator">
        <strong>IA:</strong> en train d'écrire...
      </div>
    </div>

    <div class="input-area">
      <input class="rounded-lg" v-model="userMessage" placeholder="Votre message..." @keyup.enter="sendMessage" :disabled="isLoading" />
      <button class="btn-effect-5 btn-violet" @click="sendMessage" :disabled="isLoading || !userMessage.trim()">
        {{ isLoading ? 'Envoi...' : 'Envoyer' }}
      </button>
    </div>
    <p v-if="error" class="error-message">
      ❌ {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sendMessageToIA } from '../services/api.js';

interface Message {
  sender: 'Vous' | 'IA';
  text: string;
}


const conversation = ref<Message[]>([]);
const loading = ref<boolean>(true)
const userMessage = ref<string>('');
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);


onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})


const sendMessage = async (): Promise<void> => {
  if (!userMessage.value.trim() || isLoading.value) return;

  const messageText = userMessage.value.trim();

  conversation.value.push({
    sender: 'Vous',
    text: messageText
  });

  userMessage.value = '';
  isLoading.value = true;
  error.value = null;

  try {
    const response = await sendMessageToIA(messageText);

    conversation.value.push({
      sender: 'IA',
      text: response.response
    });

  } catch (err: any) {
    console.error("Erreur lors de l'appel à l'API :", err);

    if (err.response) {

      error.value = `Erreur ${err.response.status}: ${err.response.data?.message || 'Problème serveur'}`;
    } else if (err.request) {

      error.value = "Impossible de contacter le serveur. Vérifiez que le backend est bien lancé.";
    } else {

      error.value = "Une erreur est survenue. Veuillez réessayer.";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.chat-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.conversation-area {
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
}

.user-message {
  background-color: #e3f2fd;
  text-align: right;
}

.ia-message {
  background-color: #f5f5f5;
  text-align: left;
}

.typing-indicator {
  color: #666;
  font-style: italic;
  margin: 10px 0;
}

.input-area {
  display: flex;
  gap: 10px;
}

.input-area input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}


.input-area button:disabled {
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  margin-top: 10px;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
}
</style>