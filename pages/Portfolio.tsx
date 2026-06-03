import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowDown, Copy, Check } from 'lucide-react';
import { SiteNav } from '../components/SiteNav';
import { PortfolioSideNav } from '../components/PortfolioSideNav';
import { PortfolioMobileNav } from '../components/PortfolioMobileNav';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { Button } from '../components/Button';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useScrollOffset } from '../hooks/useScrollOffset';
import { scrollToPortfolioSection } from '../utils/portfolioScroll';
import { getProjects } from '../data/projects';
import site from '../content/site.json';

const CONTACT_EMAIL = 'hello@mikolajpiech.com';

function scrollToSection(id: string) {
  scrollToPortfolioSection(id);
}

export default function Portfolio() {
  const projects = useMemo(() => getProjects(), []);
  const projectIds = useMemo(() => projects.map((p) => p.id), [projects]);
  const scrollOffset = useScrollOffset();
  const activeId = useScrollSpy(projectIds, scrollOffset);
  const [copied, setCopied] = React.useState(false);
  const year = new Date().getFullYear();

  const handleNavigate = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  const scrollToProjects = useCallback(() => {
    if (projectIds[0]) scrollToSection(projectIds[0]);
  }, [projectIds]);

  const handleCopyEmail = () => {
    void navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    site.portfolio.stats.apps,
    site.portfolio.stats.downloads,
    site.portfolio.stats.platforms,
    site.portfolio.stats.acquired,
  ];

  return (
    <div className="min-h-screen overflow-x-visible bg-off-white dark:bg-stone-900 selection:bg-stone-200 dark:selection:bg-stone-700 transition-colors duration-300">
      <SiteNav />

      <header className="relative pt-24 sm:pt-28 md:pt-36 pb-14 sm:pb-20 md:pb-28 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(120,113,108,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(120,113,108,0.15),transparent)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-ink dark:hover:text-stone-50 transition-colors mb-8 sm:mb-10"
          >
            <ArrowLeft size={16} />
            {site.portfolio.back_home}
          </Link>

          <h1 className="text-[2.35rem] leading-[1] sm:text-5xl md:text-7xl lg:text-8xl font-serif font-light sm:leading-[0.95] text-ink dark:text-stone-50 tracking-tight mb-5 sm:mb-6 text-balance">
            {site.portfolio.headline}{' '}
            <span className="font-serif-italic text-stone-400">{site.portfolio.headline_accent}</span>
          </h1>

          <p className="text-lg md:text-xl text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-2xl mb-10">
            {site.portfolio.subtitle}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500 dark:text-stone-400 font-light">
            {stats.map((stat, i) => (
              <React.Fragment key={stat}>
                {i > 0 && <span className="hidden sm:inline text-stone-300 dark:text-stone-700" aria-hidden>·</span>}
                <span>{stat}</span>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {projectIds[0] && (
          <button
            type="button"
            onClick={scrollToProjects}
            className="mt-12 inline-flex items-center gap-2 text-xs text-stone-400 dark:text-stone-500 hover:text-ink dark:hover:text-stone-300 transition-colors"
          >
            <ArrowDown size={14} />
            Explore projects
          </button>
        )}
      </header>

      <div id="portfolio-projects" className="border-t border-stone-200/60 dark:border-stone-800/60 overflow-visible">
        <PortfolioMobileNav
          projects={projects}
          activeId={activeId}
          onNavigate={handleNavigate}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 overflow-visible">
          <div className="lg:grid lg:grid-cols-[9rem_1fr] xl:grid-cols-[10rem_1fr] xl:gap-x-16 lg:gap-x-12">
            <aside className="hidden lg:block">
              <div className="sticky top-28 pt-12 pb-24">
                <PortfolioSideNav
                  projects={projects}
                  activeId={activeId}
                  onNavigate={handleNavigate}
                />
              </div>
            </aside>

            <main className="overflow-visible py-8 sm:py-12 md:py-16 pb-20 sm:pb-24 md:pb-32">
              <div>
                {projects.map((project, index) => (
                  <React.Fragment key={project.id}>
                    {index > 0 && (
                      <div
                        className="h-px bg-gradient-to-r from-transparent via-stone-200 dark:via-stone-800 to-transparent mt-8 md:mt-10 mb-6 md:mb-8"
                        aria-hidden
                      />
                    )}
                    <section
                      id={project.id}
                      className="scroll-mt-[7.75rem] pt-14 lg:pt-0 lg:scroll-mt-32 overflow-visible"
                    >
                      <ProjectShowcase project={project} />
                    </section>
                  </React.Fragment>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>

      <section className="bg-ink text-off-white py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-6 leading-tight">
              {site.portfolio.cta_title}
            </h2>
            <p className="text-stone-400 text-lg mb-10 font-light leading-relaxed">
              {site.portfolio.cta_description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleCopyEmail}
                variant="secondary"
                className="relative overflow-hidden min-w-[220px]"
              >
                <span className={`flex items-center gap-2 transition-all duration-300 ${copied ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
                  {CONTACT_EMAIL} <Copy className="w-4 h-4" />
                </span>
                <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {site.common.copied} <Check className="w-4 h-4 text-green-500" />
                </span>
              </Button>
              <Button href="https://www.linkedin.com/in/mikolajpiech/" variant="outline" className="text-off-white border-stone-700 hover:border-off-white hover:bg-stone-800" external>
                {site.common.linkedin}
              </Button>
            </div>
          </motion.div>

          <div className="mt-16 pt-10 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-stone-500">
            <p>{site.common.all_rights_reserved.replace('{{year}}', String(year))}</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-off-white transition-colors">Home</Link>
              <Link to="/privacy-policy" className="hover:text-off-white transition-colors">{site.common.privacy_policy}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
