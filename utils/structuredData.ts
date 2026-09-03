import agent from '../content/agent.json';
import site from '../content/site.json';
import { getFeaturedProjects, getPortfolioProjects } from '../data/projects';
import type { Language, Project } from '../types';
import type { PageKey } from './seo';
import { getLocalizedPath } from './localizedRoutes';

const base = site.seo.site_url;
const personId = `${base}/#person`;
const clevrAppsUrl = 'https://clevrapps.com/';
const clevrAppsId = `${clevrAppsUrl}#organization`;
const clevrProjectIds = new Set(['trailo', 'subby', 'doso', 'solvee', 'twojasiec']);

function projectSchema(project: Project, language: Language) {
  const website = ['safelabs', 'dragon'].includes(project.id);
  const portfolio = `${base}${getLocalizedPath('portfolio', language)}`;
  const urls = [project.link, project.studioLink, project.appStoreLink, project.playStoreLink].filter(Boolean);
  const authors = project.id === 'safelabs'
    ? [
        { '@id': personId },
        { '@type': 'Person', name: 'Oskar Minor', url: 'https://oskarminor.com/' },
        { '@type': 'Person', name: 'Kamil Zdebski', url: 'https://kamilzdebski.com/' },
      ]
    : { '@id': personId };
  return {
    '@type': website ? 'WebSite' : 'SoftwareApplication',
    '@id': `${base}/#project-${project.id}`,
    name: project.name,
    description: project.description,
    url: urls[0] ?? `${portfolio}#${project.id}`,
    mainEntityOfPage: `${portfolio}#${project.id}`,
    author: authors,
    ...(clevrProjectIds.has(project.id) ? { publisher: { '@id': clevrAppsId } } : {}),
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
      worksFor: { '@id': clevrAppsId },
    },
    {
      '@type': 'Organization', '@id': clevrAppsId, name: 'Clevr Apps', url: clevrAppsUrl,
      founder: { '@id': personId },
      description: language === 'pl'
        ? 'Niezależne studio produktowe tworzące aplikacje na iOS, Androida i web.'
        : 'Independent product studio building apps for iOS, Android and the web.',
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
