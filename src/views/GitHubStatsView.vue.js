import { useHead } from '@vueuse/head';
import { computed, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import AnimatedTitle from '../components/AnimatedTitle.vue';
import Loading from '../components/Loading.vue';
import GitHubStats from '../components/GitHubStats.vue';
const { t } = useI18n();
const loading = ref(true);
useHead({
    title: computed(() => t('github.page_title')),
    meta: [
        {
            name: 'description',
            content: computed(() => t('github.page_description'))
        }
    ]
});
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
    /** @type {[typeof Loading, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Loading, new Loading({
        message: (__VLS_ctx.$t('github.loading')),
    }));
    const __VLS_1 = __VLS_0({
        message: (__VLS_ctx.$t('github.loading')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    var __VLS_3 = {};
    // @ts-ignore
    [$t,];
    var __VLS_2;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "min-h-screen py-8 px-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "max-w-6xl mx-auto" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center mb-12" },
        'data-aos': "fade-down",
    });
    /** @type {[typeof AnimatedTitle, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(AnimatedTitle, new AnimatedTitle({
        text: (__VLS_ctx.$t('github.page_quote')),
    }));
    const __VLS_6 = __VLS_5({
        text: (__VLS_ctx.$t('github.page_quote')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-lg text-gray-600 dark:text-gray-300 mt-4" },
    });
    (__VLS_ctx.$t('github.page_description'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        'data-aos': "fade-up",
    });
    /** @type {[typeof GitHubStats, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(GitHubStats, new GitHubStats({}));
    const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mt-12 grid grid-cols-1 md:grid-cols-2 gap-8" },
        'data-aos': "fade-up",
        'data-aos-delay': "200",
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-xl font-semibold text-gray-800 dark:text-white mb-4" },
    });
    (__VLS_ctx.$t('github.about_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600 dark:text-gray-300 mb-4" },
    });
    (__VLS_ctx.$t('github.about_description'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex items-center space-x-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        href: "https://github.com/randyrt",
        target: "_blank",
        ...{ class: "inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors" },
    });
    const __VLS_13 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        icon: (['fab', 'github']),
        ...{ class: "mr-2" },
    }));
    const __VLS_15 = __VLS_14({
        icon: (['fab', 'github']),
        ...{ class: "mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    (__VLS_ctx.$t('github.view_profile'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-xl font-semibold text-gray-800 dark:text-white mb-4" },
    });
    (__VLS_ctx.$t('github.stats_info_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
        ...{ class: "text-gray-600 dark:text-gray-300 space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "flex items-center" },
    });
    const __VLS_18 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        icon: "fa-solid fa-code-branch",
        ...{ class: "text-blue-500 mr-2" },
    }));
    const __VLS_20 = __VLS_19({
        icon: "fa-solid fa-code-branch",
        ...{ class: "text-blue-500 mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    (__VLS_ctx.$t('github.stats_info_repos'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "flex items-center" },
    });
    const __VLS_23 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
        icon: "fa-solid fa-users",
        ...{ class: "text-green-500 mr-2" },
    }));
    const __VLS_25 = __VLS_24({
        icon: "fa-solid fa-users",
        ...{ class: "text-green-500 mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    (__VLS_ctx.$t('github.stats_info_followers'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "flex items-center" },
    });
    const __VLS_28 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        icon: "fa-solid fa-chart-line",
        ...{ class: "text-purple-500 mr-2" },
    }));
    const __VLS_30 = __VLS_29({
        icon: "fa-solid fa-chart-line",
        ...{ class: "text-purple-500 mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    (__VLS_ctx.$t('github.stats_info_languages'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "flex items-center" },
    });
    const __VLS_33 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        icon: "fa-solid fa-calendar-alt",
        ...{ class: "text-orange-500 mr-2" },
    }));
    const __VLS_35 = __VLS_34({
        icon: "fa-solid fa-calendar-alt",
        ...{ class: "text-orange-500 mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    (__VLS_ctx.$t('github.stats_info_contributions'));
    // @ts-ignore
    [$t,];
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-12']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-purple-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-orange-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        AnimatedTitle: AnimatedTitle,
        Loading: Loading,
        GitHubStats: GitHubStats,
        loading: loading,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
