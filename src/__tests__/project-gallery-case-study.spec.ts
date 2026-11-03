import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import ProjectGallery from '../components/Projects_room/ProjectGallery.vue'
import Projects from '../views/Projects.vue'

const locale = ref('en')
const translations: Record<string, Record<string, string>> = {
  'projects.fid_connect': {
    en: 'English description for Fid-Connect',
    fr: 'Description française pour Fid-Connect',
  },
  'projects.echo_webline': {
    en: 'English description for echo-webLine',
    fr: 'Description française pour echo-webLine',
  },
  'projects.infi_swap': {
    en: 'English description for InfiSwap',
    fr: 'Description française pour InfiSwap',
  },
  'projects.petsfollow_pro': {
    en: 'English description for PetsFollow Pro',
    fr: 'Description française pour PetsFollow Pro',
  },
  'projects.afr_fan': {
    en: 'English description for AFR-Fan',
    fr: 'Description française pour AFR-Fan',
  },
  'projects.qcp': {
    en: 'English description for QCP',
    fr: 'Description française pour QCP',
  },
  'projects.nurses': {
    en: 'English description for Nurses',
    fr: 'Description française pour Nurses',
  },
  'projects.e_learning': {
    en: 'English description for E-learning',
    fr: 'Description française pour E-learning',
  },
  'projects.toast_click': {
    en: 'Click to enlarge',
    fr: 'Cliquez pour agrandir',
  },
  'projects.loading': {
    en: 'Loading projects...',
    fr: 'Chargement des projets...',
  },
  'projects.mission_progress': {
    en: 'Mission Progress',
    fr: 'Progression de la Mission',
  },
  'nav.prev': {
    en: 'Previous',
    fr: 'Précédent',
  },
  'nav.next': {
    en: 'Next',
    fr: 'Suivant',
  },
  'projects.click_to_zoom_hint': {
    en: 'Esc or click outside to close',
    fr: 'ESC ou cliquez à l\'extérieur pour fermer',
  },
  'projects.quote': {
    en: 'Quote',
    fr: 'Citation',
  },
  'projects.p_italics': {
    en: 'P italics',
    fr: 'P italics FR',
  },
  'projects.meta_title': { en: 'Projects', fr: 'Projets' },
  'projects.meta_desc': { en: 'Projects', fr: 'Projets' },
  'projects.case_study': { en: 'Case Study', fr: 'Case Study' },
  'projects.hide_case_study': { en: 'Hide case study', fr: 'Masquer le case study' },
  'projects.challenge': { en: 'Challenge', fr: 'Défi' },
  'projects.solution': { en: 'Solution', fr: 'Solution' },
  'projects.impact': { en: 'Impact', fr: 'Impact' },
  'projects.outcomes': { en: 'Outcomes', fr: 'Résultats' },
  'projects.stack': { en: 'Stack', fr: 'Stack' },
  'projects.view_in_production': { en: 'View in production', fr: 'Voir en production' },
  'projects.fight_boss': { en: 'Fight Boss', fr: 'Affronter le Boss' },
  'projects.boss_defeated': { en: 'Boss Defeated', fr: 'Boss Vaincu' },
}

vi.mock('vue-toastification', () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  }),
}))

vi.mock('@vueuse/head', () => ({
  useHead: vi.fn(),
}))

vi.mock('vue-router', () => ({
  useRoute: () => ({ hash: '' }),
}))

vi.mock('../composables/useGamification', () => ({
  useGamification: () => ({
    trackProjectView: vi.fn(),
    defeatedBosses: new Set(),
  }),
}))

vi.mock('swiper/vue', () => ({
  Swiper: { template: '<div><slot /></div>' },
  SwiperSlide: { template: '<div><slot /></div>' },
}))

vi.mock('swiper/modules', () => ({
  Pagination: {},
  Navigation: {},
}))

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => translations[key]?.[locale.value] ?? key,
    locale,
  }),
}))

describe('ProjectGallery case study', () => {
  beforeEach(() => {
    locale.value = 'en'
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('opens a case study panel with challenge, solution and impact', async () => {
    const wrapper = mount(ProjectGallery, {
      props: {
        id: 'fid-connect',
        title: 'FID-CONNECT',
        description: 'Fid-Connect is a tax operations platform built with Vue.js and Laravel.',
        images: ['/img.png'],
        isDefeated: false,
        caseStudy: {
          challenge: 'Centralize tax operations.',
          solution: 'Create a Vue.js + Laravel platform.',
          impact: 'Reduce manual operations and improve clarity.',
          outcomes: ['Dashboards', 'Automation'],
          stack: ['Vue.js', 'Laravel'],
        },
      },
      global: {
        stubs: {
          Swiper: true,
          SwiperSlide: true,
          'font-awesome-icon': true,
        },
      },
    })

    const caseStudyButton = wrapper.find('[data-testid="project-case-study-btn"]')
    expect(caseStudyButton.exists()).toBe(true)

    await caseStudyButton.trigger('click')

    expect(wrapper.text()).toContain('Centralize tax operations.')
    expect(wrapper.text()).toContain('Reduce manual operations and improve clarity.')
    expect(wrapper.html()).toContain('<span class="font-black text-slate-950 dark:text-slate-950">Vue.js</span>')
    expect(wrapper.html()).toContain('<span class="font-black text-slate-950 dark:text-slate-950">Laravel</span>')
  })

  it('updates project descriptions when the locale changes', async () => {
    const wrapper = mount(Projects, {
      global: {
        stubs: {
          Loading: true,
          AnimatedTitle: true,
          ProjectGallery: {
            props: ['id', 'title', 'description'],
            template: '<div class="project-card">{{ title }} - {{ description }}</div>',
          },
          ProjectBossQuiz: true,
          'font-awesome-icon': true,
          Swiper: { template: '<div><slot /></div>' },
          SwiperSlide: { template: '<div><slot /></div>' },
        },
      },
    })

    await vi.advanceTimersByTimeAsync(500)
    await nextTick()

    expect(wrapper.text()).toContain('English description for Fid-Connect')

    locale.value = 'fr'
    await nextTick()

    expect(wrapper.text()).toContain('Description française pour Fid-Connect')
  })
})
