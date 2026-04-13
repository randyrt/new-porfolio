import { useHead } from '@vueuse/head';
import { ref, onMounted, watchEffect } from 'vue';
import { useToast } from 'vue-toastification';
import ProjectGallery from '../components/ProjectGallery.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
watchEffect(() => {
    useHead({
        title: t('projects.meta_title'),
        meta: [
            {
                name: 'Réalisation',
                content: t('projects.meta_desc')
            }
        ]
    });
});
const loading = ref(true);
const images1 = [
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
const images2 = [
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
const images3 = [
    '/images/projects/nurser-dinner/capture1.png',
    '/images/projects/nurser-dinner/capture2.png',
    '/images/projects/nurser-dinner/capture3.png',
    '/images/projects/nurser-dinner/capture5.png',
    '/images/projects/nurser-dinner/capture6.png',
    '/images/projects/nurser-dinner/capture7.png',
];
const images4 = [
    '/images/projects/echo-webLine/echo-1.PNG',
    '/images/projects/echo-webLine/echo-3.PNG',
    '/images/projects/echo-webLine/echo-4.PNG',
    '/images/projects/echo-webLine/echo-6.PNG',
    '/images/projects/echo-webLine/echo-7.PNG',
    '/images/projects/echo-webLine/echo-8.PNG',
    '/images/projects/echo-webLine/echo-12.PNG',
];
const images5 = [
    '/images/projects/afr/afr-1.PNG',
    '/images/projects/afr/afr-2.PNG',
    '/images/projects/afr/afr-3.PNG',
    '/images/projects/afr/afr-4.PNG',
];
const selectedImage = ref(null);
const toast = useToast();
function openImage(img) {
    selectedImage.value = img;
}
function closeImage() {
    selectedImage.value = null;
}
onMounted(() => {
    setTimeout(() => {
        loading.value = false;
        toast.info(t('projects.toast_click'));
    }, 1000);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    const __VLS_0 = {}.Loading;
    /** @type {[typeof __VLS_components.Loading, ]} */ ;
    // @ts-ignore
    Loading;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        message: (__VLS_ctx.$t('projects.loading')),
    }));
    const __VLS_2 = __VLS_1({
        message: (__VLS_ctx.$t('projects.loading')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    // @ts-ignore
    [$t,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    const __VLS_6 = {}.AnimatedTitle;
    /** @type {[typeof __VLS_components.AnimatedTitle, ]} */ ;
    // @ts-ignore
    AnimatedTitle;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        text: (__VLS_ctx.$t('projects.quote')),
        aos: "fade-down",
    }));
    const __VLS_8 = __VLS_7({
        text: (__VLS_ctx.$t('projects.quote')),
        aos: "fade-down",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [$t,];
    /** @type {[typeof ProjectGallery, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(ProjectGallery, new ProjectGallery({
        ...{ 'onOpenImage': {} },
        images: (__VLS_ctx.images1),
        title: "FID-CONNECT",
        description: (__VLS_ctx.$t('projects.fid_connect')),
    }));
    const __VLS_12 = __VLS_11({
        ...{ 'onOpenImage': {} },
        images: (__VLS_ctx.images1),
        title: "FID-CONNECT",
        description: (__VLS_ctx.$t('projects.fid_connect')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    let __VLS_14;
    let __VLS_15;
    const __VLS_16 = ({ openImage: {} },
        { onOpenImage: (__VLS_ctx.openImage) });
    // @ts-ignore
    [$t, images1, openImage,];
    var __VLS_13;
    /** @type {[typeof ProjectGallery, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(ProjectGallery, new ProjectGallery({
        ...{ 'onOpenImage': {} },
        images: (__VLS_ctx.images2),
        title: "QCP",
        description: (__VLS_ctx.$t('projects.qcp')),
    }));
    const __VLS_19 = __VLS_18({
        ...{ 'onOpenImage': {} },
        images: (__VLS_ctx.images2),
        title: "QCP",
        description: (__VLS_ctx.$t('projects.qcp')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_21;
    let __VLS_22;
    const __VLS_23 = ({ openImage: {} },
        { onOpenImage: (__VLS_ctx.openImage) });
    // @ts-ignore
    [$t, openImage, images2,];
    var __VLS_20;
    /** @type {[typeof ProjectGallery, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(ProjectGallery, new ProjectGallery({
        ...{ 'onOpenImage': {} },
        images: (__VLS_ctx.images4),
        title: "ECHO WEBLINE",
        description: (__VLS_ctx.$t('projects.echo_webline')),
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onOpenImage': {} },
        images: (__VLS_ctx.images4),
        title: "ECHO WEBLINE",
        description: (__VLS_ctx.$t('projects.echo_webline')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_28;
    let __VLS_29;
    const __VLS_30 = ({ openImage: {} },
        { onOpenImage: (__VLS_ctx.openImage) });
    // @ts-ignore
    [$t, openImage, images4,];
    var __VLS_27;
    /** @type {[typeof ProjectGallery, ]} */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(ProjectGallery, new ProjectGallery({
        ...{ 'onOpenImage': {} },
        images: (__VLS_ctx.images5),
        title: "AFR FAN",
        description: (__VLS_ctx.$t('projects.afr_fan')),
    }));
    const __VLS_33 = __VLS_32({
        ...{ 'onOpenImage': {} },
        images: (__VLS_ctx.images5),
        title: "AFR FAN",
        description: (__VLS_ctx.$t('projects.afr_fan')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    let __VLS_35;
    let __VLS_36;
    const __VLS_37 = ({ openImage: {} },
        { onOpenImage: (__VLS_ctx.openImage) });
    // @ts-ignore
    [$t, openImage, images5,];
    var __VLS_34;
    /** @type {[typeof ProjectGallery, ]} */ ;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(ProjectGallery, new ProjectGallery({
        ...{ 'onOpenImage': {} },
        images: (__VLS_ctx.images3),
        title: "NURSES",
        description: (__VLS_ctx.$t('projects.nurses')),
    }));
    const __VLS_40 = __VLS_39({
        ...{ 'onOpenImage': {} },
        images: (__VLS_ctx.images3),
        title: "NURSES",
        description: (__VLS_ctx.$t('projects.nurses')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    let __VLS_42;
    let __VLS_43;
    const __VLS_44 = ({ openImage: {} },
        { onOpenImage: (__VLS_ctx.openImage) });
    // @ts-ignore
    [$t, openImage, images3,];
    var __VLS_41;
    const __VLS_46 = {}.transition;
    /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
    // @ts-ignore
    Transition;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
        enterActiveClass: "transition duration-300 ease-out",
        enterFromClass: "opacity-0 scale-95",
        enterToClass: "opacity-100 scale-100",
        leaveActiveClass: "transition duration-200 ease-in",
        leaveFromClass: "opacity-100 scale-100",
        leaveToClass: "opacity-0 scale-95",
    }));
    const __VLS_48 = __VLS_47({
        enterActiveClass: "transition duration-300 ease-out",
        enterFromClass: "opacity-0 scale-95",
        enterToClass: "opacity-100 scale-100",
        leaveActiveClass: "transition duration-200 ease-in",
        leaveFromClass: "opacity-100 scale-100",
        leaveToClass: "opacity-0 scale-95",
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    const { default: __VLS_50 } = __VLS_49.slots;
    if (__VLS_ctx.selectedImage) {
        // @ts-ignore
        [selectedImage,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ onClick: (__VLS_ctx.closeImage) },
            ...{ class: "fixed inset-0 flex items-center justify-center z-50 card modal-backdrop" },
        });
        // @ts-ignore
        [closeImage,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "relative" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.closeImage) },
            ...{ class: "absolute -top-2 -right-1 bg-purple-500 hover:bg-violet-600 text-white rounded-full cursor-pointer" },
        });
        // @ts-ignore
        [closeImage,];
        __VLS_asFunctionalElement(__VLS_elements.img)({
            src: (__VLS_ctx.selectedImage),
            alt: "Image sélectionnée",
            ...{ class: "max-h-[70vh] max-w-[70vw] rounded-lg shadow-lg ring-4 ring-purple-500" },
        });
        // @ts-ignore
        [selectedImage,];
    }
    var __VLS_49;
}
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-backdrop']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['-top-2']} */ ;
/** @type {__VLS_StyleScopedClasses['-right-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-purple-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[70vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[70vw]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-purple-500']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        ProjectGallery: ProjectGallery,
        loading: loading,
        images1: images1,
        images2: images2,
        images3: images3,
        images4: images4,
        images5: images5,
        selectedImage: selectedImage,
        openImage: openImage,
        closeImage: closeImage,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
