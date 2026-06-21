import React from 'react';
import { Project } from '../types';

interface PortfolioSideNavProps {
  projects: Project[];
  activeId: string;
  onNavigate: (id: string) => void;
}

export const PortfolioSideNav: React.FC<PortfolioSideNavProps> = ({
  projects,
  activeId,
  onNavigate,
}) => {
  const handleClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <nav aria-label="Project navigation">
      <ul className="relative flex flex-col border-l border-stone-200 dark:border-stone-800">
        {projects.map((project) => {
          const isActive = activeId === project.id;

          return (
            <li key={project.id}>
              <a
                href={`#${project.id}`}
                onClick={handleClick(project.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative -ml-px flex items-center gap-3 border-l-[3px] py-2.5 pl-4 pr-1 outline-none focus-visible:ring-2 focus-visible:ring-stone-400/40 transition-colors duration-200 ${
                  isActive
                    ? 'border-ink dark:border-stone-100 text-ink dark:text-stone-50'
                    : 'border-transparent text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'
                }`}
              >
                {project.icon && (
                  <img
                    src={project.icon}
                    alt=""
                    aria-hidden="true"
                    className={`w-6 h-6 rounded-[20%] object-cover shrink-0 transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'
                    }`}
                  />
                )}

                <span className={`text-[13px] tracking-wide ${isActive ? 'font-medium' : 'font-light'}`}>
                  {project.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
