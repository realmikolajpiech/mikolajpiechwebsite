import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, ArrowRight, PanelsTopLeft, Smartphone, Monitor } from 'lucide-react';
import { Button } from '../components/Button';
import { ProjectCard } from '../components/ProjectCard';
import { PageMeta } from '../components/PageMeta';
import { SiteNav } from '../components/SiteNav';
import { ContactForm } from '../components/ContactForm';
import { CopyEmail } from '../components/CopyEmail';
import { getProjects } from '../data/projects';
import { Link } from 'react-router-dom';
import { getPageMeta } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../utils/localizedRoutes';
const CONTACT_EMAIL = 'hello@mikolajpiech.com';
const FEATURED_PROJECT_IDS = ['justmine', 'solvee', 'trailo', 'subby'];
const CAPABILITY_ICONS = [PanelsTopLeft, Smartphone, Monitor];

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 300 271" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
  </svg>
);

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 text-stone-400 hover:text-ink dark:hover:text-stone-50 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all duration-300 flex items-center justify-center"
  >
    {icon}
  </a>
);

export default function Home() {
  const { language, site } = useLanguage();
  const year = new Date().getFullYear();

  const projects = getProjects(language);
  const homepageDescriptions: Record<string, string> = {
    justmine: site.projects.justmine.homepage_description,
    solvee: site.projects.solvee.homepage_description,
    subby: site.projects.subby.homepage_description,
  };
  const featuredProjects = FEATURED_PROJECT_IDS
    .flatMap((id) => projects.filter((project) => project.id === id))
    .map((project) => ({
      ...project,
      description: homepageDescriptions[project.id] ?? project.description,
    }));
  const pageMeta = getPageMeta('home', site, language);
  const portfolioPath = getLocalizedPath('portfolio', language);
  const privacyPath = getLocalizedPath('privacy', language);

  return (
    <div className="min-h-screen bg-off-white dark:bg-stone-900 selection:bg-stone-200 dark:selection:bg-stone-700 transition-colors duration-300">
      <PageMeta {...pageMeta} />
      <SiteNav />

      <main>
      <section className="relative pt-28 md:pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">

          <div className="md:col-span-7 space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-8xl font-serif font-light leading-[0.95] text-ink dark:text-stone-50 mb-6 tracking-tight">
                {site.hero.headline_line1}<br />
                <span className="font-serif-italic text-stone-400">{site.hero.headline_line2}</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl space-y-4"
            >
              <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                {site.hero.intro}
              </p>
              {site.hero.description && (
                <p className="text-base md:text-lg text-ink dark:text-stone-200 leading-relaxed font-medium">
                  {site.hero.description}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 space-y-5"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="#work" className="w-full sm:w-auto">
                  {site.hero.primary_cta}
                  <ArrowRight size={15} className="ml-2" />
                </Button>
                <Button href="#contact" variant="outline" className="w-full sm:w-auto">
                  <Mail size={15} className="mr-2" />
                  {site.hero.secondary_cta}
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 items-center">
                <SocialIcon href="https://x.com/mikolajpiech" icon={<XLogo className="w-5 h-5" />} />
                <SocialIcon href="https://www.linkedin.com/in/mikolajpiech/" icon={<Linkedin size={20} />} />
                <SocialIcon href="https://github.com/realmikolajpiech" icon={<Github size={20} />} />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="md:col-span-5 relative self-start"
          >
            <div className="aspect-[3/4] md:aspect-square relative overflow-hidden rounded-full md:rounded-[3rem]">
              <img
                src="/mikolaj-profile.jpg"
                alt="Mikołaj Piech"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-full md:rounded-[3rem]"></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 max-w-7xl mx-auto" aria-labelledby="proof-title">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="border-y border-stone-200/80 dark:border-stone-800 grid lg:grid-cols-[1.15fr_2fr] gap-10 lg:gap-16 py-10 md:py-14"
        >
          <div className="max-w-md">
            <h2 id="proof-title" className="text-3xl md:text-4xl font-serif text-ink dark:text-stone-50 mb-3">
              {site.proof.title}
            </h2>
            <p className="text-stone-500 dark:text-stone-400 font-light leading-relaxed">
              {site.proof.description}
            </p>
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8">
            {site.proof.items.map((item) => (
              <div key={item.label} className="flex flex-col">
                <dt className="order-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-snug max-w-[9rem]">
                  {item.label}
                </dt>
                <dd className="order-1 text-3xl sm:text-4xl font-serif text-ink dark:text-stone-50 mb-1">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </section>

      <section id="work" className="scroll-mt-24 py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 md:mb-20">
          <div>
            <h2 className="text-4xl font-serif text-ink dark:text-stone-50 mb-3">{site.projects.title}</h2>
            <p className="text-stone-500 dark:text-stone-400 font-light text-lg">{site.projects.subtitle}</p>
          </div>
          <Link
            to={portfolioPath}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-ink dark:hover:text-stone-50 transition-colors group"
          >
            {site.portfolio.view_all}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 md:gap-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-y border-stone-200/70 dark:border-stone-800 bg-stone-100/45 dark:bg-stone-950/25 py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.7fr] gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-ink dark:text-stone-50 leading-[0.95] mb-6">
                {site.capabilities.title}
              </h2>
              <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                {site.capabilities.description}
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-3">
              {site.capabilities.items.map((item, index) => {
                const Icon = CAPABILITY_ICONS[index];
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl bg-white/80 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800 p-6 md:p-7 min-h-[15rem] flex flex-col"
                  >
                    <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 mb-10">
                      <Icon size={19} strokeWidth={1.6} />
                    </div>
                    <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="scroll-mt-20 bg-ink text-off-white py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-28"
            >
              <h2 className="text-5xl md:text-7xl font-serif font-light mb-7 leading-[0.9]">
                {site.footer.title.part1} <br /><span className="font-serif-italic text-stone-500">{site.footer.title.part2}</span>
              </h2>
              <p className="text-stone-400 text-lg max-w-lg font-light leading-relaxed">
                {site.footer.description}
              </p>
              <div className="mt-8 flex items-center gap-5 text-sm text-stone-500">
                <Link to={portfolioPath} className="transition-colors hover:text-off-white">{site.ui.view_portfolio}</Link>
                <span aria-hidden>·</span>
                <a href="https://www.linkedin.com/in/mikolajpiech/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-off-white">LinkedIn</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.08 }}
            >
              <ContactForm />
            </motion.div>
          </div>

          <div className="mt-20 md:mt-28 pt-10 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <p className="mb-4 md:mb-0">{site.common.all_rights_reserved.replace('{{year}}', String(year))}</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center">
              <CopyEmail email={CONTACT_EMAIL} className="hover:text-off-white transition-colors" />
              <a href="https://x.com/mikolajpiech" className="hover:text-off-white transition-colors flex items-center gap-2">
                <XLogo className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/mikolajpiech/" className="hover:text-off-white transition-colors">LinkedIn</a>
              <a href="https://github.com/realmikolajpiech" className="hover:text-off-white transition-colors">GitHub</a>
              <Link to={privacyPath} className="hover:text-off-white transition-colors">{site.common.privacy_policy}</Link>
            </div>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
}
