import { useEffect } from 'react';
import { DEFAULT_OG_IMAGE_HEIGHT, DEFAULT_OG_IMAGE_WIDTH, SITE_NAME, SITE_URL } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext';

export interface PageMetaProps {
  title: string;
  description: string;
  socialDescription?: string;
  path?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  noindex?: boolean;
  alternatePaths?: {
    en: string;
    pl: string;
  };
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hrefLang?: string) {
  const selector = hrefLang
    ? `link[rel="${rel}"][hreflang="${hrefLang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    if (hrefLang) element.setAttribute('hreflang', hrefLang);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function removeMeta(attr: 'name' | 'property', key: string) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

export function PageMeta({
  title,
  description,
  socialDescription,
  path = '/',
  image,
  imageWidth = DEFAULT_OG_IMAGE_WIDTH,
  imageHeight = DEFAULT_OG_IMAGE_HEIGHT,
  noindex = false,
  alternatePaths,
}: PageMetaProps) {
  const { language } = useLanguage();

  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const ogImage = image ?? `${SITE_URL}/og-image.jpg`;
    const socialText = socialDescription ?? description;

    document.title = title;

    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);
    if (alternatePaths) {
      upsertLink('alternate', `${SITE_URL}${alternatePaths.en}`, 'en');
      upsertLink('alternate', `${SITE_URL}${alternatePaths.pl}`, 'pl');
      upsertLink('alternate', `${SITE_URL}${alternatePaths.en}`, 'x-default');
    }

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', socialText);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:width', String(imageWidth));
    upsertMeta('property', 'og:image:height', String(imageHeight));
    upsertMeta('property', 'og:locale', language === 'pl' ? 'pl_PL' : 'en_US');
    upsertMeta('property', 'og:locale:alternate', language === 'pl' ? 'en_US' : 'pl_PL');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', socialText);
    upsertMeta('name', 'twitter:image', ogImage);

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else {
      removeMeta('name', 'robots');
    }
  }, [title, description, socialDescription, path, image, imageWidth, imageHeight, noindex, language, alternatePaths]);

  return null;
}
