<template>
    <Loading v-if="loading" :message="$t('projects.loading')" />
    <div v-else>
        <AnimatedTitle :text="$t('projects.quote')" aos="fade-down" />
        <div class="swiper-header">
            <div class="swiper-progress" v-if="projects.length > 1">
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: `${progressPercent}%` }"></div>
                </div>
                <div class="swiper-counter">
                    <span class="current">{{ currentIndex + 1 }}</span>
                    <span class="separator">/</span>
                    <span class="total">{{ projects.length }}</span>
                </div>
            </div>
            <div class="custom-nav-buttons" v-if="projects.length > 1">
                <button class="custom-nav-prev !btn-violet !btn-effect-5" @click="slidePrev">
                    <font-awesome-icon icon="fa-solid fa-chevron-left" />
                </button>
                <button class="custom-nav-next btn-violet !btn-effect-5" @click="slideNext">
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </button>
            </div>
        </div>

        <div class="projects-swiper-container">
            <Swiper :modules="[Pagination, Navigation]" :slides-per-view="1" :space-between="30"
                :loop="projects.length > 1" :pagination="{ clickable: true, dynamicBullets: true }" :navigation="{
                    prevEl: '.custom-nav-prev',
                    nextEl: '.custom-nav-next',
                }" :autoplay="false" class="projects-swiper" @swiper="onSwiper" @slide-change="onSlideChange">
                <SwiperSlide v-for="(project, index) in projects" :key="index">
                    <div class="project-slide" :id="project.id">
                        <ProjectGallery :id="project.id" :images="project.images" :title="project.title"
                            :description="project.description" @open-image="openImage" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-if="selectedImage"
                class="fixed inset-0 flex items-center justify-center z-50 card modal-backdrop bg-black/50 backdrop-blur-sm"
                @click.self="closeImage">
                <div class="relative">
                    <button @click="closeImage"
                        class="absolute -top-12 left-1/2 -translate-x-1/2 btn-violet btn-effect-5 z-10">
                        {{ t('projects.close_image') }}
                    </button>
                    <img :src="selectedImage" alt="Image sélectionnée"
                        class="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg ring-4 ring-purple-500" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import ProjectGallery from '../components/ProjectGallery.vue'
import Loading from '../components/Loading.vue'
import AnimatedTitle from '../components/AnimatedTitle.vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const { t } = useI18n()
const route = useRoute()
const toast = useToast()

useHead({
    title: computed(() => t('projects.meta_title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('projects.meta_desc'))
        }
    ]
})

const loading = ref<boolean>(true)
const selectedImage = ref<string | null>(null)
const swiperInstance = ref<any>(null)
const currentIndex = ref(0)
const progressPercent = ref(0)
const pendingProjectId = ref<string | null>(null)

// Définition des projets
const projects = ref([
    {
        id: 'fid-connect',
        title: 'FID-CONNECT',
        description: t('projects.fid_connect'),
        images: [
            '/images/projects/fid-connect/capture1.png',
            '/images/projects/fid-connect/capture2.png',
            '/images/projects/fid-connect/capture3.png',
            '/images/projects/fid-connect/capture_end.png',
            '/images/projects/fid-connect/capture12.png',
            '/images/projects/fid-connect/capture7.png',
            '/images/projects/fid-connect/capture13.png',
            '/images/projects/fid-connect/capture9.png',
            '/images/projects/fid-connect/capture10.png'
        ]
    },
    {
        id: 'qcp',
        title: 'QCP',
        description: t('projects.qcp'),
        images: [
            '/images/projects/QCP/capture1.png',
            '/images/projects/QCP/capture2.png',
            '/images/projects/QCP/capture3.png',
            '/images/projects/QCP/capture4.png',
            '/images/projects/QCP/capture5.png',
            '/images/projects/QCP/capture6.png',
            '/images/projects/QCP/capture7.png',
            '/images/projects/QCP/capture8.png',
            '/images/projects/QCP/capture9.png',
            '/images/projects/QCP/capture10.png',
            '/images/projects/QCP/capture11.png'
        ]
    },
    {
        id: 'nurses',
        title: 'NURSES',
        description: t('projects.nurses'),
        images: [
            '/images/projects/nurser-dinner/capture1.png',
            '/images/projects/nurser-dinner/capture2.png',
            '/images/projects/nurser-dinner/capture3.png',
            '/images/projects/nurser-dinner/capture5.png',
            '/images/projects/nurser-dinner/capture6.png',
            '/images/projects/nurser-dinner/capture7.png'
        ]
    },
    {
        id: 'echo-webline',
        title: 'ECHO WEBLINE',
        description: t('projects.echo_webline'),
        images: [
            '/images/projects/echo-webLine/echo-1.PNG',
            '/images/projects/echo-webLine/echo-3.PNG',
            '/images/projects/echo-webLine/echo-4.PNG',
            '/images/projects/echo-webLine/echo-6.PNG',
            '/images/projects/echo-webLine/echo-7.PNG',
            '/images/projects/echo-webLine/echo-8.PNG',
            '/images/projects/echo-webLine/echo-12.PNG'
        ]
    },
    {
        id: 'afr-fan',
        title: 'AFR FAN',
        description: t('projects.afr_fan'),
        images: [
            '/images/projects/afr/afr-1.PNG',
            '/images/projects/afr/afr-2.PNG',
            '/images/projects/afr/afr-3.PNG',
            '/images/projects/afr/afr-4.PNG'
        ]
    }
])

