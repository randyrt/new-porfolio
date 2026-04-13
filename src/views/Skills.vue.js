import { useHead } from '@vueuse/head';
import { ref, onMounted, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
watchEffect(() => {
    useHead({
        title: t('skills.meta_title'),
        meta: [
            {
                name: 'Valorisation',
                content: t('skills.meta_desc')
            }
        ]
    });
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
        message: (__VLS_ctx.$t('skills.loading')),
    }));
    const __VLS_2 = __VLS_1({
        message: (__VLS_ctx.$t('skills.loading')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    // @ts-ignore
    [$t,];
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    const __VLS_5 = {}.AnimatedTitle;
    /** @type {[typeof __VLS_components.AnimatedTitle, ]} */ ;
    // @ts-ignore
    AnimatedTitle;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        text: (__VLS_ctx.$t('skills.quote')),
        aos: "fade-down",
    }));
    const __VLS_7 = __VLS_6({
        text: (__VLS_ctx.$t('skills.quote')),
        aos: "fade-down",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    // @ts-ignore
    [$t,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-center max-w-2xl mx-auto px-4 mt-4" },
    'data-aos': "fade-up",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-lg italic text-gray-700 dark:text-gray-300" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-violet-800 text-lg" },
});
(__VLS_ctx.$t('skills.description'));
// @ts-ignore
[$t,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-violet-800 text-lg" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-stretch flex-wrap bg-gray-100 gap-4 p-4 mt-4 text-lg" },
    'data-aos': "fade-up",
});
const __VLS_10 = {}.SkillSection;
/** @type {[typeof __VLS_components.SkillSection, ]} */ ;
// @ts-ignore
SkillSection;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    title: (__VLS_ctx.$t('skills.vue_title')),
    bgColor: ('bg-yellow-100'),
    borderColor: ('border-yellow-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.vue_s1_name'),
            description: __VLS_ctx.$t('skills.vue_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.vue_s2_name'),
            description: __VLS_ctx.$t('skills.vue_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.vue_s3_name'),
            description: __VLS_ctx.$t('skills.vue_s3_desc')
        }
    ]),
}));
const __VLS_12 = __VLS_11({
    title: (__VLS_ctx.$t('skills.vue_title')),
    bgColor: ('bg-yellow-100'),
    borderColor: ('border-yellow-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.vue_s1_name'),
            description: __VLS_ctx.$t('skills.vue_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.vue_s2_name'),
            description: __VLS_ctx.$t('skills.vue_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.vue_s3_name'),
            description: __VLS_ctx.$t('skills.vue_s3_desc')
        }
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
// @ts-ignore
[$t, $t, $t, $t, $t, $t, $t,];
const __VLS_15 = {}.SkillSection;
/** @type {[typeof __VLS_components.SkillSection, ]} */ ;
// @ts-ignore
SkillSection;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    title: (__VLS_ctx.$t('skills.laravel_title')),
    bgColor: ('bg-sky-100'),
    borderColor: ('border-sky-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.laravel_s1_name'), description: __VLS_ctx.$t('skills.laravel_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.laravel_s2_name'), description: __VLS_ctx.$t('skills.laravel_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.laravel_s3_name'), description: __VLS_ctx.$t('skills.laravel_s3_desc')
        }
    ]),
}));
const __VLS_17 = __VLS_16({
    title: (__VLS_ctx.$t('skills.laravel_title')),
    bgColor: ('bg-sky-100'),
    borderColor: ('border-sky-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.laravel_s1_name'), description: __VLS_ctx.$t('skills.laravel_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.laravel_s2_name'), description: __VLS_ctx.$t('skills.laravel_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.laravel_s3_name'), description: __VLS_ctx.$t('skills.laravel_s3_desc')
        }
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
// @ts-ignore
[$t, $t, $t, $t, $t, $t, $t,];
const __VLS_20 = {}.SkillSection;
/** @type {[typeof __VLS_components.SkillSection, ]} */ ;
// @ts-ignore
SkillSection;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    title: (__VLS_ctx.$t('skills.docker_title')),
    bgColor: ('bg-violet-100'),
    borderColor: ('border-violet-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.docker_s1_name'),
            description: __VLS_ctx.$t('skills.docker_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.docker_s2_name'),
            description: __VLS_ctx.$t('skills.docker_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.docker_s3_name'),
            description: __VLS_ctx.$t('skills.docker_s3_desc')
        }
    ]),
}));
const __VLS_22 = __VLS_21({
    title: (__VLS_ctx.$t('skills.docker_title')),
    bgColor: ('bg-violet-100'),
    borderColor: ('border-violet-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.docker_s1_name'),
            description: __VLS_ctx.$t('skills.docker_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.docker_s2_name'),
            description: __VLS_ctx.$t('skills.docker_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.docker_s3_name'),
            description: __VLS_ctx.$t('skills.docker_s3_desc')
        }
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
// @ts-ignore
[$t, $t, $t, $t, $t, $t, $t,];
const __VLS_25 = {}.SkillSection;
/** @type {[typeof __VLS_components.SkillSection, ]} */ ;
// @ts-ignore
SkillSection;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    title: (__VLS_ctx.$t('skills.ionic_title')),
    bgColor: ('bg-green-100'),
    borderColor: ('border-sky-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.ionic_s1_name'),
            description: __VLS_ctx.$t('skills.ionic_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.ionic_s2_name'),
            description: __VLS_ctx.$t('skills.ionic_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.ionic_s3_name'),
            description: __VLS_ctx.$t('skills.ionic_s3_desc')
        }
    ]),
}));
const __VLS_27 = __VLS_26({
    title: (__VLS_ctx.$t('skills.ionic_title')),
    bgColor: ('bg-green-100'),
    borderColor: ('border-sky-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.ionic_s1_name'),
            description: __VLS_ctx.$t('skills.ionic_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.ionic_s2_name'),
            description: __VLS_ctx.$t('skills.ionic_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.ionic_s3_name'),
            description: __VLS_ctx.$t('skills.ionic_s3_desc')
        }
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
// @ts-ignore
[$t, $t, $t, $t, $t, $t, $t,];
const __VLS_30 = {}.SkillSection;
/** @type {[typeof __VLS_components.SkillSection, ]} */ ;
// @ts-ignore
SkillSection;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    title: (__VLS_ctx.$t('skills.python_title')),
    bgColor: ('bg-pink-100'),
    borderColor: ('border-yellow-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.python_s1_name'),
            description: __VLS_ctx.$t('skills.python_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.python_s2_name'),
            description: __VLS_ctx.$t('skills.python_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.python_s3_name'),
            description: __VLS_ctx.$t('skills.python_s3_desc')
        }
    ]),
}));
const __VLS_32 = __VLS_31({
    title: (__VLS_ctx.$t('skills.python_title')),
    bgColor: ('bg-pink-100'),
    borderColor: ('border-yellow-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.python_s1_name'),
            description: __VLS_ctx.$t('skills.python_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.python_s2_name'),
            description: __VLS_ctx.$t('skills.python_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.python_s3_name'),
            description: __VLS_ctx.$t('skills.python_s3_desc')
        }
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
// @ts-ignore
[$t, $t, $t, $t, $t, $t, $t,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-stretch flex-wrap bg-gray-100 gap-4 p-4 text-lg" },
});
const __VLS_35 = {}.SkillSection;
/** @type {[typeof __VLS_components.SkillSection, ]} */ ;
// @ts-ignore
SkillSection;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    title: (__VLS_ctx.$t('skills.nuxt_title')),
    bgColor: ('bg-orange-100'),
    borderColor: ('border-orange-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.nuxt_s1_name'),
            description: __VLS_ctx.$t('skills.nuxt_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.nuxt_s2_name'),
            description: __VLS_ctx.$t('skills.nuxt_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.nuxt_s3_name'),
            description: __VLS_ctx.$t('skills.nuxt_s3_desc')
        }
    ]),
}));
const __VLS_37 = __VLS_36({
    title: (__VLS_ctx.$t('skills.nuxt_title')),
    bgColor: ('bg-orange-100'),
    borderColor: ('border-orange-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.nuxt_s1_name'),
            description: __VLS_ctx.$t('skills.nuxt_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.nuxt_s2_name'),
            description: __VLS_ctx.$t('skills.nuxt_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.nuxt_s3_name'),
            description: __VLS_ctx.$t('skills.nuxt_s3_desc')
        }
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
// @ts-ignore
[$t, $t, $t, $t, $t, $t, $t,];
const __VLS_40 = {}.SkillSection;
/** @type {[typeof __VLS_components.SkillSection, ]} */ ;
// @ts-ignore
SkillSection;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    title: (__VLS_ctx.$t('skills.symfony_title')),
    bgColor: ('bg-cyan-100'),
    borderColor: ('border-cyan-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.symfony_s1_name'),
            description: __VLS_ctx.$t('skills.symfony_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.symfony_s2_name'),
            description: __VLS_ctx.$t('skills.symfony_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.symfony_s3_name'),
            description: __VLS_ctx.$t('skills.symfony_s3_desc')
        }
    ]),
}));
const __VLS_42 = __VLS_41({
    title: (__VLS_ctx.$t('skills.symfony_title')),
    bgColor: ('bg-cyan-100'),
    borderColor: ('border-cyan-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.symfony_s1_name'),
            description: __VLS_ctx.$t('skills.symfony_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.symfony_s2_name'),
            description: __VLS_ctx.$t('skills.symfony_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.symfony_s3_name'),
            description: __VLS_ctx.$t('skills.symfony_s3_desc')
        }
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
// @ts-ignore
[$t, $t, $t, $t, $t, $t, $t,];
const __VLS_45 = {}.SkillSection;
/** @type {[typeof __VLS_components.SkillSection, ]} */ ;
// @ts-ignore
SkillSection;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    title: (__VLS_ctx.$t('skills.cicd_title')),
    bgColor: ('bg-amber-100'),
    borderColor: ('border-amber-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.cicd_s1_name'),
            description: __VLS_ctx.$t('skills.cicd_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.cicd_s2_name'),
            description: __VLS_ctx.$t('skills.cicd_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.cicd_s3_name'),
            description: __VLS_ctx.$t('skills.cicd_s3_desc')
        }
    ]),
}));
const __VLS_47 = __VLS_46({
    title: (__VLS_ctx.$t('skills.cicd_title')),
    bgColor: ('bg-amber-100'),
    borderColor: ('border-amber-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.cicd_s1_name'),
            description: __VLS_ctx.$t('skills.cicd_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.cicd_s2_name'),
            description: __VLS_ctx.$t('skills.cicd_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.cicd_s3_name'),
            description: __VLS_ctx.$t('skills.cicd_s3_desc')
        }
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
// @ts-ignore
[$t, $t, $t, $t, $t, $t, $t,];
const __VLS_50 = {}.SkillSection;
/** @type {[typeof __VLS_components.SkillSection, ]} */ ;
// @ts-ignore
SkillSection;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    title: (__VLS_ctx.$t('skills.flutter_title')),
    bgColor: ('bg-teal-100'),
    borderColor: ('border-teal-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.flutter_s1_name'),
            description: __VLS_ctx.$t('skills.flutter_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.flutter_s2_name'),
            description: __VLS_ctx.$t('skills.flutter_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.flutter_s3_name'),
            description: __VLS_ctx.$t('skills.flutter_s3_desc')
        }
    ]),
}));
const __VLS_52 = __VLS_51({
    title: (__VLS_ctx.$t('skills.flutter_title')),
    bgColor: ('bg-teal-100'),
    borderColor: ('border-teal-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.flutter_s1_name'),
            description: __VLS_ctx.$t('skills.flutter_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.flutter_s2_name'),
            description: __VLS_ctx.$t('skills.flutter_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.flutter_s3_name'),
            description: __VLS_ctx.$t('skills.flutter_s3_desc')
        }
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
// @ts-ignore
[$t, $t, $t, $t, $t, $t, $t,];
const __VLS_55 = {}.SkillSection;
/** @type {[typeof __VLS_components.SkillSection, ]} */ ;
// @ts-ignore
SkillSection;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    title: (__VLS_ctx.$t('skills.express_title')),
    bgColor: ('bg-red-100'),
    borderColor: ('border-red-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.express_s1_name'),
            description: __VLS_ctx.$t('skills.express_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.express_s2_name'),
            description: __VLS_ctx.$t('skills.express_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.express_s3_name'),
            description: __VLS_ctx.$t('skills.express_s3_desc')
        }
    ]),
}));
const __VLS_57 = __VLS_56({
    title: (__VLS_ctx.$t('skills.express_title')),
    bgColor: ('bg-red-100'),
    borderColor: ('border-red-200'),
    skills: ([
        {
            name: __VLS_ctx.$t('skills.express_s1_name'),
            description: __VLS_ctx.$t('skills.express_s1_desc')
        },
        {
            name: __VLS_ctx.$t('skills.express_s2_name'),
            description: __VLS_ctx.$t('skills.express_s2_desc')
        },
        {
            name: __VLS_ctx.$t('skills.express_s3_name'),
            description: __VLS_ctx.$t('skills.express_s3_desc')
        }
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
// @ts-ignore
[$t, $t, $t, $t, $t, $t, $t,];
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['italic']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
