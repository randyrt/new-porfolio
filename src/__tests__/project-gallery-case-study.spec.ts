import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectGallery from '../components/Projects_room/ProjectGallery.vue'

vi.mock('vue-toastification', () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  }),
}))

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
    locale: { value: 'en' },
  }),
}))

describe('ProjectGallery case study', () => {
  it('opens a case study panel with challenge, solution and impact', async () => {
    const wrapper = mount(ProjectGallery, {
      props: {
        id: 'fid-connect',
        title: 'FID-CONNECT',
        description: 'Fid-Connect is a tax operations platform.',
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
  })
})
