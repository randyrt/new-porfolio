<template>
    <Loading v-if="loading" :message="$t('projects.loading')" />
    <div v-else>
        <AnimatedTitle :text="$t('projects.quote')" aos="fade-down" />
        <ProjectGallery :images="images1" title="FID-CONNECT"
            :description="$t('projects.fid_connect')"
            @open-image="openImage" />
        <ProjectGallery :images="images2" title="QCP"
            :description="$t('projects.qcp')"
            @open-image="openImage" />
        <ProjectGallery :images="images4" title="ECHO WEBLINE"
            :description="$t('projects.echo_webline')"
            @open-image="openImage" />
        <ProjectGallery :images="images5" title="AFR FAN"
            :description="$t('projects.afr_fan')"
            @open-image="openImage" />
        <ProjectGallery :images="images3" title="NURSES"
            :description="$t('projects.nurses')"
            @open-image="openImage" />

        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">

            <div v-if="selectedImage" class="fixed inset-0 flex items-center justify-center z-50 card modal-backdrop"
                @click.self="closeImage">
                <div class="relative">
                    <button @click="closeImage"
                        class="absolute -top-2 -right-1 bg-purple-500 hover:bg-violet-600 text-white rounded-full cursor-pointer">
                        x
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
import { ref, onMounted, watchEffect } from 'vue'
import { useToast } from 'vue-toastification'
import ProjectGallery from '../components/ProjectGallery.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

watchEffect(() => {
  useHead({
    title: t('projects.meta_title'),
    meta: [
      {
        name: 'Réalisation',
        content: t('projects.meta_desc')
      }
    ]
  })
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

onMounted(() => {
    setTimeout(() => {
        loading.value = false
        toast.info(t('projects.toast_click'))
    }, 1000);
});
</script>

<style scoped>
.modal-backdrop {
    background-color: rgba(59, 61, 63, 0);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(6px);
}
</style>