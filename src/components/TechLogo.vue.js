import { useToast } from 'vue-toastification';
const toast = useToast();
function haha() {
    toast.info("✨ " + name + " - En constante évolution !");
}
const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tech-logo-img']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-logo-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-logo-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-logo-img']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-logo-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-logo-img']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ onClick: (__VLS_ctx.haha) },
    ...{ class: "tech-logo-wrapper" },
});
// @ts-ignore
[haha,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "tech-logo-inner shadow-lg p-1 rounded-full" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: (__VLS_ctx.logo),
    alt: (__VLS_ctx.name),
    ...{ class: "tech-logo-img rounded-full" },
    loading: "lazy",
});
// @ts-ignore
[logo, name,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "tech-logo-tooltip" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "tech-name " },
});
(__VLS_ctx.name);
// @ts-ignore
[name,];
/** @type {__VLS_StyleScopedClasses['tech-logo-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-logo-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-logo-img']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-logo-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-name']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        haha: haha,
    }),
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
