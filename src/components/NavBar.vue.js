import { ref, onMounted, computed } from 'vue';
import { toggleTheme, getStoredTheme } from '../services/theme.js';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const props = defineProps();
const isOpen = ref(false);
const currentTheme = ref(getStoredTheme());
const router = useRouter();
const { locale } = useI18n();
const currentLocale = ref(localStorage.getItem('locale') || 'fr');
function toggleLanguage() {
    const newLocale = currentLocale.value === 'fr' ? 'en' : 'fr';
    currentLocale.value = newLocale;
    locale.value = newLocale; // Update i18n
    localStorage.setItem('locale', newLocale);
}
// Icône du thème en fonction de currentTheme
const themeIcon = computed(() => {
    return currentTheme.value === 'light' ? ['fas', 'moon'] : ['fas', 'sun'];
});
function cycleTheme() {
    const next = toggleTheme();
    currentTheme.value = next;
}
function goHome() {
    router.push('/');
}
onMounted(() => {
    currentTheme.value = getStoredTheme();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex h-screen flex-col md:flex-row" },
});
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "md:hidden flex justify-between items-center p-4 shadow bg-gray-50" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-3" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "animated-gradient-text font-bold text-xl" },
});
(__VLS_ctx.brand);
// @ts-ignore
[brand,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.toggleLanguage) },
    ...{ class: "font-bold text-gray-500 hover:text-violet-500 uppercase mx-2 text-sm md:text-base" },
});
// @ts-ignore
[toggleLanguage,];
(__VLS_ctx.currentLocale);
// @ts-ignore
[currentLocale,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ onClick: (__VLS_ctx.cycleTheme) },
    ...{ class: "rounded-full p-1 border-3 border-violet-500 bg-white cursor-pointer" },
});
// @ts-ignore
[cycleTheme,];
const __VLS_0 = {}.FontAwesomeIcon;
/** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
// @ts-ignore
FontAwesomeIcon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    icon: (__VLS_ctx.themeIcon),
    ...{ class: "text-yellow-500" },
}));
const __VLS_2 = __VLS_1({
    icon: (__VLS_ctx.themeIcon),
    ...{ class: "text-yellow-500" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
// @ts-ignore
[themeIcon,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.isOpen = !__VLS_ctx.isOpen;
            // @ts-ignore
            [isOpen, isOpen,];
        } },
    ...{ class: "p-2 focus:outline-none" },
});
if (!__VLS_ctx.isOpen) {
    // @ts-ignore
    [isOpen,];
    __VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        ...{ class: "h-6 w-6 text-gray-700" },
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
    });
    __VLS_asFunctionalElement(__VLS_elements.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M4 6h16M4 12h16M4 18h16",
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        ...{ class: "h-6 w-6 text-gray-700" },
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
    });
    __VLS_asFunctionalElement(__VLS_elements.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M6 18L18 6M6 6l12 12",
    });
}
if (__VLS_ctx.isOpen) {
    // @ts-ignore
    [isOpen,];
    __VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
        ...{ class: "md:hidden flex flex-col bg-gray-50 shadow px-4 py-2 space-y-2" },
    });
    for (const [route] of __VLS_getVForSourceType((__VLS_ctx.routes))) {
        // @ts-ignore
        [routes,];
        const __VLS_5 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
        // @ts-ignore
        RouterLink;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
            key: (route.path),
            to: (route.path),
            ...{ class: "decoration px-4 py-2 rounded-md !text-gray-500 hover:bg-violet-100 flex items-center gap-2" },
            activeClass: "bg-violet-200 font-bold",
        }));
        const __VLS_7 = __VLS_6({
            key: (route.path),
            to: (route.path),
            ...{ class: "decoration px-4 py-2 rounded-md !text-gray-500 hover:bg-violet-100 flex items-center gap-2" },
            activeClass: "bg-violet-200 font-bold",
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        const { default: __VLS_9 } = __VLS_8.slots;
        const __VLS_10 = {}.FontAwesomeIcon;
        /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
        // @ts-ignore
        FontAwesomeIcon;
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
            icon: (route.icon),
            ...{ class: "text-gray-500" },
        }));
        const __VLS_12 = __VLS_11({
            icon: (route.icon),
            ...{ class: "text-gray-500" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_11));
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (route.name);
        var __VLS_8;
    }
}
__VLS_asFunctionalElement(__VLS_elements.aside, __VLS_elements.aside)({
    ...{ class: "hidden md:flex w-64 h-screen shadow-lg flex-col bg-violet-50" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "p-6 text-xl font-bold flex items-center justify-between" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ onClick: (__VLS_ctx.goHome) },
    ...{ class: "animated-gradient-text cursor-pointer" },
});
// @ts-ignore
[goHome,];
(__VLS_ctx.brand);
// @ts-ignore
[brand,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex items-center gap-2" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.toggleLanguage) },
    ...{ class: "font-bold text-gray-400 hover:text-violet-500 uppercase text-sm" },
    title: "Change Language",
});
// @ts-ignore
[toggleLanguage,];
(__VLS_ctx.currentLocale);
// @ts-ignore
[currentLocale,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ onClick: (__VLS_ctx.cycleTheme) },
    ...{ class: "relative ml-4" },
});
// @ts-ignore
[cycleTheme,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "\u0061\u0062\u0073\u006f\u006c\u0075\u0074\u0065\u0020\u002d\u0074\u006f\u0070\u002d\u0038\u0020\u006c\u0065\u0066\u0074\u002d\u0031\u002f\u0032\u0020\u002d\u0074\u0072\u0061\u006e\u0073\u006c\u0061\u0074\u0065\u002d\u0078\u002d\u0031\u002f\u0032\u0020\u0077\u0068\u0069\u0074\u0065\u0073\u0070\u0061\u0063\u0065\u002d\u006e\u006f\u0077\u0072\u0061\u0070\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u0067\u002d\u0067\u0072\u0061\u0079\u002d\u0039\u0030\u0030\u0020\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0074\u0065\u0078\u0074\u002d\u0078\u0073\u0020\u0070\u0079\u002d\u0031\u0020\u0070\u0078\u002d\u0032\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u006f\u0070\u0061\u0063\u0069\u0074\u0079\u002d\u0030\u0020\u0067\u0072\u006f\u0075\u0070\u002d\u0068\u006f\u0076\u0065\u0072\u003a\u006f\u0070\u0061\u0063\u0069\u0074\u0079\u002d\u0031\u0030\u0030\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u006f\u0070\u0061\u0063\u0069\u0074\u0079\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0032\u0030\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0070\u006f\u0069\u006e\u0074\u0065\u0072\u002d\u0065\u0076\u0065\u006e\u0074\u0073\u002d\u006e\u006f\u006e\u0065" },
});
(__VLS_ctx.$t('nav.change_theme'));
// @ts-ignore
[$t,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "\u0061\u0062\u0073\u006f\u006c\u0075\u0074\u0065\u0020\u002d\u0062\u006f\u0074\u0074\u006f\u006d\u002d\u0031\u0020\u006c\u0065\u0066\u0074\u002d\u0031\u002f\u0032\u0020\u002d\u0074\u0072\u0061\u006e\u0073\u006c\u0061\u0074\u0065\u002d\u0078\u002d\u0031\u002f\u0032\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0034\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0074\u0072\u0061\u006e\u0073\u0070\u0061\u0072\u0065\u006e\u0074\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0039\u0030\u0030" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "\u0067\u0072\u006f\u0075\u0070\u0020\u0072\u0065\u006c\u0061\u0074\u0069\u0076\u0065\u0020\u0066\u006c\u0065\u0078\u0020\u0068\u002d\u0031\u0030\u0020\u0077\u002d\u0031\u0030\u0020\u0069\u0074\u0065\u006d\u0073\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u006a\u0075\u0073\u0074\u0069\u0066\u0079\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u0067\u002d\u0067\u0072\u0061\u0064\u0069\u0065\u006e\u0074\u002d\u0074\u006f\u002d\u0062\u0072\u0020\u0066\u0072\u006f\u006d\u002d\u0076\u0069\u006f\u006c\u0065\u0074\u002d\u0035\u0030\u0030\u0020\u0074\u006f\u002d\u0070\u0075\u0072\u0070\u006c\u0065\u002d\u0036\u0030\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0078\u006c\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u006c\u0067\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u0076\u0069\u006f\u006c\u0065\u0074\u002d\u0035\u0030\u0030\u002f\u0033\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u005b\u0030\u005f\u0030\u005f\u0032\u0035\u0070\u0078\u005f\u0072\u0067\u0062\u0061\u0028\u0031\u0033\u0039\u002c\u0039\u0032\u002c\u0032\u0034\u0036\u002c\u0030\u002e\u0037\u0029\u005d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0073\u0063\u0061\u006c\u0065\u002d\u0031\u0031\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0066\u0072\u006f\u006d\u002d\u0076\u0069\u006f\u006c\u0065\u0074\u002d\u0034\u0030\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0074\u006f\u002d\u0070\u0075\u0072\u0070\u006c\u0065\u002d\u0035\u0030\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0061\u0063\u0074\u0069\u0076\u0065\u003a\u0073\u0063\u0061\u006c\u0065\u002d\u0039\u0035\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0061\u006c\u006c\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0033\u0030\u0030\u0020\u0065\u0061\u0073\u0065\u002d\u006f\u0075\u0074\u0020\u0063\u0075\u0072\u0073\u006f\u0072\u002d\u0070\u006f\u0069\u006e\u0074\u0065\u0072\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0077\u0068\u0069\u0074\u0065\u002f\u0033\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0061\u006e\u0069\u006d\u0061\u0074\u0065\u002d\u0070\u0075\u006c\u0073\u0065\u002d\u0073\u006c\u006f\u0077" },
});
const __VLS_15 = {}.FontAwesomeIcon;
/** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
// @ts-ignore
FontAwesomeIcon;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    icon: (__VLS_ctx.themeIcon),
    ...{ class: "\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0074\u0065\u0078\u0074\u002d\u006c\u0067\u0020\u0066\u0069\u006c\u0074\u0065\u0072\u0020\u0064\u0072\u006f\u0070\u002d\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u006d\u0064\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0067\u0072\u006f\u0075\u0070\u002d\u0068\u006f\u0076\u0065\u0072\u003a\u0072\u006f\u0074\u0061\u0074\u0065\u002d\u0031\u0032\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0074\u0072\u0061\u006e\u0073\u0066\u006f\u0072\u006d\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0033\u0030\u0030" },
}));
const __VLS_17 = __VLS_16({
    icon: (__VLS_ctx.themeIcon),
    ...{ class: "\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0074\u0065\u0078\u0074\u002d\u006c\u0067\u0020\u0066\u0069\u006c\u0074\u0065\u0072\u0020\u0064\u0072\u006f\u0070\u002d\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u006d\u0064\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0067\u0072\u006f\u0075\u0070\u002d\u0068\u006f\u0076\u0065\u0072\u003a\u0072\u006f\u0074\u0061\u0074\u0065\u002d\u0031\u0032\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0074\u0072\u0061\u006e\u0073\u0066\u006f\u0072\u006d\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0033\u0030\u0030" },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
// @ts-ignore
[themeIcon,];
__VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
    ...{ class: "flex-1 flex flex-col px-4 space-y-2" },
});
for (const [route] of __VLS_getVForSourceType((__VLS_ctx.routes))) {
    // @ts-ignore
    [routes,];
    const __VLS_20 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        key: (route.path),
        to: (route.path),
        ...{ class: "decoration px-4 py-2 rounded-md !text-gray-500 hover:bg-violet-100 flex items-center gap-2" },
        activeClass: "bg-violet-200 font-bold",
    }));
    const __VLS_22 = __VLS_21({
        key: (route.path),
        to: (route.path),
        ...{ class: "decoration px-4 py-2 rounded-md !text-gray-500 hover:bg-violet-100 flex items-center gap-2" },
        activeClass: "bg-violet-200 font-bold",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const { default: __VLS_24 } = __VLS_23.slots;
    const __VLS_25 = {}.FontAwesomeIcon;
    /** @type {[typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.fontAwesomeIcon, ]} */ ;
    // @ts-ignore
    FontAwesomeIcon;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        icon: (route.icon),
        ...{ class: "text-gray-500" },
    }));
    const __VLS_27 = __VLS_26({
        icon: (route.icon),
        ...{ class: "text-gray-500" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    (route.name);
    var __VLS_23;
}
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({
    ...{ class: "flex-1 p-6 min-h-screen h-screen overflow-y-auto" },
});
const __VLS_30 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['animated-gradient-text']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['border-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-yellow-500']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['decoration']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['!text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-violet-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-violet-50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['animated-gradient-text']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-4']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['-top-8']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['-bottom-1']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['from-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-violet-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-[0_0_25px_rgba(139,92,246,0.7)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-110']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:from-violet-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:to-purple-500']} */ ;
/** @type {__VLS_StyleScopedClasses['active:scale-95']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white/30']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse-slow']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['filter']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:rotate-12']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['decoration']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['!text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-violet-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        RouterLink: RouterLink,
        isOpen: isOpen,
        currentLocale: currentLocale,
        toggleLanguage: toggleLanguage,
        themeIcon: themeIcon,
        cycleTheme: cycleTheme,
        goHome: goHome,
    }),
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
