import site from '../content/site.json';

export const SITE_URL = site.seo.site_url;
export const SITE_NAME = site.seo.site_name;
export const DEFAULT_OG_IMAGE = `${SITE_URL}${site.seo.default_image}`;

export type PageKey = 'home' | 'portfolio' | 'privacy' | 'not_found';

const PAGE_PATHS: Record<PageKey, string> = {
  home: '/',
  portfolio: '/portfolio',
  privacy: '/privacy-policy',
  not_found: '/404',
};

export function getPageMeta(page: PageKey) {
  const config = site.seo.pages[page];
  return {
    title: config.title,
    description: config.description,
    path: PAGE_PATHS[page],
    image: DEFAULT_OG_IMAGE,
    noindex: page === 'not_found',
  };
}
