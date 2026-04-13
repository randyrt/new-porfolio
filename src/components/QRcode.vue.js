import { ref, onMounted } from 'vue';
import QRCode from 'qrcode';
const phone = '261333026839';
const whatsappLink = `https://wa.me/${phone}`;
const qrDataUrl = ref('');
onMounted(async () => {
    try {
        qrDataUrl.value = await QRCode.toDataURL(whatsappLink, {
            width: 256,
            margin: 2,
        });
    }
    catch (err) {
        console.error('Erreur de génération QR :', err);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex flex-col items-center p-6" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "text-lg font-semibold mb-4" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-green-500" },
});
if (__VLS_ctx.qrDataUrl) {
    // @ts-ignore
    [qrDataUrl,];
    __VLS_asFunctionalElement(__VLS_elements.img)({
        src: (__VLS_ctx.qrDataUrl),
        alt: "QR Code WhatsApp",
        ...{ class: "w-64 h-64 border rounded-xl shadow-md" },
    });
    // @ts-ignore
    [qrDataUrl,];
}
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "mt-4 text-gray-700" },
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: (__VLS_ctx.whatsappLink),
    target: "_blank",
    ...{ class: "mt-3 text-blue-600 underline" },
});
// @ts-ignore
[whatsappLink,];
/** @type {__VLS_StyleScopedClasses['flex']} */;
/** @type {__VLS_StyleScopedClasses['flex-col']} */;
/** @type {__VLS_StyleScopedClasses['items-center']} */;
/** @type {__VLS_StyleScopedClasses['p-6']} */;
/** @type {__VLS_StyleScopedClasses['text-lg']} */;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */;
/** @type {__VLS_StyleScopedClasses['mb-4']} */;
/** @type {__VLS_StyleScopedClasses['text-green-500']} */;
/** @type {__VLS_StyleScopedClasses['w-64']} */;
/** @type {__VLS_StyleScopedClasses['h-64']} */;
/** @type {__VLS_StyleScopedClasses['border']} */;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */;
/** @type {__VLS_StyleScopedClasses['mt-4']} */;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */;
/** @type {__VLS_StyleScopedClasses['mt-3']} */;
/** @type {__VLS_StyleScopedClasses['text-blue-600']} */;
/** @type {__VLS_StyleScopedClasses['underline']} */;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        whatsappLink: whatsappLink,
        qrDataUrl: qrDataUrl,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
