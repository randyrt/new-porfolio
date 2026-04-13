import { useHead } from '@vueuse/head';
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
useHead({
    title: computed(() => t('quality.meta_title')),
    meta: [
        {
            name: 'Différence',
            content: computed(() => t('quality.meta_desc'))
        }
    ]
});
const loading = ref(true);
const router = useRouter();
onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});
function viewMyProject() {
    router.push('/projects');
}
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
        message: (__VLS_ctx.$t('quality.loading')),
    }));
    const __VLS_2 = __VLS_1({
        message: (__VLS_ctx.$t('quality.loading')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    // @ts-ignore
    [$t,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-4" },
    });
    const __VLS_6 = {}.AnimatedTitle;
    /** @type {[typeof __VLS_components.AnimatedTitle, ]} */ ;
    // @ts-ignore
    AnimatedTitle;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        text: (__VLS_ctx.$t('quality.quote')),
        aos: "fade-down",
    }));
    const __VLS_8 = __VLS_7({
        text: (__VLS_ctx.$t('quality.quote')),
        aos: "fade-down",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center max-w-2xl mx-auto px-4 mt-4 mb-10" },
        'data-aos': "fade-up",
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-lg italic text-gray-700 dark:text-gray-300" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-violet-800 text-lg" },
    });
    (__VLS_ctx.$t('quality.description'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-violet-800 text-lg" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-4 flex flex-col items-center justify-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
        ...{ class: "section-anime" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "container p-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "row wrapper" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-4 mr-4 col-md-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q1_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q1_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-4 mr-4 col-md-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q2_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q2_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-4 mr-4 col-md-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q3_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q3_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-4 mr-4 col-md-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q4_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q4_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-4 mr-4 col-md-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q5_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q5_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-4 mr-4 col-md-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q6_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-center" },
    });
    (__VLS_ctx.$t('quality.q6_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-center items-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.viewMyProject) },
        ...{ class: "btn-violet btn-effect-5" },
    });
    // @ts-ignore
    [viewMyProject,];
    (__VLS_ctx.$t('quality.view_projects'));
    // @ts-ignore
    [$t,];
}
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['italic']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['section-anime']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
        viewMyProject: viewMyProject,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
