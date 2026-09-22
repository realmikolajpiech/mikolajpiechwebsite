import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ResponsiveImage } from './ResponsiveImage';
import { useLanguage } from '../context/LanguageContext';
import type { Project } from '../types';

export const SelectedProject: React.FC<{ project: Project; portfolioPath: string }> = ({ project, portfolioPath }) => {
  const { site } = useLanguage();
  const isWeb = project.layout === 'web';
  const previews = isWeb ? [{ src: project.image, alt: `${project.name} ${site.ui.website_preview}` }] : project.screenshots?.slice(0, 2) ?? [{ src: project.image, alt: `${project.name} ${site.ui.preview}` }];
  return (
    <article className={`personal-project personal-project-${project.id}`}>
      <Link to={`${portfolioPath}#${project.id}`} className="personal-project-link" aria-label={`${project.name}: ${site.personal.project_link}`}>
        <div className={`personal-project-preview ${isWeb ? 'personal-preview-web' : 'personal-preview-app'}`}>
          {previews.map(preview => <ResponsiveImage key={preview.src} src={preview.src} alt={preview.alt} sizes={isWeb ? '(max-width: 767px) 90vw, 500px' : '220px'} />)}
        </div>
        <div className="personal-project-heading">
          {project.icon && <ResponsiveImage src={project.icon} alt="" sizes="48px" className="personal-project-icon" />}
          <h3>{project.name}</h3>
          {project.status && <span className="personal-project-status">{project.status}</span>}
          <ArrowUpRight size={20} className="personal-project-arrow" aria-hidden="true" />
        </div>
      </Link>
      <p className="personal-project-description">{project.description}</p>
    </article>
  );
}
