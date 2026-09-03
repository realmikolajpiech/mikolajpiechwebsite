import agent from '../content/agent.json';
import site from '../content/site.json';
import { getFeaturedProjects, getPortfolioProjects } from '../data/projects';
import type { Language, Project } from '../types';
import type { PageKey } from './seo';
import { getLocalizedPath } from './localizedRoutes';

const base = site.seo.site_url;
const personId = `${base}/#person`;

function projectSchema(project: Project, language: Language) {
  const website = ['safelabs', 'dragon'].includes(project.id);
  const portfolio = `${base}${getLocalizedPath('portfolio', language)}`;
  const urls = [project.link, project.appStoreLink, project.playStoreLink].filter(Boolean);
  return {
    '@type': website ? 'WebSite' : 'SoftwareApplication',
    '@id': `${base}/#project-${project.id}`,
    name: project.name,
    description: project.description,
    url: urls[0] ?? `${portfolio}#${project.id}`,
    mainEntityOfPage: `${portfolio}#${project.id}`,
    author: { '@id': personId },
    ...(project.image ? { image: `${base}${project.image}` } : {}),
    ...(urls.length ? { sameAs: urls } : {}),
    ...(!website ? {
      applicationCategory: project.category,
      ...(project.operatingSystem ? { operatingSystem: project.operatingSystem } : {}),
    } : {}),
    ...(project.status ? { creativeWorkStatus: project.status } : {}),
  };
}

export function buildStructuredData(page: PageKey, content: typeof site, language: Language, canonical: string) {
  if (page === 'not_found') return null;
  const projects = page === 'home' ? getFeaturedProjects(language) : getPortfolioProjects(language);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite', '@id': `${base}/#website`, url: `${base}/`,
      name: content.seo.site_name, inLanguage: ['en', 'pl'], publisher: { '@id': personId },
    },
    {
      '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical,
      name: content.seo.pages[page].title, description: content.seo.pages[page].description,
      inLanguage: language, isPartOf: { '@id': `${base}/#website` }, about: { '@id': personId },
      ...(page === 'home' ? {
        mainEntity: { '@id': personId }, primaryImageOfPage: { '@id': `${base}/#portrait` },
      } : {}),
      ...(page === 'portfolio' ? { mainEntity: { '@id': `${canonical}#projects` } } : {}),
    },
    {
      '@type': 'Person', '@id': personId, name: content.seo.site_name, alternateName: 'Mikolaj Piech',
      url: `${base}/`, image: { '@id': `${base}/#portrait` },
      mainEntityOfPage: { '@id': `${base}${getLocalizedPath('home', language)}#webpage` },
      jobTitle: language === 'pl' ? 'Founder i Developer' : 'Founder & Developer',
      description: content.seo.person_description, sameAs: Object.values(agent.profiles),
    },
    {
      '@type': 'ImageObject', '@id': `${base}/#portrait`,
      url: `${base}/mikolaj-profile.jpg`, contentUrl: `${base}/mikolaj-profile.jpg`,
      width: 400, height: 400, caption: content.seo.site_name,
    },
  ];
  if (page === 'home' || page === 'portfolio') {
    graph.push({
      '@type': 'ItemList', '@id': `${canonical}#projects`,
      name: content.projects.title,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem', position: index + 1, item: projectSchema(project, language),
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
