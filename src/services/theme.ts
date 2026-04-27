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

// Color Management
const COLOR_STORAGE_KEY = 'primary-color-preference';
const DEFAULT_COLOR = '#cff1f2'; // user default

function adjustColorBrightness(hex: string, percent: number): string {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.max(0, Math.min(255, Math.floor(r * (1 + percent / 100))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 + percent / 100))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 + percent / 100))));

    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

export function applyPrimaryColor(color: string) {
    const html = document.documentElement;
    html.style.setProperty('--app-primary', color);
    
    // Generate hover color by darkening 15%
    const hoverColor = adjustColorBrightness(color, -15);
    html.style.setProperty('--app-primary-hover', hoverColor);
}

export function setPrimaryColor(color: string) {
    try {
        applyPrimaryColor(color);
        localStorage.setItem(COLOR_STORAGE_KEY, color);
    } catch (e) {
        console.error('Failed to set primary color:', e);
    }
}

export function getStoredColor(): string {
    try {
        return localStorage.getItem(COLOR_STORAGE_KEY) || DEFAULT_COLOR;
    } catch (e) {
        return DEFAULT_COLOR;
    }
}

export function initColor() {
    const color = getStoredColor();
    applyPrimaryColor(color);
}

export default {
  initTheme,
  setTheme,
  getStoredTheme,
  toggleTheme,
  initColor,
  setPrimaryColor,
  getStoredColor
}
