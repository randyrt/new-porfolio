<template>
    <Loading v-if="loading" :message="$t('chat.loading')" />
    <div v-else>
        <AnimatedTitle :text="$t('chat.title')" aos="fade-down" />
        <div class="text-center max-w-2xl mx-auto mb-10 px-4 mt-2" data-aos="fade-up">
            <p class="text-lg italic text-gray-700 dark:text-gray-300">
                <span class="text-violet-800 text-lg">«</span>
                {{ $t('chat.quote') }}
                <span class="text-violet-800 text-lg">»</span>
            </p>
        </div>
        <div class="chatbot-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">

            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                    <div
                        class="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <font-awesome-icon icon="fa-solid fa-robot" class="text-white text-2xl" />
                    </div>
                    <div>
                        <h2
                            class="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            {{ $t('chat.card_big_title') }}
                        </h2>
                        <p class="text-sm !text-gray-600 !dark:text-gray-500">
                            {{ $t('chat.card_small_title') }}
                        </p>
                    </div>
                </div>

                <div class="hidden md:flex flex-col items-end gap-1">
                    <button @click="clearConversation" class="btn-violet btn-effect-5">
                        <font-awesome-icon icon="fa-solid fa-trash-alt" class="" />
                        {{ $t('chat.clear_conversation') }}
                    </button>
                </div>
            </div>

            <div
                class="mb-6 p-4 bg-red-600 dark:bg-red-700 border border-red-500 rounded-xl flex items-start gap-4 shadow-lg animate-pulse-slow">
                <div class="p-2 bg-white/20 rounded-lg text-white">
                    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="text-xl" />
                </div>
                <div>
                    <h4 class="text-sm font-bold !text-white mb-1">
                        {{ $t('chat.card_big_title') }} (Experimental)
                    </h4>
                    <p class="text-xs !text-white leading-relaxed opacity-95">
                        {{ $t('chat.disclaimer') }}
                    </p>
                </div>
            </div>
            <div class="chat-main">
                <div class="messages-container h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    ref="messagesContainer">
                    <div v-if="messages.length === 0"
                        class="flex flex-col items-center justify-center h-full text-center">
                        <font-awesome-icon icon="fa-solid fa-comments" class="text-gray-400 text-5xl mb-4" />
                        <p class="text-gray-500 dark:text-gray-400">{{ $t('chat.start_conversation') }}</p>
                    </div>

                    <div v-for="(message, index) in messages" :key="index"
                        :class="message.role === 'user' ? 'flex justify-end mb-4' : 'flex justify-start mb-4'">

                        <div
                            :class="message.role === 'user'
                                ? 'user-message bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl rounded-tr-sm max-w-[80%] p-3 shadow-md'
                                : 'assistant-message bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl rounded-tl-sm max-w-[80%] p-3 shadow-md border border-gray-200 dark:border-gray-700'">

                            <div class="flex items-center gap-2 mb-1" v-if="message.role === 'assistant'">
                                <font-awesome-icon icon="fa-solid fa-robot" class="text-violet-500 text-xs" />
                                <span class="text-xs font-semibold text-violet-500"> {{ $t('chat.card_big_title')
                                    }}</span>
                            </div>
                            <div class="text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</div>

                            <!-- 🔘 BOUTONS D'ACTION RAPIDES -->
                            <div v-if="message.actions && message.actions.length > 0"
                                class="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                                <button v-for="(action, aIndex) in message.actions" :key="aIndex"
                                    @click="handleAction(action)"
                                    class="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/50 border border-violet-100 dark:border-violet-800 transition-all duration-200">
                                    <font-awesome-icon :icon="action.icon" />
                                    {{ action.label }}
                                </button>
                            </div>

                            <div class="text-xs opacity-70 mt-2"
                                :class="message.role === 'user' ? 'text-white/70' : 'text-gray-400'">
                            </div>
                        </div>
                    </div>

                    <div v-if="isTyping" class="flex justify-start mb-4">
                        <div
                            class="assistant-message bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm p-4 shadow-md">
                            <div class="flex space-x-2">
                                <div class="typing-dot"></div>
                                <div class="typing-dot" style="animation-delay: 0.2s"></div>
                                <div class="typing-dot" style="animation-delay: 0.4s"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="input-area mt-4">
                    <div class="flex gap-3">
                        <input v-model="userInput" @keypress.enter="sendMessage" type="text"
                            :placeholder="$t('chat.placeholder')"
                            class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white transition" />
                        <button @click="sendMessage" :disabled="isTyping || !userInput.trim()"
                            class="send-button bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100">
                            <font-awesome-icon icon="fa-solid fa-paper-plane" class="mr-2" />
                            {{ $t('chat.send') }}
                        </button>
                    </div>

                    <div class="suggestions flex flex-wrap gap-2 justify-center mt-4">
                        <button v-for="suggestion in suggestions" :key="suggestion" @click="sendSuggestion(suggestion)"
                            class="suggestion-chip px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200">
                            <font-awesome-icon icon="fa-solid fa-bolt" class="text-xs mr-1" />
                            {{ suggestion }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref, nextTick, onMounted, computed, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'
import { useRouter } from 'vue-router'

import { type Action, type Message } from '../services/chatbot/types'
import {
    isOnTopic,
    isPersonalInfoRequest,
    findLocalResponse,
    detectActions
} from '../services/chatbot/logic'
import {
    OFF_TOPIC_RESPONSES,
    PERSONAL_INFO_RESPONSES,
    REQUEST_COOLDOWN_MS,
    MAX_API_CALLS
} from '../services/chatbot/constants'
import { generatePortfolioContext } from '../services/chatbot/context'

const { tm, locale, t } = useI18n()

useHead({
    title: computed(() => t('chat.page_title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('chat.page_description'))
        }
    ]
})

watch(locale, () => {
    if (messages.value.length > 0 && messages.value[0].role === 'assistant') {
        const welcomeContent = t('chat.welcome_message')
        messages.value[0] = {
            ...messages.value[0],
            content: welcomeContent,
            actions: detectActions(welcomeContent, t)
        }
        saveHistory()
    }
})

const loading = ref<boolean>(true)
const isTyping = ref<boolean>(false)
const userInput = ref<string>('')
const messagesContainer = ref<HTMLDivElement | null>(null)
const messages = ref<Message[]>([])
const lastRequestTime = ref<number>(0)
const router = useRouter()

const quotaExhausted = ref<boolean>(false)
const onTopicAttempts = ref<number>(0)
const isComponentMounted = ref<boolean>(false)
let quotaIntervalId: any = null
let navTimeoutId: any = null
const apiCallCount = ref<number>(0)

let offTopicCounter = 0

const defaultSuggestions = computed<string[]>(() => tm('chat.suggestions') as string[])
const suggestions = ref<string[]>([])

// Mettre à jour les suggestions quand la langue change
watch(locale, () => {
    suggestions.value = defaultSuggestions.value
})

const updateDynamicSuggestions = (text: string) => {
    const lowerText = text.toLowerCase()
    const dyn = tm('chat.dynamic_suggestions') as any

    if (!dyn) return

    if (lowerText.includes('projet') || lowerText.includes('project') || lowerText.includes('fid-connect') || lowerText.includes('qcp') || lowerText.includes('réalisations')) {
        suggestions.value = dyn.projects
    } else if (lowerText.includes('compétence') || lowerText.includes('skill') || lowerText.includes('techno') || lowerText.includes('stack')) {
        suggestions.value = dyn.skills
    } else if (lowerText.includes('parcours') || lowerText.includes('career') || lowerText.includes('expérience') || lowerText.includes('mg consulting') || lowerText.includes('freelance')) {
        suggestions.value = dyn.career
    } else if (lowerText.includes('contact') || lowerText.includes('joindre') || lowerText.includes('email')) {
        suggestions.value = dyn.contact
    } else if (lowerText.includes('retour au début') || lowerText.includes('back to start') || lowerText.includes('merci') || lowerText.includes('revoir')) {
        suggestions.value = defaultSuggestions.value
    }
}

const GEMINI_API_KEYS = [
    import.meta.env.VITE_GEMINI_API_KEY_1,
    import.meta.env.VITE_GEMINI_API_KEY_2,
    import.meta.env.VITE_GEMINI_API_KEY_3,
].filter(key => key && key.startsWith('AIza')) as string[]

let currentKeyIndex = 0
let model: GenerativeModel | null = null

const initModelWithKey = (apiKey: string, keyIndex: number): GenerativeModel | null => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey)
        return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    } catch (error) {
        return null
    }
}

