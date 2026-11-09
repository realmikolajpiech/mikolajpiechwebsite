import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TransitionLink } from '../components/TransitionLink';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SiteNav } from '../components/SiteNav';
import { PageMeta } from '../components/PageMeta';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { StoryPhones, readLabel } from '../components/StoryCard';
import { useLanguage } from '../context/LanguageContext';
import { getStory, getStories, type ProjectStory as Story } from '../data/stories';
import { getLocalizedPath } from '../utils/localizedRoutes';
import { getStoryMeta } from '../utils/storyMeta';
import NotFound from './NotFound';

function Evidence({ story, items, flip }: { story: Story; items: Story['evidence']; flip: boolean }) {
  return <figure className="story-figure" data-flip={flip || undefined} data-count={items.length}>
    <div className="story-figure-shots">{items.map(item => {
      const image = story.project.screenshots![item.index];
      return <ResponsiveImage key={item.index} src={image.src} alt={image.alt} sizes="(max-width: 767px) 40vw, 230px" />;
    })}</div>
    <figcaption>{items.map(item => {
      // The first sentence reads as the caption; any note after it stays small.
      const [lead, ...rest] = item.caption.split(/(?<=\.)\s+/);
      return <span key={item.index}>{lead}{rest.length > 0 && <small>{rest.join(' ')}</small>}</span>;
    })}</figcaption>
  </figure>;
}

/** The next-story card becomes the following page's cover, but only during its own transition. */
function NextStory({ next, pl, language }: { next: Story; pl: boolean; language: 'en' | 'pl' }) {
  return <TransitionLink className="story-next" to={next.path} data-story={next.id} transitionName={`story-${next.id}`}>
    <div className="story-next-copy">
      <span className="story-next-label">{pl ? 'Następny projekt' : 'Next project'}: <strong>{next.project.name}</strong></span>
      <span className="story-next-title">{next.title}</span>
      <span className="story-read">{readLabel(next, language)}<ArrowRight size={16} aria-hidden="true" /></span>
    </div>
    <div className="story-next-visual" aria-hidden="true"><StoryPhones story={next} sizes="(max-width: 767px) 30vw, 140px" /></div>
  </TransitionLink>;
}

export default function ProjectStory() {
  const { slug = '' } = useParams();
  const { language, site } = useLanguage();
  const story = getStory(slug, language);
  if (!story) return <NotFound />;
  const pl = language === 'pl';
  const stories = getStories(language);
  const next = stories[(stories.findIndex(item => item.id === story.id) + 1) % stories.length];
  let figures = 0;

  return <div className="personal-home story-page" data-story={story.id}>
    <PageMeta {...getStoryMeta(story.id, site, language)} />
    <a href="#main" className="personal-skip">{site.personal.skip}</a><SiteNav />
    <main id="main" className="personal-container">
      <TransitionLink className="story-back" to={getLocalizedPath('portfolio', language)}><ArrowLeft size={15} aria-hidden="true" />{pl ? 'Wszystkie projekty' : 'All projects'}</TransitionLink>

      <header className="story-header">
        <h1>{story.title}</h1>
        <p className="story-intro">{story.summary}</p>
      </header>

      <div className="story-cover" aria-hidden="true"><StoryPhones story={story} sizes="(max-width: 767px) 34vw, 240px" eager /></div>

      <dl className="story-facts">
        {story.stat && <div className="story-facts-stat"><dt>{story.stat.label}</dt><dd>{story.stat.value}</dd></div>}
        <div><dt>{pl ? 'Moja rola' : 'My role'}</dt><dd>{story.role}</dd></div>
        <div><dt>{pl ? 'Platforma' : 'Platform'}</dt><dd>{story.project.platform}</dd></div>
      </dl>

      <div className="story-body">
        {story.sections.map((section, index) => {
          const evidence = story.evidence.filter(item => item.after === index);
          return <Fragment key={section.title}>
            <section className="story-section">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
            {evidence.length > 0 && <Evidence story={story} items={evidence} flip={figures++ % 2 === 1} />}
          </Fragment>;
        })}

        {!!story.project.technologies?.length && <details className="story-technical"><summary>{pl ? 'Szczegóły techniczne' : 'Technical details'}</summary><dl>{story.project.technologies.map(tech => <div key={tech.label}><dt>{tech.label}</dt><dd>{tech.items}</dd></div>)}</dl></details>}

        <a className="story-action" href={story.action.href} target="_blank" rel="noopener">{story.action.label}<ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>

      <NextStory key={next.id} next={next} pl={pl} language={language} />
    </main>
    <footer className="personal-footer personal-container"><Link to={`${getLocalizedPath('home', language)}#contact`}>{pl ? 'Kontakt' : 'Say hello'}</Link><Link to={getLocalizedPath('privacy', language)}>{site.common.privacy_policy}</Link></footer>
  </div>;
}