function openImage(img: string) {
    selectedImage.value = img
}

function closeImage() {
    selectedImage.value = null
}

const onSwiper = (swiper: any) => {
    swiperInstance.value = swiper
    updateProgress()
    // Appliquer le hash en attente si présent (navigation depuis chatbot)
    if (pendingProjectId.value) {
        const id = pendingProjectId.value
        pendingProjectId.value = null
        setTimeout(() => scrollToProject(id), 100)
    }
}

const onSlideChange = () => {
    updateProgress()
}

const slidePrev = () => {
    if (swiperInstance.value) {
        swiperInstance.value.slidePrev()
    }
}

const slideNext = () => {
    if (swiperInstance.value) {
        swiperInstance.value.slideNext()
    }
}

// Navigation par hash
const scrollToProject = (projectId: string) => {
    const index = projects.value.findIndex(p => p.id === projectId)
    if (index !== -1 && swiperInstance.value) {
        swiperInstance.value.slideTo(index)
    }
}

// Mise à jour de la progression
const updateProgress = () => {
    if (swiperInstance.value && projects.value.length > 0) {
        const total = projects.value.length
        const current = swiperInstance.value.realIndex
        currentIndex.value = current
        progressPercent.value = ((current + 1) / total) * 100
    }
}

// Écouter les changements de route pour le hash
watch(
    () => route.hash,
    (newHash) => {
        if (newHash) {
            const projectId = newHash.substring(1)
            if (swiperInstance.value) {
                // Swiper déjà prêt : naviguer directement
                scrollToProject(projectId)
            } else {
                // Swiper pas encore prêt : stocker pour après initialisation
                pendingProjectId.value = projectId
            }
        }
    },
    { immediate: true }
)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
        toast.info(t('projects.toast_click'))

        if (route.hash) {
            const projectId = route.hash.substring(1)
            if (swiperInstance.value) {
                scrollToProject(projectId)
            } else {
                // Si Swiper n'est pas encore prêt, stocker l'id
                pendingProjectId.value = projectId
            }
        }
    }, 500)
})
</script>

<style scoped>
.swiper-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}


.swiper-progress {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.progress-bar {
    flex: 1;
    height: 4px;
    background: rgba(139, 92, 246, 0.2);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #BE5CF6, #710BC5);
    border-radius: 4px;
    transition: width 0.3s ease;
}

.swiper-counter {
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    flex-shrink: 0;
}

.swiper-counter .current {
    color: #8b5cf6;
    font-weight: 700;
}

.swiper-counter .separator {
    margin: 0 0.25rem;
}


.custom-nav-buttons {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
}

.custom-nav-prev,
.custom-nav-next {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 100%;
    background: #8b5cf6;
    border: 1px solid #03E790;
    color: #ffff;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.custom-nav-prev:hover,
.custom-nav-next:hover {
    background: #74EC92AB;
    color: white;
    border-color: #8b5cf6;
}

.custom-nav-prev:active,
.custom-nav-next:active {
    transform: scale(0.95);
}

.projects-swiper-container {
    position: relative;
    width: 100%;
    padding: 0 0 2rem;
}

.projects-swiper {
    width: 100%;
    padding: 0.5rem 0 2rem !important;
}

.project-slide {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Cacher les boutons Swiper par défaut */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
    display: none !important;
}

/* Styles Swiper personnalisés */
:deep(.swiper-pagination-bullet) {
    background: #c4b5fd;
    opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
    background: #8b5cf6;
    opacity: 1;
}

:deep(.swiper-pagination) {
    bottom: 0 !important;
    position: relative;
    margin-top: 0.5rem;
}

.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(6px);
}

/* Responsive */
@media screen and (max-width: 768px) {
    .swiper-header {
        padding: 0 1rem;
    }

    .projects-swiper {
        padding: 0 0 2rem !important;
    }

    .custom-nav-prev,
    .custom-nav-next {
        width: 32px;
        height: 32px;
    }

    .custom-nav-prev svg,
    .custom-nav-next svg {
        width: 16px;
        height: 16px;
    }
}
</style>