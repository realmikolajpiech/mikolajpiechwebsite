import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { SiteNav } from '../components/SiteNav';
import { ContactForm } from '../components/ContactForm';
import { SelectedProject } from '../components/SelectedProject';
import { getFeaturedProjects } from '../data/projects';
import { getPageMeta } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../utils/localizedRoutes';
import { ThreadsIcon } from '../components/ThreadsIcon';
import { SubstackIcon } from '../components/SubstackIcon';
import './PersonalHome.css';

const XIcon = () => <svg viewBox="0 0 300 271" fill="currentColor" aria-hidden="true"><path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" /></svg>;

const profiles = [
  { name: 'X', icon: XIcon, href: 'https://x.com/mikolajpiech' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/mikolajpiech/' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/mikolajpiech' },
  { name: 'Threads', icon: ThreadsIcon, href: 'https://www.threads.com/@mikolajpiech' },
  { name: 'Substack', icon: SubstackIcon, href: 'https://substack.com/@mikolajpiech' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/realmikolajpiech' },
];

function SocialLinks({ label, hero = false }: { label: string; hero?: boolean }) {
  return <div className={`personal-socials${hero ? ' personal-hero-socials' : ''}`} role="group" aria-label={label}>
    {profiles.map(profile => <a href={profile.href} key={profile.name} target="_blank" rel="noopener noreferrer" aria-label={profile.name} title={profile.name}><profile.icon aria-hidden="true" /></a>)}
  </div>;
}

export default function Home() {
  const { language, site } = useLanguage();
  const copy = site.personal;
  const portfolioPath = getLocalizedPath('portfolio', language);
  const [before, after] = site.hero.intro.split('Clevr Apps');

  return (
    <div className="personal-home">
      <PageMeta {...getPageMeta('home', site, language)} />
      <a href="#main" className="personal-skip">{copy.skip}</a>
      <SiteNav personal />
      <main id="main" className="personal-container">
        <section className="personal-hero" aria-labelledby="intro-title">
          <div className="personal-intro">
            <h1 id="intro-title">Mikołaj <span>Piech</span></h1>
            <p>{before}<a href="https://clevrapps.com/">Clevr Apps</a>{after}</p>
            <div className="personal-intro-links">
              <a href="#work">{copy.work_link}<ArrowDown size={16} aria-hidden="true" /></a>
              <a href="#about">{copy.about_title}</a>
            </div>
            <SocialLinks label={copy.social_label} hero />
          </div>
          <div className="personal-portrait">
            <img src="/mikolaj-profile.jpg" width="400" height="400" fetchPriority="high" alt="Mikołaj Piech" />
          </div>
        </section>

        <section id="work" className="personal-work" aria-labelledby="work-title">
          <div className="personal-section-heading">
            <div><h2 id="work-title">{site.projects.title}</h2><p>{copy.work_intro}</p></div>
            <Link className="personal-text-link" to={portfolioPath}>{site.portfolio.view_all}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="personal-projects">
            {getFeaturedProjects(language).map(project => <SelectedProject key={project.id} project={project} portfolioPath={portfolioPath} />)}
          </div>
          <p className="personal-studio-note">{copy.studio_note} <a href="https://clevrapps.com/">Clevr Apps<ArrowUpRight size={14} aria-hidden="true" /></a></p>
        </section>

        <section id="about" className="personal-about" aria-labelledby="about-title">
          <h2 id="about-title">{copy.about_title}</h2>
          <div>{copy.about_paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        </section>

        <section id="contact" className="personal-contact" aria-labelledby="contact-title">
          <div className="personal-contact-intro"><h2 id="contact-title">{copy.contact_title}</h2><a className="personal-email" href="mailto:hello@mikolajpiech.com">hello@mikolajpiech.com<ArrowUpRight size={22} aria-hidden="true" /></a>
          <SocialLinks label={copy.social_label} /></div>
          <ContactForm personal />
        </section>
      </main>
      <footer className="personal-footer personal-container"><p>© {new Date().getFullYear()} Mikołaj Piech</p><Link to={getLocalizedPath('privacy', language)}>{site.common.privacy_policy}</Link></footer>
    </div>
  );
}