if (GEMINI_API_KEYS.length > 0) {
    model = initModelWithKey(GEMINI_API_KEYS[0], 0)
}

const resetQuota = (): void => {
    quotaExhausted.value = false
    onTopicAttempts.value = 0
    apiCallCount.value = 0
    offTopicCounter = 0
    console.log('✅ Quota réinitialisé')
}

const initQuotaReset = (): void => {
    const lastReset = localStorage.getItem('last_quota_reset')
    const now = Date.now()
    if (!lastReset || now - parseInt(lastReset) > 24 * 60 * 60 * 1000) {
        resetQuota()
        localStorage.setItem('last_quota_reset', now.toString())
    }

    if (quotaIntervalId) clearInterval(quotaIntervalId)
    quotaIntervalId = setInterval(() => {
        const lastResetCheck = localStorage.getItem('last_quota_reset')
        const nowCheck = Date.now()
        if (!lastResetCheck || nowCheck - parseInt(lastResetCheck) > 24 * 60 * 60 * 1000) {
            resetQuota()
            localStorage.setItem('last_quota_reset', nowCheck.toString())
        }
    }, 60 * 60 * 1000)
}

const portfolioContext = computed<string>(() => generatePortfolioContext(locale.value))

const getLocalKnowledgeBase = (): Record<string, string> => ({
    // PRIORITÉ 1 : SUJETS TRÈS SPÉCIFIQUES
    'fid-connect|fidconnect|fid connect': t('chat.local.project_fid'),
    'qcp|crédit|credit|amortissement': t('chat.local.project_qcp'),
    'echo-webline|echo webline|médical|cardio': t('chat.local.project_echo'),
    'afr-fan|afrfan|réseau social|social network': t('chat.local.project_afrfan'),
    'nurse|souper of nurses|restaurant|réservation': t('chat.local.project_nurse'),
    'webcup|compétition|award|prix|2ème': t('chat.local.award_webcup'),
    'laravel|php|backend|api|sanctum': t('chat.local.tech_laravel'),
    'vue|vuejs|nuxt|frontend|typescript|ts': t('chat.local.tech_vue'),
    'docker|container|conteneur|devops': t('chat.local.tech_docker'),
    'mobile|ionic|flutter|hybride': t('chat.local.tech_mobile'),

    // PRIORITÉ 2 : CATÉGORIES GÉNÉRALES
    'bonjour|hello|salut|hey|hi|coucou': t('chat.local.greeting'),
    'merci|thanks|thank you': t('chat.local.thanks'),
    'au revoir|goodbye|bye': t('chat.local.farewell'),
    'ça va|how are you|how is it going|comment ça va|comment vas|comment va|tu vas|allez-vous': t('chat.local.mood'),
    'présente-toi|presentation|qui es-tu|who are you|introduce yourself': t('chat.local.introduce'),
    'projets|projects|what projects|réalisations|what are your projects': t('chat.local.projects'),
    'compétences|skills|technologies|what can you do|technical skills': t('chat.local.skills'),
    'parcours professionnel|mon parcours|expérience pro|career|parcours|career path|my career': t('chat.local.career'),
    'contact|comment te contacter|how to contact|contacter': t('chat.local.contact'),
    'localisation|location|madagascar|emplacement|ville|pays|situé|localisé|city|country|lieu|habite|où vivez|où est': t('chat.local.location'),
    'services|offre|expertise|que proposes-tu|tarif|prix|devis': t('chat.local.services'),
    'témoignages|avis|recommandation|feedback|clients|testimonials': t('chat.local.testimonials'),
    'qualités|forces|atouts|points forts|pourquoi toi|why you|qualities': t('chat.local.qualities'),
    'langues|languages|speaks': t('chat.local.languages'),
    'vrai ia|véritable ia|es-tu une ia|are you an ai|real ai': t('chat.local.ai_nature')
})

