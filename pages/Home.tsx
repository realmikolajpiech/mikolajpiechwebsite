import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram, Mail, ArrowRight, PanelsTopLeft, Smartphone, Monitor } from 'lucide-react';
import { Button } from '../components/Button';
import { ProjectCard } from '../components/ProjectCard';
import { PageMeta } from '../components/PageMeta';
import { SiteNav } from '../components/SiteNav';
import { ContactForm } from '../components/ContactForm';
import { CopyEmail } from '../components/CopyEmail';
import { getFeaturedProjects } from '../data/projects';
import { Link } from 'react-router-dom';
import { getPageMeta } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../utils/localizedRoutes';
const CONTACT_EMAIL = 'hello@mikolajpiech.com';
const CAPABILITY_ICONS = [PanelsTopLeft, Smartphone, Monitor];
const HERO_LINKS: Record<string, string> = {
  'Clevr Apps': 'https://clevrapps.com/',
  Trailo: 'https://trailoapp.com',
  Subby: 'https://apps.apple.com/us/app/subby-subscription-manager/id6755717606',
  Doso: 'https://apps.apple.com/app/doso-pill-reminder-tracker/id6761341859',
  'Charmy Books': 'https://charmybooks.com/',
};

const HeroIntro = ({ text, descriptions }: { text: string; descriptions: Record<string, string> }) => (
  <p className="text-base sm:text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed font-light">
    {text.split(/(Clevr Apps|Trailo|Subby|Doso|Charmy Books)/g).map((part, index) => {
      const href = HERO_LINKS[part];
      if (!href) return part;

      const description = descriptions[part];
      return (
        <a
          key={`${part}-${index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={description ? `${part}: ${description}` : undefined}
          data-tooltip={description || undefined}
          className={`${description ? 'hero-app-link ' : ''}font-medium text-ink underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-600 dark:text-stone-100 dark:decoration-stone-600 dark:hover:text-stone-300`}
        >
          {part}
        </a>
      );
    })}
  </p>
);

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 300 271" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
  </svg>
);

const SocialIcon = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => (
  <a
    href={href}
    aria-label={label}
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

  const featuredProjects = getFeaturedProjects(language);
  const pageMeta = getPageMeta('home', site, language);
  const portfolioPath = getLocalizedPath('portfolio', language);
  const privacyPath = getLocalizedPath('privacy', language);

  return (
    <div className="min-h-screen bg-off-white dark:bg-stone-900 selection:bg-stone-200 dark:selection:bg-stone-700 transition-colors duration-300">
      <PageMeta {...pageMeta} />
      <SiteNav />

      <main>
      <section className="relative mx-auto max-w-7xl px-4 pb-8 pt-20 sm:px-6 sm:pb-20 sm:pt-28 md:px-12 md:pt-40">
        <div className="grid grid-cols-1 items-start gap-y-7 sm:gap-y-9 md:grid-cols-12 md:items-center md:gap-x-12 md:gap-y-10">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-start-1 row-start-1 min-w-0 md:col-span-7"
          >
            <h1 className="text-[clamp(3.25rem,15vw,4.25rem)] sm:text-7xl md:text-8xl font-serif font-light leading-[0.88] md:leading-[0.95] text-ink dark:text-stone-50 tracking-tight">
              <span className="block text-balance">{site.hero.headline_line1}</span>
              <span className="mt-2 block text-balance font-serif-italic text-stone-400 md:mt-0">{site.hero.headline_line2}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative col-start-1 row-start-2 w-full md:col-span-5 md:col-start-8 md:row-start-1 md:row-span-3 md:self-center"
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] md:aspect-square md:rounded-[3rem]">
              <img
                src="/mikolaj-profile.jpg"
                width={400}
                height={400}
                fetchPriority="high"
                alt="Mikołaj Piech"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-black/5 md:rounded-[3rem]"></div>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-start-1 row-start-3 min-w-0 max-w-2xl md:col-span-7 md:row-start-2"
          >
            <HeroIntro text={site.hero.intro} descriptions={site.hero.link_descriptions} />
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="col-start-1 row-start-4 md:col-span-7 md:row-start-3 md:pt-2"
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#work" className="min-h-12 w-full sm:w-auto">
                {site.hero.primary_cta}
                <ArrowRight size={15} className="ml-2" />
              </Button>
              <Button href="#contact" variant="outline" className="!border-0 !px-2 !py-2 !text-stone-600 dark:!text-stone-300 sm:!border sm:!px-6 sm:!py-3 sm:!text-ink sm:dark:!text-stone-50">
                <Mail size={15} className="mr-2" />
                {site.hero.secondary_cta}
              </Button>
              <div className="flex w-full items-center justify-center gap-1 border-t border-stone-200/70 pt-3 dark:border-stone-800 sm:basis-full sm:w-auto sm:justify-start sm:border-0 sm:pt-1">
                <SocialIcon href="https://x.com/mikolajpiech" label="X" icon={<XLogo className="w-5 h-5" />} />
                <SocialIcon href="https://www.linkedin.com/in/mikolajpiech/" label="LinkedIn" icon={<Linkedin size={20} />} />
                <SocialIcon href="https://github.com/realmikolajpiech" label="GitHub" icon={<Github size={20} />} />
                <SocialIcon href="https://www.instagram.com/mikolajpiech" label="Instagram" icon={<Instagram size={20} />} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12" aria-labelledby="proof-title">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="border-y border-stone-200/80 dark:border-stone-800 py-7 md:py-8"
        >
          <h2 id="proof-title" className="sr-only">{site.proof.title}</h2>
          <dl className="grid grid-cols-3 divide-x divide-stone-200/80 dark:divide-stone-800">
            {site.proof.items.map((item) => (
              <div key={item.label} className="flex min-w-0 flex-col items-center px-3 text-center sm:px-6">
                <dt className="order-2 text-[11px] sm:text-sm text-stone-500 dark:text-stone-400 leading-snug">
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
              initial={false}
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
                    initial={false}
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
              initial={false}
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
                <span aria-hidden>·</span>
                <a href="https://www.instagram.com/mikolajpiech" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-off-white">Instagram</a>
                <span aria-hidden>·</span>
                <a href="https://clevrapps.com/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-off-white">Clevr Apps</a>
              </div>
            </motion.div>

            <motion.div
              initial={false}
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
              <a href="https://www.instagram.com/mikolajpiech" className="hover:text-off-white transition-colors">Instagram</a>
              <Link to={privacyPath} className="hover:text-off-white transition-colors">{site.common.privacy_policy}</Link>
            </div>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
}
