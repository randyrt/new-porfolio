import { useHead } from '@vueuse/head';
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
useHead({
    title: computed(() => t('about.meta_title')),
    meta: [
        {
            name: 'Conclusion',
            content: computed(() => t('about.meta_desc'))
        }
    ]
});
const loading = ref(true);
const stats = ref([
    { value: 15, displayValue: 0, labelKey: "about.stats.projects", suffix: "+" },
    { value: 15, displayValue: 0, labelKey: "about.stats.clients", suffix: "+" },
    { value: 5, displayValue: 0, labelKey: "about.stats.years", suffix: "+" },
]);
let animationFrame;
let startTime = null;
const duration = 2000;
const values = computed(() => [
    { icon: "🚀", title: t('about.values.innovation_title'), description: t('about.values.innovation_desc') },
    { icon: "🤝", title: t('about.values.trust_title'), description: t('about.values.trust_desc') },
    { icon: "💡", title: t('about.values.creativity_title'), description: t('about.values.creativity_desc') }
]);
const animateCounters = (timestamp) => {
    if (!startTime)
        startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    stats.value.forEach(stat => {
        stat.displayValue = Math.floor(progress * stat.value);
    });
    if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCounters);
    }
    else {
        stats.value.forEach(stat => {
            stat.displayValue = stat.value;
        });
    }
};
onMounted(() => {
    setTimeout(() => {
        loading.value = false;
        setTimeout(() => {
            animationFrame = requestAnimationFrame(animateCounters);
        }, 500);
    }, 1000);
});
onUnmounted(() => {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
});
const showTechDetails = ref(false);
const perfomanceTest = () => {
    showTechDetails.value = true;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['modal-enter-active']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-leave-active']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-enter-from']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-leave-to']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
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
        message: (__VLS_ctx.$t('about.loading')),
    }));
    const __VLS_2 = __VLS_1({
        message: (__VLS_ctx.$t('about.loading')),
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
        text: (__VLS_ctx.$t('about.quote')),
        aos: "fade-down",
    }));
    const __VLS_7 = __VLS_6({
        text: (__VLS_ctx.$t('about.quote')),
        aos: "fade-down",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    // @ts-ignore
    [$t,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "p-4 w-full space-y-12 flex flex-col items-center justify-center max-w-4xl mx-auto" },
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "grid md:grid-cols-3 gap-6 mt-16" },
    'data-aos': "fade-up",
});
for (const [value] of __VLS_getVForSourceType((__VLS_ctx.values))) {
    // @ts-ignore
    [values,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (value.title),
        ...{ class: "text-center p-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-6xl mb-2" },
    });
    (value.icon);
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "font-bold" },
    });
    (value.title);
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-gray-500" },
    });
    (value.description);
}
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "stats-section flex flex-wrap justify-center gap-8 py-8" },
});
for (const [stat] of __VLS_getVForSourceType((__VLS_ctx.stats))) {
    // @ts-ignore
    [stats,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (stat.labelKey),
        ...{ class: "text-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-6xl font-bold text-violet-600" },
    });
    (stat.displayValue);
    (stat.suffix);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-sm text-gray-500" },
    });
    (__VLS_ctx.$t(stat.labelKey));
    // @ts-ignore
    [$t,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card p-2" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "p-2" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center justify-between gap-3" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-gray-700 text-sm flex-1" },
});
(__VLS_ctx.$t('about.curious'));
// @ts-ignore
[$t,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "font-medium text-gray-800" },
});
(__VLS_ctx.$t('about.discover_arch'));
// @ts-ignore
[$t,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.perfomanceTest) },
    ...{ class: "btn-violet inline-block text-center btn-effect-5" },
    'aria-label': (__VLS_ctx.$t('about.view_perf')),
});
// @ts-ignore
[$t, perfomanceTest,];
const __VLS_10 = {}.FontAwesomeIcon;
/** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
// @ts-ignore
FontAwesomeIcon;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    icon: (['fas', 'chart-line']),
}));
const __VLS_12 = __VLS_11({
    icon: (['fas', 'chart-line']),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-sm" },
});
(__VLS_ctx.$t('about.explore'));
// @ts-ignore
[$t,];
const __VLS_15 = {}.Teleport;
/** @type {[typeof __VLS_components.Teleport, typeof __VLS_components.Teleport, ]} */ ;
// @ts-ignore
Teleport;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    to: "body",
}));
const __VLS_17 = __VLS_16({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_19 } = __VLS_18.slots;
const __VLS_20 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    name: "modal",
}));
const __VLS_22 = __VLS_21({
    name: "modal",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_24 } = __VLS_23.slots;
if (__VLS_ctx.showTechDetails) {
    // @ts-ignore
    [showTechDetails,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showTechDetails))
                    return;
                __VLS_ctx.showTechDetails = false;
                // @ts-ignore
                [showTechDetails,];
            } },
        ...{ class: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bg-white max-w-4xl w-full max-h-[80vh] rounded-overflow overflow-y-auto transition-all duration-300" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "sticky top-0 bg-white  border-b p-4 flex justify-between items-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-xl font-bold flex items-center gap-2" },
    });
    const __VLS_25 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        icon: (['fas', 'tools']),
        ...{ class: "text-violet-600" },
    }));
    const __VLS_27 = __VLS_26({
        icon: (['fas', 'tools']),
        ...{ class: "text-violet-600" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent" },
    });
    (__VLS_ctx.$t('about.tech_stack'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showTechDetails))
                    return;
                __VLS_ctx.showTechDetails = false;
                // @ts-ignore
                [showTechDetails,];
            } },
        ...{ class: "text-white bg-violet-500 px-3 py-1 rounded hover:bg-violet-400 transition-colors" },
    });
    (__VLS_ctx.$t('about.close'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "p-6 space-y-6" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "border-l-4 border-green-500 pl-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
        ...{ class: "font-bold text-lg flex items-center gap-2" },
    });
    const __VLS_30 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        icon: (['fab', 'vuejs']),
        ...{ class: "text-green-600" },
    }));
    const __VLS_32 = __VLS_31({
        icon: (['fab', 'vuejs']),
        ...{ class: "text-green-600" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sm font-mono card rounded px-2 py-1" },
    });
    const __VLS_35 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        icon: (['fas', 'code']),
        ...{ class: "mr-1 text-xs" },
    }));
    const __VLS_37 = __VLS_36({
        icon: (['fas', 'code']),
        ...{ class: "mr-1 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sm font-mono card rounded px-2 py-1" },
    });
    const __VLS_40 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        icon: (['fas', 'chart-line']),
        ...{ class: "mr-1 text-xs" },
    }));
    const __VLS_42 = __VLS_41({
        icon: (['fas', 'chart-line']),
        ...{ class: "mr-1 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sm font-mono card rounded px-2 py-1" },
    });
    const __VLS_45 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        icon: (['fas', 'eye']),
        ...{ class: "mr-1 text-xs" },
    }));
    const __VLS_47 = __VLS_46({
        icon: (['fas', 'eye']),
        ...{ class: "mr-1 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sm font-mono card rounded px-2 py-1" },
    });
    const __VLS_50 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
        icon: (['fas', 'sync']),
        ...{ class: "mr-1 text-xs" },
    }));
    const __VLS_52 = __VLS_51({
        icon: (['fas', 'sync']),
        ...{ class: "mr-1 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    (__VLS_ctx.$t('about.vue_lifecycle'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-gray-600 mt-2" },
    });
    (__VLS_ctx.$t('about.vue_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "border-l-4 border-blue-500 pl-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
        ...{ class: "font-bold text-lg flex items-center gap-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-xs text-blue-700 px-1" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (__VLS_ctx.$t('about.ts_strict'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bg-gray-900 text-green-400 p-3 rounded-md text-xs font-mono mt-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.pre, __VLS_elements.pre)({});
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-gray-600 mt-2" },
    });
    (__VLS_ctx.$t('about.ts_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "border-l-4 border-purple-500 pl-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
        ...{ class: "font-bold text-lg flex items-center gap-2" },
    });
    const __VLS_55 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
        icon: (['fas', 'vial']),
        ...{ class: "text-purple-600" },
    }));
    const __VLS_57 = __VLS_56({
        icon: (['fas', 'vial']),
        ...{ class: "text-purple-600" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (__VLS_ctx.$t('about.tests_quality'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-3 mt-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-3 rounded-md flex items-start gap-2" },
    });
    const __VLS_60 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        icon: (['fas', 'check-circle']),
        ...{ class: "text-green-500 mt-0.5" },
    }));
    const __VLS_62 = __VLS_61({
        icon: (['fas', 'check-circle']),
        ...{ class: "text-green-500 mt-0.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "font-mono text-sm font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-xs text-gray-600" },
    });
    (__VLS_ctx.$t('about.tests_unit'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-3 rounded-md flex items-start gap-2" },
    });
    const __VLS_65 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
        icon: (['fas', 'flask']),
        ...{ class: "text-purple-500 mt-0.5" },
    }));
    const __VLS_67 = __VLS_66({
        icon: (['fas', 'flask']),
        ...{ class: "text-purple-500 mt-0.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_66));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "font-mono text-sm font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-xs text-gray-600" },
    });
    (__VLS_ctx.$t('about.tests_mount'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-3 rounded-md flex items-start gap-2" },
    });
    const __VLS_70 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
        icon: (['fas', 'chart-pie']),
        ...{ class: "text-blue-500 mt-0.5" },
    }));
    const __VLS_72 = __VLS_71({
        icon: (['fas', 'chart-pie']),
        ...{ class: "text-blue-500 mt-0.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "font-mono text-sm font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-xs text-gray-600" },
    });
    (__VLS_ctx.$t('about.tests_coverage'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-3 rounded-md flex items-start gap-2" },
    });
    const __VLS_75 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
        icon: (['fas', 'shield-alt']),
        ...{ class: "text-indigo-500 mt-0.5" },
    }));
    const __VLS_77 = __VLS_76({
        icon: (['fas', 'shield-alt']),
        ...{ class: "text-indigo-500 mt-0.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "font-mono text-sm font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-xs text-gray-600" },
    });
    (__VLS_ctx.$t('about.tests_type'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "border-l-4 border-black pl-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
        ...{ class: "font-bold text-lg flex items-center gap-2" },
    });
    const __VLS_80 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
        icon: (['fab', 'github']),
        ...{ class: "text-gray-700" },
    }));
    const __VLS_82 = __VLS_81({
        icon: (['fab', 'github']),
        ...{ class: "text-gray-700" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_81));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (__VLS_ctx.$t('about.ci_cd'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bg-gray-900 text-green-400 p-3 rounded-md text-xs font-mono mt-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.pre, __VLS_elements.pre)({});
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex flex-wrap gap-3 mt-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-gray-600 mt-2" },
    });
    (__VLS_ctx.$t('about.ci_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "relative pl-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "absolute left-0 top-0 h-full w-1 custom-multi-gradient" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-4 rounded-lg" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-2 md:grid-cols-4 gap-4 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    const __VLS_85 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
        icon: (['fas', 'check-double']),
        ...{ class: "text-violet-600 text-xl mb-1" },
    }));
    const __VLS_87 = __VLS_86({
        icon: (['fas', 'check-double']),
        ...{ class: "text-violet-600 text-xl mb-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_86));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-2xl font-bold text-violet-600" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-xs text-gray-600" },
    });
    (__VLS_ctx.$t('about.ts_strict'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    const __VLS_90 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
        icon: (['fas', 'tachometer-alt']),
        ...{ class: "text-violet-600 text-xl mb-1" },
    }));
    const __VLS_92 = __VLS_91({
        icon: (['fas', 'tachometer-alt']),
        ...{ class: "text-violet-600 text-xl mb-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_91));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-2xl font-bold text-violet-600" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-xs text-gray-600" },
    });
    (__VLS_ctx.$t('about.perf_time'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    const __VLS_95 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
        icon: (['fas', 'check-circle']),
        ...{ class: "text-violet-600 text-xl mb-1" },
    }));
    const __VLS_97 = __VLS_96({
        icon: (['fas', 'check-circle']),
        ...{ class: "text-violet-600 text-xl mb-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_96));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-2xl font-bold text-violet-600" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-xs text-gray-600" },
    });
    (__VLS_ctx.$t('about.pipeline'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    const __VLS_100 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
        icon: (['fas', 'cloud-upload-alt']),
        ...{ class: "text-violet-600 text-xl mb-1" },
    }));
    const __VLS_102 = __VLS_101({
        icon: (['fas', 'cloud-upload-alt']),
        ...{ class: "text-violet-600 text-xl mb-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_101));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-2xl font-bold text-violet-600" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-xs text-gray-600" },
    });
    (__VLS_ctx.$t('about.deploy'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center text-sm text-gray-500 border-t pt-4" },
    });
    (__VLS_ctx.$t('about.source_code'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        href: "https://github.com/randyrt/new-porfolio",
        target: "_blank",
        ...{ class: "text-violet-600 hover:text-violet-400 transition-colors" },
    });
    (__VLS_ctx.$t('about.view_github'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-violet-700" },
    });
    (__VLS_ctx.$t('about.web_quality'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        href: "https://pagespeed.web.dev/analysis/https-realporfolio-netlify-app/sc142ifq6r?form_factor=desktop",
        target: "_blank",
        ...{ class: "text-violet-600 hover:text-violet-400 transition-colors" },
    });
    (__VLS_ctx.$t('about.view_pagespeed'));
    // @ts-ignore
    [$t,];
}
var __VLS_23;
var __VLS_18;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-12']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-section']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/50']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[80vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-overflow']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['to-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-clip-text']} */ ;
/** @type {__VLS_StyleScopedClasses['text-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-violet-400']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-l-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-l-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-700']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-l-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-purple-500']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-purple-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['border-l-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-black']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-1']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-multi-gradient']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-violet-400']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-violet-400']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
        stats: stats,
        values: values,
        showTechDetails: showTechDetails,
        perfomanceTest: perfomanceTest,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
