import { Theme } from '../types';

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || storedTheme === 'light' || storedTheme === 'system') {
    return storedTheme;
  }

  return 'system';
}

export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'dark') return 'dark';
  if (theme === 'light') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolveTheme(theme));
}

export function markAppReady() {
  document.documentElement.classList.add('app-ready');
}
