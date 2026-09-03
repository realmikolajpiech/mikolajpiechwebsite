import site from '../content/site.json';
import type { Language } from '../types';
import { getLocalizedPath, type LocalizedPage } from './localizedRoutes';
import { buildStructuredData } from './structuredData';

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
  const path = page === 'not_found' ? (language === 'pl' ? '/pl/404' : '/404') : getLocalizedPath(localizedPage, language);
  return {
    title: config.title,
    description: config.description,
    socialDescription: config.social_description ?? config.description,
    path,
    alternatePaths: page === 'not_found' ? undefined : {
      en: getLocalizedPath(localizedPage, 'en'),
      pl: getLocalizedPath(localizedPage, 'pl'),
    },
    image: page === 'home' ? `${SITE_URL}/mikolaj-profile.jpg` : DEFAULT_OG_IMAGE,
    imageWidth: page === 'home' ? 400 : DEFAULT_OG_IMAGE_WIDTH,
    imageHeight: page === 'home' ? 400 : DEFAULT_OG_IMAGE_HEIGHT,
    noindex: page === 'not_found',
    structuredData: buildStructuredData(page, content, language, `${SITE_URL}${path}`),
  };
}
