<template>
    <Loading v-if="loading" :message="$t('projects.loading')" />
    <div v-else>
        <AnimatedTitle :text="$t('projects.quote')" aos="fade-down" />
        <ProjectGallery id="fid-connect" :images="images1" title="FID-CONNECT" :description="$t('projects.fid_connect')"
            @open-image="openImage" />
        <ProjectGallery id="qcp" :images="images2" title="QCP" :description="$t('projects.qcp')"
            @open-image="openImage" />
        <ProjectGallery id="echo-webline" :images="images4" title="ECHO WEBLINE"
            :description="$t('projects.echo_webline')" @open-image="openImage" />
        <ProjectGallery id="afr-fan" :images="images5" title="AFR FAN" :description="$t('projects.afr_fan')"
            @open-image="openImage" />
        <ProjectGallery id="nurses" :images="images3" title="NURSES" :description="$t('projects.nurses')"
            @open-image="openImage" />

        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">

            <div v-if="selectedImage" class="fixed inset-0 flex items-center justify-center z-50 card modal-backdrop bg-black/50 backdrop-blur-sm "
                @click.self="closeImage">
                <div class="relative">
                    <button @click="closeImage"
                        class="absolute -top-2 left-1/2 btn-violet btn-effect-5">
                        Fermer
                    </button>
                    <img :src="selectedImage" alt="Image sélectionnée"
                        class="max-h-[70vh] max-w-[70vw] rounded-lg shadow-lg ring-4 ring-purple-500" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref, onMounted, watchEffect, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import ProjectGallery from '../components/ProjectGallery.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

useHead({
    title: computed(() => t('projects.meta_title')),
    meta: [
        {
            name: 'Réalisation',
            content: computed(() => t('projects.meta_desc'))
        }
    ]
})

const loading = ref<boolean>(true);

const images1: string[] = [
    '/images/projects/fid-connect/capture1.png',
    '/images/projects/fid-connect/capture2.png',
    '/images/projects/fid-connect/capture3.png',
    '/images/projects/fid-connect/capture_end.png',
    '/images/projects/fid-connect/capture12.png',
    '/images/projects/fid-connect/capture7.png',
    '/images/projects/fid-connect/capture13.png',
    '/images/projects/fid-connect/capture9.png',
    '/images/projects/fid-connect/capture10.png'
];

const images2: string[] = [
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
];

const images3: string[] = [
    '/images/projects/nurser-dinner/capture1.png',
    '/images/projects/nurser-dinner/capture2.png',
    '/images/projects/nurser-dinner/capture3.png',
    '/images/projects/nurser-dinner/capture5.png',
    '/images/projects/nurser-dinner/capture6.png',
    '/images/projects/nurser-dinner/capture7.png',
];

const images4: string[] = [
    '/images/projects/echo-webLine/echo-1.PNG',
    '/images/projects/echo-webLine/echo-3.PNG',
    '/images/projects/echo-webLine/echo-4.PNG',
    '/images/projects/echo-webLine/echo-6.PNG',
    '/images/projects/echo-webLine/echo-7.PNG',
    '/images/projects/echo-webLine/echo-8.PNG',
    '/images/projects/echo-webLine/echo-12.PNG',
];

const images5: string[] = [
    '/images/projects/afr/afr-1.PNG',
    '/images/projects/afr/afr-2.PNG',
    '/images/projects/afr/afr-3.PNG',
    '/images/projects/afr/afr-4.PNG',
];

const selectedImage = ref<string | null>(null)
const toast = useToast()

function openImage(img: string) {
    selectedImage.value = img;
}

function closeImage() {
    selectedImage.value = null
}

// 🔍 Fonction pour scroller vers un projet spécifique
const scrollToProject = (projectId: string) => {
    // Attendre que le DOM soit rendu avant de scroller
    setTimeout(() => {
        const element = document.getElementById(projectId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, 100)
}

// 🔔 Écouter les changements de hash pour scroller automatiquement
watch(
    () => route.hash,
    (newHash) => {
        if (newHash) {
            // Enlever le '#' du hash
            const projectId = newHash.substring(1)
            scrollToProject(projectId)
        }
    },
    { immediate: true }
)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
        toast.info(t('projects.toast_click'))

        // Scroller si un hash est présent au chargement
        if (route.hash) {
            const projectId = route.hash.substring(1)
            scrollToProject(projectId)
        }
    }, 1000);
});
</script>

<style scoped>
.modal-backdrop {
    background-color: rgba(59, 61, 63, 0);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(6px);
}
</style>