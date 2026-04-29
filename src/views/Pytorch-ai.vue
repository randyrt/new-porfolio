<template>
  <div class="chat-fullpage">
    <div class="chat-wrapper">
      <!-- En-tête -->
      <div class="chat-header">
        <div class="header-content">
          <div class="logo">
            <span class="robot-icon">🤖</span>
            <h1>Portfolio Assistant</h1>
          </div>
          <div class="header-right">
            <div class="status-badge" :class="{ online: isConnected }">
              <span class="status-dot"></span>
              {{ isConnected ? 'API Connectée' : 'API Déconnectée' }}
            </div>
            <button @click="clearConversation" class="clear-btn" title="Nouvelle conversation">
              🗑️ Nouvelle conversation
            </button>
          </div>
        </div>
      </div>

      <!-- Zone principale -->
      <div class="chat-main">
        <!-- Messages -->
        <div class="messages-area" ref="messagesContainer">
          <div v-if="messages.length === 0" class="welcome-screen">
            <div class="welcome-content">
              <div class="welcome-icon">💬</div>
              <h2>Bienvenue sur l'Assistant Portfolio</h2>
              <p>Posez vos questions sur les projets, compétences, parcours ou contact de Randy</p>
              <div class="example-questions">
                <button @click="sendSuggestion('Quels sont vos projets ?')">📁 Voir les projets</button>
                <button @click="sendSuggestion('Quelles technologies utilisez-vous ?')">⚡ Technologies</button>
                <button @click="sendSuggestion('Comment vous contacter ?')">📧 Contact</button>
                <button @click="sendSuggestion('Présentez-vous')">👤 Présentation</button>
              </div>
            </div>
          </div>

          <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
            <div class="message-avatar">
              {{ msg.role === 'user' ? '👤' : '🤖' }}
            </div>
            <div class="message-bubble">
              <div class="message-content">
                <p>{{ msg.content }}</p>
                <span class="message-time">{{ formatTime(msg.timestamp) }}</span>
              </div>
              <!-- Actions sur le message (optionnel) -->
              <div v-if="msg.role === 'assistant' && msg.actions" class="message-actions">
                <button v-for="action in msg.actions" :key="action.label" @click="handleAction(action)">
                  {{ action.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- Indicateur de frappe -->
          <div v-if="isTyping" class="message assistant">
            <div class="message-avatar">🤖</div>
            <div class="message-bubble typing-bubble">
              <div class="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Zone de saisie -->
        <div class="input-area">
          <div class="input-container">
            <textarea 
              v-model="userInput" 
              @keypress.enter.prevent="sendMessage"
              @keydown.enter.prevent="sendMessage"
              :disabled="isTyping"
              placeholder="Posez votre question..."
              rows="1"
              class="message-input"
              ref="inputTextarea"
            ></textarea>
            <button 
              @click="sendMessage" 
              :disabled="isTyping || !userInput.trim()"
              class="send-btn"
            >
              <span>Envoyer</span>
              <span class="send-icon">📤</span>
            </button>
          </div>
          
          <!-- Suggestions dynamiques -->
          <div class="suggestions-bar" v-if="suggestions.length">
            <span class="suggestions-label">Suggestions :</span>
            <div class="suggestions-list">
              <button 
                v-for="suggestion in suggestions" 
                :key="suggestion"
                @click="sendSuggestion(suggestion)"
                class="suggestion-chip"
              >
                💡 {{ suggestion }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'

// Types
interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  actions?: Array<{ label: string; action: string }>
}

// État
const messages = ref<Message[]>([])
const userInput = ref('')
const isTyping = ref(false)
const isConnected = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const inputTextarea = ref<HTMLTextAreaElement | null>(null)

// Suggestions
const suggestions = ref([
  'Quels sont vos projets ?',
  'Quelles technologies utilisez-vous ?',
  'Comment vous contacter ?',
  'Présentez-vous',
  'Quel est votre parcours ?'
])

// Configuration API
const API_BASE_URL = 'http://localhost:8000'

// Fonctions
const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const autoResizeTextarea = () => {
  if (inputTextarea.value) {
    inputTextarea.value.style.height = 'auto'
    inputTextarea.value.style.height = Math.min(inputTextarea.value.scrollHeight, 120) + 'px'
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isTyping.value) return

  // Ajouter le message utilisateur
  const userMsg: Message = {
    role: 'user',
    content: userInput.value,
    timestamp: new Date()
  }
  messages.value.push(userMsg)
  const question = userInput.value
  userInput.value = ''
  if (inputTextarea.value) inputTextarea.value.style.height = 'auto'
  await scrollToBottom()

  // Appel API
  isTyping.value = true

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: question,
        history: messages.value.slice(-10, -1).map(m => ({
          role: m.role,
          content: m.content
        }))
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    
    const assistantMsg: Message = {
      role: 'assistant',
      content: data.response || data.message || 'Je n\'ai pas pu générer de réponse.',
      timestamp: new Date(),
      actions: data.actions || []
    }
    messages.value.push(assistantMsg)
    
    // Mettre à jour les suggestions basées sur la réponse
    if (data.suggestions) {
      suggestions.value = data.suggestions
    }
    
  } catch (error) {
    console.error('Erreur:', error)
    messages.value.push({
      role: 'assistant',
      content: '❌ Désolé, une erreur est survenue. Vérifiez que le serveur backend est démarré sur http://localhost:8000',
      timestamp: new Date()
    })
  } finally {
    isTyping.value = false
    await scrollToBottom()
  }
}

const sendSuggestion = (suggestion: string) => {
  userInput.value = suggestion
  sendMessage()
}

const clearConversation = () => {
  messages.value = []
  scrollToBottom()
}

const handleAction = (action: { label: string; action: string }) => {
  console.log('Action:', action)
  // Implémenter les actions selon vos besoins
}

// Vérifier la connexion
const checkConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    isConnected.value = response.ok
  } catch (error) {
    isConnected.value = false
  }
}

