import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Navbar from './components/NavBar.vue';
const { t } = useI18n();
const navRoutes = computed(() => [
    { path: '/', name: t('nav.home'), icon: 'home' },
    { path: '/quality', name: t('nav.quality'), icon: 'star' },
    { path: '/skills', name: t('nav.skills'), icon: 'code' },
    { path: '/technology', name: t('nav.technology'), icon: 'cogs' },
    { path: '/webcup24', name: t('nav.webcup'), icon: 'trophy' },
    { path: '/projects', name: t('nav.projects'), icon: 'project-diagram' },
    { path: '/services', name: t('nav.services'), icon: 'briefcase' },
    { path: '/testimoniales', name: t('nav.testimonials'), icon: 'quote-right' },
    { path: '/github-stats', name: t('nav.github_stats'), icon: ['fab', 'github'] },
    { path: '/contact', name: t('nav.contact'), icon: ['far', 'envelope'] },
    { path: '/about', name: t('nav.about'), icon: ['fas', 'info-circle'] },
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Navbar, new Navbar({
    brand: ('randy@art.dev'),
    routes: (__VLS_ctx.navRoutes),
}));
const __VLS_1 = __VLS_0({
    brand: ('randy@art.dev'),
    routes: (__VLS_ctx.navRoutes),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
// @ts-ignore
[navRoutes,];
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Navbar: Navbar,
        navRoutes: navRoutes,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
