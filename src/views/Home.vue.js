import { useHead } from '@vueuse/head';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useGamification } from '../composables/useGamification';
const { t, locale } = useI18n();
const { trackCVDownload } = useGamification();
useHead({
    title: computed(() => t('home.meta_title')),
    meta: [
        {
            name: 'Bienvenu',
            content: computed(() => t('home.meta_desc'))
        }
    ]
});
const router = useRouter();
const loading = ref(true);
function downloadCV() {
    const link = document.createElement('a');
    link.href = "/images/cv/Randy_real_cv.pdf";
    link.download = "Randy_real_cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    trackCVDownload();
}
function viewCV() {
    window.open("/images/cv/Randy_real_cv.pdf", "_blank");
}
const goToContact = () => {
    router.push('/contact');
};
onMounted(() => {
    setTimeout(() => {
        loading.value = false;
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
        message: (__VLS_ctx.$t('home.loading')),
    }));
    const __VLS_2 = __VLS_1({
        message: (__VLS_ctx.$t('home.loading')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    // @ts-ignore
    [$t,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-4 flex flex-col" },
    });
    const __VLS_6 = {}.AnimatedTitle;
    /** @type {[typeof __VLS_components.AnimatedTitle, ]} */ ;
    // @ts-ignore
    AnimatedTitle;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        text: (__VLS_ctx.$t('home.quote')),
        aos: "fade-down",
    }));
    const __VLS_8 = __VLS_7({
        text: (__VLS_ctx.$t('home.quote')),
        aos: "fade-down",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-between items-center flex-col md:flex-row min-h-screen" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "box p-2 view" },
        'data-aos': "fade-down",
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "borderline" },
    });
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: "/images/me/randy.jpg",
        alt: "Photo de Randy",
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "md:text-sm lg:text-base max-w-3xl pad border  card flex flex-col justify-between min-h-[500px]" },
        'data-aos': "fade-up",
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
        ...{ class: "text-2xl font-bold mt-6 mb-2 !text-violet-800" },
    });
    (__VLS_ctx.$t('home.welcome'));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-5xl ml-2 text-sky-500 emoji" },
    });
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-lg text-gray-700 mb-4" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.$t('home.p1')) }, null, null);
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-lg text-gray-700" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.$t('home.p2')) }, null, null);
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-lg text-gray-700 mt-4" },
    });
    (__VLS_ctx.$t('home.p3_1'));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ onClick: (__VLS_ctx.goToContact) },
        ...{ class: "text-sky-700 cursor-pointer underline" },
    });
    // @ts-ignore
    [$t, goToContact,];
    (__VLS_ctx.$t('home.p3_contact'));
    // @ts-ignore
    [$t,];
    (__VLS_ctx.$t('home.p3_2'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-center space-x-4 mt-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.viewCV) },
        ...{ class: "btn-violet inline-block text-center btn-effect-5" },
    });
    // @ts-ignore
    [viewCV,];
    (__VLS_ctx.$t('home.view_cv'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.downloadCV) },
        ...{ class: "btn-violet inline-block text-center btn-effect-5" },
    });
    // @ts-ignore
    [downloadCV,];
    (__VLS_ctx.$t('home.download_cv'));
    // @ts-ignore
    [$t,];
}
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['box']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['view']} */ ;
/** @type {__VLS_StyleScopedClasses['borderline']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['pad']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[500px]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['!text-violet-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['emoji']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-700']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['underline']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
        downloadCV: downloadCV,
        viewCV: viewCV,
        goToContact: goToContact,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
