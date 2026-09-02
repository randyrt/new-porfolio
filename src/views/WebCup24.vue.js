import { useHead } from '@vueuse/head';
import { computed, ref, onMounted } from 'vue';
import confetti from "canvas-confetti";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
useHead({
    title: computed(() => t('webcup.meta_title')),
    meta: [
        {
            name: 'Défis',
            content: computed(() => t('webcup.meta_desc'))
        }
    ]
});
const loading = ref(true);
const launchConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93", "#FF6B6B", "#F0A500", "#4ECDC4", "#C44D58", "#556270", "#C7F464", "#FF6B6B", "#C44D58", "#556270", "#C7F464"],
    });
};
onMounted(() => {
    setTimeout(() => {
        loading.value = false;
        launchConfetti();
    }, 1000);
});
function webCup() {
    window.open("https://24h.webcup.fr/madagascar", "_blank");
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-track']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-logos']} */ ;
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
        message: (__VLS_ctx.$t('webcup.loading')),
    }));
    const __VLS_2 = __VLS_1({
        message: (__VLS_ctx.$t('webcup.loading')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    // @ts-ignore
    [$t,];
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-4 w-full space-y-8 flex flex-col items-center justify-center" },
    });
    const __VLS_5 = {}.AnimatedTitle;
    /** @type {[typeof __VLS_components.AnimatedTitle, ]} */ ;
    // @ts-ignore
    AnimatedTitle;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        text: (__VLS_ctx.$t('webcup.quote')),
        aos: "fade-down",
    }));
    const __VLS_7 = __VLS_6({
        text: (__VLS_ctx.$t('webcup.quote')),
        aos: "fade-down",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    // @ts-ignore
    [$t,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-between p-8" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "min-h-screen p-8 space-y-16" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "w-full max-w-4xl mx-auto" },
    'data-aos': "fade-right",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card p-2 relative group" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "relative rounded-lg" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/webcup24/webcup.jpg",
    alt: "WebCup 2024",
    ...{ class: "\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0037\u0030\u0030\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0067\u0072\u0061\u0079\u0073\u0063\u0061\u006c\u0065\u0020\u0062\u0072\u0069\u0067\u0068\u0074\u006e\u0065\u0073\u0073\u002d\u0039\u0030\u0020" },
    loading: "lazy",
    decoding: "async",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-3 px-4" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-center mb-2" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "text-white/80 text-sm sm:text-base font-semibold tracking-wider uppercase" },
});
(__VLS_ctx.$t('webcup.partner_title'));
// @ts-ignore
[$t,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "partners-scroll-container mx-auto" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "partners-track" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "partners-logos" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/Logo-Bocasay-2-1.webp",
    alt: "Bocasay",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/Vivetic-logo-1.webp",
    alt: "Vivetic",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/Yas-Madagascar-1.webp",
    alt: "Yas Madagascar",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/Ingenosya-logo-1.webp",
    alt: "Ingenosya",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/Etech-1.webp",
    alt: "Etech",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/fulldigits-logo.webp",
    alt: "FullDigits",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "partners-logos" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/Logo-Bocasay-2-1.webp",
    alt: "Bocasay",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/Vivetic-logo-1.webp",
    alt: "Vivetic",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/Yas-Madagascar-1.webp",
    alt: "Yas Madagascar",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/Ingenosya-logo-1.webp",
    alt: "Ingenosya",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/Etech-1.webp",
    alt: "Etech",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/images/PO/fulldigits-logo.webp",
    alt: "FullDigits",
    ...{ class: "partner-logo" },
    loading: "lazy",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "absolute top-3 right-3 sm:top-4 sm:right-4 z-20" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "w-28 sm:w-32 md:w-36 lg:w-40 bg-white rounded-lg shadow-lg p-1 transform transition-transform duration-300 hover:scale-105" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    alt: "WebCup Logo",
    ...{ class: "w-full h-auto" },
    src: "/webCup_logo.png",
    loading: "lazy",
    decoding: "async",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "w-full card p-4 flex justify-center" },
    'data-aos': "fade-down",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-lg text-gray-700" },
});
(__VLS_ctx.$t('webcup.award_by'));
// @ts-ignore
[$t,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "ml-1" },
    'aria-label': "https://www.fulldigits.com",
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "https://www.fulldigits.com",
    ...{ class: "fullDigits" },
    target: "_blank",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "w-full max-w-4xl flex justify-center p-4" },
    'data-aos': "fade-left",
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.webCup) },
    ...{ class: "btn-violet inline-block text-center decoration btn-effect-5" },
});
// @ts-ignore
[webCup,];
(__VLS_ctx.$t('webcup.more_info'));
// @ts-ignore
[$t,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "min-h-screen p-8 flex items-center" },
    'data-aos': "fade-up",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "w-full max-w-4xl border card justify-center !p-8" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-2xl font-bold mt-0 mb-2 !text-violet-800" },
});
(__VLS_ctx.$t('webcup.title'));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-5xl emoji" },
});
// @ts-ignore
[$t,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-lg text-gray-700 mb-4" },
});
(__VLS_ctx.$t('webcup.p1'));
// @ts-ignore
[$t,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-lg text-gray-700 mb-4" },
});
(__VLS_ctx.$t('webcup.p2'));
// @ts-ignore
[$t,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-lg text-gray-700 mb-4" },
});
(__VLS_ctx.$t('webcup.p3'));
// @ts-ignore
[$t,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-lg text-gray-700 mb-4" },
});
(__VLS_ctx.$t('webcup.p4'));
// @ts-ignore
[$t,];
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-16']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-700']} */ ;
/** @type {__VLS_StyleScopedClasses['grayscale']} */ ;
/** @type {__VLS_StyleScopedClasses['brightness-90']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-t']} */ ;
/** @type {__VLS_StyleScopedClasses['from-black/80']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-12']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/80']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wider']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-scroll-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-track']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-logos']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-logos']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-3']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:top-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:right-4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-36']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-40']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['fullDigits']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['decoration']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['!p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['!text-violet-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['emoji']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
        webCup: webCup,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
