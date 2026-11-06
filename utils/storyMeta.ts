import site from '../content/site.json';
import type { Language } from '../types';
import { getStory } from '../data/stories';
import { getStoryPath, type StoryId } from './localizedRoutes';
import { getPageMeta, SITE_URL } from './seo';

export function getStoryMeta(id: StoryId, content: typeof site, language: Language) {
  const story = getStory(id, language)!;
  const path = getStoryPath(id, language);
  const canonical = `${SITE_URL}${path}`;
  const base = getPageMeta('portfolio', content, language);
  const graph = (base.structuredData!['@graph'] as Record<string, unknown>[])
    .filter(item => item['@type'] !== 'ItemList')
    .map(item => item['@type'] === 'WebPage' ? {
      ...item, '@id': `${canonical}#webpage`, url: canonical, name: story.title,
      description: story.summary, mainEntity: { '@id': `${canonical}#article` },
    } : item);
  graph.push({
    '@type': 'Article', '@id': `${canonical}#article`, url: canonical,
    headline: story.title, description: story.summary, inLanguage: language,
    author: { '@id': `${SITE_URL}/#person` }, publisher: { '@id': `${SITE_URL}/#person` },
    mainEntityOfPage: { '@id': `${canonical}#webpage` },
    about: { '@type': 'SoftwareApplication', name: story.project.name },
    ...(story.project.image ? { image: `${SITE_URL}${story.project.image}` } : {}),
  });
  return {
    ...base, title: `${story.project.name} — ${story.kind} | Mikołaj Piech`,
    description: story.summary, socialDescription: story.summary, path,
    alternatePaths: { en: getStoryPath(id, 'en'), pl: getStoryPath(id, 'pl') },
    structuredData: { '@context': 'https://schema.org', '@graph': graph },
  };
}
