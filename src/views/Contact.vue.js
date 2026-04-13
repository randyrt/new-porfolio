import { useHead } from '@vueuse/head';
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useToast } from 'vue-toastification';
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
watchEffect(() => {
    useHead({
        title: t('contact.meta_title'),
        meta: [
            {
                name: 'Communication',
                content: t('contact.meta_desc')
            }
        ]
    });
});
const toast = useToast();
const loading = ref(true);
const sending = ref(false);
const launchConfetti = () => {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"]
    });
};
const form = ref({
    name: "",
    email: "",
    message: ""
});
onMounted(() => {
    emailjs.init("ZgI5TYSPYNESKjLKs");
    setTimeout(() => (loading.value = false), 1000);
});
const isEmailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(form.value.email);
});
const sendEmail = async () => {
    if (!form.value.name || !form.value.email || !form.value.message) {
        toast.warning(t('contact.toast_fill_all'));
        return;
    }
    if (!isEmailValid.value) {
        toast.warning(t('contact.toast_invalid_email'));
        return;
    }
    sending.value = true;
    try {
        await emailjs.send("service_higxj2g", "template_gnnec0j", {
            from_name: form.value.name,
            from_email: form.value.email,
            message: form.value.message
        });
        form.value = { name: "", email: "", message: "" };
    }
    catch (error) {
        toast.error(t('contact.toast_error'));
    }
    finally {
        sending.value = false;
        toast.success(t('contact.toast_success'));
        launchConfetti();
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['contact-form']} */ ;
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
        message: (__VLS_ctx.$t('contact.loading')),
    }));
    const __VLS_2 = __VLS_1({
        message: (__VLS_ctx.$t('contact.loading')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    // @ts-ignore
    [$t,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    const __VLS_6 = {}.AnimatedTitle;
    /** @type {[typeof __VLS_components.AnimatedTitle, ]} */ ;
    // @ts-ignore
    AnimatedTitle;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        text: (__VLS_ctx.$t('contact.quote')),
        aos: "fade-down",
    }));
    const __VLS_8 = __VLS_7({
        text: (__VLS_ctx.$t('contact.quote')),
        aos: "fade-down",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-center max-w-2xl mx-auto mb-10 px-4 mt-4" },
        'data-aos': "fade-up",
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-lg italic text-gray-700 dark:text-gray-300" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-violet-800 text-lg" },
    });
    (__VLS_ctx.$t('contact.p'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-violet-800 text-lg" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "w-full flex justify-center items-center p-16 gap-16 testimonials-container" },
        'data-aos': "fade-up",
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "contact-form card p-8" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "text",
        value: (__VLS_ctx.form.name),
        required: true,
    });
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "text-gray-500 !font-semibold" },
    });
    (__VLS_ctx.$t('contact.form_name'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "email",
        required: true,
    });
    (__VLS_ctx.form.email);
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "text-gray-500 !font-semibold" },
    });
    (__VLS_ctx.$t('contact.form_email'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
        rows: "6",
        value: (__VLS_ctx.form.message),
        required: true,
    });
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "text-gray-500 !font-semibold" },
    });
    (__VLS_ctx.$t('contact.form_message'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.sendEmail) },
        ...{ class: ([__VLS_ctx.sending ? 'cursor-not-allowed submit-btn btn-violet btn-effect-5' : 'submit-btn btn-violet btn-effect-5']) },
        type: "submit",
        disabled: (__VLS_ctx.sending),
    });
    // @ts-ignore
    [sendEmail, sending, sending,];
    (__VLS_ctx.sending ? __VLS_ctx.$t('contact.sending') : __VLS_ctx.$t('contact.send'));
    // @ts-ignore
    [$t, $t, sending,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card contact-form card p-8" },
    });
    const __VLS_11 = {}.QRcode;
    /** @type {[typeof __VLS_components.QRcode, ]} */ ;
    // @ts-ignore
    QRcode;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
    const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
}
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
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
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-16']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-16']} */ ;
/** @type {__VLS_StyleScopedClasses['testimonials-container']} */ ;
/** @type {__VLS_StyleScopedClasses['contact-form']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['!font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['!font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['!font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['contact-form']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
        sending: sending,
        form: form,
        sendEmail: sendEmail,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
