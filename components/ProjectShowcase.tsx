import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Apple, Play, ArrowUpRight, LucideIcon } from 'lucide-react';
import { Project } from '../types';
import { ScreenshotGallery } from './ScreenshotGallery';

interface ProjectShowcaseProps {
  project: Project;
}

const StatusBadge = ({ status, className = '' }: { status: string; className?: string }) => {
  const isSold = status.toLowerCase() === 'sold';
  const isSoon = status.toLowerCase().includes('soon') || status.toLowerCase().includes('early');

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider shrink-0 ${
        isSold
          ? 'bg-ink text-off-white dark:bg-stone-100 dark:text-ink'
          : isSoon
            ? 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300 border border-stone-200 dark:border-stone-600'
            : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40'
      } ${className}`}
    >
      {status}
    </span>
  );
};

const META_ITEMS = [
  { key: 'platform', label: 'Platform' },
  { key: 'category', label: 'Category' },
  { key: 'scope', label: 'Scope' },
] as const;

type ProjectLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  primary?: boolean;
};

function buildProjectLinks(project: Project): ProjectLink[] {
  const links: ProjectLink[] = [];
  const storeUrls = new Set([project.appStoreLink, project.playStoreLink].filter(Boolean));

  if (project.link && project.linkText) {
    links.push({ href: project.link, label: project.linkText, icon: ArrowUpRight, primary: true });
  } else if (project.link && !storeUrls.has(project.link)) {
    links.push({ href: project.link, label: `Visit ${project.name}`, icon: ArrowUpRight, primary: true });
  }

  if (project.appStoreLink) {
    links.push({ href: project.appStoreLink, label: 'App Store', icon: Apple });
  }
  if (project.playStoreLink) {
    links.push({ href: project.playStoreLink, label: 'Play Store', icon: Play });
  }

  return links;
}

const ProjectLinks = ({ project }: { project: Project }) => {
  const links = useMemo(() => buildProjectLinks(project), [project]);

  if (links.length === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.href + link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-200 w-full sm:w-auto ${
              link.primary
                ? 'bg-ink text-off-white dark:bg-stone-100 dark:text-ink hover:bg-stone-800 dark:hover:bg-stone-200 shadow-sm'
                : 'border border-stone-200/80 dark:border-stone-700/60 bg-white/80 dark:bg-stone-800/40 text-stone-700 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800/70'
            }`}
          >
            <Icon size={14} strokeWidth={1.75} className="shrink-0" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ project }) => {
  const screenshots = project.screenshots ?? (project.image ? [{ src: project.image, alt: `${project.name} preview`, variant: 'phone' as const }] : []);
  const useSiteDescription = ['trailo', 'doso', 'solvee' /* , 'platoic' */].includes(project.id);
  const summary = useSiteDescription ? project.description : (project.outcome ?? project.description);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-w-0 max-w-full overflow-visible"
    >
      <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start min-w-0 overflow-visible">
        <div className="lg:col-span-5 space-y-4 sm:space-y-6 min-w-0">
          <header className="space-y-3 sm:space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 min-w-0">
                {project.icon && (
                  <div className="relative shrink-0">
                    <img
                      src={project.icon}
                      alt=""
                      className="w-11 h-11 sm:w-14 sm:h-14 md:w-[3.75rem] md:h-[3.75rem] rounded-[22%] object-cover bg-white dark:bg-stone-800 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.06] dark:ring-white/10"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-[1.65rem] md:text-[2rem] font-serif font-light text-ink dark:text-stone-50 tracking-tight leading-none">
                    {project.name}
                  </h2>
                  <p className="mt-1 text-sm sm:text-[0.9375rem] md:text-base font-serif italic text-stone-500 dark:text-stone-400 leading-snug text-pretty break-words">
                    {project.tagline}
                  </p>
                </div>
              </div>
              {project.status && <StatusBadge status={project.status} className="self-start" />}
            </div>

            {summary && (
              <p className="text-sm sm:text-[15px] md:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed text-pretty break-words">
                {summary}
              </p>
            )}
          </header>

          <dl className="rounded-xl border border-stone-200/70 dark:border-stone-700/60 bg-stone-50/40 dark:bg-stone-800/25 overflow-hidden sm:grid sm:grid-cols-3 sm:divide-x sm:divide-stone-200/70 dark:sm:divide-stone-700/60">
            {META_ITEMS.map((item, i) => (
              <div
                key={item.key}
                className={`flex items-start justify-between gap-3 px-4 py-2.5 sm:flex-col sm:items-start sm:justify-start sm:gap-0 sm:px-5 sm:py-4 md:py-5 ${
                  i > 0 ? 'border-t border-stone-200/70 dark:border-stone-700/60 sm:border-t-0' : ''
                }`}
              >
                <dt className="text-[10px] uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500 shrink-0 sm:mb-1.5">
                  {item.label}
                </dt>
                <dd className="text-[13px] sm:text-sm font-medium text-ink dark:text-stone-100 leading-snug text-right sm:text-left break-words min-w-0">
                  {project[item.key]}
                </dd>
              </div>
            ))}
          </dl>

          <ProjectLinks project={project} />
        </div>

        <div className="lg:col-span-7 min-w-0 overflow-visible">
          <ScreenshotGallery screenshots={screenshots} projectName={project.name} />
        </div>
      </div>
    </motion.article>
  );
};
