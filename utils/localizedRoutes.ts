import type { Language } from '../types';

export type LocalizedPage = 'home' | 'portfolio' | 'privacy';

const ROUTES: Record<Language, Record<LocalizedPage, string>> = {
  en: {
    home: '/',
    portfolio: '/portfolio',
    privacy: '/privacy-policy',
  },
  pl: {
    home: '/pl',
    portfolio: '/pl/portfolio',
    privacy: '/pl/polityka-prywatnosci',
  },
};

export function getLanguageFromPath(pathname: string): Language {
  return pathname === '/pl' || pathname.startsWith('/pl/') ? 'pl' : 'en';
}

export function getLocalizedPath(page: LocalizedPage, language: Language): string {
  return ROUTES[language][page];
}

export function getPageFromPath(pathname: string): LocalizedPage {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;

  if (normalizedPath === '/portfolio' || normalizedPath === '/pl/portfolio') return 'portfolio';
  if (normalizedPath === '/privacy-policy' || normalizedPath === '/pl/polityka-prywatnosci') return 'privacy';
  return 'home';
}

export function getAlternateLanguagePath(pathname: string): string {
  const language = getLanguageFromPath(pathname);
  const page = getPageFromPath(pathname);
  return getLocalizedPath(page, language === 'en' ? 'pl' : 'en');
}
