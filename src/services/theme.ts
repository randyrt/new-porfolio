export type Theme = 'light' | 'inverted'

const STORAGE_KEY = 'theme-preference'

export function applyTheme(theme: Theme) {
  const html = document.documentElement
  html.classList.remove('inverted')
  if (theme === 'inverted') html.classList.add('inverted')
}

export function setTheme(theme: Theme) {
  try {
    applyTheme(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  } catch (e) {
    console.error('Failed to set theme:', e)
  }
}

export function getStoredTheme(): Theme {
  try {
    const t = localStorage.getItem(STORAGE_KEY)
    if (t === 'inverted') return 'inverted'
    return 'light'
  } catch (e) {
    return 'light'
  }
}

export function initTheme() {
  const t = getStoredTheme()
  applyTheme(t)
}

export function toggleTheme(): Theme {
  const current = getStoredTheme()
  const order: Theme[] = ['light', 'inverted']
  const next = order[(order.indexOf(current) + 1) % order.length]
  setTheme(next)
  return next
}

export default {
  initTheme,
  setTheme,
  getStoredTheme,
  toggleTheme,
}