onMounted(() => {
    isComponentMounted.value = true
    setTimeout(() => {
        if (isComponentMounted.value) loading.value = false
    }, 1000)

    suggestions.value = defaultSuggestions.value
    loadChatHistory()
    initQuotaReset()

    window.addEventListener('beforeunload', handleBeforeUnload)
})

const handleBeforeUnload = (): void => {
    localStorage.removeItem('chat_history')
}

onUnmounted(() => {
    isComponentMounted.value = false
    if (quotaIntervalId) clearInterval(quotaIntervalId)
    if (navTimeoutId) clearTimeout(navTimeoutId)
    window.removeEventListener('beforeunload', handleBeforeUnload)
})

const loadChatHistory = (): void => {
    const savedHistory = localStorage.getItem('chat_history')
    if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory)
        messages.value = parsedHistory.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
        }))
    } else {
        const welcomeContent = t('chat.welcome_message')
        messages.value = [{
            role: 'assistant',
            content: welcomeContent,
            timestamp: new Date(),
            actions: detectActions(welcomeContent, t)
        }]
    }
    scrollToBottom()
}

const saveHistory = (): void => {
    localStorage.setItem('chat_history', JSON.stringify(messages.value))
}

const handleAction = (action: Action) => {
    if (action.type === 'route') {
        router.push(action.target)
    } else if (action.type === 'link' || action.type === 'download') {
        const link = document.createElement('a')
        link.href = action.target
        if (action.type === 'download') {
            link.download = action.target.split('/').pop() || 'download'
        } else {
            link.target = '_blank'
        }
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}

const scrollToBottom = async (): Promise<void> => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

// ========== TYPEWRITER EFFECT FUNCTION ==========
const typeResponse = async (text: string): Promise<void> => {
    isTyping.value = false
    messages.value.push({
        role: 'assistant',
        content: '',
        timestamp: new Date()
    })

    const lastIndex = messages.value.length - 1
    const characters = text.split('')
    let displayedText = ''

    // Vitesse légèrement plus rapide pour une sensation plus fluide
    const speed = text.length > 200 ? 5 : 15

    for (let i = 0; i < characters.length; i++) {
        if (!isComponentMounted.value) return // Sécurité unmount

        displayedText += characters[i]
        // Mise à jour directe dans l'array pour garantir la réactivité
        messages.value[lastIndex].content = displayedText

        // Auto-scroll moins fréquent pour économiser les ressources
        if (i % 8 === 0 || i === characters.length - 1) {
            await nextTick()
            if (messagesContainer.value) {
                messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
            }
        }

        await new Promise(resolve => setTimeout(resolve, speed))
    }

    // Mise à jour des suggestions après la réponse
    updateDynamicSuggestions(text)

    // Détection des actions contextuelles
    const actions = detectActions(text, t)
    if (actions.length > 0) {
        messages.value[lastIndex] = {
            ...messages.value[lastIndex],
            actions: actions
        }
    }

    saveHistory()

    // 🚀 Navigation automatique si l'intention est forte (ex: "Je vous emmène vers...")
    const lowerText = text.toLowerCase()
    if (lowerText.includes('redirige') || lowerText.includes('direction') || lowerText.includes('emmène')) {
        const navAction = actions.find(a => a.type === 'route')
        if (navAction && isComponentMounted.value) {
            if (navTimeoutId) clearTimeout(navTimeoutId)
            navTimeoutId = setTimeout(() => {
                if (isComponentMounted.value) handleAction(navAction)
            }, 2000)
        }
    }
}

// ========== MODIFIED SEND MESSAGE FUNCTION ==========
const sendMessage = async (): Promise<void> => {
    if (!userInput.value.trim() || isTyping.value) return

    const now = Date.now()
    if (now - lastRequestTime.value < REQUEST_COOLDOWN_MS) {
        return
    }

    const userMessage: Message = {
        role: 'user',
        content: userInput.value,
        timestamp: new Date()
    }

    messages.value.push(userMessage)
    saveHistory()
    const currentQuestion = userInput.value
    userInput.value = ''
    await scrollToBottom()

    if (isPersonalInfoRequest(currentQuestion)) {
        const lang = locale.value === 'fr' ? 'fr' : 'en'
        await typeResponse(PERSONAL_INFO_RESPONSES[lang])
        return
    }

    // 🔍 Vérifier si la question est dans le sujet
    let onTopic = isOnTopic(currentQuestion)

    const allPredefinedSuggestions = [
        ...(defaultSuggestions.value || []),
        ...Object.values(tm('chat.dynamic_suggestions') || {}).flat() as string[]
    ]

    if (!onTopic) {
        onTopic = allPredefinedSuggestions.some(s =>
            currentQuestion.toLowerCase().trim() === s.toLowerCase().trim() ||
            currentQuestion.toLowerCase().includes(s.toLowerCase().trim().replace(/[^\w\sàâäéèêëïîôöùûüç]/gi, '').trim())
        )
    }

    if (!onTopic) {
        const lang = locale.value === 'fr' ? 'fr' : 'en'
        const responseIndex = offTopicCounter % 3
        offTopicCounter++

        await typeResponse(OFF_TOPIC_RESPONSES[lang][responseIndex])
        return
    }

    // ✅ Dans le sujet → vérifier le quota
    if (quotaExhausted.value) {
        onTopicAttempts.value++

        // 3 tentatives autorisées
        if (onTopicAttempts.value <= 3) {
            const localResponse = findLocalResponse(currentQuestion, getLocalKnowledgeBase())
            const attemptMessage = localResponse
                ? localResponse
                : `⚠️ ${locale.value === 'fr' ? 'Je n\'ai pas assez d\'infos localement. Tentative ' + onTopicAttempts.value + '/3 avant limitation...' : 'I don\'t have enough local info. Attempt ' + onTopicAttempts.value + '/3 before limit...'}`

            await typeResponse(attemptMessage)
            return
        } else {
            // Après 3 tentatives → message de quota épuisé
            const quotaMessage = locale.value === 'fr'
                ? "❌ Le nombre de requêtes vers les services externes est épuisé pour le moment (Randy utilise un plan gratuit). Je ne peux pas récupérer de nouvelles informations via Gemini, je réponds donc désormais avec mes données locales d'entraînement de mon portfolio. Posez-moi une question précise sur mes compétences ou projets.\n\n" + 
                  "🌟 **Mes points forts :**\n\n• **Apprentissage continu** : Adaptation rapide aux technos.\n• **Minimalisme** : Interfaces épurées et efficaces.\n• **Esprit d'équipe** : Collaboration et soutien mutuel.\n• **Résolution de problèmes** : Approche stratégique et durable.\n\nUn mindset orienté résultats ! 💪\n\n" +
                  "🤖 **Ma nature** : Je suis un ia en cours d'entrainement, j'intéragisse avec l'api gemini, et gémini intéressagisse avec les régles que Randy a implementer pour répondre. Comme le plan est gratuit, je bascule sur mes données locales si besoin. Je suis un vrai IA, mais en cours d'apprétissage,"
                : "❌ The number of requests to external services is exhausted for now (Randy uses a free plan). I can't retrieve new information via Gemini, so I am now responding with my local portfolio training data. Ask me a specific question about my skills or projects.\n\n" +
                  "🌟 **My strengths:**\n\n• **Continuous learning**: Rapid adaptation to new technologies.\n• **Minimalism**: Clean and efficient interfaces.\n• **Team spirit**: Collaboration and mutual support.\n• **Problem solving**: Strategic and sustainable approach.\n\nA results-oriented mindset! 💪\n\n" +
                  "🤖 **My nature**: I am an AI in training, interacting with the Gemini API, and Gemini interacts with the rules Randy has implemented. Since the plan is free, I switch to my local data if needed. I am a real AI, but still learning!"

            await typeResponse(quotaMessage)
            return
        }
    }

    // ✅ Quota disponible → appeler l'API
    isTyping.value = true
    lastRequestTime.value = Date.now()

    const callGeminiAPI = async (apiKey: string, keyIndex: number): Promise<string> => {
        const tempGenAI = new GoogleGenerativeAI(apiKey)
        const tempModel = tempGenAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

        const conversationHistory: string = messages.value
            .slice(-5)
            .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
            .join('\n')

        const prompt = `${portfolioContext.value}\n\nConversation history:\n${conversationHistory}\n\nUser: ${currentQuestion}\nAssistant:`

        const result = await tempModel.generateContent(prompt)
        const response = await result.response
        return response.text()
    }

    try {
        let aiResponse = ''
        let lastError: any = null

        for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
            try {
                aiResponse = await callGeminiAPI(GEMINI_API_KEYS[i], i)
                apiCallCount.value++

                // Vérifier si on approche du quota
                if (apiCallCount.value >= MAX_API_CALLS) {
                    quotaExhausted.value = true
                    console.warn(`⚠️ Quota atteint (${apiCallCount.value}/${MAX_API_CALLS})`)
                }

                if (i !== currentKeyIndex) {
                    currentKeyIndex = i
                    model = initModelWithKey(GEMINI_API_KEYS[i], i)
                }
                break
            } catch (err) {
                lastError = err
                console.warn(`❌ API key ${i + 1} a échoué:`, err)
            }
        }

        if (aiResponse) {
            await typeResponse(aiResponse)
        } else {
            throw lastError || new Error('Toutes les clés API ont échoué')
        }

    } catch (error: any) {
        console.error('Erreur API:', error)
        const localResponse = findLocalResponse(currentQuestion, getLocalKnowledgeBase())
        const errorMessage = localResponse ?? t('chat.error_local_fallback')

        await typeResponse(errorMessage)
    } finally {
        isTyping.value = false
        await scrollToBottom()
    }
}

