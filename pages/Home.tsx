import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Github } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from '../components/Button';
import { ProjectCard } from '../components/ProjectCard';
import { SchemaMarkup } from '../components/SchemaMarkup';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ThemeToggle } from '../components/ThemeToggle';
import { Project } from '../types';
import omniImage from '../assets/omni.jpeg';
import curioImage from '../assets/curio.png';
import solveeImage from '../assets/solvee-listing.jpeg';
import subbyImage from '../assets/subby-listing.jpeg';
import solveeLogo from '../assets/solvee-logo.png';
import subbyLogo from '../assets/subby-logo.png';
import omniVideo from '../assets/omni-teaser.mp4';
import platoicLogo from '../assets/platoic-logo.png';
import { Link } from 'react-router-dom';

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
  const { t } = useTranslation();

  const projects: Project[] = useMemo(() => [
    {
      id: 'omni',
      name: 'Omni',
      tagline: t('projects.omni.tagline'),
      description: t('projects.omni.description'),
      link: 'https://heyomni.app',
      status: t('projects.omni.status'),
      tags: ['AI', 'Productivity'],
      video: omniVideo,
      image: omniImage,
      linkText: t('projects.omni.link_text')
    },
    /* {
      id: 'platoic',
      name: 'Platoic',
      tagline: t('projects.platoic.tagline'),
      description: t('projects.platoic.description'),
      link: 'https://ailearningapp.vercel.app',
      status: t('projects.platoic.status'),
      tags: ['EdTech', 'AI', 'Web Platform'],
      image: curioImage
    }, */
    {
      id: 'solvee',
      name: 'Solvee',
      tagline: t('projects.solvee.tagline'),
      description: t('projects.solvee.description'),
      link: 'https://apps.apple.com/pl/app/solvee-ai-homework-helper/id6754188493',
      tags: ['Mobile App', 'Education', 'AI'],
      status: t('projects.solvee.status'),
      appStoreLink: 'https://apps.apple.com/pl/app/solvee-ai-homework-helper/id6754188493',
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.mikolajpiech.solvee',
      icon: solveeLogo,
      // Using a vertical math/homework related image
      image: solveeImage,
      layout: 'split'
    },
    {
      id: 'subby',
      name: 'Subby',
      tagline: t('projects.subby.tagline'),
      description: t('projects.subby.description'),
      link: 'https://apps.apple.com/us/app/subby-subscription-manager/id6755717606',
      tags: ['FinTech', 'Utility', 'Mobile App'],
      appStoreLink: 'https://apps.apple.com/us/app/subby-subscription-manager/id6755717606',
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.justgoodapps.subby',
      icon: subbyLogo,
      // Using a vertical clean interface/list image
      image: subbyImage,
      layout: 'split'
    }
  ], [t]);

  return (
    <div className="min-h-screen bg-off-white dark:bg-stone-900 selection:bg-stone-200 dark:selection:bg-stone-700 transition-colors duration-300">
      <SchemaMarkup projects={projects} />

      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-off-white/80 dark:bg-stone-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-off-white/50 dark:supports-[backdrop-filter]:bg-stone-900/50 transition-all duration-300">
        <span className="font-serif italic text-xl tracking-tight text-ink dark:text-stone-50">Mikołaj Piech</span>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button href="#contact" variant="outline" className="!px-5 !py-2 !text-xs tracking-wide hidden sm:inline-flex">
            {t('common.get_in_touch')}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">

          {/* Text Content */}
          <div className="md:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-8xl font-serif font-light leading-[0.95] text-ink dark:text-stone-50 mb-6 tracking-tight">
                I build apps<br />
                <span className="font-serif-italic text-stone-400">and ship them.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl space-y-5"
            >
              <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                I'm <span className="text-ink dark:text-stone-50 font-medium">Mikołaj.</span> I take ideas from zero to something people actually use.
              </p>
              <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                Shipped apps on iOS, Android, and web.{' '}
                <span className="inline-flex items-center gap-1.5 text-ink dark:text-stone-50 font-medium">
                  Solvee hit 25k+ downloads
                </span>{' '}
                before I sold it. Always building something new.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 pt-4 items-center"
            >
              <SocialIcon href="https://x.com/mikolajpiech" icon={<XLogo className="w-5 h-5" />} />
              <SocialIcon href="https://www.linkedin.com/in/mikolajpiech/" icon={<Linkedin size={20} />} />
              <SocialIcon href="https://github.com/realmikolajpiech" icon={<Github size={20} />} />
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="md:col-span-5 relative self-start"
          >
            <div className="aspect-[3/4] md:aspect-square relative overflow-hidden rounded-full md:rounded-[3rem] group">
              <img
                src="/mikolaj-profile.jpg"
                alt="Mikołaj Piech"
                className="w-full h-full object-cover group-hover:grayscale transition-all duration-1000 ease-in-out"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-full md:rounded-[3rem]"></div>
            </div>
          </motion.div>
        </div>
      </section>



      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16 max-w-xl">
          <h2 className="text-4xl font-serif text-ink dark:text-stone-50 mb-3">{t('timeline.title')}</h2>
          <p className="text-stone-500 dark:text-stone-400 font-light text-lg">{t('timeline.subtitle')}</p>
        </div>

        {(() => {
          const byId = Object.fromEntries(projects.map(p => [p.id, p]));
          const timelineIcons: Record<string, string> = {
            omni: 'https://www.heyomni.app/assets/omni.png',
            // platoic: platoicLogo,
          };
          const timeline: Array<{ date: string; title: string; description: string; projectId?: string; link?: string }> = [
            { date: t('timeline.items.solvee_acquired.date'), title: t('timeline.items.solvee_acquired.title'), description: t('timeline.items.solvee_acquired.description'), projectId: 'solvee' },
            { date: t('timeline.items.omni_started.date'), title: t('timeline.items.omni_started.title'), description: t('timeline.items.omni_started.description'), projectId: 'omni', link: 'https://heyomni.app' },
            // { date: t('timeline.items.platoic_started.date'), title: t('timeline.items.platoic_started.title'), description: t('timeline.items.platoic_started.description'), projectId: 'platoic' },
            { date: t('timeline.items.subby_released.date'), title: t('timeline.items.subby_released.title'), description: t('timeline.items.subby_released.description'), projectId: 'subby' },
            { date: t('timeline.items.solvee_launched.date'), title: t('timeline.items.solvee_launched.title'), description: t('timeline.items.solvee_launched.description'), projectId: 'solvee' },
          ];

          return (
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-stone-200 dark:bg-stone-800"></div>
              <ul className="space-y-6 md:space-y-8">
                {timeline.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.li
                      key={`${item.title}-${item.date}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="grid grid-cols-[3rem_1fr] md:grid-cols-12 items-center gap-4 md:gap-0">
                        <div className={`col-span-1 md:col-span-5 order-2 ${isLeft ? 'md:order-1 md:pr-6 md:text-right' : 'md:order-3 md:pl-6 text-left'}`}>
                          <div className="inline-flex flex-col gap-2 bg-white dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/50 rounded-2xl px-5 py-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] w-full md:w-auto">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                {item.projectId && (timelineIcons[item.projectId] ?? byId[item.projectId]?.icon) ? (
                                  <img
                                    src={timelineIcons[item.projectId] ?? byId[item.projectId]?.icon}
                                    alt={item.title}
                                    className="w-8 h-8 rounded-[22%] object-cover bg-white ring-1 ring-black/5"
                                  />
                                ) : item.projectId ? (
                                  <div className="w-8 h-8 rounded-[22%] bg-stone-200 dark:bg-stone-800 flex items-center justify-center ring-1 ring-black/5">
                                    <span className="text-xs font-semibold text-ink dark:text-stone-50">
                                      {byId[item.projectId]?.name?.[0] ?? item.title[0]}
                                    </span>
                                  </div>
                                ) : null}
                                {item.link ? (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ink dark:text-stone-50 text-lg font-serif hover:underline decoration-stone-300 underline-offset-4"
                                  >
                                    {item.title}
                                  </a>
                                ) : (
                                  <div className="text-ink dark:text-stone-50 text-lg font-serif">{item.title}</div>
                                )}
                              </div>
                              <span className="text-[10px] px-3 py-1 rounded-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 tracking-wide whitespace-nowrap">
                                {item.date}
                              </span>
                            </div>
                            <div className="text-stone-600 dark:text-stone-400 leading-relaxed font-light text-sm text-left">{item.description}</div>
                          </div>
                        </div>
                        <div className="col-span-1 md:col-span-2 order-1 md:order-2 flex items-center justify-center">
                          <div className="relative w-full flex items-center justify-center h-full">
                            <div className="w-3 h-3 rounded-full bg-ink dark:bg-stone-50 ring-4 ring-off-white dark:ring-stone-900 shadow-sm relative z-10 shrink-0"></div>
                            <div className={`hidden md:block absolute h-px bg-stone-300 dark:bg-stone-700 ${isLeft ? 'left-0 right-1/2' : 'left-1/2 right-0'}`}></div>
                          </div>
                        </div>
                        <div className={`hidden md:block md:col-span-5 ${isLeft ? 'md:order-3' : 'md:order-1'}`}></div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          );
        })()}
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 md:mb-20">
          <div>
            <h2 className="text-4xl font-serif text-ink dark:text-stone-50 mb-3">{t('projects.title')}</h2>
            <p className="text-stone-500 dark:text-stone-400 font-light text-lg">{t('projects.subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Connect/Footer */}
      <footer id="contact" className="bg-ink text-off-white py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-8xl font-serif font-light mb-8 md:mb-10 leading-[0.9]"
          >
            {t('footer.title.part1')} <br /><span className="font-serif-italic text-stone-500">{t('footer.title.part2')}</span>
          </motion.h2>
          <p className="text-stone-400 text-xl mb-12 max-w-xxl mx-auto font-light leading-relaxed">
            {t('footer.description')}
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button href="mailto:hello@mikolajpiech.com" variant="secondary" external>
              {t('common.email_me')} <Mail className="ml-2 w-4 h-4" />
            </Button>
            <Button href="https://www.linkedin.com/in/mikolajpiech/" variant="outline" className="text-off-white border-stone-700 hover:border-off-white hover:bg-stone-800" external>
              {t('common.linkedin')}
            </Button>
            <Button href="https://www.x.com/mikolajpiech/" variant="outline" className="text-off-white border-stone-700 hover:border-off-white hover:bg-stone-800" external>
              <XLogo className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-20 md:mt-32 pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <p className="mb-4 md:mb-0">{t('common.all_rights_reserved', { year: new Date().getFullYear() })}</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center">
              <a href="mailto:hello@mikolajpiech.com" className="hover:text-off-white transition-colors">hello@mikolajpiech.com</a>
              <a href="https://x.com/mikolajpiech" className="hover:text-off-white transition-colors flex items-center gap-2">
                <XLogo className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/mikolajpiech/" className="hover:text-off-white transition-colors">LinkedIn</a>
              <a href="https://github.com/realmikolajpiech" className="hover:text-off-white transition-colors">GitHub</a>
              <Link to="/privacy-policy" className="hover:text-off-white transition-colors">{t('common.privacy_policy')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
