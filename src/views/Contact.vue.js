import { useHead } from '@vueuse/head';
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification';
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import { useI18n } from 'vue-i18n';
import { useGamification } from '../composables/useGamification';
const { t } = useI18n();
const { trackContactForm } = useGamification();
useHead({
    title: computed(() => t('contact.meta_title')),
    meta: [
        {
            name: 'Communication',
            content: computed(() => t('contact.meta_desc'))
        }
    ]
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
const isVerified = ref(false);
const sliderTrack = ref(null);
const thumbPosition = ref(0);
const sliderProgress = ref(0);
const isDragging = ref(false);
let startX = 0;
let maxTravel = 0;
const startDrag = (e) => {
    if (isVerified.value)
        return;
    isDragging.value = true;
    startX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    if (sliderTrack.value) {
        maxTravel = sliderTrack.value.clientWidth - 48; // 40px thumb + 8px padding
    }
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('touchmove', onDrag, { passive: false });
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
};
const onDrag = (e) => {
    if (!isDragging.value)
        return;
    if (e.cancelable)
        e.preventDefault();
    const currentX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    let delta = currentX - startX;
    if (delta < 0)
        delta = 0;
    if (delta > maxTravel)
        delta = maxTravel;
    thumbPosition.value = delta;
    sliderProgress.value = (delta / maxTravel) * 100;
    if (delta >= maxTravel) {
        isVerified.value = true;
        stopDrag();
    }
};
const stopDrag = () => {
    isDragging.value = false;
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchend', stopDrag);
    if (!isVerified.value) {
        thumbPosition.value = 0;
        sliderProgress.value = 0;
    }
};
onUnmounted(() => {
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchend', stopDrag);
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
        trackContactForm();
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
/** @type {__VLS_StyleScopedClasses['testimonials-container']} */ ;
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
        ...{ class: "contact-form card p-8 h-auto" },
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
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "form-group mb-6" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "relative h-12 bg-slate-100 rounded-2xl bg-gradient-to-r from-blue-100 to-white/90 overflow-hidden flex items-center border border-amber-300 dark:border-white/70 select-none" },
        ref: "sliderTrack",
    });
    /** @type {typeof __VLS_ctx.sliderTrack} */ ;
    // @ts-ignore
    [sliderTrack,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "absolute inset-0 flex items-center justify-center font-semibold text-sm transition-colors" },
        ...{ class: (__VLS_ctx.isVerified ? 'text-emerald-500' : 'text-slate-400') },
    });
    // @ts-ignore
    [isVerified,];
    (__VLS_ctx.isVerified ? __VLS_ctx.$t('contact.verified') : __VLS_ctx.$t('contact.slide_to_verify'));
    // @ts-ignore
    [$t, $t, isVerified,];
    const __VLS_11 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
        icon: "fa-solid fa-robot",
        ...{ class: "ml-2 text-emerald-500" },
    }));
    const __VLS_13 = __VLS_12({
        icon: "fa-solid fa-robot",
        ...{ class: "ml-2 text-emerald-500" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "absolute left-0 top-0 bottom-0 bg-emerald-400/20" },
        ...{ style: ({ width: `${__VLS_ctx.sliderProgress}%` }) },
    });
    // @ts-ignore
    [sliderProgress,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ onMousedown: (__VLS_ctx.startDrag) },
        ...{ onTouchstart: (__VLS_ctx.startDrag) },
        ...{ class: "absolute left-1 top-1 bottom-1 w-10 dark:bg-amber-500 rounded-lg shadow flex items-center justify-center cursor-grab transition-transform z-10" },
        ...{ class: ({ 'cursor-grabbing': __VLS_ctx.isDragging }) },
        ...{ style: ({ transform: `translateX(${__VLS_ctx.thumbPosition}px)` }) },
    });
    // @ts-ignore
    [startDrag, startDrag, isDragging, thumbPosition,];
    const __VLS_16 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        icon: (__VLS_ctx.isVerified ? 'fa-solid fa-check' : 'fa-solid fa-chevron-right'),
        ...{ class: (__VLS_ctx.isVerified ? 'text-emerald-500' : 'text-emerald-400 dark:text-slate-200') },
    }));
    const __VLS_18 = __VLS_17({
        icon: (__VLS_ctx.isVerified ? 'fa-solid fa-check' : 'fa-solid fa-chevron-right'),
        ...{ class: (__VLS_ctx.isVerified ? 'text-emerald-500' : 'text-emerald-400 dark:text-slate-200') },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    // @ts-ignore
    [isVerified, isVerified,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.sendEmail) },
        ...{ class: ([__VLS_ctx.sending || !__VLS_ctx.isVerified ? 'cursor-not-allowed submit-btn btn-violet btn-effect-5 opacity-50' : 'submit-btn btn-violet btn-effect-5']) },
        type: "submit",
        disabled: (__VLS_ctx.sending || !__VLS_ctx.isVerified),
    });
    // @ts-ignore
    [isVerified, isVerified, sendEmail, sending, sending,];
    (__VLS_ctx.sending ? __VLS_ctx.$t('contact.sending') : __VLS_ctx.$t('contact.send'));
    // @ts-ignore
    [$t, $t, sending,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card contact-form card" },
    });
    const __VLS_21 = {}.QRcode;
    /** @type {[typeof __VLS_components.QRcode, ]} */ ;
    // @ts-ignore
    QRcode;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
    const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
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
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['!font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['!font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['!font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-slate-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-blue-100']} */ ;
/** @type {__VLS_StyleScopedClasses['to-white/90']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-amber-300']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-white/70']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-emerald-500']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-emerald-400/20']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-amber-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-grab']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-grabbing']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['contact-form']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
        sending: sending,
        form: form,
        isVerified: isVerified,
        sliderTrack: sliderTrack,
        thumbPosition: thumbPosition,
        sliderProgress: sliderProgress,
        isDragging: isDragging,
        startDrag: startDrag,
        sendEmail: sendEmail,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