const sendSuggestion = (suggestion: string): void => {
    userInput.value = suggestion
    sendMessage()
}

const clearConversation = (): void => {
    messages.value = [{
        role: 'assistant',
        content: t('chat.welcome_message'),
        timestamp: new Date()
    }]
    suggestions.value = defaultSuggestions.value
    saveHistory()
    scrollToBottom()
}
</script>

<style scoped>
.chatbot-card {
    transition: all 0.3s ease;
}

.chatbot-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.messages-container {
    scroll-behavior: smooth;
}

.user-message,
.assistant-message {
    animation: slideInMessage 0.3s ease-out;
}

@keyframes slideInMessage {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.typing-dot {
    width: 8px;
    height: 8px;
    background-color: #8b5cf6;
    border-radius: 50%;
    animation: typingBounce 1.4s infinite ease-in-out;
}

@keyframes pulse-slow {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.95;
        transform: scale(0.995);
    }
}

.animate-pulse-slow {
    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes typingBounce {

    0%,
    60%,
    100% {
        transform: translateY(0);
    }

    30% {
        transform: translateY(-10px);
    }
}

.messages-container::-webkit-scrollbar {
    width: 6px;
}

.messages-container::-webkit-scrollbar-track {
    background: #e5e7eb;
    border-radius: 10px;
}

.messages-container::-webkit-scrollbar-thumb {
    background: #8b5cf6;
    border-radius: 10px;
}

.dark .messages-container::-webkit-scrollbar-track {
    background: #374151;
}

.suggestion-chip {
    transition: all 0.2s ease;
}

.suggestion-chip:hover {
    transform: translateY(-2px);
}

.send-button {
    position: relative;
    overflow: hidden;
}

.send-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.send-button:active::before {
    width: 300px;
    height: 300px;
}

.whitespace-pre-wrap {
    white-space: pre-wrap;
}
</style>