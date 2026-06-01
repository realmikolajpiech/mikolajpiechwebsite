import React, { useEffect, useRef } from 'react';
import { Project } from '../types';

interface PortfolioMobileNavProps {
  projects: Project[];
  activeId: string;
  onNavigate: (id: string) => void;
}

export const PortfolioMobileNav: React.FC<PortfolioMobileNavProps> = ({
  projects,
  activeId,
  onNavigate,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const activeLink = list.querySelector<HTMLElement>(`a[aria-current="true"]`);
    activeLink?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeId]);

  const handleClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <nav
      aria-label="Project navigation"
      className="lg:hidden sticky top-16 sm:top-[4.75rem] z-40 bg-off-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/60 shadow-[0_1px_0_rgba(0,0,0,0.03)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)] px-5 sm:px-6 pt-2.5 pb-3"
    >
      <ul ref={listRef} className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory max-w-7xl mx-auto">
        {projects.map((project) => {
          const isActive = activeId === project.id;

          return (
            <li key={project.id} className="snap-start shrink-0">
              <a
                href={`#${project.id}`}
                onClick={handleClick(project.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-stone-400/40 ${
                  isActive
                    ? 'bg-ink text-off-white dark:bg-stone-100 dark:text-ink shadow-sm'
                    : 'bg-stone-100/80 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300'
                }`}
              >
                {project.icon && (
                  <img
                    src={project.icon}
                    alt=""
                    className="w-5 h-5 rounded-[20%] object-cover shrink-0"
                  />
                )}
                {project.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
