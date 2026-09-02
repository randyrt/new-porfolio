import { useHead } from '@vueuse/head';
import { computed, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
useHead({
    title: computed(() => t('testimonials.meta_title')),
    meta: [
        {
            name: 'Satisfacation',
            content: computed(() => t('testimonials.meta_desc'))
        }
    ]
});
const loading = ref(true);
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
/** @type {__VLS_StyleScopedClasses['testimonial-link']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-link']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-link']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-link']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-card']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-card']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-link']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-link']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-link']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-link']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-link']} */ ;
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
        message: (__VLS_ctx.$t('testimonials.loading')),
    }));
    const __VLS_2 = __VLS_1({
        message: (__VLS_ctx.$t('testimonials.loading')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    // @ts-ignore
    [$t,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "w-full flex flex-col items-center justify-center" },
    });
    const __VLS_6 = {}.AnimatedTitle;
    /** @type {[typeof __VLS_components.AnimatedTitle, ]} */ ;
    // @ts-ignore
    AnimatedTitle;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        text: (__VLS_ctx.$t('testimonials.quote')),
        aos: "fade-down",
    }));
    const __VLS_8 = __VLS_7({
        text: (__VLS_ctx.$t('testimonials.quote')),
        aos: "fade-down",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center max-w-2xl mx-auto mb-10 px-4" },
        'data-aos': "fade-up",
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-lg italic text-gray-700 dark:text-gray-300" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-violet-800 text-lg" },
    });
    (__VLS_ctx.$t('testimonials.description'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-violet-800 text-lg" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "w-full flex justify-between items-center p-16 gap-16 testimonials-container" },
        'data-aos': "fade-up",
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "w-1/2 h-auto min-h-[240px] card p-4 flex flex-col justify-center items-center gap-3 testimonial-card" },
    });
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: "/images/temoins/olivier_le_grand.png",
        alt: "Olivier Le Grand",
        ...{ class: "h-16 w-16 rounded-full object-cover border-2 border-violet-300 shadow-sm" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "mb-1 text-center" },
    });
    (__VLS_ctx.$t('testimonials.t1_body'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.h6, __VLS_elements.h6)({
        ...{ class: "text-xs italic" },
    });
    (__VLS_ctx.$t('testimonials.t1_author'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.em, __VLS_elements.em)({});
    (__VLS_ctx.$t('testimonials.t1_role'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        href: "https://www.linkedin.com/in/olivier-legrand-412249126/",
        target: "_blank",
        rel: "noopener noreferrer",
        ...{ class: "testimonial-link" },
    });
    __VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
        ...{ class: "w-4 h-4 mr-2" },
        fill: "currentColor",
        viewBox: "0 0 24 24",
    });
    __VLS_asFunctionalElement(__VLS_elements.path)({
        d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    });
    (__VLS_ctx.$t('testimonials.t1_link'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "w-1/2 h-auto min-h-[240px] card p-4 flex flex-col justify-center items-center gap-3 testimonial-card" },
    });
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: "/images/temoins/jean-pierre.png",
        alt: "Jean-Pierre",
        ...{ class: "h-16 w-16 rounded-full object-cover border-2 border-violet-300 shadow-sm" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "mb-1 text-center" },
    });
    (__VLS_ctx.$t('testimonials.t2_body'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.h6, __VLS_elements.h6)({
        ...{ class: "text-xs italic" },
    });
    (__VLS_ctx.$t('testimonials.t2_author'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.em, __VLS_elements.em)({});
    (__VLS_ctx.$t('testimonials.t2_role'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        href: "https://www.digitalwallonia.be/fr/cartographie/management-consultance-partenaire/",
        target: "_blank",
        rel: "noopener noreferrer",
        ...{ class: "testimonial-link" },
    });
    __VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
        ...{ class: "w-4 h-4 mr-2" },
        fill: "currentColor",
        viewBox: "0 0 24 24",
    });
    __VLS_asFunctionalElement(__VLS_elements.path)({
        d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    });
    (__VLS_ctx.$t('testimonials.t2_link'));
    // @ts-ignore
    [$t,];
}
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['italic']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-16']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-16']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonials-container']} */ ;
/** @type {__VLS_StyleScopedClasses['w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[240px]']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-card']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-violet-300']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['italic']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-link']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[240px]']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-card']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-violet-300']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['italic']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonial-link']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
