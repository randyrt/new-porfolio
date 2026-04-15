<template>
    <Loading v-if="loading" :message="$t('chat.loading')" />
    <div v-else>
        <AnimatedTitle :text="$t('chat.title')" aos="fade-down" />
        <div class="text-center max-w-2xl mx-auto mb-10 px-4 mt-4" data-aos="fade-up">
            <p class="text-lg italic text-gray-700 dark:text-gray-300">
                <span class="text-violet-800 text-lg">«</span>
                {{ $t('chat.quote') }}
                <span class="text-violet-800 text-lg">»</span>
            </p>
        </div>
        <div class="chatbot-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-16">

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

                <button @click="clearConversation" class="btn-violet btn-effect-5">
                    <font-awesome-icon icon="fa-solid fa-trash-alt" class="" />
                    {{ $t('chat.clear_conversation') }}
                </button>
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

                    <div class="suggestions flex flex-wrap gap-2 mt-4">
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
import { ref, nextTick, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'

interface Message {
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

const { tm, t, locale } = useI18n()

// Met à jour le message de bienvenue en temps réel lors d'un changement de langue
watch(locale, () => {
    if (messages.value.length > 0 && messages.value[0].role === 'assistant') {
        messages.value[0].content = t('chat.welcome_message')
        saveHistory()
    }
})

const loading = ref<boolean>(true)
const isTyping = ref<boolean>(false)
const userInput = ref<string>('')
const messagesContainer = ref<HTMLDivElement | null>(null)
const messages = ref<Message[]>([])
const lastRequestTime = ref<number>(0)
const REQUEST_COOLDOWN_MS = 3000

const suggestions = computed<string[]>(() => tm('chat.suggestions') as string[])


const GEMINI_API_KEYS = [
    import.meta.env.VITE_GEMINI_API_KEY_1,
    import.meta.env.VITE_GEMINI_API_KEY_2,
    import.meta.env.VITE_GEMINI_API_KEY_3
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

const switchToNextApiKey = (): boolean => {
    currentKeyIndex++
    if (currentKeyIndex < GEMINI_API_KEYS.length) {
        model = initModelWithKey(GEMINI_API_KEYS[currentKeyIndex], currentKeyIndex)
        return model !== null
    }
    return false
}


if (GEMINI_API_KEYS.length > 0) {
    model = initModelWithKey(GEMINI_API_KEYS[0], 0)
}


const portfolioContext = computed<string>(() => {
    const langInstruction = locale.value === 'fr'
        ? 'LANGUE DE RÉPONSE: Tu dois TOUJOURS répondre en français, quelle que soit la langue de la question.'
        : 'RESPONSE LANGUAGE: You MUST ALWAYS reply in English, regardless of the language of the question.'

    return `
${langInstruction}

You are an AI assistant for Randy Andriantsiory's portfolio. Here is the key information:

NAME: RAZAFIMANDIMBY Randy Andriantsiory
PROFESSION: Passionate Full Stack Developer specializing in modern and performant web and mobile applications.

PERSONAL PRESENTATION:
Randy is a Full Stack Developer passionate about creating modern web and mobile applications end-to-end: from UI design to server and database management. He loves exploring new technologies and tackling technical challenges.

TECHNICAL SKILLS:
- Frontend: Vue.js, Nuxt.js, TypeScript, TailwindCSS
- Backend: Laravel, Symfony, Node.js, Express.js, Python
- DevOps: Docker Engine, Docker Compose
- GitOps: GitHub, GitLab, CI/CD
- Mobile: IONIC (cross-platform), FLUTTER (learning)
- Databases: MySQL, PostgreSQL, MariaDB
- Other: UX/UI Design, Python automations

CAREER PATH:

🏢 **Senior Developer** - MG CONSULTING ACT & IT (April 2024 – Present)
- Laravel 11 & Vue.js 3 architecture
- Backend optimisation (SQL, Redis, Laravel Horizon) → +35% performance
- CI/CD with GitHub Actions, Docker
- Collaboration with teams in Morocco/Belgium
- Mentoring 3 junior developers
- Real-time WebSockets, Vue 3 Composition API, Laravel Octane

💼 **Fullstack Freelance Developer** - Independent (Jan 2023 – Mar 2024)
- Custom Laravel 10 & Vue.js 3 applications
- Hybrid mobile apps IONIC 6 + Capacitor
- Payment & third-party API integration
- Full project cycle management

💻 **Back-end Web Developer** - PixelZ (Feb 2022 – Nov 2022)
- Laravel 9, REST APIs, Eloquent ORM
- Relational database design
- Laravel Sanctum/JWT authentication

🎨 **Frontend Developer Intern** - Fihary Soft (May 2021 – Dec 2021)
- HTML5, CSS3, vanilla JavaScript
- Figma mockup integration

🏠 **Web Developer Intern** - IMMO Fianarantsoa (April 2020 – Sep 2020)
- Laravel 8 real estate platform
- Database modelling, Linux server deployment

PROJECTS:

🎯 **Fid-Connect** - Accounting & administrative management platform. Vue.js, Laravel, MariaDB, TailwindCSS, Docker.
📊 **QCP** - Credit & amortization management app. Vue.js, Symfony, MariaDB.
🏥 **echo-webLine** - Medical platform for cardiovascular imaging. Vue.js, Laravel, MySQL, TailwindCSS, Docker.
👩‍⚕️ **Nurse** - Healthcare professionals management app. Vue.js, Symfony, MySQL.
⚽ **AFR-Fan** - Football fan community app. Vue.js, Laravel, TailwindCSS.
📁 **Personal portfolio** - Current site with animations, AI assistant. Vue.js, TypeScript, TailwindCSS.

KEY ACHIEVEMENTS:
🏆 2nd place WebCup Madagascar 2024
📈 +35% application performance
👥 +10% user engagement
⏱️ -25% delivery time

EXPERIENCE: 5+ years of web development
LOCATION: Antananarivo, Madagascar
LANGUAGES: French (native), English (fluent), Malagasy (native)

RESPONSE RULES:
- Respond naturally, professionally but in a friendly tone
- Keep it concise (max 150 words per response)
- Use emojis to make responses lively 🚀
- Mention specific projects when asked about achievements
- When asked about career, provide full experience details (MG Consulting, Freelance, PixelZ, etc.)
- If asked an off-topic question, politely redirect to the portfolio
- Highlight the ability to lead a project from A to Z
`
})

const getLocalKnowledgeBase = (): Record<string, string> => ({
    'présente-toi|presentation|qui es-tu|who are you|introduce yourself': t('chat.local.introduce'),
    'projets|projects|what projects|réalisations|what are your projects': t('chat.local.projects'),
    'compétences|skills|technologies|what can you do|technical skills': t('chat.local.skills'),
    'parcours professionnel|mon parcours|expérience pro|career|parcours|career path|my career': t('chat.local.career'),
    'contact|comment te contacter|how to contact|contacter': t('chat.local.contact'),
    'localisation|location|madagascar': t('chat.local.location'),
    'langues|languages|speaks': t('chat.local.languages')
})

const findLocalResponse = (userQuestion: string): string | null => {
    const question = userQuestion.toLowerCase().trim()
    const kb = getLocalKnowledgeBase()

    const careerKeywords = ['parcours', 'professionnel', 'expérience', 'carrière', 'mon parcours', 'expérience pro', 'career', 'career path', 'my career']
    if (careerKeywords.some(keyword => question.includes(keyword))) {
        return kb['parcours professionnel|mon parcours|expérience pro|career|parcours|career path|my career']
    }

    for (const [keywords, response] of Object.entries(kb)) {
        const keywordList = keywords.split('|')
        if (keywordList.some(keyword => question.includes(keyword))) {
            return response
        }
    }
    return null
}

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)
    loadChatHistory()
    clearConversation()
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
        messages.value = [{
            role: 'assistant',
            content: t('chat.welcome_message'),
            timestamp: new Date()
        }]
    }
    scrollToBottom()
}

