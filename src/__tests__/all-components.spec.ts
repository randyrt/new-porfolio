// src/__tests__/integration.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('Intégration de tous les composants', () => {
  it('l\'application entière se charge sans erreur', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })

  it('le header, le contenu et le footer sont tous présents', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent({ name: 'Header' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'RegistrationForm' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true)
  })
})