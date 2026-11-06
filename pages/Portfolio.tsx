import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { SiteNav } from '../components/SiteNav';
import { StoryList } from '../components/StoryCard';
import { getStories } from '../data/stories';
import { getPortfolioProjects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { getPageMeta } from '../utils/seo';
import { getLocalizedPath } from '../utils/localizedRoutes';

export default function Portfolio() {
  const { language, site } = useLanguage();
  const stories = getStories(language);
  const ids = new Set<string>(stories.map(story => story.id));
  const other = getPortfolioProjects(language).filter(project => !ids.has(project.id));
  const pl = language === 'pl';
  return <div className="personal-home stories-index">
    <PageMeta {...getPageMeta('portfolio', site, language)} />
    <a href="#main" className="personal-skip">{site.personal.skip}</a><SiteNav />
    <main id="main" className="personal-container">
      <header className="stories-index-header"><h1>{pl ? 'Projekty.' : 'Projects.'}</h1></header>
      <StoryList stories={stories} language={language} />
      <section className="other-work" aria-labelledby="other-work-title"><h2 id="other-work-title">{pl ? 'Pozostałe projekty' : 'Other work'}</h2><ul>{other.map(project => <li id={project.id} key={project.id}><a href={project.studioLink ?? project.link} target="_blank" rel="noopener"><span>{project.name}</span><span>{project.tagline}</span><ArrowUpRight size={15} aria-hidden="true" /></a></li>)}</ul></section>
    </main>
    <footer className="personal-footer personal-container"><Link to={`${getLocalizedPath('home', language)}#contact`}>{pl ? 'Kontakt' : 'Say hello'}</Link><Link to={getLocalizedPath('privacy', language)}>{site.common.privacy_policy}</Link></footer>
  </div>;
}