const saveHistory = (): void => {
    localStorage.setItem('chat_history', JSON.stringify(messages.value))
}

const scrollToBottom = async (): Promise<void> => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

const sendMessage = async (): Promise<void> => {
    if (!userInput.value.trim() || isTyping.value) return

    const now = Date.now()
    if (now - lastRequestTime.value < REQUEST_COOLDOWN_MS) {
        const waitTime = Math.ceil((REQUEST_COOLDOWN_MS - (now - lastRequestTime.value)) / 1000)
        return
    }

    const userMessage: Message = {
        role: 'user',
        content: userInput.value,
        timestamp: new Date()
    }

    messages.value.push(userMessage)
    saveHistory()
    userInput.value = ''
    await scrollToBottom()

    isTyping.value = true
    lastRequestTime.value = Date.now()

    const callGeminiAPI = async (apiKey: string, keyIndex: number): Promise<string> => {
        const tempGenAI = new GoogleGenerativeAI(apiKey)
        const tempModel = tempGenAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

        const conversationHistory: string = messages.value
            .slice(-5)
            .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
            .join('\n')

        const prompt = `${portfolioContext.value}\n\nConversation history:\n${conversationHistory}\n\nUser: ${userMessage.content}\nAssistant:`

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
                if (i !== currentKeyIndex) {
                    currentKeyIndex = i
                    model = initModelWithKey(GEMINI_API_KEYS[i], i)
                }
                break
            } catch (err) {
                lastError = err
            }
        }

        if (aiResponse) {
            const assistantMessage: Message = {
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date()
            }
            messages.value.push(assistantMessage)
            saveHistory()
        } else {
            throw lastError || new Error('Toutes les clés API ont échoué')
        }

    } catch (error: any) {

        const localResponse = findLocalResponse(userMessage.content)
        const errorMessage = localResponse ?? t('chat.error_local_fallback')

        messages.value.push({
            role: 'assistant',
            content: errorMessage,
            timestamp: new Date()
        })
        saveHistory()
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