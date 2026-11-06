import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ResponsiveImage } from './ResponsiveImage';
import type { ProjectStory } from '../data/stories';
import type { Language } from '../types';

/** Up to three phone screenshots side by side; the middle one sits highest. */
export function StoryPhones({ story, sizes, eager = false }: { story: ProjectStory; sizes: string; eager?: boolean }) {
  const shots = story.cover.map(index => story.project.screenshots?.[index]).filter(Boolean);
  return <div className="story-phones" data-count={shots.length}>
    {shots.map(shot => <ResponsiveImage key={shot!.src} src={shot!.src} alt={shot!.alt} sizes={sizes} loading={eager ? 'eager' : 'lazy'} />)}
  </div>;
}

export function readLabel(_story: ProjectStory, language: Language) {
  return language === 'pl' ? 'Zobacz projekt' : 'See the project';
}

/** The story list: each story is one link with its text on the left and its screens on the right. */
export function StoryList({ stories, language }: { stories: ProjectStory[]; language: Language }) {
  return <ol className="story-index">
    {stories.map(story => {
      // The middle cover screenshot leads; the other two fan out behind it.
      const [left, main, right] = story.cover.map(index => story.project.screenshots?.[index]);
      const backs = [['left', left], ['right', right]] as const;
      return <li key={story.id} id={story.id} className="story-row" data-story={story.id}>
        <Link to={story.path} className="story-row-link">
          <div className="story-row-copy">
            <div className="story-row-name">
              {story.project.icon && <img src={story.project.icon} alt="" width={40} height={40} />}
              <h3>{story.project.name}</h3>
            </div>
            <p className="story-row-title">{story.title}</p>
            {story.stat
              ? <p className="story-row-fact"><strong>{story.stat.value}</strong> {story.stat.label}</p>
              : story.note && <p className="story-row-fact">{story.note}</p>}
            <span className="story-read">{readLabel(story, language)}<ArrowRight size={16} aria-hidden="true" /></span>
          </div>
          {main && <div className="story-row-field" aria-hidden="true">
            <span className="story-field-shot">
              {backs.map(([side, back]) => back && <ResponsiveImage key={side} className="story-field-back" data-side={side} src={back.src} alt="" sizes="(max-width: 767px) 150px, 230px" />)}
              <ResponsiveImage className="story-field-main" src={main.src} alt="" sizes="(max-width: 767px) 150px, 230px" />
            </span>
          </div>}
        </Link>
      </li>;
    })}
  </ol>;
}
