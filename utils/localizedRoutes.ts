import type { Language } from '../types';

export type LocalizedPage = 'home' | 'portfolio' | 'privacy';
export const STORY_IDS = ['jedziemy', 'solvee', 'subby', 'twojasiec'] as const;
export type StoryId = typeof STORY_IDS[number];

export function getStoryPath(id: StoryId, language: Language): string {
  return `${language === 'pl' ? '/pl' : ''}/projects/${id}`;
}

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
  const story = pathname.replace(/\/$/, '').match(new RegExp(`^/(?:pl/)?projects/(${STORY_IDS.join('|')})$`));
  if (story) return getStoryPath(story[1] as StoryId, language === 'en' ? 'pl' : 'en');
  const page = getPageFromPath(pathname);
  return getLocalizedPath(page, language === 'en' ? 'pl' : 'en');
}
