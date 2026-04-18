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

            <!-- 🔔 Toast Notifications -->
            <div class="fixed top-1/2 right-6 -translate-y-1/2 z-50 space-y-2 pointer-events-none">
                <transition-group name="toast" tag="div">
                    <div v-for="toast in toasts" :key="toast.id"
                        :class="`toast-notification px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 pointer-events-auto animate-slide-in-right
                            ${toast.type === 'positive'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700'
                            : toast.type === 'negative'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700'
                        }`">
                        <font-awesome-icon 
                            :icon="`fa-solid ${toast.type === 'positive' ? 'fa-check-circle' : toast.type === 'negative' ? 'fa-times-circle' : 'fa-info-circle'}`" 
                            class="text-lg" />
                        <span class="font-medium">{{ toast.message }}</span>
                    </div>
                </transition-group>
            </div>

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
                class="mb-2 p-2 bg-amber-100 dark:bg-amber-700 border border-amber-400 dark:border-amber-500 rounded-xl flex items-start gap-2 shadow-lg animate-pulse-slow">
                <div class="p-2 bg-amber-500/30 dark:bg-amber-600/50 rounded-lg text-amber-700 dark:text-amber-200">
                    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="text-xl" />
                </div>
                <div class="w-full">
                    <h4 class="text-sm font-bold text-amber-800 dark:text-amber-100 mb-1">
                        {{ $t('chat.card_big_title') }} (Experimental)
                    </h4>
                    <p class="text-xs text-amber-700 dark:!text-amber-100 leading-relaxed">
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
                                : message.isAutoCorrection
                                ? 'assistant-message bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 text-gray-800 dark:text-white rounded-2xl rounded-tl-sm max-w-[80%] p-3 shadow-md border-2 border-amber-300 dark:border-amber-600'
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

                            <!-- 👍 / 👎 FEEDBACK BUTTONS -->
                            <div v-if="message.role === 'assistant' && message.allowFeedback !== false"
                                class="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-gray-600">
                                <span class="text-xs text-gray-500 dark:text-gray-400">{{ $t('chat.helpful') }}</span>
                                <button @click="handleFeedback(index, 'positive')"
                                    :class="feedbackState[index] === 'positive'
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700'
                                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500 hover:bg-green-50 dark:hover:bg-green-900/20'"
                                    class="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border transition-all duration-200">
                                    <font-awesome-icon icon="fa-solid fa-thumbs-up" />
                                </button>
                                <button @click="handleFeedback(index, 'negative')"
                                    :class="feedbackState[index] === 'negative'
                                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700'
                                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20'"
                                    class="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border transition-all duration-200">
                                    <font-awesome-icon icon="fa-solid fa-thumbs-down" />
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
    isAINatureQuestion,
    findLocalResponse,
    detectActions,
    recordFeedback,
    detectIntention,
    getSuggestedTopics
} from '../services/chatbot/logic'
import { autoCorrector } from '../services/chatbot/autoCorrector'
import {
    OFF_TOPIC_RESPONSES,
    PERSONAL_INFO_RESPONSES,
    REQUEST_COOLDOWN_MS,
    MAX_API_CALLS,
    WELCOME_BACK_RESPONSES
} from '../services/chatbot/constants'
import { generatePortfolioContext } from '../services/chatbot/context'

// 🔔 Toast Notification Interface
interface Toast {
    id: string
    message: string
    type: 'positive' | 'negative' | 'info'
    duration?: number
}

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
const feedbackState = ref<Record<number, 'positive' | 'negative'>>({})
const toasts = ref<Toast[]>([])

const quotaExhausted = ref<boolean>(false)
const onTopicAttempts = ref<number>(0)
const isComponentMounted = ref<boolean>(false)
let quotaIntervalId: any = null
let navTimeoutId: any = null
const apiCallCount = ref<number>(0)

let offTopicCounter = 0

const defaultSuggestions = computed<string[]>(() => tm('chat.suggestions') as string[])
const suggestions = ref<string[]>([])

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


const model_flash = 'gemini-2.5-flash'
const model_flash_tts = 'gemini-3.1-flash-tts-preview'
const model_pro = 'gemini-3-pro-preview'


let currentKeyIndex = 0
let model: GenerativeModel | null = null



const initModelWithKey = (apiKey: string, keyIndex: number): GenerativeModel | null => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey)
        return genAI.getGenerativeModel({ model: model_flash })
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
    'vrai ia|véritable ia|es-tu une ia|are you an ai|real ai|bot|robot|intelligence artificielle|intelligence artificiel|ia|machine': t('chat.local.ai_nature'),
    'nom complet|full name|prénom|nom': t('chat.local.full_name')
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
    // Garder l'historique du chat pour détecter le retour
    // On ne supprime plus l'historique ici
}

onUnmounted(() => {
    isComponentMounted.value = false
    if (quotaIntervalId) clearInterval(quotaIntervalId)
    if (navTimeoutId) clearTimeout(navTimeoutId)
    window.removeEventListener('beforeunload', handleBeforeUnload)
})

const loadChatHistory = (): void => {
    const savedHistory = localStorage.getItem('chat_history')
    const isFirstSessionVisit = sessionStorage.getItem('chat_session_visit') === null
    
    if (savedHistory) {
        try {
            const parsedHistory = JSON.parse(savedHistory)
            messages.value = parsedHistory.map((msg: any) => ({
                ...msg,
                timestamp: new Date(msg.timestamp)
            }))
        } catch (error) {
            console.error('Erreur chargement historique:', error)
            localStorage.removeItem('chat_history')
            const welcomeContent = t('chat.welcome_message')
            messages.value = [{
                role: 'assistant',
                content: welcomeContent,
                timestamp: new Date(),
                actions: detectActions(welcomeContent, t)
            }]
        }
    } else {
        const welcomeContent = t('chat.welcome_message')
        messages.value = [{
            role: 'assistant',
            content: welcomeContent,
            timestamp: new Date(),
            actions: detectActions(welcomeContent, t)
        }]
    }
    
    // ✅ Marquer cette visite de session
    sessionStorage.setItem('chat_session_visit', 'true')
    
    // 🎉 Scroll d'abord, PUIS ajouter le message de retour
    nextTick(async () => {
        await scrollToBottom()
        
        // Attendre un peu plus pour être sûr que le scroll est complet
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Si ce n'est pas la première visite DE CETTE SESSION, ajouter un message de bienvenue au retour
        if (!isFirstSessionVisit && messages.value.length > 0) {
            const lang = locale.value === 'fr' ? 'fr' : 'en'
            const welcomeBackMessages = WELCOME_BACK_RESPONSES[lang as keyof typeof WELCOME_BACK_RESPONSES]
            const randomWelcomeBack = welcomeBackMessages[Math.floor(Math.random() * welcomeBackMessages.length)]
            
            messages.value.push({
                role: 'assistant',
                content: randomWelcomeBack,
                timestamp: new Date(),
                actions: detectActions(randomWelcomeBack, t)
            })
            saveHistory()
            
            // Re-scroller après l'ajout du message
            nextTick(async () => {
                await scrollToBottom()
            })
        }
    })
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

    const speed = text.length > 200 ? 5 : 15

    for (let i = 0; i < characters.length; i++) {
        if (!isComponentMounted.value) return

        displayedText += characters[i]
        messages.value[lastIndex].content = displayedText

        if (i % 8 === 0 || i === characters.length - 1) {
            await nextTick()
            if (messagesContainer.value) {
                messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
            }
        }

        await new Promise(resolve => setTimeout(resolve, speed))
    }

    updateDynamicSuggestions(text)

    const actions = detectActions(text, t)
    if (actions.length > 0) {
        messages.value[lastIndex] = {
            ...messages.value[lastIndex],
            actions: actions
        }
    }

    saveHistory()

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

    // 🤖 Gestion spéciale: Questions sur la nature IA (une seule fois + Gemini)
    if (isAINatureQuestion(currentQuestion)) {
        const cachedAIResponse = localStorage.getItem('ai_nature_response')
        
        if (cachedAIResponse) {
            // Réponse déjà en cache - la retourner
            await typeResponse(cachedAIResponse)
        } else {
            // Première fois - Envoyer à Gemini et cacher la réponse
            isTyping.value = true
            try {
                const { sendToGemini } = await import('../services/api')
                const geminiResponse = await sendToGemini(
                    currentQuestion,
                    'Je suis un chatbot IA créé par Randy pour son portfolio. Je suis intégré à l\'API Gemini pour répondre avec expertise.'
                )
                
                // 💾 Cacher la réponse pour les questions suivantes
                localStorage.setItem('ai_nature_response', geminiResponse)
                await typeResponse(geminiResponse)
            } catch (error) {
                console.error('Erreur Gemini:', error)
                const fallbackMessage = locale.value === 'fr'
                    ? '🤖 Oui, je suis une véritable IA ! Je suis basé sur Gemini et créé par Randy pour répondre à vos questions sur son portfolio. J\'apprends à chaque interaction !'
                    : '🤖 Yes, I am a real AI! I\'m powered by Gemini and created by Randy to answer your questions about his portfolio. I learn with each interaction!'
                localStorage.setItem('ai_nature_response', fallbackMessage)
                await typeResponse(fallbackMessage)
            } finally {
                isTyping.value = false
            }
        }
        return
    }

    if (isPersonalInfoRequest(currentQuestion)) {
        const lang = locale.value === 'fr' ? 'fr' : 'en'
        await typeResponse(PERSONAL_INFO_RESPONSES[lang])
        return
    }

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

    if (quotaExhausted.value) {
        onTopicAttempts.value++

        if (onTopicAttempts.value <= 3) {
            const localResponse = findLocalResponse(currentQuestion, getLocalKnowledgeBase())
            const attemptMessage = localResponse
                ? localResponse
                : `⚠️ ${locale.value === 'fr' ? 'Je n\'ai pas assez d\'infos localement. Tentative ' + onTopicAttempts.value + '/3 avant limitation...' : 'I don\'t have enough local info. Attempt ' + onTopicAttempts.value + '/3 before limit...'}`

            await typeResponse(attemptMessage)
            return
        } else {
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
                console.error(`Échec de la clé API ${i}`)
            }
        }

        if (aiResponse) {
            await typeResponse(aiResponse)
        } else {
            throw lastError || new Error('Toutes les clés API ont échoué')
        }

    } catch (error: any) {
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

// 🔔 Toast Notification System
const showToast = (message: string, type: 'positive' | 'negative' | 'info' = 'info', duration: number = 2500): void => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const toast: Toast = {
        id,
        message,
        type,
        duration
    }

    toasts.value.push(toast)

    // Auto-remove toast after duration
    setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }, duration)
}

const handleFeedback = async (messageIndex: number, rating: 'positive' | 'negative'): Promise<void> => {
    const message = messages.value[messageIndex]
    if (message.role !== 'assistant') return

    // Toggle feedback if same rating clicked again
    if (feedbackState.value[messageIndex] === rating) {
        delete feedbackState.value[messageIndex]
        return
    }

    feedbackState.value[messageIndex] = rating

    // Find the corresponding user question (previous message)
    let userQuestion = ''
    for (let i = messageIndex - 1; i >= 0; i--) {
        if (messages.value[i].role === 'user') {
            userQuestion = messages.value[i].content
            break
        }
    }

    // Record feedback to IndexedDB
    const intention = detectIntention(userQuestion)
    await recordFeedback(
        rating,
        userQuestion,
        message.content,
        intention?.category,
        undefined
    )

    if (rating === 'negative') {
        console.log('👎 Feedback négatif détecté - Lancement de la correction automatique...')
        
        const diagnosticMessage = {
            role: 'assistant' as const,
            content: `Désolé ! 😔 Je comprends que ma réponse n'était pas satisfaisante...\n\nJe cherche une meilleure réponse pour toi. Si tu veux m'aider, tu peux reformuler ta question ou me donner plus de détails ! 💡`,
            messageId: Date.now().toString(),
            timestamp: new Date(),
            category: intention?.category || 'general',
            confidence: 0.8,
            allowFeedback: false,
            isAutoCorrection: true
        }
        messages.value.push(diagnosticMessage)
        await scrollToBottom()
        
        isTyping.value = true
        
        try {
            const correctionResult = await autoCorrector.attemptCorrection(
                userQuestion,
                message.content,
                intention?.category
            )

            if (correctionResult.success && correctionResult.newResponse) {
                // ✅ Correction réussie - Remplacer la réponse
                showToast('✨ Réponse corrigée !', 'positive', 3000)
                
                const correctedMessage = {
                    ...message,
                    content: `${correctionResult.newResponse}`,
                    actions: detectActions(correctionResult.newResponse, t)
                }
                
                messages.value[messageIndex] = correctedMessage
                saveHistory()
                await scrollToBottom()

                // Feedback positif sur la correction
                await recordFeedback(
                    'positive',
                    userQuestion,
                    correctionResult.newResponse,
                    intention?.category,
                    `Auto-corrected: ${correctionResult.strategy}`
                )
            } else {
                // ❌ Pas de correction trouvée - Essayer Gemini si c'est lié au portfolio
                const portfolioCategories = ['skills', 'projects', 'career', 'contact', 'quality', 'technology', 'services']
                const isPortfolioRelated = portfolioCategories.includes(intention?.category || '')

                if (isPortfolioRelated) {
                    // 🌟 Essayer Gemini pour générer une meilleure réponse
                    showToast('🌟 Consultation de Gemini...', 'info', 3000)
                    
                    try {
                        const { sendToGemini } = await import('../services/api')
                        const geminiResponse = await sendToGemini(
                            userQuestion,
                            `Portfolio de Randy - Domaine: ${intention?.category}. Fournis une réponse professionnelle et pertinente.`
                        )

                        const geminiMessage = {
                            ...message,
                            content: `${geminiResponse}\n\n*Réponse générée avec assistance IA (Gemini)*`,
                            actions: detectActions(geminiResponse, t)
                        }
                        
                        messages.value[messageIndex] = geminiMessage
                        showToast('✨ Réponse complétée par Gemini !', 'positive', 3000)
                        
                        // Enregistrer comme réussi
                        await recordFeedback(
                            'positive',
                            userQuestion,
                            geminiResponse,
                            intention?.category,
                            `Gemini-enhanced`
                        )
                    } catch (geminiError) {
                        console.error('Erreur Gemini:', geminiError)
                        // Fallback si Gemini échoue aussi
                        const fallbackResponse = 
                            `Désolé pour la réponse précédente ! 😅 Je n'ai pas pu la corriger automatiquement ni avec Gemini.\n\n` +
                            `**Options**:\n` +
                            `1. 🔄 Reformule ta question différemment\n` +
                            `2. 📧 Contacte Randy directement\n` +
                            `3. 💡 Essaie une question connexe`

                        const fallbackMessage = {
                            ...message,
                            content: fallbackResponse,
                            actions: detectActions(fallbackResponse, t)
                        }
                        
                        messages.value[messageIndex] = fallbackMessage
                        showToast('⚠️ Impossible de corriger', 'negative', 3000)
                    }
                } else {
                    // Question non-portfolio - Fallback standard
                    showToast('💭 Impossible de corriger, tente une reformulation...', 'info', 3000)
                    
                    const fallbackResponse = 
                        `Désolé pour la réponse précédente ! 😅 Je n'ai pas pu la corriger automatiquement.\n\n` +
                        `**Raison**: ${correctionResult.reason}\n\n` +
                        `**Options**:\n` +
                        `1. 🔄 Reformule ta question différemment\n` +
                        `2. 📧 Ou contacte Randy directement pour une réponse manuelle\n` +
                        `3. 💡 Essaie une question connexe (ses projets, sa stack, etc.)`

                    const fallbackMessage = {
                        ...message,
                        content: fallbackResponse,
                        actions: detectActions(fallbackResponse, t)
                    }
                    
                    messages.value[messageIndex] = fallbackMessage
                }
                
                saveHistory()
                await scrollToBottom()
            }
        } finally {
            isTyping.value = false
        }
    } else {
        // Positive feedback - Show toast notification
        const toastMessage = rating === 'positive'
            ? t('chat.feedback_thanks_positive')
            : t('chat.feedback_thanks_negative')
        showToast(toastMessage, rating === 'positive' ? 'positive' : 'negative', 2500)
    }
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

/* 🔔 Toast Notifications */
.toast-notification {
    animation: toast-slide-in 0.3s ease-out, toast-slide-out 0.3s ease-in forwards;
    max-width: 400px;
}

@keyframes toast-slide-in {
    from {
        opacity: 0;
        transform: translateX(400px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes toast-slide-out {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(400px);
    }
}

.animate-slide-in-right {
    animation: toast-slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Transition group for toasts */
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(400px);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(400px);
}
</style>