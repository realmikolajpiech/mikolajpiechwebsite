import { ResponsiveImage } from './ResponsiveImage';
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
  const links = useMemo(
    () => buildProjectLinks(project, site.ui.visit),
    [project, site.ui.visit],
  );

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 sm:gap-x-6">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.href + link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-sm text-[13px] font-medium underline-offset-4 transition-[color,transform] duration-200 hover:underline active:translate-y-px ${
              link.primary
                ? 'text-ink hover:text-stone-600 dark:text-stone-100 dark:hover:text-stone-300'
                : 'text-stone-500 hover:text-ink dark:text-stone-400 dark:hover:text-stone-100'
            }`}
          >
            <Icon size={14} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
};

const ProjectMetadata = ({ project }: { project: Project }) => {
  const { site } = useLanguage();
  const metaItems = [
    { label: site.ui.platform, value: project.platform },
    { label: site.ui.role, value: project.role },
  ];

  return (
    <dl className="grid grid-cols-[0.7fr_1.3fr] gap-5 border-t border-stone-200/70 pt-5 md:grid-cols-1 md:gap-5 md:border-l md:border-t-0 md:pl-6 md:pt-0 dark:border-stone-700/50">
      {metaItems.map((item) => (
        <div key={item.label}>
          <dt className="mb-1.5 text-xs text-stone-500 dark:text-stone-400">{item.label}</dt>
          <dd className="text-[13px] leading-relaxed text-ink dark:text-stone-200">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
};

const ProjectDetails = ({ project }: { project: Project }) => {
  const { site } = useLanguage();
  if (!project.whyBuiltIt && !project.technologies?.length) return null;

  return (
    <div className="mt-10 space-y-9 sm:mt-12 sm:space-y-10 lg:pr-10 xl:pr-14">
      {project.whyBuiltIt && (
        <section aria-labelledby={`${project.id}-story`} className="grid gap-4 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8">
          <h3 id={`${project.id}-story`} className="font-serif text-2xl leading-tight tracking-tight text-ink dark:text-stone-200">
            {site.ui.why_built_it}
          </h3>
          <p className="max-w-[65ch] text-[15px] leading-[1.85] text-stone-600 text-pretty dark:text-stone-400">
            {project.whyBuiltIt}
          </p>
        </section>
      )}

      {!!project.technologies?.length && (
        <section aria-labelledby={`${project.id}-technologies`} className="grid gap-5 border-t border-stone-200/70 pt-8 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8 dark:border-stone-700/50">
          <h3 id={`${project.id}-technologies`} className="font-serif text-2xl leading-tight tracking-tight text-ink dark:text-stone-200">
            {site.ui.tech_stack}
          </h3>
          <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {project.technologies.map((technology) => (
              <div key={technology.label} className="min-w-0">
                <dt className="mb-2 text-[13px] font-medium text-ink dark:text-stone-200">
                  {technology.label}
                </dt>
                <dd className="text-[13px] leading-[1.8] text-stone-500 text-pretty dark:text-stone-400">
                  {technology.items}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ project }) => {
  const { site } = useLanguage();
  const isWordmark = project.iconStyle === 'wordmark';
  const screenshots = project.screenshots ?? (project.image ? [{ src: project.image, alt: `${project.name} ${site.ui.preview}`, variant: 'phone' as const }] : []);
  const useSiteDescription = ['trailo', 'doso', 'solvee' /* , 'platoic' */].includes(project.id);
  const summary = useSiteDescription ? project.description : (project.outcome ?? project.description);

  return (
    <motion.article
      data-reveal
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-full overflow-visible"
    >
      <div className="lg:pr-10 xl:pr-14">
        <header>
          <div className="min-w-0 space-y-3">
            <div className="flex items-center gap-3.5 min-w-0">
              {project.icon && (
                <div className="relative shrink-0">
                  <ResponsiveImage
                    src={project.icon}
                    sizes="192px"
                    alt=""
                    aria-hidden="true"
                    className={isWordmark
                      ? 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain'
                      : 'w-12 h-12 sm:w-14 sm:h-14 rounded-[22%] object-contain p-1 ring-1 ring-black/[0.06] dark:ring-white/10'}
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h2 className="text-[1.85rem] sm:text-[2.25rem] font-serif font-light text-ink dark:text-stone-50 tracking-tight leading-none">
                    {project.name}
                  </h2>
                  {project.status && <StatusBadge status={project.status} />}
                </div>
                <p className="mt-1.5 text-sm sm:text-[0.9375rem] md:text-base font-serif italic text-stone-500 dark:text-stone-400 leading-snug text-pretty break-words">
                  {project.tagline}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-7 grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_12rem] md:gap-10 sm:mt-8">
          <div>
            {summary && (
              <p className="max-w-[48ch] text-[17px] leading-[1.7] text-stone-700 text-pretty break-words sm:text-lg dark:text-stone-300">
                {summary}
              </p>
            )}
            <div className="mt-4 empty:hidden">
              <ProjectLinks project={project} />
            </div>
          </div>
          <ProjectMetadata project={project} />
        </div>
      </div>

      <div className="mt-8 min-w-0 overflow-visible sm:mt-10">
        <ScreenshotGallery screenshots={screenshots} projectName={project.name} />
      </div>

      <ProjectDetails project={project} />
    </motion.article>
  );
};
