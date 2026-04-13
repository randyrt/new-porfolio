<template>
    <Loading v-if="loading" :message="$t('technology.loading')" />
    <div v-else class="technologies-container">
        <AnimatedTitle :text="$t('technology.quote')" aos="fade-down" />

        <div class="text-center max-w-2xl mx-auto mb-10 px-4 mt-4" data-aos="fade-up">
            <p class="text-lg italic text-gray-700 dark:text-gray-300">
                <span class="text-violet-800 text-lg">«</span>
                {{ $t('technology.description') }}
                <span class="text-violet-800 text-lg">»</span>
            </p>
        </div>

        <!-- Terminal -->
        <div class="terminal-container mb-10 w-1/2 mx-auto" data-aos="fade-up">
            <div class="terminal bg-gray-900 dark:bg-black rounded-lg shadow-xl overflow-hidden border border-gray-700">
                <!-- Terminal Header -->
                <div class="terminal-header bg-gray-800 dark:bg-gray-900 px-4 py-2 flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    <span class="text-gray-400 text-xs ml-2">randy@art.dev:~</span>
                </div>

                <!-- Terminal Body -->
                <div class="terminal-body p-4 font-mono text-sm">
                    <div v-for="(line, index) in visibleLines" :key="index" class="mb-1" :class="line.class">
                        <span v-if="line.prompt" class="text-green-400 mr-2">$</span>
                        <span class="text-gray-300">{{ line.text }}</span>
                    </div>
                    <div v-if="!isComplete" class="typing-cursor inline-block w-2 h-4 bg-green-400"></div>
                </div>
            </div>
        </div>

        <!-- Technologies Grid - Apparaît seulement après le terminal -->
        <Transition name="fade-up" appear>
            <div v-if="showTechnologies" data-aos="fade-up" class="tech-grid">
                <!-- EN COURS D'APPRENTISSAGE -->
                <div class="card tech-category">
                    <logoSection :title="$t('technology.learning')" />
                    <DivSlot>
                        <TechLogo logo="/images/tecnos/flutter.png" name="FLUTTER" />
                        <TechLogo logo="/images/tecnos/c++.png" name="C++" />
                        <TechLogo logo="/images/tecnos/go.png" name="GOLANG" />
                    </DivSlot>
                </div>

                <!-- DESIGN -->
                <div class="card tech-category">
                    <logoSection :title="$t('technology.design')" />
                    <DivSlot>
                        <TechLogo logo="/images/tecnos/photoshop.png" name="PHOTOSHOP" />
                        <TechLogo logo="/images/tecnos/figma.png" name="FIGMA" />
                        <TechLogo logo="/images/tecnos/canva.png" name="CANVA" />
                    </DivSlot>
                </div>

                <!-- FRONTEND -->
                <div class="card tech-category">
                    <logoSection :title="$t('technology.frontend')" />
                    <DivSlot>
                        <TechLogo logo="/images/tecnos/html5.png" name="HTML5" />
                        <TechLogo logo="/images/tecnos/css.png" name="CSS3" />
                        <TechLogo logo="/images/tecnos/js.jpeg" name="JAVASCRIPT" />
                        <TechLogo logo="/images/tecnos/tailwinds.png" name="TAILWINDCSS" />
                        <TechLogo logo="/images/tecnos/jquery.png" name="JQUERY" />
                    </DivSlot>
                </div>

                <!-- BACKEND & SGBD -->
                <div class="card tech-category">
                    <logoSection :title="$t('technology.backend')" />
                    <DivSlot>
                        <TechLogo logo="/images/tecnos/php.png" name="PHP" />
                        <TechLogo logo="/images/tecnos/node.webp" name="NODEJS" />
                        <TechLogo logo="/images/tecnos/sql.png" name="MYSQL" />
                        <TechLogo logo="/images/tecnos/mariadb.png" name="MARIADB" />
                    </DivSlot>
                </div>

                <!-- FRAMEWORKS -->
                <div class="card tech-category">
                    <logoSection :title="$t('technology.frameworks')" />
                    <DivSlot>
                        <TechLogo logo="/images/tecnos/vuejs.jpg" name="VUE.JS" />
                        <TechLogo logo="/images/tecnos/nuxt.png" name="NUXT.JS" />
                        <TechLogo logo="/images/tecnos/ionic.png" name="IONIC" />
                        <TechLogo logo="/images/tecnos/laravel.png" name="LARAVEL" />
                        <TechLogo logo="/images/tecnos/synfony.png" name="SYMFONY" />
                        <TechLogo logo="/images/tecnos/express.png" name="EXPRESS.JS" />
                    </DivSlot>
                </div>

                <!-- ENVIRONNEMENT DE DEV -->
                <div class="card tech-category">
                    <logoSection :title="$t('technology.dev_env')" />
                    <DivSlot>
                        <TechLogo logo="/images/tecnos/lunix.png" name="LINUX" />
                        <TechLogo logo="/images/tecnos/vscode.png" name="VS CODE" />
                        <TechLogo logo="/images/tecnos/git.png" name="GIT" />
                        <TechLogo logo="/images/tecnos/docker.png" name="DOCKER" />
                        <TechLogo logo="/images/tecnos/pma.png" name="PHPMYADMIN" />
                        <TechLogo logo="/images/tecnos/dbeaver.png" name="DBEAVER" />
                        <TechLogo logo="/images/tecnos/typescript.png" name="TYPESCRIPT" />
                        <TechLogo logo="/images/tecnos/postman.png" name="POSTMAN" />
                        <TechLogo logo="/images/tecnos/chrome.png" name="CHROME DEVTOOLS" />
                    </DivSlot>
                </div>

                <!-- GITOPS & SECURISATION -->
                <div class="card tech-category">
                    <logoSection :title="$t('technology.gitops')" />
                    <DivSlot>
                        <TechLogo logo="/images/tecnos/ci_cd.png" name="CI/CD" />
                        <TechLogo logo="/images/tecnos/ftp.png" name="FTP" />
                        <TechLogo logo="/images/tecnos/tls.webp" name="TLS" />
                        <TechLogo logo="/images/tecnos/ssl.png" name="SSL" />
                        <TechLogo logo="/images/tecnos/ssh.jpg" name="SSH" />
                        <TechLogo logo="/images/tecnos/fl.png" name="FILEZILLA" />
                    </DivSlot>
                </div>

                <!-- SCRIPT & AUTOMATISATION -->
                <div class="card tech-category">
                    <logoSection :title="$t('technology.scripting')" />
                    <DivSlot>
                        <TechLogo logo="/images/tecnos/python.png" name="PYTHON" />
                    </DivSlot>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
    title: computed(() => t('technology.meta_title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('technology.meta_desc'))
        }
    ]
})

