import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import About from '../views/About.vue'

vi.mock('@vueuse/head', () => ({
  useHead: () => ({}),
}))

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('@fortawesome/vue-fontawesome', () => ({
  FontAwesomeIcon: {
    name: 'FontAwesomeIcon',
    template: '<span />',
  },
}))

describe('About page extra sections', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('shows the career timeline, workflow and featured case study sections', async () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          Loading: true,
          AnimatedTitle: true,
        },
      },
    })

    vi.advanceTimersByTime(1000)
    await nextTick()

    expect(wrapper.text()).toContain('about.timeline_title')
    expect(wrapper.text()).toContain('about.workflow_title')
    expect(wrapper.text()).toContain('about.featured_case_study')
  })
})
