import { useEffect } from 'react';
import { SITE_NAME, SITE_URL } from '../utils/seo';

export interface PageMetaProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
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

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
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
  path = '/',
  image,
  noindex = false,
}: PageMetaProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const ogImage = image ?? `${SITE_URL}/mikolaj-profile.jpg`;

    document.title = title;

    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', ogImage);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else {
      removeMeta('name', 'robots');
    }
  }, [title, description, path, image, noindex]);

  return null;
}
