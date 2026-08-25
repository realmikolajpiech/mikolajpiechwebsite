import site from '../content/site.json';
import type { Language } from '../types';
import { getLocalizedPath, type LocalizedPage } from './localizedRoutes';

export const SITE_URL = site.seo.site_url;
export const SITE_NAME = site.seo.site_name;
export const DEFAULT_OG_IMAGE = `${SITE_URL}${site.seo.default_image}`;
export const DEFAULT_OG_IMAGE_WIDTH = site.seo.default_image_width;
export const DEFAULT_OG_IMAGE_HEIGHT = site.seo.default_image_height;

export type PageKey = 'home' | 'portfolio' | 'privacy' | 'not_found';

type PageConfig = {
  title: string;
  description: string;
  social_description?: string;
};

export function getPageMeta(page: PageKey, content: typeof site = site, language: Language = 'en') {
  const config = content.seo.pages[page] as PageConfig;
  const localizedPage: LocalizedPage = page === 'not_found' ? 'home' : page;
  return {
    title: config.title,
    description: config.description,
    socialDescription: config.social_description ?? config.description,
    path: page === 'not_found' ? (language === 'pl' ? '/pl/404' : '/404') : getLocalizedPath(localizedPage, language),
    alternatePaths: {
      en: getLocalizedPath(localizedPage, 'en'),
      pl: getLocalizedPath(localizedPage, 'pl'),
    },
    image: DEFAULT_OG_IMAGE,
    imageWidth: DEFAULT_OG_IMAGE_WIDTH,
    imageHeight: DEFAULT_OG_IMAGE_HEIGHT,
    noindex: page === 'not_found',
  };
}
