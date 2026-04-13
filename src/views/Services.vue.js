import { useHead } from '@vueuse/head';
import { useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
useHead({
    title: computed(() => t('services.meta_title')),
    meta: [
        {
            name: 'Atouts',
            content: computed(() => t('services.meta_desc'))
        }
    ]
});
const loading = ref(true);
const router = useRouter();
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
/** @type {__VLS_StyleScopedClasses['service']} */ ;
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
        message: (__VLS_ctx.$t('services.loading')),
    }));
    const __VLS_2 = __VLS_1({
        message: (__VLS_ctx.$t('services.loading')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    // @ts-ignore
    [$t,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex flex-col space-y-10 " },
    });
    const __VLS_6 = {}.AnimatedTitle;
    /** @type {[typeof __VLS_components.AnimatedTitle, ]} */ ;
    // @ts-ignore
    AnimatedTitle;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        text: (__VLS_ctx.$t('services.quote')),
        aos: "fade-down",
    }));
    const __VLS_8 = __VLS_7({
        text: (__VLS_ctx.$t('services.quote')),
        aos: "fade-down",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6" },
        'data-aos': "fade-up",
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 service card !bg-pink-100" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "title" },
    });
    (__VLS_ctx.$t('services.git_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600" },
    });
    (__VLS_ctx.$t('services.git_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({});
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 service card !bg-pink-100" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "title" },
    });
    (__VLS_ctx.$t('services.team_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600" },
    });
    (__VLS_ctx.$t('services.team_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({});
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 service card !bg-pink-100" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "title" },
    });
    (__VLS_ctx.$t('services.deploy_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600" },
    });
    (__VLS_ctx.$t('services.deploy_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({});
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 service card !bg-green-100" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "title" },
    });
    (__VLS_ctx.$t('services.custom_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600" },
    });
    (__VLS_ctx.$t('services.custom_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({});
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.custom_li1'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.custom_li2'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.custom_li3'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 service card !bg-green-100" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "title" },
    });
    (__VLS_ctx.$t('services.collab_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600" },
    });
    (__VLS_ctx.$t('services.collab_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({});
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.collab_li1'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.collab_li2'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.collab_li3'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 service card !bg-green-100" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "title" },
    });
    (__VLS_ctx.$t('services.maintenance_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600" },
    });
    (__VLS_ctx.$t('services.maintenance_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({});
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.maintenance_li1'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.maintenance_li2'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.maintenance_li3'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 service card !bg-amber-50" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "title" },
    });
    (__VLS_ctx.$t('services.doc_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600" },
    });
    (__VLS_ctx.$t('services.doc_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
        ...{ class: "mt-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.doc_li1'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.doc_li2'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.doc_li3'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 service card !bg-amber-50" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "title" },
    });
    (__VLS_ctx.$t('services.pedagogy_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600" },
    });
    (__VLS_ctx.$t('services.pedagogy_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
        ...{ class: "mt-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.pedagogy_li1'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.pedagogy_li2'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.pedagogy_li3'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card p-6 service card !bg-amber-50" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "title" },
    });
    (__VLS_ctx.$t('services.biz_title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-gray-600" },
    });
    (__VLS_ctx.$t('services.biz_desc'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
        ...{ class: "mt-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.biz_li1'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.biz_li2'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
        ...{ class: "text-sm text-gray-700" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sky-500" },
    });
    (__VLS_ctx.$t('services.biz_li3'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-center mt-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.goToContact) },
        ...{ class: "btn-violet btn-effect-5" },
    });
    // @ts-ignore
    [goToContact,];
    (__VLS_ctx.$t('services.work_together'));
    // @ts-ignore
    [$t,];
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-10']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-10']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['service']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['!bg-pink-100']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['service']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['!bg-pink-100']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['service']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['!bg-pink-100']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['service']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['!bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['service']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['!bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['service']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['!bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['service']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['!bg-amber-50']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['service']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['!bg-amber-50']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['service']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['!bg-amber-50']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sky-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
        goToContact: goToContact,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
