import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Apple, Play, ArrowUpRight, LucideIcon } from 'lucide-react';
import { Project } from '../types';
import { ScreenshotGallery } from './ScreenshotGallery';
import { useLanguage } from '../context/LanguageContext';

interface ProjectShowcaseProps {
  project: Project;
}

const StatusBadge = ({ status, className = '' }: { status: string; className?: string }) => {
  const normalizedStatus = status.toLowerCase();
  const isSold = normalizedStatus === 'sold' || normalizedStatus.includes('sprzed');
  const isSoon =
    normalizedStatus.includes('soon') ||
    normalizedStatus.includes('early') ||
    normalizedStatus.includes('development') ||
    normalizedStatus.includes('dostęp') ||
    normalizedStatus.includes('tworzenia');

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

type ProjectLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  primary?: boolean;
};

function buildProjectLinks(project: Project, visitLabel: string): ProjectLink[] {
  const links: ProjectLink[] = [];
  const storeUrls = new Set([project.appStoreLink, project.playStoreLink].filter(Boolean));

  if (project.link && project.linkText) {
    links.push({ href: project.link, label: project.linkText, icon: ArrowUpRight, primary: true });
  } else if (project.link && !storeUrls.has(project.link)) {
    links.push({ href: project.link, label: `${visitLabel} ${project.name}`, icon: ArrowUpRight, primary: true });
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
  const { site } = useLanguage();
  const links = useMemo(() => buildProjectLinks(project, site.ui.visit), [project, site.ui.visit]);

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
  const { site } = useLanguage();
  const metaItems = [
    { key: 'platform', label: site.ui.platform },
    { key: 'category', label: site.ui.category },
    { key: 'scope', label: site.ui.scope },
  ] as const;
  const screenshots = project.screenshots ?? (project.image ? [{ src: project.image, alt: `${project.name} ${site.ui.preview}`, variant: 'phone' as const }] : []);
  const useSiteDescription = ['trailo', 'doso', 'solvee' /* , 'platoic' */].includes(project.id);
  const summary = useSiteDescription ? project.description : (project.outcome ?? project.description);

  if (project.layout === 'web') {
    const heroShot = screenshots[0];

    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-full overflow-hidden rounded-2xl sm:rounded-[2rem] border border-stone-200/70 dark:border-stone-800 bg-white/60 dark:bg-stone-800/20"
      >
        {heroShot && (
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/7] bg-[#F5F5F7] dark:bg-stone-950/60 overflow-hidden">
            <img
              src={heroShot.src}
              alt={heroShot.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.04] pointer-events-none" />
          </div>
        )}

        <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.75fr)] gap-7 lg:gap-12 p-5 sm:p-8 md:p-10">
          <header className="min-w-0">
            <div className="flex items-center gap-3 mb-4 min-w-0">
              {project.icon && (
                <img
                  src={project.icon}
                  alt=""
                  aria-hidden="true"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-[22%] object-cover bg-white dark:bg-stone-800 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.06] dark:ring-white/10 shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-serif font-light text-ink dark:text-stone-50 tracking-tight leading-none">
                    {project.name}
                  </h2>
                  {project.status && <StatusBadge status={project.status} />}
                </div>
                <p className="mt-1 text-sm sm:text-base font-serif italic text-stone-500 dark:text-stone-400 leading-snug">
                  {project.tagline}
                </p>
              </div>
            </div>
            {summary && (
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed max-w-2xl">
                {summary}
              </p>
            )}
          </header>

          <div className="space-y-5 lg:border-l lg:border-stone-200/70 dark:lg:border-stone-700/60 lg:pl-8">
            <dl className="rounded-xl border border-stone-200/70 dark:border-stone-700/60 bg-stone-50/40 dark:bg-stone-800/25 overflow-hidden sm:grid sm:grid-cols-3 sm:divide-x sm:divide-stone-200/70 dark:sm:divide-stone-700/60">
              {metaItems.map((item, i) => (
                <div
                  key={item.key}
                  className={`flex items-start justify-between gap-3 px-4 py-2.5 sm:flex-col sm:items-start sm:justify-start sm:gap-0 sm:px-4 sm:py-4 ${
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
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-full overflow-visible"
    >
      <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start overflow-visible">
        <div className="lg:col-span-5 space-y-4 sm:space-y-6 min-w-0">
          <header className="space-y-3 sm:space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 min-w-0">
                {project.icon && (
                  <div className="relative shrink-0">
                    <img
                      src={project.icon}
                      alt=""
                      aria-hidden="true"
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
            {metaItems.map((item, i) => (
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