// Auto-resize textarea
watch(userInput, () => {
  autoResizeTextarea()
})

// Chargement
onMounted(() => {
  checkConnection()
  // Vérifier périodiquement la connexion
  setInterval(checkConnection, 30000)
})
</script>

<style scoped>
.chat-fullpage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}

/* En-tête */
.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.robot-icon {
  font-size: 2rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 0.85rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  animation: pulse 2s infinite;
}

.status-badge.online .status-dot {
  background: #10b981;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.clear-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

/* Zone principale */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Messages */
.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f8fafc;
}

.welcome-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.welcome-content {
  text-align: center;
  max-width: 500px;
}

.welcome-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.welcome-content h2 {
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.welcome-content p {
  color: #64748b;
  margin-bottom: 2rem;
}

.example-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.example-questions button {
  padding: 10px 20px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 25px;
  color: #667eea;
  cursor: pointer;
  transition: all 0.2s;
}

.example-questions button:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
  transform: translateY(-2px);
}

.message {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.message.user .message-avatar {
  background: #10b981;
}

.message-bubble {
  max-width: 70%;
}

.message.user .message-bubble {
  text-align: right;
}

.message-content {
  background: white;
  padding: 12px 16px;
  border-radius: 18px;
  border-top-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.message.user .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-top-left-radius: 18px;
  border-top-right-radius: 4px;
}

.message-content p {
  margin: 0;
  line-height: 1.5;
}

.message-time {
  font-size: 0.7rem;
  color: #94a3b8;
  display: block;
  margin-top: 6px;
}

.message.user .message-time {
  color: rgba(255, 255, 255, 0.7);
}

.typing-bubble {
  background: white;
  padding: 12px 20px;
  border-radius: 18px;
  border-top-left-radius: 4px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 4px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #94a3b8;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.message-actions {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}

.message-actions button {
  padding: 4px 12px;
  background: #f1f5f9;
  border: none;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.message-actions button:hover {
  background: #e2e8f0;
}

/* Zone de saisie */
.input-area {
  border-top: 1px solid #e2e8f0;
  background: white;
  padding: 20px;
}

.input-container {
  display: flex;
  gap: 12px;
  max-width: 1200px;
  margin: 0 auto;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  outline: none;
  transition: all 0.2s;
}

.message-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.send-btn {
  padding: 0 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.suggestions-bar {
  max-width: 1200px;
  margin: 12px auto 0;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.suggestions-label {
  font-size: 0.8rem;
  color: #64748b;
}

.suggestions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.suggestion-chip {
  padding: 6px 12px;
  background: #f1f5f9;
  border: none;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.suggestion-chip:hover {
  background: #667eea;
  color: white;
  transform: translateY(-1px);
}

/* Scrollbar */
.messages-area::-webkit-scrollbar {
  width: 8px;
}

.messages-area::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.messages-area::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.messages-area::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>