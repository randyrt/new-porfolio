import { useHead } from '@vueuse/head';
import { ref, onMounted, watchEffect } from 'vue';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
watchEffect(() => {
    useHead({
        title: t('technology.meta_title'),
        meta: [
            {
                name: 'Tech',
                content: t('technology.meta_desc')
            }
        ]
    });
});
const toast = useToast();
const loading = ref(true);
onMounted(() => {
    setTimeout(() => {
        loading.value = false;
        toast.info(t('technology.toast_hover'));
    }, 1000);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['technologies-container']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
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
        message: (__VLS_ctx.$t('technology.loading')),
    }));
    const __VLS_2 = __VLS_1({
        message: (__VLS_ctx.$t('technology.loading')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    // @ts-ignore
    [$t,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "technologies-container" },
    });
    const __VLS_6 = {}.AnimatedTitle;
    /** @type {[typeof __VLS_components.AnimatedTitle, ]} */ ;
    // @ts-ignore
    AnimatedTitle;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        text: (__VLS_ctx.$t('technology.quote')),
        aos: "fade-down",
    }));
    const __VLS_8 = __VLS_7({
        text: (__VLS_ctx.$t('technology.quote')),
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
    (__VLS_ctx.$t('technology.description'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-violet-800 text-lg" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        'data-aos': "fade-up",
        ...{ class: "tech-grid" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card tech-category" },
    });
    const __VLS_11 = {}.logoSection;
    /** @type {[typeof __VLS_components.LogoSection, typeof __VLS_components.logoSection, ]} */ ;
    // @ts-ignore
    LogoSection;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
        title: (__VLS_ctx.$t('technology.learning')),
    }));
    const __VLS_13 = __VLS_12({
        title: (__VLS_ctx.$t('technology.learning')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    // @ts-ignore
    [$t,];
    const __VLS_16 = {}.DivSlot;
    /** @type {[typeof __VLS_components.DivSlot, typeof __VLS_components.DivSlot, ]} */ ;
    // @ts-ignore
    DivSlot;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
    const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
    const { default: __VLS_20 } = __VLS_19.slots;
    const __VLS_21 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        logo: "/images/tecnos/flutter.png",
        name: "FLUTTER",
    }));
    const __VLS_23 = __VLS_22({
        logo: "/images/tecnos/flutter.png",
        name: "FLUTTER",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    const __VLS_26 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        logo: "/images/tecnos/c++.png",
        name: "C++",
    }));
    const __VLS_28 = __VLS_27({
        logo: "/images/tecnos/c++.png",
        name: "C++",
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    const __VLS_31 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        logo: "/images/tecnos/go.png",
        name: "GOLANG",
    }));
    const __VLS_33 = __VLS_32({
        logo: "/images/tecnos/go.png",
        name: "GOLANG",
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    var __VLS_19;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card tech-category" },
    });
    const __VLS_36 = {}.logoSection;
    /** @type {[typeof __VLS_components.LogoSection, typeof __VLS_components.logoSection, ]} */ ;
    // @ts-ignore
    LogoSection;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        title: (__VLS_ctx.$t('technology.design')),
    }));
    const __VLS_38 = __VLS_37({
        title: (__VLS_ctx.$t('technology.design')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    // @ts-ignore
    [$t,];
    const __VLS_41 = {}.DivSlot;
    /** @type {[typeof __VLS_components.DivSlot, typeof __VLS_components.DivSlot, ]} */ ;
    // @ts-ignore
    DivSlot;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
    const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
    const { default: __VLS_45 } = __VLS_44.slots;
    const __VLS_46 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
        logo: "/images/tecnos/photoshop.png",
        name: "PHOTOSHOP",
    }));
    const __VLS_48 = __VLS_47({
        logo: "/images/tecnos/photoshop.png",
        name: "PHOTOSHOP",
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    const __VLS_51 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
        logo: "/images/tecnos/figma.png",
        name: "FIGMA",
    }));
    const __VLS_53 = __VLS_52({
        logo: "/images/tecnos/figma.png",
        name: "FIGMA",
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    const __VLS_56 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        logo: "/images/tecnos/canva.png",
        name: "CANVA",
    }));
    const __VLS_58 = __VLS_57({
        logo: "/images/tecnos/canva.png",
        name: "CANVA",
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    var __VLS_44;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card tech-category" },
    });
    const __VLS_61 = {}.logoSection;
    /** @type {[typeof __VLS_components.LogoSection, typeof __VLS_components.logoSection, ]} */ ;
    // @ts-ignore
    LogoSection;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        title: (__VLS_ctx.$t('technology.frontend')),
    }));
    const __VLS_63 = __VLS_62({
        title: (__VLS_ctx.$t('technology.frontend')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    // @ts-ignore
    [$t,];
    const __VLS_66 = {}.DivSlot;
    /** @type {[typeof __VLS_components.DivSlot, typeof __VLS_components.DivSlot, ]} */ ;
    // @ts-ignore
    DivSlot;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({}));
    const __VLS_68 = __VLS_67({}, ...__VLS_functionalComponentArgsRest(__VLS_67));
    const { default: __VLS_70 } = __VLS_69.slots;
    const __VLS_71 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
        logo: "/images/tecnos/html5.png",
        name: "HTML5",
    }));
    const __VLS_73 = __VLS_72({
        logo: "/images/tecnos/html5.png",
        name: "HTML5",
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    const __VLS_76 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
        logo: "/images/tecnos/css.png",
        name: "CSS3",
    }));
    const __VLS_78 = __VLS_77({
        logo: "/images/tecnos/css.png",
        name: "CSS3",
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    const __VLS_81 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
        logo: "/images/tecnos/js.jpeg",
        name: "JAVASCRIPT",
    }));
    const __VLS_83 = __VLS_82({
        logo: "/images/tecnos/js.jpeg",
        name: "JAVASCRIPT",
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    const __VLS_86 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
        logo: "/images/tecnos/tailwinds.png",
        name: "TAILWINDCSS",
    }));
    const __VLS_88 = __VLS_87({
        logo: "/images/tecnos/tailwinds.png",
        name: "TAILWINDCSS",
    }, ...__VLS_functionalComponentArgsRest(__VLS_87));
    const __VLS_91 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({
        logo: "/images/tecnos/jquery.png",
        name: "JQUERY",
    }));
    const __VLS_93 = __VLS_92({
        logo: "/images/tecnos/jquery.png",
        name: "JQUERY",
    }, ...__VLS_functionalComponentArgsRest(__VLS_92));
    var __VLS_69;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card tech-category" },
    });
    const __VLS_96 = {}.logoSection;
    /** @type {[typeof __VLS_components.LogoSection, typeof __VLS_components.logoSection, ]} */ ;
    // @ts-ignore
    LogoSection;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
        title: (__VLS_ctx.$t('technology.backend')),
    }));
    const __VLS_98 = __VLS_97({
        title: (__VLS_ctx.$t('technology.backend')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    // @ts-ignore
    [$t,];
    const __VLS_101 = {}.DivSlot;
    /** @type {[typeof __VLS_components.DivSlot, typeof __VLS_components.DivSlot, ]} */ ;
    // @ts-ignore
    DivSlot;
    // @ts-ignore
    const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({}));
    const __VLS_103 = __VLS_102({}, ...__VLS_functionalComponentArgsRest(__VLS_102));
    const { default: __VLS_105 } = __VLS_104.slots;
    const __VLS_106 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
        logo: "/images/tecnos/php.png",
        name: "PHP",
    }));
    const __VLS_108 = __VLS_107({
        logo: "/images/tecnos/php.png",
        name: "PHP",
    }, ...__VLS_functionalComponentArgsRest(__VLS_107));
    const __VLS_111 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_112 = __VLS_asFunctionalComponent(__VLS_111, new __VLS_111({
        logo: "/images/tecnos/node.webp",
        name: "NODEJS",
    }));
    const __VLS_113 = __VLS_112({
        logo: "/images/tecnos/node.webp",
        name: "NODEJS",
    }, ...__VLS_functionalComponentArgsRest(__VLS_112));
    const __VLS_116 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
        logo: "/images/tecnos/sql.png",
        name: "MYSQL",
    }));
    const __VLS_118 = __VLS_117({
        logo: "/images/tecnos/sql.png",
        name: "MYSQL",
    }, ...__VLS_functionalComponentArgsRest(__VLS_117));
    const __VLS_121 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
        logo: "/images/tecnos/mariadb.png",
        name: "MARIADB",
    }));
    const __VLS_123 = __VLS_122({
        logo: "/images/tecnos/mariadb.png",
        name: "MARIADB",
    }, ...__VLS_functionalComponentArgsRest(__VLS_122));
    var __VLS_104;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card tech-category" },
    });
    const __VLS_126 = {}.logoSection;
    /** @type {[typeof __VLS_components.LogoSection, typeof __VLS_components.logoSection, ]} */ ;
    // @ts-ignore
    LogoSection;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
        title: (__VLS_ctx.$t('technology.frameworks')),
    }));
    const __VLS_128 = __VLS_127({
        title: (__VLS_ctx.$t('technology.frameworks')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    // @ts-ignore
    [$t,];
    const __VLS_131 = {}.DivSlot;
    /** @type {[typeof __VLS_components.DivSlot, typeof __VLS_components.DivSlot, ]} */ ;
    // @ts-ignore
    DivSlot;
    // @ts-ignore
    const __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({}));
    const __VLS_133 = __VLS_132({}, ...__VLS_functionalComponentArgsRest(__VLS_132));
    const { default: __VLS_135 } = __VLS_134.slots;
    const __VLS_136 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
        logo: "/images/tecnos/vuejs.jpg",
        name: "VUE.JS",
    }));
    const __VLS_138 = __VLS_137({
        logo: "/images/tecnos/vuejs.jpg",
        name: "VUE.JS",
    }, ...__VLS_functionalComponentArgsRest(__VLS_137));
    const __VLS_141 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({
        logo: "/images/tecnos/nuxt.png",
        name: "NUXT.JS",
    }));
    const __VLS_143 = __VLS_142({
        logo: "/images/tecnos/nuxt.png",
        name: "NUXT.JS",
    }, ...__VLS_functionalComponentArgsRest(__VLS_142));
    const __VLS_146 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
        logo: "/images/tecnos/ionic.png",
        name: "IONIC",
    }));
    const __VLS_148 = __VLS_147({
        logo: "/images/tecnos/ionic.png",
        name: "IONIC",
    }, ...__VLS_functionalComponentArgsRest(__VLS_147));
    const __VLS_151 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({
        logo: "/images/tecnos/laravel.png",
        name: "LARAVEL",
    }));
    const __VLS_153 = __VLS_152({
        logo: "/images/tecnos/laravel.png",
        name: "LARAVEL",
    }, ...__VLS_functionalComponentArgsRest(__VLS_152));
    const __VLS_156 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({
        logo: "/images/tecnos/synfony.png",
        name: "SYMFONY",
    }));
    const __VLS_158 = __VLS_157({
        logo: "/images/tecnos/synfony.png",
        name: "SYMFONY",
    }, ...__VLS_functionalComponentArgsRest(__VLS_157));
    const __VLS_161 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
        logo: "/images/tecnos/express.png",
        name: "EXPRESS.JS",
    }));
    const __VLS_163 = __VLS_162({
        logo: "/images/tecnos/express.png",
        name: "EXPRESS.JS",
    }, ...__VLS_functionalComponentArgsRest(__VLS_162));
    var __VLS_134;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card tech-category" },
    });
    const __VLS_166 = {}.logoSection;
    /** @type {[typeof __VLS_components.LogoSection, typeof __VLS_components.logoSection, ]} */ ;
    // @ts-ignore
    LogoSection;
    // @ts-ignore
    const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
        title: (__VLS_ctx.$t('technology.dev_env')),
    }));
    const __VLS_168 = __VLS_167({
        title: (__VLS_ctx.$t('technology.dev_env')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_167));
    // @ts-ignore
    [$t,];
    const __VLS_171 = {}.DivSlot;
    /** @type {[typeof __VLS_components.DivSlot, typeof __VLS_components.DivSlot, ]} */ ;
    // @ts-ignore
    DivSlot;
    // @ts-ignore
    const __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171({}));
    const __VLS_173 = __VLS_172({}, ...__VLS_functionalComponentArgsRest(__VLS_172));
    const { default: __VLS_175 } = __VLS_174.slots;
    const __VLS_176 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({
        logo: "/images/tecnos/lunix.png",
        name: "LINUX",
    }));
    const __VLS_178 = __VLS_177({
        logo: "/images/tecnos/lunix.png",
        name: "LINUX",
    }, ...__VLS_functionalComponentArgsRest(__VLS_177));
    const __VLS_181 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_182 = __VLS_asFunctionalComponent(__VLS_181, new __VLS_181({
        logo: "/images/tecnos/vscode.png",
        name: "VS CODE",
    }));
    const __VLS_183 = __VLS_182({
        logo: "/images/tecnos/vscode.png",
        name: "VS CODE",
    }, ...__VLS_functionalComponentArgsRest(__VLS_182));
    const __VLS_186 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({
        logo: "/images/tecnos/git.png",
        name: "GIT",
    }));
    const __VLS_188 = __VLS_187({
        logo: "/images/tecnos/git.png",
        name: "GIT",
    }, ...__VLS_functionalComponentArgsRest(__VLS_187));
    const __VLS_191 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_192 = __VLS_asFunctionalComponent(__VLS_191, new __VLS_191({
        logo: "/images/tecnos/docker.png",
        name: "DOCKER",
    }));
    const __VLS_193 = __VLS_192({
        logo: "/images/tecnos/docker.png",
        name: "DOCKER",
    }, ...__VLS_functionalComponentArgsRest(__VLS_192));
    const __VLS_196 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_197 = __VLS_asFunctionalComponent(__VLS_196, new __VLS_196({
        logo: "/images/tecnos/pma.png",
        name: "PHPMYADMIN",
    }));
    const __VLS_198 = __VLS_197({
        logo: "/images/tecnos/pma.png",
        name: "PHPMYADMIN",
    }, ...__VLS_functionalComponentArgsRest(__VLS_197));
    const __VLS_201 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_202 = __VLS_asFunctionalComponent(__VLS_201, new __VLS_201({
        logo: "/images/tecnos/dbeaver.png",
        name: "DBEAVER",
    }));
    const __VLS_203 = __VLS_202({
        logo: "/images/tecnos/dbeaver.png",
        name: "DBEAVER",
    }, ...__VLS_functionalComponentArgsRest(__VLS_202));
    const __VLS_206 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({
        logo: "/images/tecnos/typescript.png",
        name: "TYPESCRIPT",
    }));
    const __VLS_208 = __VLS_207({
        logo: "/images/tecnos/typescript.png",
        name: "TYPESCRIPT",
    }, ...__VLS_functionalComponentArgsRest(__VLS_207));
    const __VLS_211 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_212 = __VLS_asFunctionalComponent(__VLS_211, new __VLS_211({
        logo: "/images/tecnos/postman.png",
        name: "POSTMAN",
    }));
    const __VLS_213 = __VLS_212({
        logo: "/images/tecnos/postman.png",
        name: "POSTMAN",
    }, ...__VLS_functionalComponentArgsRest(__VLS_212));
    const __VLS_216 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({
        logo: "/images/tecnos/chrome.png",
        name: "CHROME DEVTOOLS",
    }));
    const __VLS_218 = __VLS_217({
        logo: "/images/tecnos/chrome.png",
        name: "CHROME DEVTOOLS",
    }, ...__VLS_functionalComponentArgsRest(__VLS_217));
    var __VLS_174;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card tech-category" },
    });
    const __VLS_221 = {}.logoSection;
    /** @type {[typeof __VLS_components.LogoSection, typeof __VLS_components.logoSection, ]} */ ;
    // @ts-ignore
    LogoSection;
    // @ts-ignore
    const __VLS_222 = __VLS_asFunctionalComponent(__VLS_221, new __VLS_221({
        title: (__VLS_ctx.$t('technology.gitops')),
    }));
    const __VLS_223 = __VLS_222({
        title: (__VLS_ctx.$t('technology.gitops')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_222));
    // @ts-ignore
    [$t,];
    const __VLS_226 = {}.DivSlot;
    /** @type {[typeof __VLS_components.DivSlot, typeof __VLS_components.DivSlot, ]} */ ;
    // @ts-ignore
    DivSlot;
    // @ts-ignore
    const __VLS_227 = __VLS_asFunctionalComponent(__VLS_226, new __VLS_226({}));
    const __VLS_228 = __VLS_227({}, ...__VLS_functionalComponentArgsRest(__VLS_227));
    const { default: __VLS_230 } = __VLS_229.slots;
    const __VLS_231 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_232 = __VLS_asFunctionalComponent(__VLS_231, new __VLS_231({
        logo: "/images/tecnos/ci_cd.png",
        name: "CI/CD",
    }));
    const __VLS_233 = __VLS_232({
        logo: "/images/tecnos/ci_cd.png",
        name: "CI/CD",
    }, ...__VLS_functionalComponentArgsRest(__VLS_232));
    const __VLS_236 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_237 = __VLS_asFunctionalComponent(__VLS_236, new __VLS_236({
        logo: "/images/tecnos/ftp.png",
        name: "FTP",
    }));
    const __VLS_238 = __VLS_237({
        logo: "/images/tecnos/ftp.png",
        name: "FTP",
    }, ...__VLS_functionalComponentArgsRest(__VLS_237));
    const __VLS_241 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_242 = __VLS_asFunctionalComponent(__VLS_241, new __VLS_241({
        logo: "/images/tecnos/tls.webp",
        name: "TLS",
    }));
    const __VLS_243 = __VLS_242({
        logo: "/images/tecnos/tls.webp",
        name: "TLS",
    }, ...__VLS_functionalComponentArgsRest(__VLS_242));
    const __VLS_246 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_247 = __VLS_asFunctionalComponent(__VLS_246, new __VLS_246({
        logo: "/images/tecnos/ssl.png",
        name: "SSL",
    }));
    const __VLS_248 = __VLS_247({
        logo: "/images/tecnos/ssl.png",
        name: "SSL",
    }, ...__VLS_functionalComponentArgsRest(__VLS_247));
    const __VLS_251 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_252 = __VLS_asFunctionalComponent(__VLS_251, new __VLS_251({
        logo: "/images/tecnos/ssh.jpg",
        name: "SSH",
    }));
    const __VLS_253 = __VLS_252({
        logo: "/images/tecnos/ssh.jpg",
        name: "SSH",
    }, ...__VLS_functionalComponentArgsRest(__VLS_252));
    const __VLS_256 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_257 = __VLS_asFunctionalComponent(__VLS_256, new __VLS_256({
        logo: "/images/tecnos/fl.png",
        name: "FILEZILLA",
    }));
    const __VLS_258 = __VLS_257({
        logo: "/images/tecnos/fl.png",
        name: "FILEZILLA",
    }, ...__VLS_functionalComponentArgsRest(__VLS_257));
    var __VLS_229;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "card tech-category" },
    });
    const __VLS_261 = {}.logoSection;
    /** @type {[typeof __VLS_components.LogoSection, typeof __VLS_components.logoSection, ]} */ ;
    // @ts-ignore
    LogoSection;
    // @ts-ignore
    const __VLS_262 = __VLS_asFunctionalComponent(__VLS_261, new __VLS_261({
        title: (__VLS_ctx.$t('technology.scripting')),
    }));
    const __VLS_263 = __VLS_262({
        title: (__VLS_ctx.$t('technology.scripting')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_262));
    // @ts-ignore
    [$t,];
    const __VLS_266 = {}.DivSlot;
    /** @type {[typeof __VLS_components.DivSlot, typeof __VLS_components.DivSlot, ]} */ ;
    // @ts-ignore
    DivSlot;
    // @ts-ignore
    const __VLS_267 = __VLS_asFunctionalComponent(__VLS_266, new __VLS_266({}));
    const __VLS_268 = __VLS_267({}, ...__VLS_functionalComponentArgsRest(__VLS_267));
    const { default: __VLS_270 } = __VLS_269.slots;
    const __VLS_271 = {}.TechLogo;
    /** @type {[typeof __VLS_components.TechLogo, ]} */ ;
    // @ts-ignore
    TechLogo;
    // @ts-ignore
    const __VLS_272 = __VLS_asFunctionalComponent(__VLS_271, new __VLS_271({
        logo: "/images/tecnos/python.png",
        name: "PYTHON",
    }));
    const __VLS_273 = __VLS_272({
        logo: "/images/tecnos/python.png",
        name: "PYTHON",
    }, ...__VLS_functionalComponentArgsRest(__VLS_272));
    var __VLS_269;
}
/** @type {__VLS_StyleScopedClasses['technologies-container']} */ ;
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
/** @type {__VLS_StyleScopedClasses['tech-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['tech-category']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
