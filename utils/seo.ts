import site from '../content/site.json';

export const SITE_URL = site.seo.site_url;
export const SITE_NAME = site.seo.site_name;
export const DEFAULT_OG_IMAGE = `${SITE_URL}${site.seo.default_image}`;
export const DEFAULT_OG_IMAGE_WIDTH = site.seo.default_image_width;
export const DEFAULT_OG_IMAGE_HEIGHT = site.seo.default_image_height;

export type PageKey = 'home' | 'portfolio' | 'privacy' | 'not_found';

const PAGE_PATHS: Record<PageKey, string> = {
  home: '/',
  portfolio: '/portfolio',
  privacy: '/privacy-policy',
  not_found: '/404',
};

type PageConfig = {
  title: string;
  description: string;
  social_description?: string;
};

export function getPageMeta(page: PageKey) {
  const config = site.seo.pages[page] as PageConfig;
  return {
    title: config.title,
    description: config.description,
    socialDescription: config.social_description ?? config.description,
    path: PAGE_PATHS[page],
    image: DEFAULT_OG_IMAGE,
    imageWidth: DEFAULT_OG_IMAGE_WIDTH,
    imageHeight: DEFAULT_OG_IMAGE_HEIGHT,
    noindex: page === 'not_found',
  };
}
