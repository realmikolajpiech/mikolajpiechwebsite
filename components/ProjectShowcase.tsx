import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Apple, Play, ArrowUpRight, ChevronDown, LucideIcon } from 'lucide-react';
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
    <div className="flex flex-wrap gap-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.href + link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-200 ${
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

const ProjectTechnologies = ({ project }: { project: Project }) => {
  const { site } = useLanguage();

  if (!project.technologies?.length) return null;

  return (
    <details className="group">
      <summary className="inline-flex cursor-pointer list-none flex-col items-start rounded-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-stone-400/40 [&::-webkit-details-marker]:hidden">
        <span className="mb-1.5 text-[10px] uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500">
          {site.ui.tech_stack}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors group-hover:text-stone-600 sm:text-sm dark:text-stone-100 dark:group-hover:text-stone-300">
          {site.ui.technologies_used}
          <ChevronDown
            size={15}
            strokeWidth={1.75}
            aria-hidden="true"
            className="shrink-0 text-stone-400 transition-transform duration-200 group-open:rotate-180 dark:text-stone-500"
          />
        </span>
      </summary>

      <dl className="mt-3 grid gap-x-10 gap-y-5 rounded-xl bg-stone-100/60 p-4 sm:grid-cols-2 sm:p-5 dark:bg-stone-800/45">
        {project.technologies.map((technology) => (
          <div
            key={technology.label}
            className="min-w-0"
          >
            <dt className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.13em] text-stone-500 dark:text-stone-400">
              {technology.label}
            </dt>
            <dd className="text-[13px] leading-relaxed text-stone-600 text-pretty dark:text-stone-300">
              {technology.items}
            </dd>
          </div>
        ))}
      </dl>
    </details>
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ project }) => {
  const { site } = useLanguage();
  const isWordmark = project.iconStyle === 'wordmark';
  const metaItems = [
    { key: 'platform', label: site.ui.platform },
    { key: 'scope', label: site.ui.scope },
  ] as const;
  const screenshots = project.screenshots ?? (project.image ? [{ src: project.image, alt: `${project.name} ${site.ui.preview}`, variant: 'phone' as const }] : []);
  const useSiteDescription = ['trailo', 'doso', 'solvee' /* , 'platoic' */].includes(project.id);
  const summary = useSiteDescription ? project.description : (project.outcome ?? project.description);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-full overflow-visible"
    >
      <div className="lg:pr-10 xl:pr-14">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-3">
            <div className="flex items-center gap-3.5 min-w-0">
              {project.icon && (
                <div className="relative shrink-0">
                  <img
                    src={project.icon}
                    alt=""
                    aria-hidden="true"
                    className={isWordmark
                      ? 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain'
                      : 'w-12 h-12 sm:w-14 sm:h-14 md:w-[3.75rem] md:h-[3.75rem] rounded-[22%] object-contain p-1 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.06] dark:ring-white/10'}
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-[1.65rem] sm:text-[1.85rem] md:text-[2rem] font-serif font-light text-ink dark:text-stone-50 tracking-tight leading-none">
                  {project.name}
                </h2>
                <p className="mt-1.5 text-sm sm:text-[0.9375rem] md:text-base font-serif italic text-stone-500 dark:text-stone-400 leading-snug text-pretty break-words">
                  {project.tagline}
                </p>
              </div>
            </div>
            {project.status && <StatusBadge status={project.status} className="self-start" />}
          </div>

          <ProjectLinks project={project} />
        </header>

        {(summary || project.whyBuiltIt) && (
          <div className="mt-6 grid items-start gap-4 sm:mt-7 lg:grid-cols-12 lg:gap-14">
            {summary && (
              <p className={`${project.whyBuiltIt ? 'lg:col-span-5' : 'lg:col-span-7'} max-w-lg text-sm font-light leading-relaxed text-stone-600 text-pretty break-words sm:text-[15px] md:text-base dark:text-stone-300`}>
                {summary}
              </p>
            )}

            {project.whyBuiltIt && (
              <p className="max-w-2xl text-sm font-light leading-[1.75] text-stone-500 text-pretty break-words sm:text-[15px] lg:col-span-7 dark:text-stone-400">
                {project.whyBuiltIt}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-5 sm:mt-7 lg:flex-row lg:items-start lg:gap-14">
          <dl className="flex shrink-0 flex-wrap gap-x-10 gap-y-4 sm:gap-x-14">
            {metaItems.map((item) => (
              <div key={item.key} className="min-w-0 max-w-sm">
                <dt className="mb-1.5 text-[10px] uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500">
                  {item.label}
                </dt>
                <dd className="text-[13px] font-medium leading-snug text-ink break-words [overflow-wrap:anywhere] sm:text-sm dark:text-stone-100">
                  {project[item.key]}
                </dd>
              </div>
            ))}
          </dl>

          {project.technologies?.length ? (
            <div className="min-w-0 flex-1 lg:-mt-0.5">
              <ProjectTechnologies project={project} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-7 min-w-0 overflow-visible sm:mt-9">
        <ScreenshotGallery screenshots={screenshots} projectName={project.name} />
      </div>
    </motion.article>
  );
};