const toast = useToast()
const loading = ref<boolean>(true)
const isComplete = ref<boolean>(false)
const showTechnologies = ref<boolean>(false)


const terminalLines = [
    { text: 'Tech stack!', class: 'text-yellow-400', prompt: false },
    { text: 'Initializing system...', class: 'text-blue-400', prompt: true },
    { text: 'Loading technologies...', class: 'text-blue-400', prompt: true },
    { text: '✓ Vue.js 3 - Composition API', class: 'text-green-400', prompt: true },
    { text: '✓ TailwindCSS - Styling', class: 'text-green-400', prompt: true },
    { text: '✓ Node.js - Backend', class: 'text-green-400', prompt: true },
    { text: '✓ Docker - Containerization', class: 'text-green-400', prompt: true },
    { text: '✓ TypeScript - Type Safety', class: 'text-green-400', prompt: true },
    { text: '✓ Laravel - PHP Framework', class: 'text-green-400', prompt: true },
    { text: 'System ready!', class: 'text-purple-400', prompt: true }
]

const visibleLines = ref<typeof terminalLines>([])
let currentIndex = 0
let intervalId: ReturnType<typeof setInterval> | null = null

watch(isComplete, (newValue) => {
    if (newValue) {
        setTimeout(() => {
            showTechnologies.value = true
        }, 500)
    }
})

onMounted(() => {

    setTimeout(() => {
        loading.value = false
        toast.info(t('technology.toast_hover'))
    }, 1000)

    intervalId = setInterval(() => {
        if (currentIndex < terminalLines.length) {
            visibleLines.value.push(terminalLines[currentIndex])
            currentIndex++
        } else {
            if (intervalId) {
                clearInterval(intervalId)
                intervalId = null
                isComplete.value = true
            }
        }
    }, 600)
})


onBeforeUnmount(() => {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
})
</script>

<style scoped>
.technologies-container {
    margin: 0 auto;
    padding: 1rem;
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.tech-category {
    border-radius: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid rgba(139, 92, 246, 0.2);
}

.tech-category:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.5);
}

.terminal {
    font-family: 'Courier New', 'Fira Code', monospace;
}

.terminal-header {
    border-bottom: 1px solid rgba(75, 85, 99, 0.5);
}

.terminal-body {
    min-height: 250px;
}

.typing-cursor {
    animation: blink 1s infinite;
    display: inline-block;
    vertical-align: middle;
}

@keyframes blink {

    0%,
    50% {
        opacity: 1;
    }

    51%,
    100% {
        opacity: 0;
    }
}

/* Animations pour l'apparition des technologies */
.fade-up-enter-active {
    animation: fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media screen and (max-width: 768px) {
    .technologies-container {
        padding: 0.5rem;
    }

    .tech-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .tech-category {
        padding: 1rem;
    }

    .terminal-body {
        font-size: 11px;
        min-height: 200px;
    }
}

@media screen and (max-width: 640px) {
    .terminal-body {
        font-size: 10px;
        padding: 0.75rem;
    }

    .terminal-header {
        padding: 0.5rem;
    }
}

/* Dark mode improvements */
.dark .tech-category {
    background: rgba(0, 0, 0, 0.3);
}

.dark .terminal {
    border-color: rgba(139, 92, 246, 0.3);
}
</style>